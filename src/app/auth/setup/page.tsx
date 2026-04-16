'use client';

import { useState } from 'react';
import { setupFamily } from './actions';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSetup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await setupFamily(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="text-6xl">🦉</div>
          <h1 className="text-2xl font-semibold text-muted-gold">
            Welcome to Kindred
          </h1>
          <p className="text-warm-grey">Let's set up your family</p>
        </div>

        <form onSubmit={handleSetup} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm text-warm-grey mb-1">
              Your name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              placeholder="Sarah"
              className="w-full px-4 py-3 rounded-lg bg-deep-blue border border-soft-blue/30 text-muted-gold placeholder:text-warm-grey/50 focus:outline-none focus:border-soft-blue"
            />
          </div>

          <div>
            <label htmlFor="familyName" className="block text-sm text-warm-grey mb-1">
              Family name
            </label>
            <input
              id="familyName"
              name="familyName"
              type="text"
              required
              placeholder="The Chen Family"
              className="w-full px-4 py-3 rounded-lg bg-deep-blue border border-soft-blue/30 text-muted-gold placeholder:text-warm-grey/50 focus:outline-none focus:border-soft-blue"
            />
          </div>

          {error && <p className="text-amber-glow text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-soft-blue text-bg-dark font-medium hover:bg-soft-blue/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Setting up...' : 'Create family'}
          </button>
        </form>
      </div>
    </div>
  );
}
