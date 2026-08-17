import 'server-only';

import { z } from 'zod';

const envSchema = z.object({
  YOUCAM_API_KEY: z.string().min(10),
  YOUCAM_BASE_URL: z.string().url().default('https://yce-api-01.makeupar.com'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SECRET_KEY: z.string().min(10),
  OPENROUTER_API_KEY: z.string().min(10).optional(),
  OPENROUTER_MODEL: z.string().default('~openai/gpt-latest'),
  OPENROUTER_ENABLED: z.enum(['true', 'false']).default('true'),
  APP_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

type Env = z.infer<typeof envSchema>;

function readEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration');
  }

  return parsed.data;
}

export const env = new Proxy({} as Env, {
  get(_target, property: keyof Env) {
    return readEnv()[property];
  },
});
