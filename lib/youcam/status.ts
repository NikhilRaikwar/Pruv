import 'server-only';
import { youcamFetch } from './http';

export async function getYouCamTaskStatus(taskId: string) {
  const json = await youcamFetch(`/s2s/v2.1/task/skin-analysis/${encodeURIComponent(taskId)}`);
  return json as {
    data?: {
      task_id?: string;
      task_status?: 'pending' | 'processing' | 'success' | 'error';
      results?: Record<string, unknown>;
      error_code?: string;
      error_message?: string;
    };
  };
}
