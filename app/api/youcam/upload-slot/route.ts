import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireParticipant } from '@/lib/participant/current';
import { createYouCamUploadSlot } from '@/lib/youcam/create-upload-slot';
import { YouCamError } from '@/lib/youcam/http';

const bodySchema = z
  .object({
    contentType: z.enum(['image/jpeg', 'image/jpg', 'image/png']).default('image/jpeg'),
    fileName: z.string().min(1).max(150).default('scan.jpg'),
    fileSize: z.number().int().positive().max(10 * 1024 * 1024).default(500000),
  })
  .optional()
  .default({
    contentType: 'image/jpeg',
    fileName: 'scan.jpg',
    fileSize: 500000,
  });

export async function POST(request: Request) {
  try {
    await requireParticipant();

    let jsonBody = {};
    try {
      jsonBody = await request.json();
    } catch {
      // Empty or no JSON body
    }

    const parsed = bodySchema.safeParse(jsonBody);
    const data = parsed.success
      ? parsed.data
      : {
          contentType: 'image/jpeg' as const,
          fileName: 'scan.jpg',
          fileSize: 500000,
        };

    const slot = await createYouCamUploadSlot(data);
    return NextResponse.json(slot);
  } catch (error) {
    console.error('Upload slot error:', error);
    if (error instanceof YouCamError) {
      return NextResponse.json(
        { error: error.message || 'YouCam upload setup failed' },
        { status: error.status ?? 502 },
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not prepare upload' },
      { status: 500 },
    );
  }
}
