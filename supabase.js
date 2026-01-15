import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';  // Replace with your Supabase project URL (from Supabase Settings > API)
const supabaseKey = 'YOUR_SUPABASE_ANON_PUBLIC_KEY';  // Replace with your Supabase anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
