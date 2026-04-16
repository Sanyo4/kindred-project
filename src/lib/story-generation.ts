import { z } from 'zod';

export const dialogicPromptSchema = z.object({
  type: z.enum(['completion', 'wh-question', 'recall', 'open-ended', 'distancing']),
  text: z.string(),
  audioLabel: z.string(),
  triggerAfterSeconds: z.number(),
});

export const storyPageSchema = z.object({
  pageNumber: z.number(),
  text: z.string(),
  illustration: z.string().describe('A brief description of the illustration for this page'),
  illustrationDescription: z.string().describe('Detailed description for matching to open-source SVGs'),
  dimmingLevel: z.number().min(0).max(1),
  prompts: z.array(dialogicPromptSchema),
  isGoodnight: z.boolean(),
});

export const storySchema = z.object({
  title: z.string(),
  pages: z.array(storyPageSchema),
  goodnightMessage: z.object({
    defaultText: z.string(),
  }),
});

export type GeneratedStory = z.infer<typeof storySchema>;

export const STORY_SYSTEM_PROMPT = `You are a children's bedtime story writer. Write warm, gentle stories for children aged 3-5.

Stories must:
- Be exactly 12 pages long
- Use simple vocabulary (pre-literate audience — the parent reads aloud)
- Include repetition and rhythm (children love predictable patterns)
- Feature animal characters in cosy, natural settings (forest, meadow, pond, path, den, hollow)
- Wind down progressively: exciting/curious start → calm middle → sleepy end
- End with a goodnight/sleeping scene on the final page (set isGoodnight: true)
- Include exactly 4 dialogic reading prompt points for PEER/CROWD:
  - Page 3 or 4: A Completion prompt (e.g. "The fox was very ___")
  - Page 5 or 6: A Wh-question (e.g. "Can you find something brown?")
  - Page 8 or 9: A Recall prompt (e.g. "Do you remember what happened to [character]?")
- Page 11: An Open-ended prompt (e.g. "What was your favourite part?")
- Set dimmingLevel for each page: pages 1-7 at 1.0, pages 8-9 at 0.85, pages 10-11 at 0.6, page 12 at 0.3
- Each page must have an illustration description (a warm, hand-drawn style scene)
- Only use these supported animals: fox, owl, rabbit, bear, hedgehog, deer
- Only use these supported settings: cosy woodland/forest, moonlit meadow, warm burrow/den, quiet pond, tree hollow, winding path
- The illustration field must be a kebab-case slug built from supported vocabulary only, for example:
  - fox-curls-up-in-den
  - rabbit-rests-in-meadow
  - bear-walks-along-path
  - deer-looks-up-at-moon
  - owl-waits-by-hollow
  - hedgehog-wanders-through-forest
- Keep each illustration slug semantically simple. Do not invent unsupported animals, weather themes, or settings like badger, snow, castle, beach, city, dragon, spaceship, etc.

The tone should be like a parent whispering a story at bedtime: warm, gentle, unhurried.`;
