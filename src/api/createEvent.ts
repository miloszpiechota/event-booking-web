// src/api/createEvent.ts
import { supabase } from "../../supabaseClient.ts";
import { getUserToken } from "../api/auth.ts";

interface CreateEventRequestBody {
  eventData: any;
  organizerData: any;
  ticketData: any;
}

export async function createNewEvent(
  eventData: any,
  organizerData: any,
  ticketData: any
): Promise<void> {
  try {
    // Pobranie tokena użytkownika
    const token = await getUserToken();
    if (!token) {
      window.alert("User is not authenticated.");
      return;
    }

    // Przygotowanie danych do wysłania
    const requestBody: CreateEventRequestBody = {
      eventData,
      organizerData,
      ticketData,
    };

    console.log("Wysyłane dane do API:", JSON.stringify(requestBody, null, 2));

    // Pobranie domeny funkcji z .env
    const supabaseFunctionDomain = import.meta.env.VITE_SUPABASE_FUNCTION_DOMAIN;
    if (!supabaseFunctionDomain) {
      console.error("Supabase function domain is not set in .env");
      window.alert("Server configuration error.");
      return;
    }
    const apiUrl = `https://${supabaseFunctionDomain}.supabase.co/functions/v1/create-new-event`;

    // Wysłanie żądania POST do endpointu funkcji Supabase
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Parsowanie odpowiedzi
    const data = await response.json().catch(() => null);
    console.log("Odpowiedź serwera:", data);

    if (!response.ok || !data) {
      window.alert("Server error. Please try again.");
      return;
    }

    window.alert("New event created successfully!");
  } catch (error) {
    console.error("Create event error:", error);
    window.alert("Failed to process the new event.");
  }
}
