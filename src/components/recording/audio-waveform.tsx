'use client';

interface AudioWaveformProps {
  data: Uint8Array;
  isRecording: boolean;
}

export function AudioWaveform({ data, isRecording }: AudioWaveformProps) {
  return (
    <div className="flex items-end justify-center gap-1 h-12">
      {Array.from(data).slice(0, 8).map((value, i) => (
        <div
          key={i}
          className="w-2 rounded-full transition-all duration-100"
          style={{
            height: isRecording ? `${Math.max(4, (value / 255) * 48)}px` : '4px',
            backgroundColor: isRecording ? '#D4A54A' : '#8B8589',
          }}
        />
      ))}
    </div>
  );
}
