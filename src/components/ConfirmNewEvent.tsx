import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataContext.tsx";
// Zakładamy, że masz już zdefiniowaną funkcję getUserToken (lub możesz użyć np. supabase.auth.getSession())
import { supabase } from "../../supabaseClient.ts";
function ConfirmNewEvent() {
  const navigate = useNavigate();
  const { eventData, organizerData, ticketData } = useFormData();
  const getUserToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      console.error("User is not logged in or session is missing", error);
      return null;
    }
    return data.session.access_token; // Zwracamy token JWT użytkownika
  };
  const createNewEvent = async () => {
    try {
      // 1. Pobranie tokena użytkownika
      const token = await getUserToken(); // Upewnij się, że ta funkcja zwraca token
      if (!token) {
        window.alert("User is not authenticated.");
        return;
      }

      // 2. Przygotowanie danych do wysłania
      const requestBody = {
        eventData,
        organizerData,
        ticketData,
      };

      console.log("Wysyłane dane do API:", JSON.stringify(requestBody, null, 2));

      // 3. Wysłanie żądania POST do endpointu funkcji Supabase
      const response = await fetch("https://azbpvxuvzjcahzrkwuxk.supabase.co/functions/v1/create-new-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      // 4. Parsowanie odpowiedzi
      const data = await response.json().catch(() => null);
      console.log("Odpowiedź serwera:", data);

      // 5. Sprawdzenie, czy operacja się powiodła
      if (!response.ok || !data) {
        window.alert("Server error. Please try again.");
        return;
      }

      // 6. Sukces – komunikat i przekierowanie
      window.alert("New event created successfully!");
     // navigate("/events"); // lub inna ścieżka, na którą chcesz przekierować

    } catch (error) {
      console.error("Create event error:", error);
      window.alert("Failed to process the new event.");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Confirm Your Event Details
      </h1>

      {/* Organizer Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Organizer Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Name:</strong> {organizerData.u_first_name}{" "}
            {organizerData.u_last_name}
          </li>
          <li>
            <strong>Birth Date:</strong> {organizerData.u_birth_date}
          </li>
          <li>
            <strong>Phone:</strong> {organizerData.u_contact_phone}
          </li>
          <li>
            <strong>Email:</strong> {organizerData.u_contact_email}
          </li>
          <li>
            <strong>Address:</strong> {organizerData.u_street}{" "}
            {organizerData.u_apartment_number}, {organizerData.u_zip_code}{" "}
            {organizerData.u_city}, {organizerData.u_country}
          </li>
          <li>
            <strong>Additional Contact Info:</strong>{" "}
            {organizerData.u_contact_info}
          </li>
        </ul>
      </section>

      {/* Event Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Event Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Event Name:</strong> {eventData.e_event_name}
          </li>
          <li>
            <strong>Event Category:</strong> {eventData.e_event_category_name}
          </li>

          <li>
            <strong>Start Date:</strong> {eventData.e_start_date} (
            {eventData.e_start_time})
          </li>
          <li>
            <strong>End Date:</strong> {eventData.e_end_date} (
            {eventData.e_end_time})
          </li>
          <li>
            <strong>Short Description:</strong> {eventData.e_short_descryp}
          </li>
          <li>
            <strong>Long Description:</strong> {eventData.e_long_descryp}
          </li>
          <li>
            <strong>Location:</strong> {eventData.e_street}{" "}
            {eventData.e_apartment_number}, {eventData.e_zip_code}{" "}
            {eventData.e_city}, {eventData.e_country}
          </li>
          <li>
            <strong>Latitude/Longitude:</strong> {eventData.e_latitude},{" "}
            {eventData.e_longitude}
          </li>
          {eventData.e_image_url && (
            <li>
              <strong>Event Image:</strong>
              <img
                src={eventData.e_image_url}
                alt="Event"
                className="w-full max-h-60 object-cover mt-2 rounded"
              />
            </li>
          )}
        </ul>
      </section>

      {/* Ticket Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Ticket Name:</strong> {ticketData.t_ticket_name}
          </li>
          <li>
            <strong>Quantity:</strong> {ticketData.t_quantity}
          </li>
          <li>
            <strong>Ticket Price:</strong>{" "}
            {ticketData.t_ticket_price === "0"
              ? "Free"
              : `$${ticketData.t_ticket_price}`}
          </li>
          <li>
            <strong>VIP Ticket Price:</strong>{" "}
            {ticketData.t_vip_price === "0"
              ? "Free"
              : `$${ticketData.t_vip_price}`}
          </li>
          {ticketData.t_qr_code && (
            <li>
              <strong>QR Code:</strong>
              <img
                src={ticketData.t_qr_code}
                alt="QR Code"
                className="block mt-2 mx-auto w-40 h-40"
              />
            </li>
          )}
        </ul>
      </section>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={createNewEvent}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}

export default ConfirmNewEvent;
