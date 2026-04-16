# Illustration Provenance and Licenses

This directory contains the SVG illustration assets used by the Kindred storybook renderer.

## Current Asset Source

The SVG files in this directory are **original assets generated for this project with AI assistance** and then selected, curated, and integrated into the application by the project author.

- Generation workflow: prompt-based SVG generation in Claude
- Role of AI: produce original raw SVG code from project-specific art direction
- Role of author: define style constraints, select outputs, curate the asset set, and integrate the assets into the application

These files are used by the story illustration system in:

- `src/lib/story-illustrations.ts`
- `src/components/story/story-illustration.tsx`

## Asset Set Included Here

### Backgrounds

- `bg-forest.svg`
- `bg-meadow.svg`
- `bg-pond.svg`
- `bg-path.svg`
- `bg-den.svg`
- `bg-hollow.svg`
- `fallback-scene.svg`
- `fallback-goodnight-scene.svg`

### Characters

- `char-owl.svg`
- `char-fox.svg`
- `char-rabbit.svg`
- `char-bear.svg`
- `char-deer.svg`
- `char-hedgehog.svg`
- `char-fox-sleeping.svg`
- `char-rabbit-sleeping.svg`
- `char-bear-walking.svg`
- `char-deer-looking-up.svg`

### Detail Overlays

- `detail-moon.svg`
- `detail-star.svg`
- `detail-stars-cluster.svg`
- `detail-cloud.svg`
- `detail-tree-pine.svg`
- `detail-tree-round.svg`
- `detail-flower.svg`
- `detail-mushroom.svg`
- `detail-reeds.svg`
- `detail-lily-pad.svg`
- `detail-nest.svg`
- `detail-zzz.svg`
- `detail-branch.svg`
- `detail-bush.svg`
- `detail-log.svg`
- `detail-fireflies.svg`

## Licensing Position

The illustration SVGs in this directory should be treated as **project assets created for this dissertation prototype**, rather than third-party stock illustrations copied directly from an external library.

No third-party stock SVG files are bundled in this directory.

## Lucide Usage Elsewhere in the App

The app still uses `lucide-react` in one place for the simple owl mascot glyph used in the UI animation system:

- `src/components/owl/owl-character.tsx`

Lucide details:

- Source: https://lucide.dev/
- Package: `lucide-react`
- License: ISC License

That Lucide usage is separate from the story illustration assets in this directory.

## Historical Note

Earlier versions of the prototype used Lucide icons as temporary story illustration placeholders.
That placeholder system has been replaced by the SVG asset set contained in this folder.
