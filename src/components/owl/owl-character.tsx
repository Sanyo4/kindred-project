'use client';

import { Bird } from 'lucide-react';
import type { OwlState } from '@/lib/types';

interface OwlCharacterProps {
  state: OwlState;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: 64,
  medium: 120,
  large: 200,
};

const stateStyles: Record<OwlState, { rotation: number; opacity: number; strokeWidth: number }> = {
  awake: { rotation: 0, opacity: 1, strokeWidth: 1.5 },
  cosy: { rotation: -5, opacity: 0.9, strokeWidth: 1.3 },
  sleepy: { rotation: -10, opacity: 0.7, strokeWidth: 1.1 },
  asleep: { rotation: 0, opacity: 0.5, strokeWidth: 1.0 },
};

export function OwlCharacter({ state, size = 'small', className = '' }: OwlCharacterProps) {
  const s = sizeMap[size];
  const style = stateStyles[state];

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${state === 'asleep' ? 'animate-breathing' : ''} ${className}`}
      style={{
        width: s,
        height: s,
        transform: `rotate(${style.rotation}deg)`,
      }}
    >
      <Bird
        size={s}
        strokeWidth={style.strokeWidth}
        className="text-muted-gold transition-all duration-700"
        style={{ opacity: style.opacity }}
      />
    </div>
  );
}
