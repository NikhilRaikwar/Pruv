import 'server-only';
import { AnalysisContract } from './contract';
import { youcamFetch } from './http';

export async function createSkinTask(input: {
  fileId: string;
  contract: AnalysisContract;
  cameraKitUsed: boolean;
}): Promise<string> {
  const body = (await youcamFetch('/s2s/v2.1/task/skin-analysis', {
    method: 'POST',
    body: JSON.stringify({
      src_file_id: input.fileId,
      dst_actions: input.contract.actions,
      miniserver_args: {
        enable_mask_overlay: true,
      },
      format: 'json',
      pf_camera_kit: input.cameraKitUsed,
    }),
  })) as { data?: { task_id?: string } };

  const taskId = body?.data?.task_id;
  if (!taskId) {
    throw new Error('YOUCAM_TASK_ID_MISSING');
  }

  return taskId;
}
