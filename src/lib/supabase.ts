import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

/**
 * Resilient Supabase Initialization
 * Prevents build-time crashes on Vercel when ENVs are not present during static analysis.
 */
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : (null as unknown as ReturnType<typeof createClient>);

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase Lib] Environment variables missing. If this is Build Time, it is expected.');
}
