-- Initialize Supabase Schema for Pruv

CREATE TABLE IF NOT EXISTS participant_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token_hash TEXT NOT NULL,
  trial_id TEXT NOT NULL,
  analysis_mode TEXT CHECK (analysis_mode IN ('hd', 'sd')),
  consented_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  baseline_completed_at TIMESTAMP WITH TIME ZONE,
  followup_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_trial_id UUID REFERENCES participant_trials(id) ON DELETE CASCADE,
  scan_type TEXT CHECK (scan_type IN ('baseline', 'followup')),
  analysis_mode TEXT CHECK (analysis_mode IN ('hd', 'sd')),
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  youcam_task_id TEXT,
  youcam_file_id TEXT,
  captured_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS scan_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
  concern TEXT NOT NULL,
  vendor_concern TEXT NOT NULL,
  raw_score NUMERIC NOT NULL,
  ui_score NUMERIC NOT NULL
);

-- RLS Policies
ALTER TABLE participant_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_metrics ENABLE ROW LEVEL SECURITY;

-- Since this is an anonymous app relying on backend proxy validation (via the http-only cookie containing the token),
-- we will use service_role key server-side to bypass RLS.
-- Therefore, we don't need complex policies for public client access.
