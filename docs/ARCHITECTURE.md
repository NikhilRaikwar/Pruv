# Pruv Architecture & System Design

## Overview

Pruv turns a skincare product trial into a measured review using two Perfect Corp. YouCam Skin Analysis observations and a deterministic comparison layer.

<p align="center">
  <img src="../public/pruv-architecture.png" alt="Pruv System Architecture Diagram" width="100%" />
</p>

---

## System Architecture

```mermaid
flowchart LR
    B[Browser Camera / Upload]
    S[Pruv Next.js Server]
    Y[YouCam Skin Analysis v2.1]
    D[(Supabase Postgres)]
    C[Comparison Engine]
    P[Proof Review]

    B -->|1. Request upload slot| S
    S -->|2. File API| Y
    Y -->|3. file_id + S3 Presigned URL| S
    S --> B
    B -->|4. Upload image to S3| Y
    B -->|5. file_id| S
    S -->|6. Create analysis task| Y
    Y -->|7. task_id / scores| S
    S -->|8. Structured scores only| D
    D --> C
    C --> P
```

---

## Product State Machine

```mermaid
stateDiagram-v2
    [*] --> Joined
    Joined --> Consented
    Consented --> BaselineProcessing
    BaselineProcessing --> BaselineComplete: success
    BaselineProcessing --> ScanError: error
    ScanError --> BaselineProcessing: retry

    BaselineComplete --> TrialActive
    TrialActive --> FollowupProcessing

    FollowupProcessing --> ComparisonReady: success
    FollowupProcessing --> FollowupError: error
    FollowupError --> FollowupProcessing: retry

    ComparisonReady --> ReviewDraft
    ReviewDraft --> ProofReady
    ProofReady --> Published: create ProofLink
    ProofReady --> [*]
    Published --> [*]
```

---

## Data Model (Entity-Relationship)

```mermaid
erDiagram
    TRIALS ||--o{ PARTICIPANT_TRIALS : has
    PARTICIPANT_TRIALS ||--o{ SCANS : creates
    SCANS ||--o{ SCAN_METRICS : contains
    PARTICIPANT_TRIALS ||--o| PROOF_REVIEWS : produces

    TRIALS {
        uuid id PK
        text slug
        text product_name
        int trial_days
        boolean is_demo
    }

    PARTICIPANT_TRIALS {
        uuid id PK
        uuid trial_id FK
        text access_token_hash
        text analysis_mode
        jsonb analysis_config
        timestamp baseline_completed_at
        timestamp followup_completed_at
    }

    SCANS {
        uuid id PK
        uuid participant_trial_id FK
        text scan_type
        text status
        text youcam_task_id
        text analysis_mode
    }

    SCAN_METRICS {
        uuid id PK
        uuid scan_id FK
        text concern
        float raw_score
        float ui_score
    }

    PROOF_REVIEWS {
        uuid id PK
        uuid participant_trial_id FK
        int rating
        boolean would_buy_again
        text review_text
        jsonb metric_summary
        text public_slug
        boolean is_public
    }
```

---

## Measurement Contract

A before/after review is scientifically credible only when both observations adhere to an immutable measurement contract:

1. **YouCam Skin Analysis v2.1**: The baseline scan establishes the exact metric family (`hd_redness`, `hd_radiance`, `hd_texture`, `hd_acne`, `hd_pore`).
2. **Matching Follow-up Configuration**: The follow-up scan reuses the identical action set and normalized 0–100 scale.
3. **Deterministic Comparison Engine**: All numerical deltas are calculated in application code using canonical arithmetic:
   $$\Delta = \text{Followup Score} - \text{Baseline Score}$$
4. **No LLM Calculation**: Large language models do not compute or hallucinate metric values or differences.

---

## Data Flow

```text
Browser Capture
  → Pruv Server (Presigned Upload Slot Request)
  → Perfect Corp. YouCam API (File Slot Initialized)
  → Direct S3 Binary Upload (from Browser)
  → Pruv Server (Task Triggered)
  → YouCam Async Polling (until Status 200)
  → Structured Metric Normalization
  → Supabase PostgreSQL (Structured Scores Persisted)
  → Deterministic Comparison Engine (Delta Calculation)
  → User Rating & Qualitative Input
  → Private Proof Review / Optional Public ProofLink
```

---

## Persistence Architecture

Pruv separates persistent structured trial records from transient binary data:

- **Anonymous Participant**: Cryptographically random session tokens (`pruv_participant_<slug>`) whose SHA-256 hash is verified server-side without requiring passwords or emails.
- **Trial**: Product metadata, target duration, and baseline configuration.
- **Scans & Scan Metrics**: Stores task status, timestamps, and normalized 0–100 numerical scores for redness, radiance, texture, acne, and pores.
- **Proof Reviews**: Stores user star rating (1–5), buy-again preference, personal notes, metric summary snapshot, and optional public ProofLink slug.

---

## Privacy Boundaries

- **Explicit Consent**: Users affirmatively consent to facial processing before camera initialization or file upload.
- **Transient Face Uploads**: Raw images are transmitted directly to YouCam's secure S3 endpoint. Pruv does not persist raw selfie blobs in its database.
- **Structured Data Only**: Only normalized numerical scores and metadata are stored in Supabase.
- **Private by Default**: Proof Reviews remain accessible only to the trial participant until they explicitly choose to publish a shareable ProofLink.
- **Observational Boundary**: Pruv provides observational skin metrics, not medical diagnoses, dermatological prescriptions, or clinical proof of causality.
