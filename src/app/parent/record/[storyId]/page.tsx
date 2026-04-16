'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { RecordingInterface } from '@/components/recording/recording-interface';
import type { Story } from '@/lib/types';

export default function RecordPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.storyId as string;
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('stories')
        .select('*')
        .eq('id', storyId)
        .single();

      if (data) setStory(data as Story);
    }
    load();
  }, [storyId]);

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-warm-grey">Loading story...</div>
      </div>
    );
  }

  return (
    <RecordingInterface
      story={story}
      onComplete={() => { router.push('/parent'); }}
    />
  );
}
