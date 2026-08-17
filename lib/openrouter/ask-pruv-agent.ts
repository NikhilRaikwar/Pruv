import 'server-only';

import { z } from 'zod';

import { env } from '@/lib/env';
import { loadCurrentComparison } from '@/lib/proof/load-current-comparison';

export async function askPruvAgent(question: string) {
  const safeQuestion = z.string().min(2).max(500).parse(question);
  const { participant, comparison } = await loadCurrentComparison();

  const lower = safeQuestion.toLowerCase();
  if (/(cure|diagnos|rosacea|eczema|medication|medicine|prescription|disease|caused)/i.test(lower)) {
    return 'Pruv can show observed YouCam Skin AI score changes during this trial, but it cannot diagnose a condition, recommend treatment, or prove that a product caused a change.';
  }

  if (env.OPENROUTER_ENABLED !== 'true' || !env.OPENROUTER_API_KEY) {
    const top = [...comparison].sort((a, b) => Math.abs(b.uiDelta ?? 0) - Math.abs(a.uiDelta ?? 0))[0];
    return top
      ? `The largest observed score change was ${top.concern} (${top.uiDelta && top.uiDelta > 0 ? '+' : ''}${top.uiDelta?.toFixed(1)} UI points) during your ${participant.trial.trial_days}-day trial.`
      : 'Your proof has no comparable metrics yet.';
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': env.NEXT_PUBLIC_APP_URL,
      'X-OpenRouter-Title': 'Pruv Ask',
    },
    body: JSON.stringify({
      model: env.OPENROUTER_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are Pruv Proof Agent. Explain structured YouCam Skin AI comparison data. Never diagnose, claim causation, claim cure, or recommend medication. Use the provided metrics as source of truth. Keep answers 2-5 sentences.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            question: safeQuestion,
            trial: {
              product: participant.trial.product_name,
              durationDays: participant.trial.trial_days,
              targetConcerns: participant.trial.target_concerns,
            },
            comparison,
          }),
        },
      ],
    }),
  });

  if (!response.ok) throw new Error('OPENROUTER_UNAVAILABLE');
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content ?? 'Pruv Agent is unavailable.';
}
