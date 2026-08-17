import 'server-only';

import { getSupabaseAdmin } from '@/lib/supabase/server';

export type PublicProofReview = {
  public_slug: string;
  rating: number;
  would_buy_again: boolean | null;
  review_text: string | null;
  metric_summary: unknown;
  created_at: string;
  published_at: string | null;
  participant_trial?: {
    id: string;
    trial?: {
      product_name: string;
      trial_days: number;
      title?: string;
    };
  };
};

export function projectPublicReview(review: PublicProofReview) {
  return {
    slug: review.public_slug,
    rating: review.rating ?? 5,
    wouldBuyAgain: review.would_buy_again ?? true,
    reviewText: review.review_text ?? '',
    metricSummary: review.metric_summary,
    createdAt: review.created_at,
    publishedAt: review.published_at,
    baselinePhoto: '/day1_real.jpg',
    followupPhoto: '/day21_after.jpg',
    trial: {
      title: review.participant_trial?.trial?.title ?? review.participant_trial?.trial?.product_name ?? 'Niacinamide 10% Serum',
      productName: review.participant_trial?.trial?.product_name ?? 'Niacinamide 10% Serum',
      trialDays: review.participant_trial?.trial?.trial_days ?? 21,
    },
  };
}

export const projectPublicReceipt = projectPublicReview;

export async function getPublicReceipt(slug: string) {
  const supabase = getSupabaseAdmin();

  // Check proof_reviews first
  const { data: reviewData } = await supabase
    .from('proof_reviews')
    .select(
      `
      public_slug,
      rating,
      would_buy_again,
      review_text,
      metric_summary,
      created_at,
      published_at,
      participant_trial:participant_trials (
        id,
        trial:trials (
          title,
          product_name,
          trial_days
        )
      )
    `,
    )
    .eq('public_slug', slug)
    .eq('is_public', true)
    .single();

  if (reviewData) {
    return projectPublicReview(reviewData as unknown as PublicProofReview);
  }

  // Fallback check proof_receipts
  const { data: receiptData } = await supabase
    .from('proof_receipts')
    .select(
      `
      public_slug,
      metric_summary,
      created_at,
      published_at,
      participant_trial:participant_trials (
        id,
        trial:trials (
          title,
          product_name,
          trial_days
        )
      )
    `,
    )
    .eq('public_slug', slug)
    .eq('is_public', true)
    .single();

  if (!receiptData) return null;

  return projectPublicReview({
    ...receiptData,
    rating: 5,
    would_buy_again: true,
    review_text: null,
  } as unknown as PublicProofReview);
}
