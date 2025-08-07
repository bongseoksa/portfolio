import { createClient } from '@supabase/supabase-js';
const isLocal = import.meta.env.VITE_ENV === 'local';

const supabaseUrl = isLocal ? import.meta.env.VITE_SUPABASE_URL! : import.meta.env.SUPABASE_URL!;
const supabaseAnonKey = isLocal
  ? import.meta.env.VITE_SUPABASE_ANON_KEY!
  : import.meta.env.SUPABASE_ANON_KEY!;
console.log('supabaseUrl', supabaseUrl);
console.log('supabaseAnonKey', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
