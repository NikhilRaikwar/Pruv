'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PrimaryButton, SecondaryLink } from './ui';

export function DemoStartButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startDemo() {
    setLoading(true);
    setError(null);
    const response = await fetch('/api/demo/start', { method: 'POST' });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error === 'DEMO_BASELINE_SEED_MISSING' ? 'Capture one real baseline first, then this demo button can clone it for judges.' : 'Could not start the demo session.');
      return;
    }

    router.push(data.next);
  }

  return (
    <div className="mt-7">
      <div className="flex flex-wrap gap-3">
        <PrimaryButton disabled={loading} onClick={startDemo}>{loading ? 'Starting demo...' : 'Start seeded demo'}</PrimaryButton>
        <SecondaryLink href="/p/niacinamide21/start">Capture seed baseline</SecondaryLink>
      </div>
      {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}
    </div>
  );
}
