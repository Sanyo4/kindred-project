'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeSyncOptions {
  sessionId: string;
  role: 'parent' | 'child';
  onPageSync?: (pageNumber: number) => void;
  onPromptTrigger?: (promptIndex: number) => void;
  onPing?: () => void;
  onPong?: () => void;
  onSessionEnd?: (reason: string) => void;
}

export function useRealtimeSync({
  sessionId,
  role,
  onPageSync,
  onPromptTrigger,
  onPing,
  onPong,
  onSessionEnd,
}: UseRealtimeSyncOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`session:${sessionId}`);

    channel
      .on('broadcast', { event: 'page_sync' }, ({ payload }) => {
        onPageSync?.(payload.pageNumber);
      })
      .on('broadcast', { event: 'prompt_trigger' }, ({ payload }) => {
        onPromptTrigger?.(payload.promptIndex);
      })
      .on('broadcast', { event: 'ping' }, () => {
        channel.send({ type: 'broadcast', event: 'pong', payload: { from: role, timestamp: Date.now() } });
        onPing?.();
      })
      .on('broadcast', { event: 'pong' }, () => {
        onPong?.();
      })
      .on('broadcast', { event: 'session_end' }, ({ payload }) => {
        onSessionEnd?.(payload.reason);
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, role, onPageSync, onPromptTrigger, onPing, onPong, onSessionEnd]);

  const sendPageSync = useCallback((pageNumber: number) => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'page_sync',
      payload: { pageNumber, timestamp: Date.now() },
    });
  }, []);

  const sendPromptTrigger = useCallback((promptIndex: number) => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'prompt_trigger',
      payload: { promptIndex },
    });
  }, []);

  const sendPing = useCallback(() => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'ping',
      payload: { from: role, timestamp: Date.now() },
    });
  }, [role]);

  const sendSessionEnd = useCallback((reason: string) => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'session_end',
      payload: { reason },
    });
  }, []);

  return {
    sendPageSync,
    sendPromptTrigger,
    sendPing,
    sendSessionEnd,
  };
}
