import 'server-only';

import { z } from 'zod';

import { env } from '@/lib/env';
import type { MetricComparison } from '@/lib/proof/compare';
import { createFallbackSummary } from '@/lib/proof/fallback-summary';

const narratorSchema = z.object({
  headline: z.string(),
  summary: z.string(),
});

export async function narrateProof(metrics: MetricComparison[]) {
  const fallback = createFallbackSummary(metrics);

  if (env.OPENROUTER_ENABLED !== 'true' || !env.OPENROUTER_API_KEY) {
    return fallback;
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': env.NEXT_PUBLIC_APP_URL,
        'X-OpenRouter-Title': 'Pruv',
      },
      body: JSON.stringify({
        model: env.OPENROUTER_MODEL,
        provider: { require_parameters: true },
        messages: [
          {
            role: 'system',
            content:
              'Explain numeric YouCam Skin AI skincare-trial measurements. Do not diagnose, claim causation, claim clinical proof, or recommend medical treatment. Return concise JSON only.',
          },
          {
            role: 'user',
            content: JSON.stringify({ metrics }),
          },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'pruv_proof_summary',
            strict: true,
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                headline: { type: 'string' },
                summary: { type: 'string' },
              },
              required: ['headline', 'summary'],
            },
          },
        },
      }),
    });

    if (!response.ok) return fallback;
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return fallback;
    return narratorSchema.parse(JSON.parse(content));
  } catch {
    return fallback;
  }
}
