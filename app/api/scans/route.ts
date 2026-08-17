import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireParticipant } from '@/lib/participant/current';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { analyzeYouCamFileId } from '@/lib/youcam/analyze-file-id';

const bodySchema = z.object({
  fileId: z.string().min(1),
  scanType: z.enum(['baseline', 'followup']),
  cameraKitUsed: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const participant = await requireParticipant();
    const parsed = bodySchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid scan request' }, { status: 400 });

    const supabase = getSupabaseAdmin();
    if (parsed.data.scanType === 'followup' && !participant.baseline_completed_at) {
      return NextResponse.json({ error: 'Baseline is required before follow-up' }, { status: 409 });
    }

    const analysis = await analyzeYouCamFileId(parsed.data.fileId, parsed.data.cameraKitUsed);
    const now = new Date().toISOString();

    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .upsert(
        {
          participant_trial_id: participant.id,
          scan_type: parsed.data.scanType,
          status: 'success',
          youcam_task_id: analysis.taskId,
          youcam_api_version: analysis.apiVersion,
          camera_kit_used: parsed.data.cameraKitUsed,
          completed_at: now,
        },
        { onConflict: 'participant_trial_id,scan_type' },
      )
      .select('id')
      .single();

    if (scanError || !scan) return NextResponse.json({ error: 'Could not save scan' }, { status: 500 });

    await supabase.from('scan_metrics').upsert(
      analysis.metrics.map((metric) => ({
        scan_id: scan.id,
        concern: metric.concern,
        raw_score: metric.rawScore,
        ui_score: metric.uiScore,
        subcategory: metric.subcategory ?? null,
      })),
      { onConflict: 'scan_id,concern' },
    );

    await supabase
      .from('participant_trials')
      .update(parsed.data.scanType === 'baseline' ? { baseline_completed_at: now, updated_at: now } : { followup_completed_at: now, updated_at: now })
      .eq('id', participant.id);

    return NextResponse.json({
      ok: true,
      metrics: analysis.metrics,
      next: parsed.data.scanType === 'baseline' ? `/p/${participant.trial.slug}/baseline` : `/p/${participant.trial.slug}/compare`,
    });
  } catch (error) {
    console.error('scan failed', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Skin Analysis failed. Try again with a clear, well-lit photo.' }, { status: 500 });
  }
}
