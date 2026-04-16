'use client';

import type { StoryPage } from '@/lib/types';
import { getStoryIllustrationRecipe } from '@/lib/story-illustrations';

interface StoryIllustrationProps {
  page: StoryPage;
}

export function StoryIllustration({ page }: StoryIllustrationProps) {
  const recipe = getStoryIllustrationRecipe(page);

  return (
    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[28px] bg-transparent" aria-hidden="true">
      <img src={recipe.background.src} alt="" className={recipe.background.className} draggable={false} />
      {recipe.layers.map((layer, index) => (
        <img
          key={`${layer.src}-${index}`}
          src={layer.src}
          alt=""
          className={layer.className}
          draggable={false}
        />
      ))}
    </div>
  );
}
