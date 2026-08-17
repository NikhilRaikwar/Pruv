create extension if not exists pgcrypto;

create table if not exists public.trials (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  product_name text not null,
  trial_days integer not null check (trial_days > 0 and trial_days <= 365),
  target_concerns text[] not null default '{}',
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.participant_trials (
  id uuid primary key default gen_random_uuid(),
  trial_id uuid not null references public.trials(id) on delete cascade,
  access_token_hash text unique not null,
  consented_at timestamptz,
  baseline_completed_at timestamptz,
  followup_completed_at timestamptz,
  followup_due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists participant_trials_trial_id_idx on public.participant_trials(trial_id);

create table if not exists public.scans (
  id uuid primary key default gen_random_uuid(),
  participant_trial_id uuid not null references public.participant_trials(id) on delete cascade,
  scan_type text not null check (scan_type in ('baseline', 'followup')),
  status text not null default 'processing' check (status in ('processing', 'success', 'error')),
  youcam_task_id text,
  youcam_api_version text not null default 'v2.1',
  camera_kit_used boolean not null default false,
  error_code text,
  error_message text,
  captured_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (participant_trial_id, scan_type)
);

create index if not exists scans_participant_idx on public.scans(participant_trial_id);

create table if not exists public.scan_metrics (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid not null references public.scans(id) on delete cascade,
  concern text not null,
  raw_score double precision,
  ui_score double precision,
  subcategory jsonb,
  created_at timestamptz not null default now(),
  unique (scan_id, concern)
);

create index if not exists scan_metrics_scan_idx on public.scan_metrics(scan_id);

create table if not exists public.proof_receipts (
  id uuid primary key default gen_random_uuid(),
  participant_trial_id uuid not null unique references public.participant_trials(id) on delete cascade,
  public_slug text unique,
  is_public boolean not null default false,
  metric_summary jsonb not null,
  narrative jsonb,
  created_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.trials enable row level security;
alter table public.participant_trials enable row level security;
alter table public.scans enable row level security;
alter table public.scan_metrics enable row level security;
alter table public.proof_receipts enable row level security;

revoke all on public.trials from anon, authenticated;
revoke all on public.participant_trials from anon, authenticated;
revoke all on public.scans from anon, authenticated;
revoke all on public.scan_metrics from anon, authenticated;
revoke all on public.proof_receipts from anon, authenticated;

insert into public.trials (slug, title, product_name, trial_days, target_concerns, is_demo)
values (
  'niacinamide21',
  'Niacinamide - 21 Day Proof',
  'Niacinamide 10% Serum',
  21,
  array['redness', 'radiance', 'texture', 'acne', 'pore'],
  true
)
on conflict (slug) do nothing;
