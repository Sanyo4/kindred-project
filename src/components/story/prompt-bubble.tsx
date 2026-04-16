'use client';

import { useState, useEffect } from 'react';
import type { DialogicPrompt } from '@/lib/types';

interface PromptBubbleProps {
  prompt: DialogicPrompt;
  onResponse: () => void;
  onTimeout: () => void;
}

export function PromptBubble({ prompt, onResponse, onTimeout }: PromptBubbleProps) {
  const [visible, setVisible] = useState(false);
  const [responded, setResponded] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), prompt.triggerAfterSeconds * 1000);
    return () => clearTimeout(showTimer);
  }, [prompt.triggerAfterSeconds]);

  useEffect(() => {
    if (!visible || responded) return;
    const timeoutTimer = setTimeout(() => onTimeout(), 10000);
    return () => clearTimeout(timeoutTimer);
  }, [visible, responded, onTimeout]);

  if (!visible || responded) return null;

  function handleTap() {
    setResponded(true);
    onResponse();
  }

  const typeLabel = {
    'completion': 'Fill in',
    'wh-question': 'Find it',
    'recall': 'Remember',
    'open-ended': 'Tell me',
    'distancing': 'Think about',
  };

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-slide-up z-20">
      {/* Thought bubble tail */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-deep-blue/90 border border-soft-blue/40" />
        <div className="w-2 h-2 rounded-full bg-deep-blue/90 border border-soft-blue/40 ml-3 -mt-1" />
      </div>

      {/* Bubble */}
      <button
        onClick={handleTap}
        className="bg-deep-blue/90 border border-soft-blue/40 rounded-2xl px-6 py-4 min-w-[200px] max-w-[280px] text-center active:scale-95 transition-transform"
        style={{ minHeight: '60px', minWidth: '60px' }}
      >
        <p className="text-soft-blue text-xs uppercase tracking-wider mb-1">
          {typeLabel[prompt.type]}
        </p>
        <p className="text-muted-gold text-base leading-snug">
          {prompt.text}
        </p>
      </button>
    </div>
  );
}
