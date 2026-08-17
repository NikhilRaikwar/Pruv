import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createParticipantToken, hashParticipantToken, PARTICIPANT_COOKIE } from '@/lib/security/participant-token';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const bodySchema = z.object({
  trialSlug: z.string().min(1).max(120),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Consent is required' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data: trial, error: trialError } = await supabase
    .from('trials')
    .select('id, slug, trial_days')
    .eq('slug', parsed.data.trialSlug)
    .single();

  if (trialError || !trial) return NextResponse.json({ error: 'ProofLink not found' }, { status: 404 });

  const token = createParticipantToken();
  const now = new Date();
  const followupDue = new Date(now.getTime() + trial.trial_days * 24 * 60 * 60 * 1000);
  const { data: participant, error: insertError } = await supabase
    .from('participant_trials')
    .insert({
      trial_id: trial.id,
      access_token_hash: hashParticipantToken(token),
      consented_at: now.toISOString(),
      followup_due_at: followupDue.toISOString(),
    })
    .select('id')
    .single();

  if (insertError || !participant) return NextResponse.json({ error: 'Could not start proof' }, { status: 500 });

  const cookieStore = await cookies();
  cookieStore.set(PARTICIPANT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 90,
  });

  return NextResponse.json({ ok: true, participantId: participant.id, next: `/p/${trial.slug}/scan?type=baseline` });
}
