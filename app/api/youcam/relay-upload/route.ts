import { NextResponse } from 'next/server';

import { requireParticipant } from '@/lib/participant/current';

export async function POST(request: Request) {
  try {
    await requireParticipant();
    const formData = await request.formData();
    const file = formData.get('file');
    const fileId = formData.get('fileId');
    const uploadUrl = formData.get('uploadUrl');
    const method = formData.get('method');
    const headersRaw = formData.get('headers');

    if (!(file instanceof File) || typeof fileId !== 'string' || typeof uploadUrl !== 'string' || typeof method !== 'string') {
      return NextResponse.json({ error: 'Invalid relay upload request' }, { status: 400 });
    }

    const headers = typeof headersRaw === 'string' ? JSON.parse(headersRaw) as Record<string, string> : {};
    const response = await fetch(uploadUrl, {
      method,
      headers,
      body: await file.arrayBuffer(),
    });

    if (!response.ok) return NextResponse.json({ error: 'YouCam upload failed' }, { status: 502 });
    return NextResponse.json({ ok: true, fileId });
  } catch {
    return NextResponse.json({ error: 'Relay upload failed' }, { status: 500 });
  }
}
