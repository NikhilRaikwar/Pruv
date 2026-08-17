# Perfect Corp. YouCam Skin AI v2.1 Integration Guide

> Technical specifications, request payloads, response normalization, and MCP verification details for Pruv.

---

## 1. API Overview

Pruv integrates with **Perfect Corp. YouCam AI Skin Analysis v2.1 (S2S API)**.

- **Base URL**: `https://yce-api-01.makeupar.com`
- **Authentication**: `Authorization: Bearer <YOUCAM_API_KEY>`
- **Workflow**: 2-Step Asynchronous File Upload + Server Task Polling

---

## 2. Supported Skin Analysis Metrics

Pruv measures 5 core skin dimensions supported by YouCam AI Skin Analysis v2.1:

| Metric Key | YouCam Action Key | Description | Output Scale |
| :--- | :--- | :--- | :--- |
| `Redness` | `hd_redness` | Facial redness & erythema | 0 (Severe) – 100 (Clear) |
| `Radiance` | `hd_radiance` | Skin luminosity & natural glow | 0 (Dull) – 100 (Radiant) |
| `Texture` | `hd_texture` | Surface smoothness & roughness | 0 (Rough) – 100 (Smooth) |
| `Acne` | `hd_acne` | Active acne, pustules & papules | 0 (Severe) – 100 (Clear) |
| `Pores` | `hd_pore` | Pore dilation & visibility | 0 (Enlarged) – 100 (Minimized) |

---

## 3. End-to-End Execution Flow

### Step 1: Request Presigned Upload Slot
- **Endpoint**: `POST /api/youcam/upload-slot`
- **YouCam API**: `POST https://yce-api-01.makeupar.com/v2.1/file`
- **Response**: `{ file_id: "...", upload_url: "https://...s3.amazonaws.com/..." }`

### Step 2: S3 Direct Upload
- **Method**: `PUT <upload_url>`
- **Payload**: Binary JPEG photo (1280x1280 HD canvas with auto-centered face zoom)

### Step 3: Initialize Analysis Task
- **Endpoint**: `POST /api/scans/start`
- **YouCam API**: `POST https://yce-api-01.makeupar.com/v2.1/task`
- **Payload**:
```json
{
  "actions": [
    "hd_redness",
    "hd_acne",
    "hd_texture",
    "hd_pore",
    "hd_radiance"
  ],
  "file_id": "bfd5f667-..."
}
```
- **Response**: `{ task_id: "2096ab1e-92f8-44e2-93b3-fc961899e85c" }`

### Step 4: Status Polling & Deduplication
- **Endpoint**: `GET /api/scans/[scanId]/status`
- **YouCam API**: `GET https://yce-api-01.makeupar.com/v2.1/task/<taskId>`
- **Deduplication**: YouCam multi-region pore results (`forehead`, `nose`, `cheek`, `whole`) are normalized to retain whole-face health metrics, eliminating database conflict collisions.

---

## 4. MCP Verification

During development, real YouCam API endpoints were tested and verified using YouCam Model Context Protocol (MCP) tooling:
1. Checked Skin Analysis feature cost (`Get-Feature-Cost`).
2. Inspected direct file upload endpoint metadata (`Get-Upload-API-Info`).
3. Performed consented image upload and triggered real YouCam task (`AI-Skin-Analysis`).
4. Monitored polling lifecycle until completion status 200 (`Get-Running-Task-Status`).
5. Extracted raw response payload into test fixtures (`test/fixtures/youcam-hd-success.json`) for automated unit tests.
