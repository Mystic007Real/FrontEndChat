import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';  // Replace with your Supabase project URL (from Supabase Settings > API)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGpkb2xkZWVsc29seXp4bmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0ODU3MDEsImV4cCI6MjA4NDA2MTcwMX0.7CwCa-Yv8rDluIaErvwYm93aq5mbqBh15e4kBq1FGBQ';  // Replace with your Supabase anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
