'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PageTimeline } from '@/lib/types';

interface UseAudioPlayerOptions {
  audioUrl: string | null;
  pageTimeline: PageTimeline | null;
  autoPlay?: boolean;
}

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  currentTime: number;
  duration: number;
  currentTimelinePage: number | null;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seekToPage: (pageNumber: number) => void;
}

export function useAudioPlayer({
  audioUrl,
  pageTimeline,
  autoPlay = false,
}: UseAudioPlayerOptions): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTimelinePage, setCurrentTimelinePage] = useState<number | null>(null);

  // Build full public URL from storage path
  useEffect(() => {
    if (!audioUrl) {
      // Clean up any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTime(0);
      setDuration(0);
      setCurrentTimelinePage(null);
      return;
    }

    const supabase = createClient();
    const { data } = supabase.storage.from('recordings').getPublicUrl(audioUrl);
    const fullUrl = data.publicUrl;

    // Create or reuse audio element
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;

    setIsLoading(true);
    setError(null);

    audio.src = fullUrl;
    audio.preload = 'auto';

    const onLoadedMetadata = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onCanPlay = () => {
      setIsLoading(false);
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      if (autoPlay) {
        audio.play().catch(() => {
          // Autoplay blocked by browser — user interaction required
          setIsPlaying(false);
        });
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(audio.duration);
    };

    const onError = () => {
      setIsLoading(false);
      setError('Failed to load audio');
    };

    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl, autoPlay]);

  // Derive current timeline page from currentTime
  useEffect(() => {
    if (!pageTimeline?.entries?.length) {
      setCurrentTimelinePage(null);
      return;
    }

    let matched: number | null = null;
    for (const entry of pageTimeline.entries) {
      if (currentTime >= entry.startTimestamp && currentTime < entry.endTimestamp) {
        matched = entry.pageNumber;
        break;
      }
    }

    // If past last entry's end, stay on last page
    if (matched === null && currentTime > 0) {
      const last = pageTimeline.entries[pageTimeline.entries.length - 1];
      if (currentTime >= last.startTimestamp) {
        matched = last.pageNumber;
      }
    }

    if (matched !== null && matched !== currentTimelinePage) {
      setCurrentTimelinePage(matched);
    }
  }, [currentTime, pageTimeline, currentTimelinePage]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      setError('Playback blocked — tap to start');
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seekToPage = useCallback((pageNumber: number) => {
    if (!audioRef.current || !pageTimeline?.entries?.length) return;

    const entry = pageTimeline.entries.find((e) => e.pageNumber === pageNumber);
    if (entry) {
      audioRef.current.currentTime = entry.startTimestamp;
    }
  }, [pageTimeline]);

  return {
    isPlaying,
    isLoading,
    error,
    currentTime,
    duration,
    currentTimelinePage,
    play,
    pause,
    toggle,
    seekToPage,
  };
}
