'use client';

import { useRouter } from 'next/navigation';
import { OwlNightlight } from '@/components/owl/owl-nightlight';

export default function NightlightPage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen">
      <OwlNightlight
        durationMinutes={20}
        onExpire={() => router.push('/child')}
      />
      <button
        onClick={() => router.push('/child')}
        className="absolute top-4 left-4 w-12 h-12 rounded-full bg-deep-blue/80 border border-warm-grey/30 flex items-center justify-center z-10 active:scale-95 transition-transform"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-warm-grey">
          <path d="M3 10L10 3L17 10M5 8.5V16H8.5V12H11.5V16H15V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
