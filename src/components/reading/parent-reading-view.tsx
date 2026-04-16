'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Story, WebRTCConnectionState } from '@/lib/types';
import { StoryPage } from '@/components/story/story-page';
import { ConnectionStatus } from './connection-status';
import { logSessionEvent } from '@/lib/event-logger';
import { createClient } from '@/lib/supabase/client';

interface ParentReadingViewProps {
  story: Story;
  sessionId: string;
  initialPage?: number;
  onComplete: () => void;
  onSendPageSync?: (pageNumber: number) => void;
  onSendPromptTrigger?: (promptIndex: number) => void;
  connectionStatus?: 'connected' | 'degraded' | 'disconnected';
  localStream?: MediaStream | null;
  webrtcState?: WebRTCConnectionState;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
  onToggleAudio?: () => void;
  onToggleVideo?: () => void;
}

export function ParentReadingView({
  story,
  sessionId,
  initialPage = 1,
  onComplete,
  onSendPageSync,
  onSendPromptTrigger,
  connectionStatus = 'connected',
  localStream,
  webrtcState,
  isAudioEnabled = true,
  isVideoEnabled = true,
  onToggleAudio,
  onToggleVideo,
}: ParentReadingViewProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const supabase = createClient();
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const page = story.pages.find((p) => p.pageNumber === currentPage);
  if (!page) return null;

  const totalPages = story.pages.length;
  const currentIndex = story.pages.findIndex((p) => p.pageNumber === currentPage);

  const goToPage = useCallback(async (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0 || newIndex >= story.pages.length) {
      if (direction === 'next') {
        await logSessionEvent(supabase, sessionId, 'session_end', {
          pagesRead: totalPages,
          isComplete: true,
        });
        onComplete();
      }
      return;
    }

    const newPage = story.pages[newIndex].pageNumber;
    setCurrentPage(newPage);
    onSendPageSync?.(newPage);

    // Persist current page so late-joining children start on the right page
    supabase
      .from('sessions')
      .update({ current_page: newPage })
      .eq('id', sessionId)
      .then();

    await logSessionEvent(supabase, sessionId, 'page_turn', {
      pageNumber: newPage,
      triggeredBy: 'parent',
    });
  }, [currentIndex, story.pages, totalPages, sessionId, supabase, onComplete, onSendPageSync]);

  const triggerPrompt = useCallback(async (promptIndex: number) => {
    await logSessionEvent(supabase, sessionId, 'prompt_shown', {
      pageNumber: currentPage,
      promptType: page?.prompts[promptIndex]?.type,
      promptText: page?.prompts[promptIndex]?.text,
    });
    onSendPromptTrigger?.(promptIndex);
  }, [currentPage, page, sessionId, supabase, onSendPromptTrigger]);

  return (
    <div className="h-screen flex flex-col bg-bg-dark">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-deep-blue">
        <div className="flex items-center gap-2">
          <ConnectionStatus state={connectionStatus} />
          {onToggleAudio && (
            <button
              onClick={onToggleAudio}
              className="w-8 h-8 rounded-full bg-deep-blue border border-soft-blue/30 flex items-center justify-center text-sm transition-colors hover:bg-soft-blue/10"
              title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
            >
              {isAudioEnabled ? '\u{1F3A4}' : '\u{1F507}'}
            </button>
          )}
          {onToggleVideo && (
            <button
              onClick={onToggleVideo}
              className="w-8 h-8 rounded-full bg-deep-blue border border-soft-blue/30 flex items-center justify-center text-sm transition-colors hover:bg-soft-blue/10"
              title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
            >
              {isVideoEnabled ? '\u{1F4F9}' : '\u{1F4F7}'}
            </button>
          )}
        </div>
        <span className="text-warm-grey text-sm">
          Page {currentIndex + 1} of {totalPages}
        </span>
        <button
          onClick={onComplete}
          className="text-warm-grey text-xs hover:text-muted-gold transition-colors"
        >
          End session
        </button>
      </div>

      {/* Story page */}
      <div className="flex-1 relative">
        <StoryPage page={page} className="w-full h-full" />

        <div className="absolute top-4 right-4 w-[80px] h-[80px] rounded-full bg-deep-blue border-2 border-soft-blue/30 flex items-center justify-center overflow-hidden">
          {localStream ? (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            <span className="text-lg">👶</span>
          )}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="p-4 border-t border-deep-blue space-y-3">
        {page.prompts.length > 0 && (
          <div className="flex gap-2 justify-center">
            {page.prompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => triggerPrompt(i)}
                className="px-3 py-1.5 rounded-lg border border-soft-blue/30 text-soft-blue text-xs capitalize hover:bg-soft-blue/10 transition-colors"
              >
                {prompt.type}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => goToPage('prev')}
            disabled={currentIndex === 0}
            className="px-6 py-3 rounded-lg bg-deep-blue text-muted-gold disabled:opacity-30 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => goToPage('next')}
            className="px-6 py-3 rounded-lg bg-soft-blue text-bg-dark font-medium hover:bg-soft-blue/90 transition-colors"
          >
            {currentIndex === totalPages - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
