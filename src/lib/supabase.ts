import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(url ?? '', key ?? '');

export const isSupabaseConfigured = !!(url && key);

/** Creates an isolated client — used to sign up student accounts without
 *  affecting the professor's current session. */
export function createIsolatedClient() {
  return createClient<Database>(url ?? '', key ?? '', {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
