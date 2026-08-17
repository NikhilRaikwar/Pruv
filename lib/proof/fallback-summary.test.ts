import { describe, expect, it } from 'vitest';

import { createFallbackSummary } from './fallback-summary';

describe('createFallbackSummary', () => {
  it('summarizes without causal language', () => {
    const summary = createFallbackSummary([
      {
        concern: 'redness',
        baselineRaw: 71.2,
        followupRaw: 79.8,
        rawDelta: 8.6,
        baselineUi: 77,
        followupUi: 82,
        uiDelta: 5,
      },
    ]);

    expect(summary.summary).toContain('observed YouCam UI score change');
    expect(summary.summary).not.toMatch(/caused|cured|diagnosed/i);
  });
});
