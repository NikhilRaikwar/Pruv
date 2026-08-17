import 'server-only';

import { requireParticipant } from '@/lib/participant/current';
import { getSupabaseAdmin } from '@/lib/supabase/server';

import { compareMetrics } from './compare';

export async function loadCurrentComparison() {
  const participant = await requireParticipant();
  const supabase = getSupabaseAdmin();
  const { data: scans, error } = await supabase
    .from('scans')
    .select('id, scan_type, completed_at, scan_metrics (concern, raw_score, ui_score)')
    .eq('participant_trial_id', participant.id)
    .eq('status', 'success');

  if (error || !scans) {
    throw new Error('SCANS_NOT_FOUND');
  }

  const baseline = scans.find((scan) => scan.scan_type === 'baseline');
  const followup = scans.find((scan) => scan.scan_type === 'followup');

  if (!baseline || !followup) {
    throw new Error('COMPARISON_NOT_READY');
  }

  return {
    participant,
    baseline,
    followup,
    comparison: compareMetrics(baseline.scan_metrics ?? [], followup.scan_metrics ?? []),
  };
}
