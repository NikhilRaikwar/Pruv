import { describe, expect, it } from 'vitest';

import { createParticipantToken, hashParticipantToken } from './participant-token';

describe('participant token', () => {
  it('creates high entropy non-identical tokens', () => {
    const first = createParticipantToken();
    const second = createParticipantToken();

    expect(first).not.toEqual(second);
    expect(first.length).toBeGreaterThanOrEqual(32);
  });

  it('hashes deterministically without returning the original token', () => {
    const token = 'sample-token';
    const hash = hashParticipantToken(token);

    expect(hash).toEqual(hashParticipantToken(token));
    expect(hash).not.toContain(token);
    expect(hash).toHaveLength(64);
  });
});
