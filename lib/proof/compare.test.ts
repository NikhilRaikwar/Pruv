import { describe, expect, it } from 'vitest';

import { compareMetrics } from './compare';

describe('compareMetrics', () => {
  it('calculates matching metric deltas', () => {
    const result = compareMetrics(
      [{ concern: 'redness', raw_score: 71.2, ui_score: 77 }],
      [{ concern: 'redness', raw_score: 79.8, ui_score: 82 }],
    );

    expect(result).toEqual([
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
  });
});
