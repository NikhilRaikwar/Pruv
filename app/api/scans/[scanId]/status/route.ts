import { NextResponse } from 'next/server';

import { requireParticipant } from '@/lib/participant/current';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { normalizeSkinAnalysisResponse } from '@/lib/youcam/normalize';
import { getYouCamTaskStatus } from '@/lib/youcam/status';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ scanId: string }> },
) {
  try {
    const participant = await requireParticipant();
    const { scanId } = await params;
    const supabase = getSupabaseAdmin();

    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .select('id, scan_type, status, youcam_task_id, youcam_api_version')
      .eq('id', scanId)
      .eq('participant_trial_id', participant.id)
      .single();

    if (scanError || !scan) {
      return NextResponse.json({ error: 'Scan not found' }, { status: 404 });
    }

    if (scan.status === 'success') {
      const { data: metrics } = await supabase
        .from('scan_metrics')
        .select('concern, raw_score, ui_score, vendor_concern')
        .eq('scan_id', scan.id);

      return NextResponse.json({
        ok: true,
        status: 'success',
        metrics: metrics ?? [],
        next:
          scan.scan_type === 'baseline'
            ? `/p/${participant.trial.slug}/baseline`
            : `/p/${participant.trial.slug}/compare`,
      });
    }

    if (!scan.youcam_task_id) {
      return NextResponse.json({ error: 'Task ID missing' }, { status: 500 });
    }

    const taskResult = await getYouCamTaskStatus(scan.youcam_task_id);
    const taskStatus = taskResult?.data?.task_status;

    if (taskStatus === 'processing' || taskStatus === 'pending') {
      return NextResponse.json({ ok: true, status: 'processing' });
    }

    if (taskStatus === 'error') {
      await supabase
        .from('scans')
        .update({
          status: 'error',
          error_message: taskResult?.data?.error_message ?? 'Skin Analysis error',
        })
        .eq('id', scan.id);

      return NextResponse.json(
        {
          ok: false,
          status: 'error',
          error: taskResult?.data?.error_message ?? 'Skin Analysis failed. Please retake photo.',
        },
        { status: 422 },
      );
    }

    if (taskStatus === 'success') {
      console.log('YouCam API Real Task Result:', JSON.stringify(taskResult));
      const normalized = normalizeSkinAnalysisResponse(scan.youcam_task_id, taskResult);
      console.log('Normalized Real Metrics:', JSON.stringify(normalized.metrics));
      const now = new Date().toISOString();

      await supabase
        .from('scans')
        .update({
          status: 'success',
          completed_at: now,
        })
        .eq('id', scan.id);

      const { error: upsertError } = await supabase.from('scan_metrics').upsert(
        normalized.metrics.map((m) => ({
          scan_id: scan.id,
          concern: m.concern,
          vendor_concern: m.vendorType,
          raw_score: m.rawScore,
          ui_score: m.uiScore,
          subcategory: m.subcategory ?? null,
        })),
        { onConflict: 'scan_id,concern' },
      );

      if (upsertError) {
        console.error('Supabase scan_metrics upsert error:', upsertError);
      } else {
        console.log('Successfully saved real scan_metrics to Supabase:', normalized.metrics.length, 'records');
      }

      await supabase
        .from('participant_trials')
        .update(
          scan.scan_type === 'baseline'
            ? { baseline_completed_at: now, updated_at: now }
            : { followup_completed_at: now, updated_at: now },
        )
        .eq('id', participant.id);

      return NextResponse.json({
        ok: true,
        status: 'success',
        metrics: normalized.metrics,
        next:
          scan.scan_type === 'baseline'
            ? `/p/${participant.trial.slug}/baseline`
            : `/p/${participant.trial.slug}/compare`,
      });
    }

    return NextResponse.json({ ok: true, status: 'processing' });
  } catch (error) {
    console.error('Scan status error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not check scan status' },
      { status: 500 },
    );
  }
}
