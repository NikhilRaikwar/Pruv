# Pruv Architecture & System Design

> Complete technical architecture, sequence diagrams, and state management for Pruv.

---

## 1. System Overview

Pruv is an end-to-end longitudinal skincare trial and review platform powered by Perfect Corp. YouCam AI Skin Analysis v2.1.

```mermaid
flowchart LR
    B[Browser Camera / Upload]
    S[Pruv Next.js Server]
    Y[YouCam Skin Analysis]
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
    Y -->|7. task_id| S
    S -->|8. Structured scores only| D
    D --> C
    C --> P
```

---

## 2. Real YouCam Request Sequence

```mermaid
sequenceDiagram
    participant U as User Browser
    participant P as Pruv Server
    participant Y as YouCam API
    participant D as Supabase Postgres

    U->>P: POST /api/youcam/upload-slot
    P->>Y: Request presigned S3 upload slot
    Y-->>P: file_id + upload_url
    P-->>U: file_id + upload_url

    U->>Y: PUT raw photo to S3
    U->>P: POST /api/scans/start (file_id, scanType)

    P->>Y: POST /v2.1/task (actions: hd_redness, hd_acne, hd_texture, hd_pore, hd_radiance)
    Y-->>P: task_id
    P->>D: Save scan record (task_id, status=processing)
    P-->>U: scanId + taskId

    loop Poll until complete
        U->>P: GET /api/scans/[scanId]/status
        P->>Y: GET /v2.1/task/[taskId]
        Y-->>P: status (200 success / processing / error)
    end

    P->>D: Save normalized scan_metrics
    P-->>U: Scan complete + metrics payload
```

---

## 3. Trial State Machine

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

## 4. Data Model (Entity-Relationship)

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

## 5. Measurement Consistency Contract

A longitudinal before/after comparison is valid only when both scans adhere to the exact same analysis family and configuration:
- **Engine Family**: Perfect Corp. YouCam Skin Analysis v2.1 HD
- **Action Set**: `hd_redness`, `hd_acne`, `hd_texture`, `hd_pore`, `hd_radiance`
- **Normalization Strategy**: 0–100 skin health scale (100 = optimal/clear skin)
- **Deterministic Delta Math**: `Followup Score - Baseline Score` (Positive = Improvement)
