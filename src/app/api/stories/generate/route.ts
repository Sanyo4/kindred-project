import { generateText, Output } from 'ai';
import { groq } from '@ai-sdk/groq';
import { createClient } from '@/lib/supabase/server';
import { storySchema, STORY_SYSTEM_PROMPT } from '@/lib/story-generation';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('family_id')
    .eq('id', user.id)
    .single();

  if (!profile?.family_id) {
    return Response.json({ error: 'No family found' }, { status: 400 });
  }

  const body = await request.json();
  const { animal, setting, childName } = body;

  let story;
  try {
    const result = await generateText({
      model: groq('openai/gpt-oss-20b'),
      output: Output.object({ schema: storySchema }),
      system: STORY_SYSTEM_PROMPT,
      prompt: `Generate a bedtime story featuring a ${animal || 'small fox'} in a ${setting || 'cosy woodland'}. The child listening is called ${childName || 'little one'}.`,
    });
    story = result.output;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Story generation error:', message);
    return Response.json({ error: `Story generation failed: ${message}` }, { status: 500 });
  }

  if (!story) {
    return Response.json({ error: 'Story generation failed' }, { status: 500 });
  }

  const { data: savedStory, error } = await supabase
    .from('stories')
    .insert({
      family_id: profile.family_id,
      title: story.title,
      page_count: story.pages.length,
      pages: story.pages,
      goodnight_message: story.goodnightMessage,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(savedStory);
}
