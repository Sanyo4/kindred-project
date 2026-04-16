'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { OwlCharacter } from '@/components/owl/owl-character';
import type { Story } from '@/lib/types';

interface LiveSession {
  sessionId: string;
  storyTitle: string;
}

export default function ChildSplash() {
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [childName, setChildName] = useState('');
  const [liveSession, setLiveSession] = useState<LiveSession | null>(null);

  useEffect(() => {
    const name = localStorage.getItem('kindred_child_name') || '';
    const familyId = localStorage.getItem('kindred_family_id');
    setChildName(name);

    if (!familyId) {
      router.push('/join');
      return;
    }

    const supabase = createClient();

    async function loadData() {
      // Load latest story
      const { data: storyData } = await supabase
        .from('stories')
        .select('*')
        .eq('family_id', familyId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (storyData) setStory(storyData as Story);

      // Check for an active SYNC session from a parent
      const { data: activeSync } = await supabase
        .from('sessions')
        .select('id, story_id, stories(title)')
        .eq('family_id', familyId)
        .eq('mode', 'SYNC')
        .eq('is_complete', false)
        .is('ended_at', null)
        .order('started_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (activeSync) {
        const stories = activeSync.stories as unknown as { title: string } | null;
        const title = stories?.title ?? 'Story';
        setLiveSession({ sessionId: activeSync.id, storyTitle: title });
      }

      setLoading(false);
    }

    loadData();

    // Listen for parent starting a live session via broadcast
    const familyChannel = supabase.channel(`family:${familyId}`);
    familyChannel
      .on('broadcast', { event: 'sync_session_started' }, ({ payload }) => {
        setLiveSession({
          sessionId: payload.sessionId,
          storyTitle: payload.storyTitle ?? 'Story',
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(familyChannel);
    };
  }, [router]);

  const handleJoinLive = useCallback(() => {
    if (!liveSession) return;
    router.push(`/child/read/${liveSession.sessionId}`);
  }, [liveSession, router]);

  async function handleOpenBook() {
    if (!story) return;

    const familyId = localStorage.getItem('kindred_family_id');
    const supabase = createClient();

    // Find the latest recording for this story (if any)
    const { data: recording } = await supabase
      .from('story_recordings')
      .select('id')
      .eq('story_id', story.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: session } = await supabase
      .from('sessions')
      .insert({
        family_id: familyId,
        story_id: story.id,
        mode: 'ASYNC',
        current_page: 1,
        recording_id: recording?.id ?? null,
      })
      .select()
      .single();

    if (session) {
      router.push(`/child/read/${session.id}`);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <OwlCharacter state="awake" size="large" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <OwlCharacter state="cosy" size="large" className="mx-auto" />
          <p className="text-warm-grey text-lg">No stories yet!</p>
          <p className="text-warm-grey/60 text-sm">Ask a parent to create a story first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 space-y-8">
      <div className="w-48 h-56 rounded-xl bg-deep-blue border border-soft-blue/30 flex flex-col items-center justify-center p-4 space-y-2">
        <OwlCharacter state="awake" size="medium" />
        <p className="text-muted-gold text-sm text-center font-medium leading-tight">
          {story.title}
        </p>
      </div>

      {/* Live session invitation — large, prominent for preschoolers */}
      {liveSession && (
        <button
          onClick={handleJoinLive}
          className="w-[220px] h-[90px] rounded-2xl bg-muted-gold text-bg-dark text-xl font-semibold active:scale-95 transition-transform flex items-center justify-center gap-3 animate-pulse"
        >
          <span className="text-2xl">🌟</span>
          Join Live!
        </button>
      )}

      <button
        onClick={handleOpenBook}
        className="px-10 py-4 rounded-full border-2 border-muted-gold text-muted-gold text-lg font-medium active:scale-95 transition-transform"
      >
        Open Book
      </button>

      {childName && (
        <p className="text-warm-grey/60 text-sm">
          Goodnight, {childName}
        </p>
      )}
    </div>
  );
}
