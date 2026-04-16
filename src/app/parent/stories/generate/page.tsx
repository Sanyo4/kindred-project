'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateStoryPage() {
  const router = useRouter();
  const [animal, setAnimal] = useState('');
  const [setting, setSetting] = useState('');
  const [childName, setChildName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/stories/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        animal: animal || 'fox',
        setting: setting || 'cosy woodland',
        childName: childName || 'little one',
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to generate story');
      setLoading(false);
      return;
    }

    const story = await res.json();
    router.push(`/parent?newStory=${story.id}`);
  }

  const animals = ['fox', 'owl', 'rabbit', 'bear', 'hedgehog', 'deer'];
  const settings = ['cosy woodland', 'moonlit meadow', 'warm burrow', 'quiet pond', 'tree hollow', 'winding path'];

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-muted-gold">Create a Story</h1>
        <p className="text-warm-grey text-sm">AI will write a bedtime story with reading prompts</p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm text-warm-grey mb-2">Pick an animal</label>
          <div className="grid grid-cols-3 gap-2">
            {animals.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAnimal(a)}
                aria-pressed={animal === a}
                className={`py-3 px-4 rounded-lg border-2 text-sm capitalize transition-all ${
                  animal === a
                    ? 'border-[var(--muted-gold)] bg-[var(--muted-gold)] text-[var(--soft-blue)] font-semibold ring-2 ring-[color:var(--muted-gold)]/40'
                    : 'border-[color:var(--soft-blue)]/30 text-[var(--warm-grey)] hover:border-[color:var(--soft-blue)]/50 hover:bg-[color:var(--soft-blue)]/10'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-warm-grey mb-2">Choose a setting</label>
          <div className="grid grid-cols-2 gap-2">
            {settings.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSetting(s)}
                aria-pressed={setting === s}
                className={`py-3 px-4 rounded-lg border-2 text-sm capitalize transition-all ${
                  setting === s
                    ? 'border-[var(--muted-gold)] bg-[var(--muted-gold)] text-[var(--soft-blue)] font-semibold ring-2 ring-[color:var(--muted-gold)]/40'
                    : 'border-[color:var(--soft-blue)]/30 text-[var(--warm-grey)] hover:border-[color:var(--soft-blue)]/50 hover:bg-[color:var(--soft-blue)]/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="childName" className="block text-sm text-warm-grey mb-1">
            Child&apos;s name (for the goodnight message)
          </label>
          <input
            id="childName"
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Lily"
            className="w-full px-4 py-3 rounded-lg bg-deep-blue border border-soft-blue/30 text-muted-gold placeholder:text-warm-grey/50 focus:outline-none focus:border-soft-blue"
          />
        </div>

        {error && <p className="text-amber-glow text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-lg bg-soft-blue text-bg-dark font-medium hover:bg-soft-blue/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Writing your story...' : 'Generate bedtime story'}
        </button>

        {loading && (
          <p className="text-warm-grey text-sm text-center animate-pulse">
            Our storyteller owl is writing... this takes about 10 seconds
          </p>
        )}
      </form>
    </div>
  );
}
