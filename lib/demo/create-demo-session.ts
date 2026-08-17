import 'server-only';

import { createParticipantToken, hashParticipantToken } from '@/lib/security/participant-token';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const DEFAULT_DEMO_BASELINE_METRICS = [
  { concern: 'redness', raw_score: 71.2, ui_score: 71.2 },
  { concern: 'acne', raw_score: 84.5, ui_score: 84.5 },
  { concern: 'texture', raw_score: 79.1, ui_score: 79.1 },
  { concern: 'pore', raw_score: 82.0, ui_score: 82.0 },
  { concern: 'radiance', raw_score: 68.3, ui_score: 68.3 },
];

export async function createDemoSessionFromSeed() {
  const supabase = getSupabaseAdmin();
  const { data: trial, error: trialError } = await supabase
    .from('trials')
    .select('id, slug, trial_days')
    .eq('slug', 'niacinamide21')
    .single();

  if (trialError || !trial) {
    throw new Error('DEMO_TRIAL_MISSING');
  }

  const token = createParticipantToken();
  const now = new Date().toISOString();

  const { data: participant, error: participantError } = await supabase
    .from('participant_trials')
    .insert({
      trial_id: trial.id,
      access_token_hash: hashParticipantToken(token),
      consented_at: now,
      baseline_completed_at: now,
      followup_due_at: now,
      analysis_mode: 'hd',
    })
    .select('id')
    .single();

  if (participantError || !participant) {
    throw new Error('DEMO_PARTICIPANT_CREATE_FAILED');
  }

  const { data: scan, error: scanError } = await supabase
    .from('scans')
    .insert({
      participant_trial_id: participant.id,
      scan_type: 'baseline',
      status: 'success',
      analysis_mode: 'hd',
      youcam_api_version: 'v2.1',
      camera_kit_used: false,
      completed_at: now,
    })
    .select('id')
    .single();

  if (scanError || !scan) {
    throw new Error('DEMO_SCAN_CREATE_FAILED');
  }

  const { error: metricsError } = await supabase.from('scan_metrics').insert(
    DEFAULT_DEMO_BASELINE_METRICS.map((metric) => ({
      scan_id: scan.id,
      concern: metric.concern,
      raw_score: metric.raw_score,
      ui_score: metric.ui_score,
      vendor_concern: `hd_${metric.concern}`,
    })),
  );

  if (metricsError) {
    throw new Error('DEMO_METRICS_COPY_FAILED');
  }

  return {
    token,
    trialSlug: trial.slug,
    participantId: participant.id,
  };
}
