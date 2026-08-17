# YouCam API Implementation Notes

## API Details
- **Upload API**: POST `https://yce-api-01.perfectcorp.com/s2s/v2.1/file/skin-analysis` returns a presigned URL, followed by a PUT with binary data.
- **Task API**: `https://yce-api-01.perfectcorp.com/s2s/v2.1/task/skin-analysis`
- **HD vs SD Rules**:
  - Image must be perfectly aligned, full face, and high resolution to pass HD constraints.
  - If it fails, API returns `error_below_min_image_size` or `error_src_face_out_of_bound`.
  - If HD fails on Baseline, the trial MUST switch to SD for both Baseline and Follow-up to maintain consistency.

## YouCam API unit cost during development
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
