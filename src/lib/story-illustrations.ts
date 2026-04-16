import type { StoryPage } from '@/lib/types';

type BackgroundId =
  | 'bg-forest'
  | 'bg-meadow'
  | 'bg-pond'
  | 'bg-path'
  | 'bg-den'
  | 'bg-hollow'
  | 'fallback-scene'
  | 'fallback-goodnight-scene';

type CharacterId =
  | 'char-owl'
  | 'char-fox'
  | 'char-rabbit'
  | 'char-bear'
  | 'char-deer'
  | 'char-hedgehog'
  | 'char-fox-sleeping'
  | 'char-rabbit-sleeping'
  | 'char-bear-walking'
  | 'char-deer-looking-up';

type DetailId =
  | 'detail-moon'
  | 'detail-star'
  | 'detail-stars-cluster'
  | 'detail-cloud'
  | 'detail-tree-pine'
  | 'detail-tree-round'
  | 'detail-flower'
  | 'detail-mushroom'
  | 'detail-reeds'
  | 'detail-lily-pad'
  | 'detail-nest'
  | 'detail-zzz'
  | 'detail-branch'
  | 'detail-bush'
  | 'detail-log'
  | 'detail-fireflies';

export interface IllustrationLayer {
  src: string;
  className: string;
}

export interface StoryIllustrationRecipe {
  background: IllustrationLayer;
  layers: IllustrationLayer[];
}

interface AssetSpec {
  src: string;
  className: string;
}

