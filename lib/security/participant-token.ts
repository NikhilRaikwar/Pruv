import 'server-only';

import crypto from 'node:crypto';

export const PARTICIPANT_COOKIE = 'pruv_participant';

export function createParticipantToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashParticipantToken(token: string) {
  return crypto.createHash('sha256').update(token, 'utf8').digest('hex');
}

export function createPublicSlug() {
  return crypto.randomBytes(12).toString('base64url');
}
