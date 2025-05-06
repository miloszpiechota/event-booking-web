import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataContext.tsx";
import { createNewEvent } from "../api/createEvent.ts";

function ConfirmNewEvent() {
  const navigate = useNavigate();
  const { eventData, organizerData, ticketData } = useFormData();

  const handleCreateEvent = async () => {
    await createNewEvent(eventData, organizerData, ticketData);
    // navigate("/events");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <div className="bg-black/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-10">
        <h1 className="text-3xl font-bold text-center">📄 Confirm Your Event</h1>

        {/* Organizer */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">👤 Organizer Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><strong>Name:</strong> {organizerData.u_first_name} {organizerData.u_last_name}</p>
            <p><strong>Birth Date:</strong> {organizerData.u_birth_date}</p>
            <p><strong>Phone:</strong> {organizerData.u_contact_phone}</p>
            <p><strong>Email:</strong> {organizerData.u_contact_email}</p>
            <p className="sm:col-span-2">
              <strong>Address:</strong> {organizerData.u_street} {organizerData.u_apartment_number}, {organizerData.u_zip_code} {organizerData.u_city}, {organizerData.u_country}
            </p>
            <p className="sm:col-span-2"><strong>Additional Info:</strong> {organizerData.u_contact_info}</p>
          </div>
        </section>

        {/* Event */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">📍 Event Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><strong>Name:</strong> {eventData.e_event_name}</p>
            <p><strong>Category:</strong> {eventData.e_event_category_name}</p>
            <p><strong>Start:</strong> {eventData.e_start_date} ({eventData.e_start_time})</p>
            <p><strong>End:</strong> {eventData.e_end_date} ({eventData.e_end_time})</p>
            <p className="sm:col-span-2"><strong>Short Description:</strong> {eventData.e_short_descryp}</p>
            <p className="sm:col-span-2"><strong>Long Description:</strong> {eventData.e_long_descryp}</p>
            <p className="sm:col-span-2">
              <strong>Location:</strong> {eventData.e_street} {eventData.e_apartment_number}, {eventData.e_zip_code} {eventData.e_city}, {eventData.e_country}
            </p>
            <p><strong>Latitude:</strong> {eventData.e_latitude}</p>
            <p><strong>Longitude:</strong> {eventData.e_longitude}</p>
          </div>
          {eventData.e_image_url && (
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">🖼️ Event Image:</p>
              <img
                src={eventData.e_image_url}
                alt="Event"
                className="w-full max-h-60 object-cover rounded-lg"
              />
            </div>
          )}
        </section>

        {/* Ticket */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">🎟️ Ticket Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><strong>Ticket Name:</strong> {ticketData.t_ticket_name}</p>
            <p><strong>Quantity:</strong> {ticketData.t_quantity}</p>
            <p>
              <strong>Standard Price:</strong>{" "}
              {ticketData.t_ticket_price === "0" ? "Free" : `${ticketData.t_ticket_price} zł`}
            </p>
            <p>
              <strong>VIP Price:</strong>{" "}
              {ticketData.t_vip_price === "0" ? "Free" : `${ticketData.t_vip_price} zł`}
            </p>
            {ticketData.t_qr_code && (
              <p className="sm:col-span-2">
                <strong>QR Code:</strong>{" "}
                {ticketData.t_qr_code.length > 50
                  ? ticketData.t_qr_code.substring(0, 50) + "..."
                  : ticketData.t_qr_code}
              </p>
            )}
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg font-medium transition"
          >
            ← Back
          </button>
          <button
            onClick={handleCreateEvent}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold transition"
          >
            ✅ Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmNewEvent;
