import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventContext.tsx";
import Header from "../components/Header.tsx";
import "leaflet/dist/leaflet.css";
import { formatDateTime } from "../api/formatDateTime.ts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ShowEvent = () => {
  const { id } = useParams();
  const { events } = useEvents();
  const navigate = useNavigate();

  // Sprawdzenie, czy dane wydarzenie istnieje
  if (!events?.length) {
    return (
      <p className="text-white text-center mt-10">
        Ładowanie wydarzeń lub brak danych...
      </p>
    );
  }

  const event = events.find((event) => event.id.toString() === id);

  // Używamy formatDateTime, aby uzyskać sformatowane daty
  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event?.start_date,
    event?.end_date
  );

  // Sprawdzamy, czy wydarzenie zostało znalezione
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

      {/* Sekcja główna */}
      <div className="relative w-full h-[400px] flex items-center">
        {/* Tło obrazka */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image_url})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>{" "}
          {/* Przyciemnienie */}
        </div>

        {/* Zawartość */}
        <div className="relative z-10 w-5/6 mx-auto flex flex-col lg:flex-row items-start gap-12 relative top-20">
          {/* Lewa strona: Opis wydarzenia */}
          <div className="w-full lg:w-2/3 space-y-6">
            <button
              className="text-gray-400 flex items-center space-x-2 hover:text-white"
              onClick={() => navigate("/")}
            >
              ← Back
            </button>
            <h1 className="text-4xl font-bold">{event.name}</h1>
            <p className="text-gray-300">
              By {event.event_organizer.first_name}{" "}
              {event.event_organizer.last_name}
            </p>
            <p className="text-gray-400">
              {event.location.street_name}, {event.location.city_name},
              {event.location.apartment_number}, {event.location.country_name},
              {event.location.zip_code}
            </p>
            <button className="text-white underline hover:text-purple-400">
              View Map
            </button>
          </div>

          {/* Prawa strona: Informacje o wydarzeniu */}
          <div className="w-full lg:w-2/5 bg-gray-900 p-6 rounded-xl shadow-lg text-white relative left-10 top-5">
            <h2 className="text-xl font-semibold mb-4">
              Start Date & End Date
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[formattedStartDate, formattedEndDate].map((date, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex flex-col items-center space-y-1 w-30">
                    <p className="text-3xl font-extrabold text-red-600 leading-tight">
                      {date?.formattedDay}
                    </p>
                    <p className="text-lg uppercase font-semibold text-gray-300">
                      {date?.formattedMonth}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <p className="text-base font-medium text-gray-400">
                      {date?.formattedYear}
                    </p>
                    <p className="text-base font-medium text-gray-400">
                      {date?.formattedTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="text-blue-400 mt-4 hover:underline focus:outline-none">
              + Add to Calendar
            </button>

            <h2 className="text-xl font-semibold mt-6">
              Standard Price & VIP Price
            </h2>
            <div className="flex gap-4 flex-wrap mt-2">
              <span className="bg-gray-700 px-6 py-2 rounded-full text-sm font-semibold">
                {event.event_ticket.ticket_pricing.ticket_price} $
              </span>
              <span className="bg-gray-700 px-6 py-2 rounded-full text-sm font-semibold">
                {event.event_ticket.ticket_pricing.vip_price} $
              </span>
            </div>

            <button
              className="px-6 py-3 mt-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 w-full"
              onClick={() =>
                navigate(`/event/${event.id}/book`, { state: { event } })
              }
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Opis wydarzenia */}
      <div className="w-5/6 mx-auto mt-10 flex flex-col lg:flex-row gap-8">
        {/* Lewa strona */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h2 className="text-2xl font-semibold">Description</h2>
          <p className="text-gray-300">{event.short_description}</p>
          <p className="text-gray-300">{event.long_description}</p>

          <h3 className="text-xl font-semibold">Start Date & End Date</h3>
          <p className="text-gray-400">
            Start Date:{" "}
            <strong>
              {formattedStartDate.formattedDate}{" "}
              {formattedStartDate.formattedTime}
            </strong>
          </p>
          {formattedEndDate && (
            <p className="text-gray-400">
              End Date:{" "}
              <strong>
                {formattedEndDate.formattedDate}{" "}
                {formattedEndDate.formattedTime}
              </strong>
            </p>
          )}

          <h3 className="text-xl font-semibold">
            How can I contact the organizer with any question?
          </h3>
          <p className="text-gray-400">
            Contact e-mail: {event.event_organizer.contact_email} 
            </p>
          <p className="text-gray-400">
            Contact info: {event.event_organizer.contact_info}
          </p>
        </div>

        {/* Prawa strona: Mapa i lokalizacja */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg relative left-10 top-20 h-90">
          <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
            <MapContainer
              center={[event.location.latitude, event.location.longitude]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker
                position={[event.location.latitude, event.location.longitude]}
              >
                <Popup>
                  {event.location.street_name}, {event.location.city_name}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <h2 className="text-lg font-semibold text-center">
            {event.location.street_name}, {event.location.city_name}
          </h2>
        </div>
      </div>

      {/* Sekcja tagów */}
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
