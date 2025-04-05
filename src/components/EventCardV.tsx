import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../api/formatDateTime.ts";
import { formatLocalization } from "../api/formatLocalization.ts";

interface Event {
  event_organizer?: string;
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

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  return (
    <div
      className="max-w-3xl w-full backdrop-blur-lg shadow-lg rounded-l-lg overflow-hidden flex cursor-pointer transform transition-transform hover:scale-105 flex-col md:flex-row"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      {/* Sekcja obrazka */}
      <div
        className="relative w-full md:w-2/3 bg-cover bg-center min-h-[300px]"
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {event.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-200">
            Creator:
            {event.event_organizer?.first_name}{" "}
            {event.event_organizer?.last_name}
          </p>
          <p className="text-xs sm:text-sm text-left text-gray-200 mt-4">
            {event.short_description}
          </p>
        </div>
      </div>

      {/* Sekcja szczegółów */}
      <div className="w-full md:w-1/3 bg-black text-white p-6 flex flex-col relative  rounded-r-lg shadow-lg">
        {/* Kontener dla daty */}
        <div className="w-full p-2 bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center mb-4">
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
        <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 mb-4">
          {/* Ulica i numer mieszkania */}
          <p className="text-sm sm:text-base font-semibold text-gray-300 text-center">
            📍{" "}
            {formatLocalization(
              event.location.street_name,
              event.location.apartment_number,
              event.location.city_name,
              event.location.country_name
            )}
          </p>
        </div>

        {/* Przycisk Explore */}
        <button
          className="px-6 py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default EventCard;
