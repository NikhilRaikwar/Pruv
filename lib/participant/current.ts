import 'server-only';

import { cookies } from 'next/headers';

import { getSupabaseAdmin } from '@/lib/supabase/server';
import { hashParticipantToken, PARTICIPANT_COOKIE } from '@/lib/security/participant-token';

export type ParticipantRecord = {
  id: string;
  trial_id: string;
  consented_at: string | null;
  baseline_completed_at: string | null;
  followup_completed_at: string | null;
  followup_due_at: string | null;
  trial: {
    id: string;
    slug: string;
    title: string;
    product_name: string;
    trial_days: number;
    target_concerns: string[];
    is_demo: boolean;
  };
};

export async function requireParticipant(): Promise<ParticipantRecord> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PARTICIPANT_COOKIE)?.value;

  if (!token) {
    throw new Error('PARTICIPANT_REQUIRED');
  }

  const supabase = getSupabaseAdmin();
  const tokenHash = hashParticipantToken(token);
  const { data, error } = await supabase
    .from('participant_trials')
    .select(
      `
      id,
      trial_id,
      consented_at,
      baseline_completed_at,
      followup_completed_at,
      followup_due_at,
      trial:trials (
        id,
        slug,
        title,
        product_name,
        trial_days,
        target_concerns,
        is_demo
      )
    `,
    )
    .eq('access_token_hash', tokenHash)
    .single();

  if (error || !data) {
    throw new Error('PARTICIPANT_NOT_FOUND');
  }

  return data as unknown as ParticipantRecord;
}

export async function getTrialBySlug(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('trials')
    .select('id, slug, title, product_name, trial_days, target_concerns, is_demo')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}
