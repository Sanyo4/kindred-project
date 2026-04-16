'use client';

import { useEffect, useState } from 'react';
import { OwlCharacter } from './owl-character';

interface OwlNightlightProps {
  durationMinutes?: number;
  onExpire?: () => void;
}

export function OwlNightlight({ durationMinutes = 20, onExpire }: OwlNightlightProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [durationMinutes, onExpire]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-darker">
      {/* Ambient amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(212, 165, 74, 0.15) 0%, rgba(212, 165, 74, 0.05) 40%, transparent 70%)',
        }}
      />

      {/* Stars */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-muted-gold/40"
          style={{
            top: `${10 + (i * 7) % 30}%`,
            left: `${10 + (i * 13) % 80}%`,
            opacity: 0.2 + (i % 3) * 0.2,
            animation: `twinkle ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i % 3)}s`,
          }}
        />
      ))}

      {/* Branch */}
      <div className="absolute bottom-[35%] w-[70%] h-1 bg-warm-grey/30 rounded-full" />

      {/* Sleeping owl on branch */}
      <div className="animate-breathing">
        <OwlCharacter state="asleep" size="large" />
      </div>

      {/* Twinkle animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
