import { describe, expect, it } from 'vitest';

describe('Ask Pruv safety prompt', () => {
  it('documents medical and causal refusals in source', async () => {
    const source = await import('node:fs/promises').then((fs) => fs.readFile(new URL('./ask-pruv-agent.ts', import.meta.url), 'utf8'));

    expect(source).toMatch(/cannot diagnose/i);
    expect(source).toMatch(/prove that a product caused/i);
    expect(source).toMatch(/recommend treatment/i);
  });
});
