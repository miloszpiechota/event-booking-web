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
  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event?.start_date,
    event?.end_date
  );

  if (!event) {
    return (
      <p className="text-white text-center mt-10">
        Wydarzenie nie zostało znalezione.
      </p>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Hero */}
      <div className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${event.image_url})` }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto h-full flex justify-between items-start px-6 pt-24">
          {/* Left - title & description */}
          <div className="flex flex-col space-y-4 max-w-xl">
            <button
              onClick={() => navigate("/")}
              className="text-white/80 hover:text-white text-sm font-medium"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-bold">{event.name}</h1>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed">
              {event.short_description}
            </p>
          </div>

          {/* Right - Event Info */}
          <div className="hidden lg:flex flex-col w-[400px] bg-black/50 backdrop-blur-md p-5 rounded-2xl shadow-xl text-white mt-8 ml-auto">

            <h2 className="text-xl font-bold mb-4 text-center">Event Info</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {[formattedStartDate, formattedEndDate].map((date, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-3 text-center shadow">
                  <p className="text-2xl font-extrabold text-red-500">{date?.formattedDay}</p>
                  <p className="text-sm uppercase font-semibold text-gray-300">{date?.formattedMonth}</p>
                  <p className="text-xs text-gray-400">{date?.formattedYear}</p>
                  <p className="text-xs text-gray-400">{date?.formattedTime}</p>
                </div>
              ))}
            </div>

            <button className="text-sm text-blue-400 hover:underline block text-center mb-4">
              + Add to Calendar
            </button>

            <h3 className="text-base font-semibold mb-2">Prices</h3>
            <div className="flex gap-3 mb-6">
              <span className="bg-gray-700 px-4 py-1.5 rounded-full text-xs font-medium">
                {event.event_ticket.ticket_pricing.ticket_price} $
              </span>
              <span className="bg-gray-700 px-4 py-1.5 rounded-full text-xs font-medium">
                {event.event_ticket.ticket_pricing.vip_price} $
              </span>
            </div>

            <button
              className="w-full bg-red-600 hover:bg-red-700 transition-colors px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
              onClick={() => navigate(`/event/${event.id}/book`, { state: { event } })}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Description & Map */}
      <div className="w-5/6 mx-auto mt-40 flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h2 className="text-2xl font-semibold">Description</h2>
          <p className="text-gray-300">{event.long_description}</p>

          <h3 className="text-xl font-semibold">Start Date & End Date</h3>
          <p className="text-gray-400">
            Start: <strong>{formattedStartDate.formattedDate} {formattedStartDate.formattedTime}</strong>
          </p>
          {formattedEndDate && (
            <p className="text-gray-400">
              End: <strong>{formattedEndDate.formattedDate} {formattedEndDate.formattedTime}</strong>
            </p>
          )}

          <h3 className="text-xl font-semibold">How can I contact the organizer?</h3>
          <p className="text-gray-400">Email: {event.event_organizer.contact_email}</p>
          <p className="text-gray-400">Info: {event.event_organizer.contact_info}</p>
        </div>

        {/* Right - Map */}
        <div className="w-full lg:w-1/3 bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-xl mt-10 lg:mt-0 ml-auto">
          <div className="h-64 rounded-lg overflow-hidden mb-4">
            <MapContainer
              center={[event.location.latitude, event.location.longitude]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[event.location.latitude, event.location.longitude]}>
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
          <h2 className="text-center text-sm font-medium text-gray-300">
            {formatLocalization(
              event.location.street_name,
              event.location.apartment_number,
              event.location.city_name,
              event.location.country_name
            )}
          </h2>
        </div>
      </div>

      {/* Category Tag */}
      <div className="w-5/6 mx-auto mt-8 pb-10">
        <h3 className="text-xl font-semibold mb-4">Event Category</h3>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
            {event.event_category.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
