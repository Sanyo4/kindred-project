import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('family_id')
      .eq('id', user.id)
      .single();

    if (profile?.family_id) {
      redirect('/parent');
    } else {
      redirect('/auth/setup');
    }
  }

  redirect('/auth/login');
}
