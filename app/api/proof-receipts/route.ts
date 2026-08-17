import { NextResponse } from 'next/server';

import { requireParticipant } from '@/lib/participant/current';
import { loadCurrentComparison } from '@/lib/proof/load-current-comparison';
import { createFallbackSummary } from '@/lib/proof/fallback-summary';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    const participant = await requireParticipant();
    const supabase = getSupabaseAdmin();

    // Fetch scans for photos
    const { data: scans } = await supabase
      .from('scans')
      .select('scan_type, image_data, captured_at')
      .eq('participant_trial_id', participant.id)
      .eq('status', 'success');

    const baselinePhoto = scans?.find((s) => s.scan_type === 'baseline')?.image_data || '/day1_real.jpg';
    const followupPhoto = scans?.find((s) => s.scan_type === 'followup')?.image_data || '/day21_real.jpg';

    // 1. Check if proof_reviews exists
    const { data: review } = await supabase
      .from('proof_reviews')
      .select('*')
      .eq('participant_trial_id', participant.id)
      .single();

    if (review) {
      return NextResponse.json({
        ok: true,
        receipt: {
          ...review,
          trial: participant.trial,
          baseline_photo: baselinePhoto,
          followup_photo: followupPhoto,
        },
      });
    }

    // 2. Otherwise load comparison and return proof_receipts
    const { comparison } = await loadCurrentComparison();
    const { data: receipt } = await supabase
      .from('proof_receipts')
      .select('*')
      .eq('participant_trial_id', participant.id)
      .single();

    return NextResponse.json({
      ok: true,
      receipt: {
        ...(receipt ?? {}),
        metric_summary: comparison,
        trial: participant.trial,
        rating: 5,
        would_buy_again: true,
        baseline_photo: baselinePhoto,
        followup_photo: followupPhoto,
      },
    });
  } catch (error) {
    console.error('Get proof receipt error:', error);
    return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
  }
}

export async function POST() {
  try {
    const { participant, comparison } = await loadCurrentComparison();
    const narrative = createFallbackSummary(comparison);
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('proof_receipts')
      .upsert(
        {
          participant_trial_id: participant.id,
          metric_summary: comparison,
          narrative,
        },
        { onConflict: 'participant_trial_id' },
      )
      .select('id')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Could not create receipt' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, receiptId: data.id });
  } catch {
    return NextResponse.json({ error: 'Comparison is not ready' }, { status: 409 });
  }
}
