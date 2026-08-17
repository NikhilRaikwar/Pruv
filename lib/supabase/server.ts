import 'server-only';

import { createClient } from '@supabase/supabase-js';

import { env } from '@/lib/env';

export function getSupabaseAdmin() {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
