import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireParticipant } from '@/lib/participant/current';
import { compareMetrics } from '@/lib/proof/compare';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  wouldBuyAgain: z.boolean().nullable(),
  reviewText: z.string().max(280).default(''),
});

export async function POST(request: Request) {
  try {
    const participant = await requireParticipant();
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid review data' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Verify baseline & followup completed
    const { data: scans } = await supabase
      .from('scans')
      .select('id, scan_type, status, scan_metrics (concern, raw_score, ui_score)')
      .eq('participant_trial_id', participant.id)
      .eq('status', 'success');

    const baselineScan = scans?.find((s) => s.scan_type === 'baseline');
    const followupScan = scans?.find((s) => s.scan_type === 'followup');

    if (!baselineScan || !followupScan) {
      return NextResponse.json(
        { error: 'Both baseline and follow-up scans are required before submitting a review.' },
        { status: 400 },
      );
    }

    const comparison = compareMetrics(
      baselineScan.scan_metrics ?? [],
      followupScan.scan_metrics ?? [],
    );

    // 2. Upsert into proof_reviews table
    const { data: review, error: reviewError } = await supabase
      .from('proof_reviews')
      .upsert(
        {
          participant_trial_id: participant.id,
          rating: parsed.data.rating,
          would_buy_again: parsed.data.wouldBuyAgain,
          review_text: parsed.data.reviewText,
          metric_summary: comparison,
        },
        { onConflict: 'participant_trial_id' },
      )
      .select('id')
      .single();

    if (reviewError || !review) {
      console.error('Error saving proof review:', reviewError);
      return NextResponse.json({ error: 'Could not save Proof Review' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      reviewId: review.id,
      next: `/p/${participant.trial.slug}/proof`,
    });
  } catch (error) {
    console.error('Submit review error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not submit review' },
      { status: 500 },
    );
  }
}