const backgrounds: Record<BackgroundId, AssetSpec> = {
  'bg-forest': { src: '/illustrations/bg-forest.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'bg-meadow': { src: '/illustrations/bg-meadow.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'bg-pond': { src: '/illustrations/bg-pond.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'bg-path': { src: '/illustrations/bg-path.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'bg-den': { src: '/illustrations/bg-den.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'bg-hollow': { src: '/illustrations/bg-hollow.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'fallback-scene': { src: '/illustrations/fallback-scene.svg', className: 'absolute inset-0 h-full w-full object-cover' },
  'fallback-goodnight-scene': { src: '/illustrations/fallback-goodnight-scene.svg', className: 'absolute inset-0 h-full w-full object-cover' },
};

const characters: Record<CharacterId, AssetSpec> = {
  'char-owl': { src: '/illustrations/char-owl.svg', className: 'absolute bottom-[14%] left-1/2 w-[36%] max-w-[180px] -translate-x-1/2' },
  'char-fox': { src: '/illustrations/char-fox.svg', className: 'absolute bottom-[10%] left-1/2 w-[42%] max-w-[210px] -translate-x-1/2' },
  'char-rabbit': { src: '/illustrations/char-rabbit.svg', className: 'absolute bottom-[10%] left-1/2 w-[36%] max-w-[180px] -translate-x-1/2' },
  'char-bear': { src: '/illustrations/char-bear.svg', className: 'absolute bottom-[8%] left-1/2 w-[44%] max-w-[220px] -translate-x-1/2' },
  'char-deer': { src: '/illustrations/char-deer.svg', className: 'absolute bottom-[8%] left-1/2 w-[42%] max-w-[210px] -translate-x-1/2' },
  'char-hedgehog': { src: '/illustrations/char-hedgehog.svg', className: 'absolute bottom-[10%] left-1/2 w-[34%] max-w-[170px] -translate-x-1/2' },
  'char-fox-sleeping': { src: '/illustrations/char-fox-sleeping.svg', className: 'absolute bottom-[12%] left-1/2 w-[48%] max-w-[240px] -translate-x-1/2' },
  'char-rabbit-sleeping': { src: '/illustrations/char-rabbit-sleeping.svg', className: 'absolute bottom-[12%] left-1/2 w-[44%] max-w-[220px] -translate-x-1/2' },
  'char-bear-walking': { src: '/illustrations/char-bear-walking.svg', className: 'absolute bottom-[8%] left-1/2 w-[48%] max-w-[240px] -translate-x-1/2' },
  'char-deer-looking-up': { src: '/illustrations/char-deer-looking-up.svg', className: 'absolute bottom-[8%] left-1/2 w-[44%] max-w-[220px] -translate-x-1/2' },
};

const details: Record<DetailId, AssetSpec> = {
  'detail-moon': { src: '/illustrations/detail-moon.svg', className: 'absolute top-[6%] right-[10%] w-[18%] max-w-[100px]' },
  'detail-star': { src: '/illustrations/detail-star.svg', className: 'absolute top-[12%] left-[14%] w-[7%] max-w-[36px]' },
  'detail-stars-cluster': { src: '/illustrations/detail-stars-cluster.svg', className: 'absolute top-[10%] left-[8%] w-[16%] max-w-[72px]' },
  'detail-cloud': { src: '/illustrations/detail-cloud.svg', className: 'absolute top-[14%] left-[8%] w-[22%] max-w-[100px]' },
  'detail-tree-pine': { src: '/illustrations/detail-tree-pine.svg', className: 'absolute bottom-[8%] right-[8%] w-[16%] max-w-[72px]' },
  'detail-tree-round': { src: '/illustrations/detail-tree-round.svg', className: 'absolute bottom-[8%] left-[6%] w-[18%] max-w-[84px]' },
  'detail-flower': { src: '/illustrations/detail-flower.svg', className: 'absolute bottom-[10%] left-[16%] w-[10%] max-w-[44px]' },
  'detail-mushroom': { src: '/illustrations/detail-mushroom.svg', className: 'absolute bottom-[11%] right-[16%] w-[8%] max-w-[34px]' },
  'detail-reeds': { src: '/illustrations/detail-reeds.svg', className: 'absolute bottom-[13%] left-[8%] w-[14%] max-w-[56px]' },
  'detail-lily-pad': { src: '/illustrations/detail-lily-pad.svg', className: 'absolute bottom-[17%] right-[20%] w-[11%] max-w-[44px]' },
  'detail-nest': { src: '/illustrations/detail-nest.svg', className: 'absolute bottom-[10%] left-1/2 w-[28%] max-w-[120px] -translate-x-1/2' },
  'detail-zzz': { src: '/illustrations/detail-zzz.svg', className: 'absolute top-[22%] right-[26%] w-[12%] max-w-[54px]' },
  'detail-branch': { src: '/illustrations/detail-branch.svg', className: 'absolute top-[28%] left-1/2 w-[30%] max-w-[140px] -translate-x-1/2' },
  'detail-bush': { src: '/illustrations/detail-bush.svg', className: 'absolute bottom-[10%] left-[10%] w-[16%] max-w-[70px]' },
  'detail-log': { src: '/illustrations/detail-log.svg', className: 'absolute bottom-[12%] right-[12%] w-[16%] max-w-[70px]' },
  'detail-fireflies': { src: '/illustrations/detail-fireflies.svg', className: 'absolute inset-x-[16%] top-[12%] w-[20%] max-w-[90px]' },
};

function tokenize(page: StoryPage): string {
  return `${page.illustration} ${page.illustrationDescription} ${page.text}`.toLowerCase();
}

function hasAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function pickBackground(text: string, isGoodnight: boolean): BackgroundId {
  if (isGoodnight) return 'fallback-goodnight-scene';
  if (hasAny(text, ['hollow', 'tree hollow', 'nook'])) return 'bg-hollow';
  if (hasAny(text, ['den', 'burrow', 'nest', 'home'])) return 'bg-den';
  if (hasAny(text, ['pond', 'water', 'stream', 'lake'])) return 'bg-pond';
  if (hasAny(text, ['path', 'trail', 'walk', 'wander', 'journey'])) return 'bg-path';
  if (hasAny(text, ['meadow', 'field', 'grass', 'flower', 'clearing'])) return 'bg-meadow';
  if (hasAny(text, ['forest', 'woodland', 'woods', 'trees'])) return 'bg-forest';
  return 'fallback-scene';
}

function pickCharacter(text: string, background: BackgroundId): CharacterId | null {
  if (hasAny(text, ['fox'])) {
    return hasAny(text, ['sleep', 'slept', 'sleepy', 'goodnight', 'curled', 'curls', 'rest'])
      ? 'char-fox-sleeping'
      : 'char-fox';
  }

  if (hasAny(text, ['rabbit', 'bunny', 'hare'])) {
    return hasAny(text, ['sleep', 'slept', 'sleepy', 'goodnight', 'tucked', 'rest'])
      ? 'char-rabbit-sleeping'
      : 'char-rabbit';
  }

  if (hasAny(text, ['bear', 'cub'])) {
    return hasAny(text, ['path', 'trail', 'walk', 'wander', 'journey'])
      ? 'char-bear-walking'
      : 'char-bear';
  }

  if (hasAny(text, ['deer', 'fawn', 'doe'])) {
    return hasAny(text, ['moon', 'star', 'sky', 'looked up', 'looking up'])
      ? 'char-deer-looking-up'
      : 'char-deer';
  }

  if (hasAny(text, ['hedgehog'])) return 'char-hedgehog';
  if (hasAny(text, ['owl', 'bird'])) return 'char-owl';
  if (background === 'bg-hollow') return 'char-owl';
  return null;
}

function detail(id: DetailId, className?: string): IllustrationLayer {
  const asset = details[id];
  return { src: asset.src, className: className ?? asset.className };
}

function character(id: CharacterId, className?: string): IllustrationLayer {
  const asset = characters[id];
  return { src: asset.src, className: className ?? asset.className };
}

function background(id: BackgroundId): IllustrationLayer {
  const asset = backgrounds[id];
  return { src: asset.src, className: asset.className };
}

function baseSkyDetails(backgroundId: BackgroundId, text: string): IllustrationLayer[] {
  const layers: IllustrationLayer[] = [];

  if (backgroundId !== 'bg-den' && backgroundId !== 'bg-hollow') {
    layers.push(detail('detail-moon'));
  }

  if (hasAny(text, ['cloud'])) {
    layers.push(detail('detail-cloud'));
  }

  layers.push(detail('detail-stars-cluster'));

  if (hasAny(text, ['night', 'star', 'moon', 'sky', 'twinkle'])) {
    layers.push(detail('detail-star', 'absolute top-[18%] right-[26%] w-[7%] max-w-[34px]'));
    layers.push(detail('detail-star', 'absolute top-[8%] left-[28%] w-[6%] max-w-[28px]'));
  }

  return layers;
}

export function getStoryIllustrationRecipe(page: StoryPage): StoryIllustrationRecipe {
  const text = tokenize(page);
  const backgroundId = pickBackground(text, !!page.isGoodnight);
  const characterId = pickCharacter(text, backgroundId);

  if (backgroundId === 'fallback-goodnight-scene') {
    const layers: IllustrationLayer[] = [];
    if (characterId) {
      const sleepingCharacter = characterId === 'char-rabbit' ? 'char-rabbit-sleeping' : characterId === 'char-fox' ? 'char-fox-sleeping' : characterId;
      layers.push(character(sleepingCharacter));
      layers.push(detail('detail-zzz'));
    }

    return {
      background: background(backgroundId),
      layers,
    };
  }

  const layers = [...baseSkyDetails(backgroundId, text)];

  switch (backgroundId) {
    case 'bg-forest':
      layers.push(detail('detail-tree-round'));
      layers.push(detail('detail-tree-pine'));
      layers.push(detail('detail-bush'));
      layers.push(detail('detail-mushroom'));
      if (hasAny(text, ['flower'])) layers.push(detail('detail-flower'));
      if (hasAny(text, ['fireflies'])) layers.push(detail('detail-fireflies'));
      break;
    case 'bg-meadow':
      layers.push(detail('detail-flower'));
      layers.push(detail('detail-flower', 'absolute bottom-[10%] right-[18%] w-[10%] max-w-[44px]'));
      if (hasAny(text, ['deer', 'rabbit'])) {
        layers.push(detail('detail-cloud'));
      }
      break;
    case 'bg-pond':
      layers.push(detail('detail-reeds'));
      layers.push(detail('detail-reeds', 'absolute bottom-[13%] right-[8%] w-[14%] max-w-[56px] scale-x-[-1]'));
      layers.push(detail('detail-lily-pad'));
      if (hasAny(text, ['flower'])) {
        layers.push(detail('detail-lily-pad', 'absolute bottom-[22%] left-[24%] w-[9%] max-w-[36px]'));
      }
      break;
    case 'bg-path':
      layers.push(detail('detail-tree-round'));
      layers.push(detail('detail-tree-pine'));
      layers.push(detail('detail-log'));
      break;
    case 'bg-den':
      layers.push(detail('detail-flower'));
      layers.push(detail('detail-star', 'absolute top-[16%] left-[24%] w-[7%] max-w-[34px]'));
      break;
    case 'bg-hollow':
      layers.push(detail('detail-branch'));
      layers.push(detail('detail-star', 'absolute top-[14%] left-[18%] w-[7%] max-w-[34px]'));
      break;
    default:
      break;
  }

  if (characterId) {
    let characterClassName: string | undefined;

    if (backgroundId === 'bg-hollow') {
      characterClassName = 'absolute bottom-[16%] left-1/2 w-[34%] max-w-[168px] -translate-x-1/2';
    }

    if (backgroundId === 'bg-den' && hasAny(text, ['fox'])) {
      characterClassName = 'absolute bottom-[12%] left-1/2 w-[44%] max-w-[220px] -translate-x-1/2';
    }

    layers.push(character(characterId, characterClassName));

    if (characterId === 'char-rabbit-sleeping' || characterId === 'char-fox-sleeping') {
      layers.push(detail('detail-zzz'));
    }
  }

  if (backgroundId !== 'bg-pond' && hasAny(text, ['nest', 'sleep', 'goodnight']) && !characterId?.includes('sleeping')) {
    layers.push(detail('detail-nest'));
  }

  return {
    background: background(backgroundId),
    layers,
  };
}
