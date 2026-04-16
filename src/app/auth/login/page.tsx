'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="text-6xl">🦉</div>
          <h1 className="text-2xl font-semibold text-muted-gold">
            Check your email
          </h1>
          <p className="text-warm-grey">
            We sent a magic link to <span className="text-muted-gold">{email}</span>.
            Click it to sign in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="text-6xl">🦉</div>
          <h1 className="text-3xl font-semibold text-muted-gold">Kindred</h1>
          <p className="text-warm-grey">Bedtime stories, together</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-warm-grey mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="sarah@example.com"
              className="w-full px-4 py-3 rounded-lg bg-deep-blue border border-soft-blue/30 text-muted-gold placeholder:text-warm-grey/50 focus:outline-none focus:border-soft-blue"
            />
          </div>

          {error && (
            <p className="text-amber-glow text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-soft-blue text-bg-dark font-medium hover:bg-soft-blue/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>

        <div className="text-center">
          <a href="/join" className="text-sm text-warm-grey hover:text-muted-gold transition-colors">
            Pairing a child's device? Enter family code
          </a>
        </div>
      </div>
    </div>
  );
}
