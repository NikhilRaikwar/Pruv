import 'server-only';

import { env } from '@/lib/env';

export class YouCamError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'YouCamError';
  }
}

export async function youcamFetch(path: string, init: RequestInit = {}) {
  const response = await fetch(`${env.YOUCAM_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.YOUCAM_API_KEY}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
    cache: 'no-store',
  });

  const text = await response.text();
  let body: unknown = null;

  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { raw: text };
  }

  if (!response.ok) {
    const details = body as { error?: string; error_code?: string };
    throw new YouCamError(
      details?.error ?? `YouCam request failed: ${response.status}`,
      response.status,
      details?.error_code,
      body,
    );
  }

  return body;
}
