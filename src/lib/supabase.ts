import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/$/, '');
const supabaseKey = (process.env.SUPABASE_SERVICE_KEY || '').trim();

/**
 * Resilient Supabase Initialization
 * Prevents build-time crashes on Vercel when ENVs are not present during static analysis.
 */
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : (null as unknown as ReturnType<typeof createClient>);

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase Lib] Environment variables missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY).');
}
