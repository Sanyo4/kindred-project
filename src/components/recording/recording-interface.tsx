'use client';

import { useState, useCallback, useRef } from 'react';
import type { Story } from '@/lib/types';
import { StoryPage } from '@/components/story/story-page';
import { AudioWaveform } from './audio-waveform';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { createClient } from '@/lib/supabase/client';

interface RecordingInterfaceProps {
  story: Story;
  onComplete: (recordingId: string) => void;
}

export function RecordingInterface({ story, onComplete }: RecordingInterfaceProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageTimestamps, setPageTimestamps] = useState<{ pageNumber: number; timestamp: number }[]>([]);
  const [saving, setSaving] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { isRecording, audioBlob, analyserData, startRecording, stopRecording } = useAudioRecorder();
  const recordingStartRef = useRef(0);

  const page = story.pages[currentPageIndex];

  const handleStartRecording = useCallback(async () => {
    setPageTimestamps([{ pageNumber: story.pages[0].pageNumber, timestamp: 0 }]);
    await startRecording();
    // Capture reference time AFTER mic setup completes so timestamps
    // align with the actual start of the audio stream
    recordingStartRef.current = Date.now();
  }, [startRecording, story.pages]);

  const handleNextPage = useCallback(() => {
    if (currentPageIndex >= story.pages.length - 1) {
      stopRecording();
      return;
    }

    // Brief transition so the parent can prepare to read the next page.
    // The next page's timestamp is captured AFTER the transition, which
    // means any silence before clicking "Next" is skipped during playback.
    setTransitioning(true);
    const newIndex = currentPageIndex + 1;
    setCurrentPageIndex(newIndex);

    setTimeout(() => {
      setTransitioning(false);
      setPageTimestamps((prev) => [
        ...prev,
        {
          pageNumber: story.pages[newIndex].pageNumber,
          timestamp: (Date.now() - recordingStartRef.current) / 1000,
        },
      ]);
    }, 1000);
  }, [currentPageIndex, story.pages, stopRecording]);

  const handleSave = useCallback(async () => {
    if (!audioBlob) return;
    setSaving(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileName = `${story.id}/${Date.now()}.webm`;
    const { error: uploadError } = await supabase.storage
      .from('recordings')
      .upload(fileName, audioBlob);

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      setSaving(false);
      return;
    }

    const timeline = {
      entries: pageTimestamps.map((pt, i) => ({
        pageNumber: pt.pageNumber,
        startTimestamp: pt.timestamp,
        endTimestamp: i < pageTimestamps.length - 1 ? pageTimestamps[i + 1].timestamp : pt.timestamp + 10,
        promptTimestamps: [],
      })),
    };

    const { data: recording, error } = await supabase
      .from('story_recordings')
      .insert({
        story_id: story.id,
        recorded_by: user.id,
        audio_url: fileName,
        page_timeline: timeline,
        duration_seconds: Math.round((Date.now() - recordingStartRef.current) / 1000),
      })
      .select()
      .single();

    if (error || !recording) {
      console.error('Failed to save recording:', error);
      setSaving(false);
      return;
    }

    onComplete(recording.id);
    setSaving(false);
  }, [audioBlob, story.id, pageTimestamps, onComplete]);

  return (
    <div className="h-screen flex flex-col bg-bg-dark">
      <div className="flex items-center justify-between p-4 border-b border-deep-blue">
        <div className="flex items-center gap-2">
          {isRecording && <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
          <span className="text-warm-grey text-sm">
            {isRecording ? 'Recording...' : audioBlob ? 'Recording complete' : 'Ready to record'}
          </span>
        </div>
        <span className="text-warm-grey text-sm">
          Page {currentPageIndex + 1} of {story.pages.length}
        </span>
      </div>

      <div className="flex-1 relative">
        {page && <StoryPage page={page} className="w-full h-full" />}

        {/* Transition overlay between pages */}
        {transitioning && (
          <div className="absolute inset-0 bg-bg-dark/90 flex flex-col items-center justify-center gap-3 z-20">
            <div className="w-12 h-12 rounded-full border-2 border-muted-gold/60 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-muted-gold/40 animate-ping" />
            </div>
            <p className="text-muted-gold text-lg font-medium">Get ready...</p>
            <p className="text-warm-grey/60 text-sm">Next page is coming up</p>
          </div>
        )}

        {/* Read-aloud prompt — shown when recording and ready to speak */}
        {isRecording && !transitioning && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-bg-dark/80 backdrop-blur-sm border border-red-500/40 rounded-full px-4 py-1.5 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium">Read this page aloud</span>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-deep-blue space-y-4">
        <AudioWaveform data={analyserData} isRecording={isRecording} />

        <div className="flex items-center justify-center gap-4">
          {!isRecording && !audioBlob && (
            <button
              onClick={handleStartRecording}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-full bg-white" />
            </button>
          )}

          {isRecording && !transitioning && (
            <button
              onClick={handleNextPage}
              className="px-6 py-3 rounded-lg bg-soft-blue text-bg-dark font-medium"
            >
              {currentPageIndex >= story.pages.length - 1 ? 'Stop Recording' : 'Next Page \u2192'}
            </button>
          )}

          {audioBlob && !isRecording && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 rounded-lg bg-muted-gold text-bg-dark font-medium disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Recording'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
