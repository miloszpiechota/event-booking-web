import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../api/formatDateTime.ts"; // Funkcja do formatowania daty
import { useTicketAvailability } from "../../context/TicketAvailabilityContext.tsx";
import soldOutImage from "../assets/sold-out.png"; // Importuj obrazek "sold out"

interface Event {
  id: string;
  name: string;
  short_description: string;
  start_date: string;
  end_date: string;
  image_url: string;
  location: {
    city_name: string;
    street_name: string;
    country_name: string;
    apartment_number?: string;
  };
}

interface EventCard2Props {
  event: Event;
}

const EventCard2: React.FC<EventCard2Props> = ({ event }) => {
  const { availableTickets } = useTicketAvailability();
  const navigate = useNavigate();
  // Sprawdzamy, czy event jest wyprzedany
  const isEventSoldOut =
    event?.event_ticket?.quantity !== undefined &&
    event.event_ticket.quantity <= 0;
  const isSoldOut = isEventSoldOut || availableTickets <= 0;

  // Formatowanie daty
  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  return (
    <div className="flex flex-col w-full h-full max-w-xs min-h-[500px] bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg">
      {/* Obrazek */}
      <div className="h-48 w-full flex-shrink-0">
        {isSoldOut ? (
          <img
            src={soldOutImage}
            alt="Sold Out"
            className="w-full h-full object-cover bg-black bg-opacity-70"
          />
        ) : (
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Sekcja szczegółów */}
      <div className="flex flex-col justify-between flex-grow w-full bg-black text-white p-6 rounded-lg shadow-lg">
        {/* Data + Lokalizacja */}
        {/* Nazwa wydarzenia */}
        <h3 className="text-xl font-bold text-white text-left mb-3">
          {event.name}
        </h3>

        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="w-full md:w-1/3 p-2 bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center mb-4 md:mb-0 md:mr-2">
            <p className="text-3xl font-extrabold text-red-600 leading-tight">
              {formattedStartDate.formattedDay}
            </p>
            <p className="text-md uppercase font-semibold text-gray-300">
              {formattedStartDate.formattedMonth}
            </p>
            <p className="text-sm font-medium text-gray-400">
              {formattedStartDate.formattedYear}
            </p>
          </div>
          <div className="w-full md:w-2/3 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col text-center">
            <p className="text-sm font-semibold text-gray-300">
              📍{event.location.street_name}
                {event.location.apartment_number &&
                `${event.location.apartment_number}`}
            </p>
            <p className="text-sm font-semibold text-gray-300">
              {event.location.city_name}, {event.location.country_name}
            </p>
          </div>
        </div>

        {/* Opis */}
        <div className="mb-4 flex-grow">
          <p className="text-sm text-left text-gray-300 line-clamp-4">
            {event.short_description}
          </p>
        </div>

        {/* Przycisk */}
        <button
          className={`px-6 py-2 mt-auto text-white font-semibold rounded-lg transition duration-300 ${
            isSoldOut
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={() => !isSoldOut && navigate(`/event/${event.id}`)}
          disabled={isSoldOut}
        >
          {isSoldOut ? "WYPRZEDANE" : "Explore"}
        </button>
      </div>
    </div>
  );
};

export default EventCard2;
