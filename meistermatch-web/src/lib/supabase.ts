import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kmcrtqbcabpjmtvvvizm.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttY3J0cWJjYWJwam10dnZ2aXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDcyNTgsImV4cCI6MjA4NDMyMzI1OH0.cGSL_yQJYxXy3tTXGTUptHKM_j600odALxTIRjunLZk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Health check utility to test if the Supabase project is reachable
 */
export async function testSupabaseConnection(): Promise<{ ok: boolean; message: string }> {
  try {
    const { error } = await supabase.from("profiles").select("count", { count: "exact", head: true });
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: "Connected to Supabase successfully." };
  } catch (err: any) {
    return { ok: false, message: err?.message || "Connection failed" };
  }
}
