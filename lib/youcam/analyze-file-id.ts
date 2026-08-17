import 'server-only';

import { youcamFetch } from './http';
import { normalizeSkinAnalysisResponse } from './normalize';
import { YOUCAM_HD_ACTIONS } from './types';

export async function createSkinAnalysisTask(fileId: string, cameraKitUsed: boolean) {
  const body = (await youcamFetch('/s2s/v2.1/task/skin-analysis', {
    method: 'POST',
    body: JSON.stringify({
      src_file_id: fileId,
      dst_actions: YOUCAM_HD_ACTIONS,
      miniserver_args: {
        enable_mask_overlay: true,
      },
      format: 'json',
      pf_camera_kit: cameraKitUsed,
    }),
  })) as { data?: { task_id?: string } };

  if (!body.data?.task_id) {
    throw new Error('Unexpected YouCam task-create response');
  }

  return body.data.task_id;
}

export async function pollSkinAnalysisTask(taskId: string) {
  for (let attempt = 0; attempt < 35; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 0 ? 500 : 1500));

    const body = await youcamFetch(`/s2s/v2.1/task/skin-analysis/${encodeURIComponent(taskId)}`);
    const status = (body as { data?: { task_status?: string } }).data?.task_status;

    if (status === 'success') {
      return normalizeSkinAnalysisResponse(taskId, body);
    }

    if (status === 'error') {
      throw new Error('YouCam Skin Analysis task failed');
    }
  }

  throw new Error('YouCam Skin Analysis timed out');
}

export async function analyzeYouCamFileId(fileId: string, cameraKitUsed: boolean) {
  const taskId = await createSkinAnalysisTask(fileId, cameraKitUsed);
  return pollSkinAnalysisTask(taskId);
}
