'use server';

import { randomUUID } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

function generateFamilyCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function setupFamily(formData: FormData) {
  const familyName = formData.get('familyName') as string;
  const displayName = formData.get('displayName') as string;

  if (!familyName || !displayName) {
    return { error: 'Family name and display name are required' };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  // Generate ID upfront so we don't need .select() after insert.
  // The SELECT policy on families requires the user's profile to already
  // reference the family, which hasn't happened yet at insert time.
  const familyId = randomUUID();

  const { error: familyError } = await supabase
    .from('families')
    .insert({
      id: familyId,
      name: familyName,
      family_code: generateFamilyCode(),
    });

  if (familyError) {
    return { error: familyError.message };
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      family_id: familyId,
      display_name: displayName,
    })
    .eq('id', user.id);

  if (profileError) {
    return { error: profileError.message };
  }

  redirect('/parent');
}
