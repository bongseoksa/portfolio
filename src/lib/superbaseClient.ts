import { createClient } from '@supabase/supabase-js';

const isLocal = import.meta.env.VITE_ENV === 'local';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

console.log('isLocal', isLocal);
console.log('supabaseUrl', supabaseUrl);
console.log('supabaseAnonKey', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
