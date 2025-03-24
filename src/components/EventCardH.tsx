import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../api/formatDateTime.ts"; // Funkcja do formatowania daty

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
  const navigate = useNavigate();

  // Formatowanie daty
  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  return (
    <div className="flex flex-col w-full max-w-xs bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg">
      {/* Obrazek */}
      <div className="h-48 w-full">
        <img
          src={event.image_url}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sekcja szczegółów */}
      <div className="w-full bg-black text-white p-6 flex flex-col relative rounded-lg shadow-lg">
        {/* Sekcja z datą i lokalizacją w jednym rzędzie */}
        <div className="flex flex-col md:flex-row w-full mb-4">
          {/* Kontener dla daty */}
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

          {/* Kontener lokalizacji */}
          <div className="w-full md:w-2/3 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center">
            {/* Ulica i numer mieszkania */}
            <p className="text-sm font-semibold text-gray-300 text-left">
              📍{event.location.street_name}{" "}
              {event.location.apartment_number &&
                `${event.location.apartment_number}`}
            </p>

            {/* Miasto i kraj */}
            <p className="text-sm font-semibold text-gray-300 text-left">
              {event.location.city_name}, {event.location.country_name}
            </p>
          </div>
        </div>

        {/* Sekcja opisu wydarzenia */}
        <div className="mb-4">
          <p className="text-sm text-left text-gray-300">
            {event.short_description}
          </p>
        </div>

        {/* Przycisk Explore */}
        <button
          className="px-6 py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          onClick={() => navigate(`/event/${event.id}`)} // Przykład nawigacji do strony wydarzenia
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default EventCard2;
