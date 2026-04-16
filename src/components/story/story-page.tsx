'use client';

import type { StoryPage as StoryPageType } from '@/lib/types';
import { StoryIllustration } from '@/components/story/story-illustration';

interface StoryPageProps {
  page: StoryPageType;
  className?: string;
}

export function StoryPage({ page, className = '' }: StoryPageProps) {
  const bgGradient = getPageGradient(page.pageNumber);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-8 rounded-2xl overflow-hidden ${className}`}
      style={{ background: bgGradient }}
    >
      {/* Illustration area */}
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl px-2">
        <StoryIllustration page={page} />
      </div>

      {/* Story text */}
      <div className="w-full max-w-md mt-auto">
        <p className="text-muted-gold text-lg leading-relaxed text-center font-serif">
          {page.text}
        </p>
      </div>

      {/* Page number */}
      <div className="absolute bottom-3 right-4 text-warm-grey/40 text-xs">
        {page.pageNumber}
      </div>
    </div>
  );
}

function getPageGradient(pageNumber: number): string {
  const gradients = [
    'linear-gradient(135deg, #1E2A3A 0%, #2D3A4A 100%)',
    'linear-gradient(135deg, #1E2A3A 0%, #1a2f3f 100%)',
    'linear-gradient(135deg, #1a2f3f 0%, #2D3A4A 100%)',
    'linear-gradient(135deg, #2D3A4A 0%, #1E2A3A 100%)',
  ];
  return gradients[pageNumber % gradients.length];
}
