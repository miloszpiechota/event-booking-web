// src/utils/auth.ts
import { supabase } from "../../supabaseClient.ts";

export async function getUserToken(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    console.error("User is not logged in or session is missing", error);
    return null;
  }
  return data.session.access_token;
}

export async function getUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.error("User is not logged in", error);
    return null;
  }
  return data.user.id;
}
