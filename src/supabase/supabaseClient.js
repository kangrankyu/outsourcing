import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://kdszztcbvfcmmyihescu.supabase.co';
const supabasekey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabasekey);
