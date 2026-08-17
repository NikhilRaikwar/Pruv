# Judge Demo Guide — Pruv

> Step-by-step evaluation guide for judges and testers during the YouCam API Hackathon.

---

## 1. Quick Testing Paths

Pruv offers two immediate testing pathways via `/demo`:

### Pathway A: Complete Proof Review (Instant Verification)
- **URL**: `/demo` ➔ Click **"Inspect Full Proof Review"**
- **What it demonstrates**:
  - Full Day 1 vs Day 21 before/after trial artifact.
  - Side-by-side user photos with identical lighting and auto-framing.
  - Mathematical deltas computed across all 5 YouCam metrics (`Redness`, `Radiance`, `Texture`, `Acne`, `Pores`).
  - Star rating, quote, and verified proof receipt with PDF download.
  - Public ProofLink generation & sync.

### Pathway B: Live Camera / Photo Scan
- **URL**: `/start` or `/demo` ➔ Click **"Test Live Skin Analysis"**
- **What it demonstrates**:
  - Live webcam feed or high-res photo upload.
  - Smart auto-face framing (guaranteeing > 60% face width for YouCam API).
  - Real-time S3 presigned upload slot request.
  - Real-time YouCam Skin AI v2.1 asynchronous task execution & status polling.
  - Normalized 0–100 skin scores rendered on the baseline card.

---

## 2. Testing Public ProofLinks

- Test the public sample receipt at: `/proof/sample-niacinamide`
- Notice that the public receipt renders the exact same layout (product bottle, user before/after photos, star ratings, and YouCam AI deltas) without exposing participant session cookies or private database IDs.
