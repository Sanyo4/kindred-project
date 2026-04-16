'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseConnectionMonitorOptions {
  sendPing: () => void;
  intervalMs?: number;
  missThreshold?: number;
  onFallback: () => void;
}

export function useConnectionMonitor({
  sendPing,
  intervalMs = 5000,
  missThreshold = 3,
  onFallback,
}: UseConnectionMonitorOptions) {
  const [status, setStatus] = useState<'connected' | 'degraded' | 'disconnected'>('connected');
  const missCountRef = useRef(0);
  const hasFiredFallback = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      sendPing();
      missCountRef.current += 1;

      if (missCountRef.current >= missThreshold && !hasFiredFallback.current) {
        hasFiredFallback.current = true;
        setStatus('disconnected');
        onFallback();
        clearInterval(interval);
      } else if (missCountRef.current >= 1) {
        setStatus('degraded');
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [sendPing, intervalMs, missThreshold, onFallback]);

  const receivedPong = useCallback(() => {
    missCountRef.current = 0;
    setStatus('connected');
  }, []);

  return { status, receivedPong };
}
