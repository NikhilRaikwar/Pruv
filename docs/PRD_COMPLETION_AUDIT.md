# Pruv PRD Completion Audit

Date: 2026-08-17

## Verdict

Pruv is implemented as a working application scaffold and passes local build/lint/unit tests, but it is not 100% complete against the PRD until live external-service verification is finished.

## Complete Locally

- Next.js App Router application exists.
- Landing page follows the 5-section simple product-first structure.
- No login/signup flow exists.
- Anonymous participant token is generated and stored as a hash in Supabase.
- Plaintext participant token is stored in an HttpOnly cookie.
- Supabase migration creates `trials`, `participant_trials`, `scans`, `scan_metrics`, and `proof_receipts`.
- RLS is enabled and broad browser policies are not created.
- YouCam REST integration code covers upload slot, pre-signed upload fallback, task creation, polling, normalization, and metric persistence.
- Baseline and follow-up use the same HD concern set.
- Deterministic comparison computes raw and UI deltas.
- Proof Receipt can be created and explicitly published with an opaque public slug.
- Public receipt projection omits participant token, raw photo, and internal task id.
- OpenRouter receives structured metrics only and has deterministic fallback behavior.
- Ask Pruv refuses medical/causal claims in the local safety path.
- `/demo` now clones a real seed baseline when one exists, then routes the judge to live follow-up.

## Not Yet 100% Complete

- Real YouCam API request has not been run in this environment with a consented test image.
- Perfect Corp. JavaScript Camera Kit is not integrated yet; the app uses browser capture/file input fallback.
- Supabase migration has not been applied and verified against the target project in this session.
- Supabase advisors have not been run against the target project.
- Real baseline persistence and follow-up persistence have not been verified against production Supabase.
- OpenRouter structured-output verification script has not been run with a real key in this session.
- Public ProofLink has not been verified in incognito against a deployed HTTPS URL.
- Browser camera has not been tested on deployed HTTPS.
- `npm audit` reports high-severity transitive dependency issues in Next/PostCSS/sharp; the automated fix requires a breaking Next 16 upgrade.

## API Keys Needed

Required in `.env.local`:

- `YOUCAM_API_KEY`: server-only Perfect Corp. YouCam API key.
- `SUPABASE_URL`: Supabase project URL.
- `SUPABASE_SECRET_KEY`: server-only Supabase secret key, preferably `sb_secret_...`.
- `APP_SECRET`: at least 32 random characters.
- `NEXT_PUBLIC_APP_URL`: public app URL, such as `http://localhost:3000` locally.

Optional but recommended:

- `OPENROUTER_API_KEY`: server-only OpenRouter key.
- `OPENROUTER_MODEL`: model slug, default `~openai/gpt-latest`.
- `OPENROUTER_ENABLED`: `true` or `false`.

No key should be entered in the UI. Keys belong only in `.env.local` or deployment environment variables.

## Why Only One Product Shows

This is intentional for the hackathon MVP. `PRUV_SIMPLE_LANDING_AND_PRODUCT_FLOW.md` says the Start page should avoid complex product search and show one demo trial card: `Niacinamide 10% Serum`. More products, product search, creator dashboards, and brand dashboards are later scope.
