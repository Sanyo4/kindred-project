'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function JoinPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [childName, setChildName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    const { data: family, error: lookupError } = await supabase
      .from('families')
      .select('id')
      .eq('family_code', code)
      .single();

    if (lookupError || !family) {
      setError('Family code not found. Check the code and try again.');
      setLoading(false);
      return;
    }

    const { data: device, error: deviceError } = await supabase
      .from('child_devices')
      .insert({
        family_id: family.id,
        child_name: childName,
      })
      .select()
      .single();

    if (deviceError) {
      setError(deviceError.message);
      setLoading(false);
      return;
    }

    localStorage.setItem('kindred_device_id', device.id);
    localStorage.setItem('kindred_family_id', family.id);
    localStorage.setItem('kindred_child_name', childName);

    router.push('/child');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="text-6xl">🦉</div>
          <h1 className="text-2xl font-semibold text-muted-gold">
            Join a family
          </h1>
          <p className="text-warm-grey">Enter the code from a parent's device</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label htmlFor="childName" className="block text-sm text-warm-grey mb-1">
              Child's name
            </label>
            <input
              id="childName"
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              required
              placeholder="Lily"
              className="w-full px-4 py-3 rounded-lg bg-deep-blue border border-soft-blue/30 text-muted-gold placeholder:text-warm-grey/50 focus:outline-none focus:border-soft-blue"
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm text-warm-grey mb-1">
              Family code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              maxLength={6}
              placeholder="123456"
              inputMode="numeric"
              className="w-full px-4 py-3 rounded-lg bg-deep-blue border border-soft-blue/30 text-muted-gold text-center text-2xl tracking-[0.5em] placeholder:text-warm-grey/50 placeholder:tracking-[0.5em] focus:outline-none focus:border-soft-blue"
            />
          </div>

          {error && <p className="text-amber-glow text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full py-3 rounded-lg bg-soft-blue text-bg-dark font-medium hover:bg-soft-blue/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Joining...' : 'Join family'}
          </button>
        </form>
      </div>
    </div>
  );
}
