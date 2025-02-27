import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventContext.tsx";
import Header from "../components/Header.tsx";

import 'leaflet/dist/leaflet.css';
import { convertDateTime } from "../api/convertDateTime.ts";

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
  const { formattedStartDate, formattedEndDate } = convertDateTime(event.start_date, event.end_date);

  if (!event) {
    return (
      <p className="text-white text-center mt-10">
        Wydarzenie nie zostało znalezione.
      </p>
    );
  }

  

  return (
    <div className="bg-gray-100 min-h-screen">
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
        <div className="relative z-10 w-5/6 mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Lewa strona: Opis wydarzenia */}
          <div className="w-full lg:w-2/3 text-white space-y-4">
            <button className="text-gray-300 flex items-center space-x-2">
              ← Back
            </button>
            <h1 className="text-4xl font-bold">{event.name}</h1>
            <p className="text-gray-200">By {event.event_organizer.first_name} {event.event_organizer.last_name}</p>
            <p className="text-gray-300">
              {event.location.street_name}, {event.location.city_name},
              {event.location.apartment_number}, {event.location.country_name},{" "}
              {event.location.zip_code}
            </p>
            <button className="text-white underline">View Map</button>
          </div>

          {/* Prawa strona: Kontener z datą i przyciskami */}
          <div className="w-full lg:w-2/4 bg-white p-6 rounded-xl shadow-lg text-black">
            <h2 className="text-xl font-semibold">Start Date & Time</h2>
           <p>Start Date: {formattedStartDate}</p>
           <p>End Date: {formattedStartDate}</p>
            <button className="text-blue-600 mt-2">+ Add to Calendar</button>
            <h2 className="text-xl font-semibold">
              Standard Price & VIP Price
            </h2>
            <div className="flex gap-2 flex-wrap mt-2">
            <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">
              {event.event_ticket.ticket_pricing.ticket_price} $
            </span>
            <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">
              {event.event_ticket.ticket_pricing.vip_price} $
            </span>
            </div>
            <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg mt-4"
            onClick={() => navigate(`/event/${event.id}/book`,{ state: { event } })}>
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
          <p className="text-gray-700">{event.short_description}</p>
          <p className="text-gray-700">{event.long_description}</p>

          <h3 className="text-xl font-semibold">Start Data & End Date</h3>
          <p className="text-gray-600">
          Start Date: <strong>{formattedStartDate}</strong>
          </p>
          <p className="text-gray-600">
          End Date: <strong>{formattedEndDate}</strong>
          </p>

          <h3 className="text-xl font-semibold">
            How can I contact the organizer with any question?
          </h3>
          <p className="text-gray-600">
            Contact e-mail:
           {event.event_organizer.contact_email}{" "}
          Contact info:
              {event.event_organizer.contact_info}{" "}
          </p>
        </div>

        {/* Prawa strona: Mapa i lokalizacja */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Event Location</h2>
          <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>{" "}
          {/* Placeholder dla mapy */}
          <p className="text-gray-700">{event.location.full_address}</p>
        </div>
      </div>

      {/* Sekcja tagów */}
      <div className="w-5/6 mx-auto mt-8 pb-10">
        <h3 className="text-xl font-semibold mb-4">Event Category</h3>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">
            {event.event_category.name}
          </span>
        
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
