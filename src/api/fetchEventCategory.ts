import { supabase } from "../../supabaseClient.ts";

export const fetchEventCategory = async () => {
  const { data, error } = await supabase
    .from("event_category")
    .select("id, name"); // Możesz zawęzić tylko do potrzebnych pól

  if (error) {
    console.error("❌ Error fetching event_category:", error);
    return [];
  }

  console.log("📦 Pobrane kategorie wydarzeń:", data);
  return data;
};
