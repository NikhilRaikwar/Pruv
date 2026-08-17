import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

import { requireParticipant } from '@/lib/participant/current';
import { loadCurrentComparison } from '@/lib/proof/load-current-comparison';
import { createFallbackSummary } from '@/lib/proof/fallback-summary';
import { getSupabaseAdmin } from '@/lib/supabase/server';

function createPublicSlug() {
  return crypto.randomBytes(12).toString('base64url');
}

export async function POST(request: Request) {
  try {
    const participant = await requireParticipant();
    const supabase = getSupabaseAdmin();
    const body = await request.json().catch(() => ({}));
    const regenerateSlug = Boolean(body?.regenerateSlug);

    // 1. Check for existing proof_reviews
    const { data: existingReview } = await supabase
      .from('proof_reviews')
      .select('id, public_slug, is_public')
      .eq('participant_trial_id', participant.id)
      .single();

    const now = new Date().toISOString();

    if (existingReview) {
      // If regenerate requested, create new slug, otherwise keep existing
      const publicSlug = (regenerateSlug || !existingReview.public_slug) 
        ? createPublicSlug() 
        : existingReview.public_slug;

      const { error: updateError } = await supabase
        .from('proof_reviews')
        .update({
          public_slug: publicSlug,
          is_public: true,
          published_at: now,
        })
        .eq('id', existingReview.id);

      if (updateError) {
        return NextResponse.json({ error: 'Could not update ProofLink' }, { status: 500 });
      }

      return NextResponse.json({
        ok: true,
        publicSlug,
        publicUrl: `/proof/${publicSlug}`,
        message: regenerateSlug ? 'New ProofLink generated' : 'ProofLink updated',
      });
    }

    // 2. If review record not created yet, create from comparison
    const { comparison } = await loadCurrentComparison();
    const publicSlug = createPublicSlug();
    const narrative = createFallbackSummary(comparison);

    const { data: newReview, error: insertError } = await supabase
      .from('proof_reviews')
      .insert({
        participant_trial_id: participant.id,
        rating: 5,
        would_buy_again: true,
        review_text: narrative,
        metric_summary: comparison,
        public_slug: publicSlug,
        is_public: true,
        published_at: now,
      })
      .select('id')
      .single();

    if (insertError || !newReview) {
      return NextResponse.json({ error: 'Could not generate ProofLink' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      publicSlug,
      publicUrl: `/proof/${publicSlug}`,
      message: 'ProofLink created',
    });
  } catch (error) {
    console.error('Publish error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not publish Proof Review' },
      { status: 500 },
    );
  }
}
