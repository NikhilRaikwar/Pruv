import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createDemoSessionFromSeed } from '@/lib/demo/create-demo-session';
import { PARTICIPANT_COOKIE } from '@/lib/security/participant-token';

export async function POST() {
  try {
    const session = await createDemoSessionFromSeed();
    const cookieStore = await cookies();
    cookieStore.set(PARTICIPANT_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 90,
    });

    return NextResponse.json({
      ok: true,
      participantId: session.participantId,
      next: `/p/${session.trialSlug}/my-proof`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'DEMO_START_FAILED';
    return NextResponse.json({ error: message }, { status: message === 'DEMO_BASELINE_SEED_MISSING' ? 409 : 500 });
  }
}
