'use client';

interface AudioPlaybackBarProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  onToggle: () => void;
}

export function AudioPlaybackBar({
  isPlaying,
  isLoading,
  currentTime,
  duration,
  onToggle,
}: AudioPlaybackBarProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-deep-blue px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="w-10 h-10 rounded-full bg-muted-gold/20 flex items-center justify-center flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <svg width="16" height="16" viewBox="0 0 16 16" className="animate-spin">
              <circle cx="8" cy="8" r="6" fill="none" stroke="#C4A35A" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
            </svg>
          ) : isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="#C4A35A" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="#C4A35A" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="#C4A35A" />
            </svg>
          )}
        </button>

        {/* Progress bar */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-1 bg-warm-grey/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-muted-gold rounded-full transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
