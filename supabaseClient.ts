import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing in .env");
  window.alert("Server configuration error.");
  throw new Error("Missing environment variables");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage, // Używamy localStorage na web
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
