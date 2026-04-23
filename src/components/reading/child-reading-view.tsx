'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Story, DialogicPrompt, StoryRecording } from '@/lib/types';
import { StoryPage } from '@/components/story/story-page';
import { PromptBubble } from '@/components/story/prompt-bubble';
import { OwlCharacter } from '@/components/owl/owl-character';
import { DimmingLayer } from '@/components/dimming-layer';
import { AudioPlaybackBar } from './audio-playback-bar';
import { getDimmingLevel } from '@/lib/dimming';
import { getOwlState } from '@/lib/owl-state';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { logSessionEvent } from '@/lib/event-logger';
import { createClient } from '@/lib/supabase/client';

interface ChildReadingViewProps {
  story: Story;
  sessionId: string;
  initialPage?: number;
  syncedPage?: number | null;
  recording?: StoryRecording | null;
  remoteStream?: MediaStream | null;
  onComplete: () => void;
  onHome?: () => void;
}

export function ChildReadingView({
  story,
  sessionId,
  initialPage = 1,
  syncedPage,
  recording,
  remoteStream,
  onComplete,
  onHome,
}: ChildReadingViewProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const supabase = createClient();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Sync page when parent broadcasts a page change
  useEffect(() => {
    if (syncedPage && syncedPage !== currentPage) {
      setCurrentPage(syncedPage);
    }
  }, [syncedPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const audio = useAudioPlayer({
    audioUrl: recording?.audio_url ?? null,
    pageTimeline: recording?.page_timeline ?? null,
    autoPlay: !!recording,
  });

  // When recording activates mid-session (fallback), seek audio to the current page
   const hasSeenRecording = useRef(false);
  useEffect(() => {
    if (recording && !hasSeenRecording.current && !audio.isLoading) {
      hasSeenRecording.current = true;
      if (currentPage > 1) {
        audio.seekToPage(currentPage);
      }
    }
  }, [recording, audio.isLoading, currentPage, audio]);
  useEffect(() => {
    if (audio.currentTimelinePage && audio.currentTimelinePage > currentPage) {
      setCurrentPage(audio.currentTimelinePage);
    }
  }, [audio.currentTimelinePage, currentPage]);

  // When audio finishes on the last page, complete the session
  const hasAutoCompleted = useRef(false);
  useEffect(() => {
    if (!recording || hasAutoCompleted.current) return;
    const isLastPage = story.pages.findIndex((p) => p.pageNumber === currentPage) === story.pages.length - 1;
    if (isLastPage && !audio.isPlaying && !audio.isLoading && audio.currentTime > 0 && audio.currentTime >= audio.duration - 0.5) {
      hasAutoCompleted.current = true;
      supabase
        .from('sessions')
        .update({ is_complete: true, ended_at: new Date().toISOString() })
        .eq('id', sessionId)
        .then(() => logSessionEvent(supabase, sessionId, 'session_end', {
          pagesRead: story.pages.length,
          isComplete: true,
        }))
        .then(() => onComplete());
    }
  }, [recording, audio.isPlaying, audio.isLoading, audio.currentTime, audio.duration, currentPage, story.pages, sessionId, supabase, onComplete]);

  const page = story.pages.find((p) => p.pageNumber === currentPage);
  if (!page) return null;

  const totalPages = story.pages.length;
  const dimmingLevel = getDimmingLevel(currentPage, totalPages);
  const owlState = getOwlState(currentPage, totalPages);

  const handlePageTurn = useCallback(async () => {
    const nextPageIndex = story.pages.findIndex((p) => p.pageNumber === currentPage) + 1;

    if (nextPageIndex >= story.pages.length) {
      await supabase
        .from('sessions')
        .update({ is_complete: true, ended_at: new Date().toISOString() })
        .eq('id', sessionId);
      await logSessionEvent(supabase, sessionId, 'session_end', {
        pagesRead: totalPages,
        isComplete: true,
      });
      onComplete();
      return;
    }

    const nextPage = story.pages[nextPageIndex].pageNumber;
    setCurrentPage(nextPage);

    // Keep audio in sync with manual page turn
    if (recording) {
      audio.seekToPage(nextPage);
    }

    await logSessionEvent(supabase, sessionId, 'page_turn', {
      pageNumber: nextPage,
      triggeredBy: 'child',
    });

    await logSessionEvent(supabase, sessionId, 'owl_state_change', {
      to: getOwlState(nextPage, totalPages),
      atPage: nextPage,
    });

    await logSessionEvent(supabase, sessionId, 'dimming_change', {
      level: getDimmingLevel(nextPage, totalPages),
      atPage: nextPage,
    });
  }, [currentPage, story.pages, totalPages, sessionId, supabase, onComplete, recording, audio]);

  const handlePromptResponse = useCallback(async (prompt: DialogicPrompt) => {
    await logSessionEvent(supabase, sessionId, 'prompt_response', {
      pageNumber: currentPage,
      promptType: prompt.type,
      promptText: prompt.text,
    });
  }, [currentPage, sessionId, supabase]);

  const handlePromptTimeout = useCallback(async (prompt: DialogicPrompt) => {
    await logSessionEvent(supabase, sessionId, 'prompt_timeout', {
      pageNumber: currentPage,
      promptType: prompt.type,
      escalationTier: 1,
    });
  }, [currentPage, sessionId, supabase]);

  return (
    <div className="relative w-full h-screen overflow-hidden" onClick={handlePageTurn}>
      <DimmingLayer level={dimmingLevel}>
        <StoryPage page={page} className="w-full h-full" />
      </DimmingLayer>

      <div className="absolute bottom-6 right-4 z-10">
        <OwlCharacter state={owlState} size="small" />
      </div>

      {onHome && (
        <button
          onClick={(e) => { e.stopPropagation(); onHome(); }}
          className="absolute top-4 left-4 w-12 h-12 rounded-full bg-deep-blue/80 border border-warm-grey/30 flex items-center justify-center z-10 active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-warm-grey">
            <path d="M3 10L10 3L17 10M5 8.5V16H8.5V12H11.5V16H15V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {remoteStream && (
        <div className="absolute top-4 right-4 w-[15vw] h-[15vw] max-w-[100px] max-h-[100px] rounded-full bg-deep-blue border-2 border-muted-gold/50 overflow-hidden z-10">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {page.prompts.map((prompt, i) => (
        <PromptBubble
          key={`${currentPage}-${i}`}
          prompt={prompt}
          onResponse={() => handlePromptResponse(prompt)}
          onTimeout={() => handlePromptTimeout(prompt)}
        />
      ))}

      {recording && (
        <AudioPlaybackBar
          isPlaying={audio.isPlaying}
          isLoading={audio.isLoading}
          currentTime={audio.currentTime}
          duration={audio.duration}
          onToggle={audio.toggle}
        />
      )}
    </div>
  );
}
