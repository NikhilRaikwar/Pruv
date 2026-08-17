import 'server-only';

import { z } from 'zod';

import { youcamFetch } from './http';
import type { UploadSlot } from './types';

const inputSchema = z.object({
  contentType: z.enum(['image/jpeg', 'image/jpg', 'image/png']),
  fileName: z.string().min(1).max(150),
  fileSize: z.number().int().positive().max(10 * 1024 * 1024),
});

export async function createYouCamUploadSlot(input: z.infer<typeof inputSchema>): Promise<UploadSlot> {
  const data = inputSchema.parse(input);
  const body = (await youcamFetch('/s2s/v2.1/file/skin-analysis', {
    method: 'POST',
    body: JSON.stringify({
      files: [
        {
          content_type: data.contentType,
          file_name: data.fileName,
          file_size: data.fileSize,
        },
      ],
    }),
  })) as {
    data?: { files?: Array<{ file_id?: string; requests?: Array<{ method?: string; url?: string; headers?: Record<string, string> }> }> };
  };

  const file = body.data?.files?.[0];
  const request = file?.requests?.[0];

  if (!file?.file_id || !request?.url || !request?.method) {
    throw new Error('Unexpected YouCam upload-slot response');
  }

  return {
    fileId: file.file_id,
    upload: {
      method: request.method,
      url: request.url,
      headers: request.headers ?? {},
    },
  };
}
