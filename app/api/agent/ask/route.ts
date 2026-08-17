import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireParticipant } from '@/lib/participant/current';
import { askPruvAgent } from '@/lib/openrouter/ask-pruv-agent';

const schema = z.object({
  question: z.string().min(2).max(500),
});

export async function POST(request: Request) {
  await requireParticipant();
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid question' }, { status: 400 });

  try {
    const answer = await askPruvAgent(parsed.data.question);
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: 'Pruv Agent is unavailable.' }, { status: 503 });
  }
}
