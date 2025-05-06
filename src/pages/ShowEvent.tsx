import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventContext.tsx";
import Header from "../components/Header.tsx";
import "leaflet/dist/leaflet.css";
import { formatDateTime } from "../api/formatDateTime.ts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { formatLocalization } from "../api/formatLocalization.ts";

const ShowEvent = () => {
  const { id } = useParams();
  const { events } = useEvents();
  const navigate = useNavigate();

  if (!events?.length) {
    return (
      <p className="text-white text-center mt-10">
        Ładowanie wydarzeń lub brak danych...
      </p>
    );
  }

  const event = events.find((event) => event.id.toString() === id);
  if (!event) {
    return (
      <p className="text-white text-center mt-10">
        Wydarzenie nie zostało znalezione.
      </p>
    );
  }

  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-end px-6 pb-12">
          <div className="flex flex-col max-w-xl">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="text-white font-semibold text-base hover:text-red-400 transition mb-2 flex items-center gap-2"
            >
              <span className="text-xl">←</span> Back
            </button>

            {/* TITLE + DESCRIPTION */}
            <h1 className="text-4xl font-bold text-white">{event.name}</h1>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed mt-2">
              {event.short_description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section - two columns */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-300">{event.long_description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Start Date & End Date
            </h2>
            <p className="text-gray-400">
              Start:{" "}
              <strong>
                {formattedStartDate.formattedDate}{" "}
                {formattedStartDate.formattedTime}
              </strong>
            </p>
            <p className="text-gray-400">
              End:{" "}
              <strong>
                {formattedEndDate.formattedDate}{" "}
                {formattedEndDate.formattedTime}
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Contact the Organizer
            </h2>
            <p className="text-gray-400">
              📧 {event.event_organizer.contact_email}
            </p>
            <p className="text-gray-400">
              📞 {event.event_organizer.contact_info}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Category</h2>
            <span className="inline-block bg-gray-700 px-4 py-2 rounded-full text-sm">
              {event.event_category.name}
            </span>
          </section>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[450px] space-y-5">
          {/* Event Info */}
          <div className="bg-gradient-to-b from-black/70 via-gray-900 to-black/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-center">🎟️ Event Info</h2>
            <div className="flex flex-row gap-3 flex-wrap">
              <span className="bg-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                📅 <span className="font-semibold">Start:</span>{" "}
                {formattedStartDate.formattedDate}{" "}
                {formattedStartDate.formattedTime}
              </span>
              <span className="bg-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                🛑 <span className="font-semibold">End:</span>{" "}
                {formattedEndDate.formattedDate}{" "}
                {formattedEndDate.formattedTime}
              </span>
            </div>

            <button className="text-sm text-blue-400 hover:underline text-center w-full">
              + Add to Calendar
            </button>

            <div>
              <h3 className="text-base font-semibold mb-2">Ticket Types</h3>
              <div className="flex flex-row gap-3 flex-wrap">
                <span className="bg-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-between min-w-[120px]">
                  <span>🎫 Standard</span>
                  <span className="ml-2">
                    {event.event_ticket.ticket_pricing.ticket_price} zł
                  </span>
                </span>
                <span className="bg-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-between min-w-[120px]">
                  <span>🥂 VIP</span>
                  <span className="ml-2">
                    {event.event_ticket.ticket_pricing.vip_price} zł
                  </span>
                </span>
              </div>
            </div>

            <button
              className="w-full bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl text-white font-semibold text-base shadow-md"
              onClick={() =>
                navigate(`/event/${event.id}/book`, { state: { event } })
              }
            >
              🔖 Book Now
            </button>
          </div>

          {/* Map */}
          <div className="bg-gray-800 p-4 rounded-2xl shadow-xl space-y-3">
            <div className="w-full h-64 rounded-xl overflow-hidden ring-1 ring-white/10">
              <MapContainer
                center={[event.location.latitude, event.location.longitude]}
                zoom={13}
                className="w-full h-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[event.location.latitude, event.location.longitude]}
                >
                  <Popup>
                    {formatLocalization(
                      event.location.street_name,
                      event.location.apartment_number,
                      event.location.city_name,
                      event.location.country_name
                    )}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <p className="text-center text-sm text-gray-300">
              {formatLocalization(
                event.location.street_name,
                event.location.apartment_number,
                event.location.city_name,
                event.location.country_name
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
