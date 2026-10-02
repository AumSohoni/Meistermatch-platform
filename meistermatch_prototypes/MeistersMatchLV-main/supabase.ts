import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmcrtqbcabpjmtvvvizm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttY3J0cWJjYWJwam10dnZ2aXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDcyNTgsImV4cCI6MjA4NDMyMzI1OH0.cGSL_yQJYxXy3tTXGTUptHKM_j600odALxTIRjunLZk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
