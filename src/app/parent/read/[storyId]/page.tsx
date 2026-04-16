'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ParentReadingView } from '@/components/reading/parent-reading-view';
import { useRealtimeSync } from '@/hooks/use-realtime-sync';
import { useConnectionMonitor } from '@/hooks/use-connection-monitor';
import { useWebRTC } from '@/hooks/use-webrtc';
import { logSessionEvent } from '@/lib/event-logger';
import type { Story, Session } from '@/lib/types';
import type { RealtimeChannel } from '@supabase/supabase-js';

export default function ParentReadPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.storyId as string;
  const [story, setStory] = useState<Story | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const familyChannelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data: storyData } = await supabase
        .from('stories')
        .select('*')
        .eq('id', storyId)
        .single();

      if (!storyData) return;
      setStory(storyData as Story);

      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles')
        .select('family_id')
        .eq('id', user!.id)
        .single();

      const familyId = profile!.family_id;

      // Reuse an existing open SYNC session if parent navigates back
      const { data: existingSession } = await supabase
        .from('sessions')
        .select('*')
        .eq('family_id', familyId)
        .eq('story_id', storyId)
        .eq('mode', 'SYNC')
        .eq('is_complete', false)
        .is('ended_at', null)
        .order('started_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const sessionData = existingSession ?? (await supabase
        .from('sessions')
        .insert({
          family_id: familyId,
          story_id: storyId,
          mode: 'SYNC',
        })
        .select()
        .single()).data;

      if (sessionData) {
        setSession(sessionData as Session);

        // Broadcast to child devices that a live session has started
        const familyChannel = supabase.channel(`family:${familyId}`);
        familyChannelRef.current = familyChannel;
        familyChannel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            familyChannel.send({
              type: 'broadcast',
              event: 'sync_session_started',
              payload: {
                sessionId: sessionData.id,
                storyId: storyId,
                storyTitle: storyData.title,
              },
            });
          }
        });
      }
    }
    load();

    return () => {
      if (familyChannelRef.current) {
        const supabase = createClient();
        supabase.removeChannel(familyChannelRef.current);
      }
    };
  }, [storyId]);

  const receivedPongRef = useRef<() => void>(() => {});

  const { sendPageSync, sendPing, sendSessionEnd, sendPromptTrigger } = useRealtimeSync({
    sessionId: session?.id || '',
    role: 'parent',
    onPong: useCallback(() => receivedPongRef.current(), []),
  });

  const { status, receivedPong } = useConnectionMonitor({
    sendPing,
    onFallback: useCallback(async () => {
      if (!session) return;
      const supabase = createClient();
      await logSessionEvent(supabase, session.id, 'fallback_activated', {
        reason: 'ping_timeout',
      });
    }, [session]),
  });

  receivedPongRef.current = receivedPong;

  const {
    localStream,
    connectionState: webrtcState,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useWebRTC({
    sessionId: session?.id || '',
    role: 'parent',
    enabled: !!session,
  });

  // Mark session ended on unmount (tab close / navigate away without clicking "End session")
  useEffect(() => {
    if (!session) return;
    const sessionId = session.id;
    return () => {
      const supabase = createClient();
      supabase
        .from('sessions')
        .update({ ended_at: new Date().toISOString() })
        .eq('id', sessionId)
        .is('ended_at', null)
        .then();
    };
  }, [session]);

  const handleComplete = useCallback(async () => {
    if (session) {
      // Broadcast session end to child
      sendSessionEnd('parent_finished');

      // Mark session complete in DB
      const supabase = createClient();
      await supabase
        .from('sessions')
        .update({ is_complete: true, ended_at: new Date().toISOString() })
        .eq('id', session.id);

      await logSessionEvent(supabase, session.id, 'session_end', {
        endedBy: 'parent',
      });
    }
    router.push('/parent');
  }, [session, sendSessionEnd, router]);

  if (!story || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-warm-grey">Loading...</div>
      </div>
    );
  }

  return (
    <ParentReadingView
      story={story}
      sessionId={session.id}
      onComplete={handleComplete}
      onSendPageSync={sendPageSync}
      onSendPromptTrigger={sendPromptTrigger}
      connectionStatus={status}
      localStream={localStream}
      webrtcState={webrtcState}
      isAudioEnabled={isAudioEnabled}
      isVideoEnabled={isVideoEnabled}
      onToggleAudio={toggleAudio}
      onToggleVideo={toggleVideo}
    />
  );
}
