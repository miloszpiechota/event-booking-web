import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://azbpvxuvzjcahzrkwuxk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YnB2eHV2empjYWh6cmt3dXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NjE3NDUsImV4cCI6MjA1MzEzNzc0NX0.tEP-d8pTA-RaY6n8St-XMJnRFwiwR7AEVVV3FPfP33Y"


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage, // Używamy localStorage na web
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
