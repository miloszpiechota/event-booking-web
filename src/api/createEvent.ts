import { getUserToken } from "../api/auth.ts";

interface EventData {
  e_event_name: string;
  e_start_date: string;
  e_end_date: string;
  e_short_descryp: string;
  e_long_descryp: string;
  e_image_url: string;
  e_event_category_id: string;
  e_street: string;
  e_apartment_number: string;
  e_zip_code: string;
  e_city: string;
  e_country: string;
  e_latitude: number;
  e_longitude: number;
}

interface OrganizerData {
  u_first_name: string;
  u_last_name: string;
  u_birth_date: string;
  u_contact_phone: string;
  u_contact_email: string;
  u_street: string;
  u_apartment_number: string;
  u_zip_code: string;
  u_city: string;
  u_country: string;
  u_contact_info: string;
}

interface TicketData {
  t_ticket_id: string; // nowy UUID
  t_ticket_name: string;
  t_ticket_price: string;
  t_vip_price: string;
  t_quantity: string;
  t_qr_code: string;
}

interface CreateEventRequestBody {
  eventData: EventData;
  organizerData: OrganizerData;
  ticketData: TicketData;
}

export async function createNewEvent(
  eventData: EventData,
  organizerData: OrganizerData,
  ticketData: TicketData
): Promise<void> {
  try {
    const token = await getUserToken();
    if (!token) {
      window.alert("User is not authenticated.");
      return;
    }

    const requestBody: CreateEventRequestBody = {
      eventData,
      organizerData,
      ticketData,
    };

    console.log("📦 Wysyłane dane do API:", JSON.stringify(requestBody, null, 2));

    const supabaseFunctionDomain = import.meta.env.VITE_SUPABASE_FUNCTION_DOMAIN;
    if (!supabaseFunctionDomain) {
      console.error("Supabase function domain is not set in .env");
      window.alert("Server configuration error.");
      return;
    }

    const apiUrl = `https://${supabaseFunctionDomain}.supabase.co/functions/v1/create-new-event`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json().catch(() => null);
    console.log("🧾 Odpowiedź serwera:", data);

    if (!response.ok || !data) {
      window.alert("Server error. Please try again.");
      return;
    }

    window.alert("New event created successfully!");
  } catch (error) {
    console.error("❌ Create event error:", error);
    window.alert("Failed to process the new event.");
  }
}
