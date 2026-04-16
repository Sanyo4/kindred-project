import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ParentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, families(*)')
    .eq('id', user.id)
    .single();

  if (!profile?.family_id) redirect('/auth/setup');

  const family = profile.families as { id: string; name: string; family_code: string };

  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('family_id', profile.family_id)
    .order('created_at', { ascending: false });

  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('family_id', profile.family_id)
    .order('started_at', { ascending: false })
    .limit(10);

  const { data: devices } = await supabase
    .from('child_devices')
    .select('*')
    .eq('family_id', profile.family_id);

  return (
    <div className="max-w-lg mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-muted-gold">{family.name}</h1>
          <p className="text-warm-grey text-sm">Welcome, {profile.display_name}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-warm-grey">Family Code</p>
          <p className="text-lg font-mono text-muted-gold tracking-wider">{family.family_code}</p>
        </div>
      </div>

      {/* Paired devices */}
      {devices && devices.length > 0 && (
        <div className="bg-deep-blue/50 rounded-xl p-4">
          <h2 className="text-sm text-warm-grey mb-2">Paired Devices</h2>
          {devices.map((d: { id: string; child_name: string; device_name: string }) => (
            <p key={d.id} className="text-muted-gold">
              {d.child_name}&apos;s {d.device_name}
            </p>
          ))}
        </div>
      )}

      {/* Stories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-muted-gold">Stories</h2>
          <Link
            href="/parent/stories/generate"
            className="px-4 py-2 rounded-lg bg-soft-blue text-bg-dark text-sm font-medium hover:bg-soft-blue/90 transition-colors"
          >
            + New Story
          </Link>
        </div>

        {stories && stories.length > 0 ? (
          <div className="space-y-2">
            {stories.map((s: { id: string; title: string; page_count: number; created_at: string }) => (
              <div
                key={s.id}
                className="bg-deep-blue/50 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-muted-gold font-medium">{s.title}</p>
                  <p className="text-warm-grey text-xs">{s.page_count} pages</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/parent/record/${s.id}`}
                    className="px-3 py-1.5 rounded-lg border border-soft-blue/30 text-soft-blue text-xs hover:bg-soft-blue/10 transition-colors"
                  >
                    Record
                  </Link>
                  <Link
                    href={`/parent/read/${s.id}`}
                    className="px-3 py-1.5 rounded-lg bg-muted-gold/20 text-muted-gold text-xs hover:bg-muted-gold/30 transition-colors"
                  >
                    Read Live
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-warm-grey/60 text-sm">No stories yet. Generate your first one!</p>
        )}
      </div>

      {/* Recent sessions */}
      {sessions && sessions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg text-muted-gold">Recent Sessions</h2>
          <div className="space-y-2">
            {sessions.map((s: { id: string; mode: string; started_at: string; ended_at: string | null; is_complete: boolean }) => {
              const modeLabel = s.mode === 'SYNC' ? 'Live' : s.mode === 'ASYNC' ? 'Recorded' : s.mode === 'ASYNC_FALLBACK' ? 'Live (fell back)' : s.mode;
              const isEnded = s.is_complete || !!s.ended_at;
              const statusLabel = s.is_complete ? 'Complete' : s.ended_at ? 'Ended' : 'In progress';
              return (
                <div key={s.id} className="bg-deep-blue/50 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-warm-grey text-sm">
                      {new Date(s.started_at).toLocaleDateString()} — {modeLabel}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isEnded ? 'bg-soft-blue/20 text-soft-blue' : 'bg-amber-glow/20 text-amber-glow'}`}>
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sign out */}
      <form action="/auth/logout" method="POST">
        <button className="text-warm-grey/60 text-sm hover:text-warm-grey transition-colors">
          Sign out
        </button>
      </form>
    </div>
  );
}
