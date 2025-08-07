import { createClient } from '@supabase/supabase-js';

const isLocal = import.meta.env.VITE_ENV === 'local';

const supabaseUrl = isLocal ? import.meta.env.VITE_SUPABASE_URL! : process.env.SUPABASE_URL;
const supabaseAnonKey = isLocal
  ? import.meta.env.VITE_SUPABASE_ANON_KEY!
  : process.env.SUPABASE_ANON_KEY;

// console.log('isLocal', isLocal);
// console.log('supabaseUrl', supabaseUrl);
// console.log('supabaseAnonKey', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
