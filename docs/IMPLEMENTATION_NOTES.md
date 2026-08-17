# YouCam API Implementation Notes

## API Details
- **Base URL**: `https://yce-api-01.makeupar.com`
- **Upload API**: POST `https://yce-api-01.makeupar.com/v2.1/file` returns a presigned URL, followed by a direct PUT with binary JPEG data.
- **Task API**: POST `https://yce-api-01.makeupar.com/v2.1/task`
- **Polling API**: GET `https://yce-api-01.makeupar.com/v2.1/task/<taskId>`
- **HD vs SD Rules**:
  - Image must be clearly lit, full face (> 60% of frame width), and high resolution (1280x1280) to pass HD constraints.
  - If framing is off, API returns `error_below_min_image_size` or `error_src_face_out_of_bound`.
  - If HD fails on Baseline, the trial locks SD for both Baseline and Follow-up to maintain longitudinal consistency.

## YouCam API Unit Cost During Development
- `AI Skin Analysis V2.0 HD (1-4 concerns)`: 12.0 result_image per task.
- `AI Skin Analysis V2.0 HD (5-8 concerns)`: 16.0 result_image per task.
- `AI Skin Analysis V2.1 HD (1-4 concerns)`: 12.0 result_image per task.
- `AI Skin Analysis V2.0 SD (1-4 concerns)`: 9.0 result_image per task.
- `AI Skin Analysis V2.0 SD (5-8 concerns)`: 12.0 result_image per task.

## Available Actions
**HD Actions**:
- `hd_redness`
- `hd_acne`
- `hd_texture`
- `hd_pore`
- `hd_radiance`

**SD Actions**:
- `redness`
- `acne`
- `texture`
- `pore`
- `radiance`

## Tested Errors
- `error_below_min_image_size`: Image resolution too low for HD.
- `error_src_face_out_of_bound`: Face too close to camera/edges.
- `error_face_too_small`: Face occupies less than 60% of frame. Auto-framing crop resolves this automatically.
