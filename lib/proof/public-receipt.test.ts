import { describe, expect, it } from 'vitest';

import { projectPublicReceipt } from './public-receipt';

describe('projectPublicReceipt', () => {
  it('omits private fields from the public projection', () => {
    const projected = projectPublicReceipt({
      public_slug: 'public',
      metric_summary: [{ concern: 'redness', uiDelta: 5 }],
      narrative: null,
      created_at: '2026-08-16T00:00:00.000Z',
      published_at: '2026-08-16T00:00:00.000Z',
      participant_trial: {
        trial: {
          title: 'Trial',
          product_name: 'Serum',
          trial_days: 21,
        },
      },
    });

    expect(JSON.stringify(projected)).not.toMatch(/token|task|image|participant/i);
  });
});
