'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ChildReadingView } from '@/components/reading/child-reading-view';
import { useRealtimeSync } from '@/hooks/use-realtime-sync';
import { useWebRTC } from '@/hooks/use-webrtc';
import { logSessionEvent } from '@/lib/event-logger';
import type { Story, Session, StoryRecording } from '@/lib/types';

export default function ChildReadPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [story, setStory] = useState<Story | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [recording, setRecording] = useState<StoryRecording | null>(null);
  const [syncedPage, setSyncedPage] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (!sessionData) return;
      setSession(sessionData as Session);

      const { data: storyData } = await supabase
        .from('stories')
        .select('*')
        .eq('id', sessionData.story_id)
        .single();

      if (storyData) {
        setStory(storyData as Story);

        // Fetch recording if session has one linked
        if (sessionData.recording_id) {
          const { data: recData } = await supabase
            .from('story_recordings')
            .select('*')
            .eq('id', sessionData.recording_id)
            .single();
          if (recData) setRecording(recData as StoryRecording);
        }

        await logSessionEvent(supabase, sessionId, 'session_start', {
          mode: sessionData.mode,
          storyId: sessionData.story_id,
          hasRecording: !!sessionData.recording_id,
        });
      }
    }
    load();
  }, [sessionId]);

  // Use refs for values accessed inside realtime callbacks so the channel
  // doesn't tear down and rebuild when session/recording state updates
  const sessionRef = useRef(session);
  const recordingRef = useRef(recording);
  useEffect(() => { sessionRef.current = session; }, [session]);
  useEffect(() => { recordingRef.current = recording; }, [recording]);

  const { remoteStream } = useWebRTC({
    sessionId,
    role: 'child',
    enabled: !!session && session.mode === 'SYNC',
  });

  useRealtimeSync({
    sessionId,
    role: 'child',
    onPageSync: useCallback((pageNumber: number) => {
      setSyncedPage(pageNumber);
    }, []),
    onSessionEnd: useCallback(async () => {
      // If we already have a recording loaded, just keep going
      if (recordingRef.current) return;

      const supabase = createClient();

      // Try to find a recording for this story to fall back to
      const storyId = sessionRef.current?.story_id;
      if (storyId) {
        const { data: recData } = await supabase
          .from('story_recordings')
          .select('*')
          .eq('story_id', storyId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (recData) {
          await supabase
            .from('sessions')
            .update({ mode: 'ASYNC_FALLBACK', recording_id: recData.id })
            .eq('id', sessionId);
          await logSessionEvent(supabase, sessionId, 'fallback_activated', {
            reason: 'parent_exit',
            hasRecording: true,
          });
          setRecording(recData as StoryRecording);
          return;
        }
      }

      // No recording available — redirect to nightlight
      router.push('/child/nightlight');
    }, [sessionId, router]),
  });

  function handleComplete() {
    router.push('/child/nightlight');
  }

  if (!story || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-warm-grey">Loading story...</div>
      </div>
    );
  }

  return (
    <ChildReadingView
      story={story}
      sessionId={sessionId}
      initialPage={session.current_page}
      syncedPage={syncedPage}
      recording={recording}
      remoteStream={remoteStream}
      onComplete={handleComplete}
      onHome={() => router.push('/child')}
    />
  );
}
