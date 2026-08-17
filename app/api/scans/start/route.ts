import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireParticipant } from '@/lib/participant/current';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { HD_CONTRACT } from '@/lib/youcam/contract';
import { createSkinTask } from '@/lib/youcam/create-task';

const bodySchema = z.object({
  fileId: z.string().min(1),
  scanType: z.enum(['baseline', 'followup']),
  cameraKitUsed: z.boolean().default(false),
  imageData: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const participant = await requireParticipant();
    const parsed = bodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid scan request' }, { status: 400 });
    }

    if (parsed.data.scanType === 'followup' && !participant.baseline_completed_at) {
      return NextResponse.json({ error: 'Baseline is required before follow-up' }, { status: 409 });
    }

    const taskId = await createSkinTask({
      fileId: parsed.data.fileId,
      contract: HD_CONTRACT,
      cameraKitUsed: parsed.data.cameraKitUsed,
    });

    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();

    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .upsert(
        {
          participant_trial_id: participant.id,
          scan_type: parsed.data.scanType,
          status: 'processing',
          analysis_mode: 'hd',
          youcam_file_id: parsed.data.fileId,
          youcam_task_id: taskId,
          youcam_api_version: HD_CONTRACT.apiVersion,
          camera_kit_used: parsed.data.cameraKitUsed ?? false,
          image_data: parsed.data.imageData ?? null,
          captured_at: now,
        },
        { onConflict: 'participant_trial_id,scan_type' },
      )
      .select('id')
      .single();

    if (scanError || !scan) {
      console.error('Supabase scan upsert error:', scanError);
      return NextResponse.json(
        { error: scanError?.message || 'Could not reserve scan record' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      scanId: scan.id,
      taskId,
      status: 'processing',
    });
  } catch (error) {
    console.error('Scan start error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not initialize YouCam Skin Analysis' },
      { status: 500 },
    );
  }
}
