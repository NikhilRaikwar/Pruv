-- Final Schema Migration for 100% Reproducibility
-- Ensures all required columns and tables exist cleanly regardless of previous migration execution state.

-- 1. Ensure participant_trials columns
ALTER TABLE public.participant_trials
  ADD COLUMN IF NOT EXISTS analysis_mode TEXT DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS analysis_config JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS baseline_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_completed_at TIMESTAMPTZ;

-- 2. Ensure scans columns
ALTER TABLE public.scans
  ADD COLUMN IF NOT EXISTS analysis_mode TEXT DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS youcam_file_id TEXT;

-- 3. Ensure scan_metrics columns
ALTER TABLE public.scan_metrics
  ADD COLUMN IF NOT EXISTS vendor_concern TEXT;

-- 4. Ensure proof_reviews table exists with all required fields
CREATE TABLE IF NOT EXISTS public.proof_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_trial_id UUID NOT NULL REFERENCES public.participant_trials(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  would_buy_again BOOLEAN,
  review_text TEXT,
  metric_summary JSONB NOT NULL DEFAULT '[]'::jsonb,
  public_slug TEXT UNIQUE,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  CONSTRAINT unique_participant_review UNIQUE (participant_trial_id)
);

-- Enable RLS on proof_reviews
ALTER TABLE public.proof_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published reviews
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'proof_reviews' AND policyname = 'Public can read published proof reviews'
  ) THEN
    CREATE POLICY "Public can read published proof reviews"
      ON public.proof_reviews
      FOR SELECT
      USING (is_public = true);
  END IF;
END $$;

-- Indexes for optimal lookup performance
CREATE INDEX IF NOT EXISTS idx_proof_reviews_public_slug ON public.proof_reviews(public_slug) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_scans_participant_type ON public.scans(participant_trial_id, scan_type);
