import { NextResponse } from 'next/server';

import { requireParticipant } from '@/lib/participant/current';
import { createPublicSlug } from '@/lib/security/participant-token';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function POST() {
  try {
    const participant = await requireParticipant();
    const supabase = getSupabaseAdmin();
    const slug = createPublicSlug();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('proof_receipts')
      .update({ is_public: true, public_slug: slug, published_at: now })
      .eq('participant_trial_id', participant.id)
      .select('public_slug')
      .single();

    if (error || !data) return NextResponse.json({ error: 'Create receipt before publishing' }, { status: 409 });
    return NextResponse.json({ ok: true, publicUrl: `/proof/${data.public_slug}` });
  } catch {
    return NextResponse.json({ error: 'Could not publish receipt' }, { status: 500 });
  }
}
