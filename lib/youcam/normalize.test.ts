import { describe, expect, it } from 'vitest';

import { normalizeSkinAnalysisResponse } from './normalize';

describe('normalizeSkinAnalysisResponse', () => {
  it('normalizes supported HD skin metrics', () => {
    const result = normalizeSkinAnalysisResponse('task-123', {
      data: {
        task_status: 'success',
        results: {
          output: [
            {
              type: 'hd_redness',
              raw_score: 72.01,
              ui_score: 77,
              mask_urls: ['https://example.com/redness.png'],
            },
            {
              type: 'hd_texture',
              raw_score: 66.39,
              ui_score: 75,
              mask_urls: [],
            },
          ],
        },
      },
    });

    expect(result.metrics[0]).toMatchObject({
      concern: 'redness',
      rawScore: 72.01,
      uiScore: 77,
    });
    expect(result.metrics).toHaveLength(2);
  });
});
