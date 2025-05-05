import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../api/formatDateTime.ts";
import { formatLocalization } from "../api/formatLocalization.ts";

interface Event {
  event_organizer?: { first_name: string; last_name: string };
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
  const { formattedStartDate } = formatDateTime(event.start_date, event.end_date);

  return (
    <div
      className="max-w-3xl w-full flex flex-col md:flex-row bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-md transition-transform transform hover:scale-[1.02] cursor-pointer min-h-[400px]"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      {/* Obrazek z gradientem */}
      <div
        className="relative w-full md:w-2/3 bg-cover bg-center min-h-[300px]"
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {event.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Creator: {event.event_organizer?.first_name}{" "}
            {event.event_organizer?.last_name}
          </p>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            {event.short_description}
          </p>
        </div>
      </div>

      {/* Szczegóły */}
      <div className="w-full md:w-1/3 bg-black/40 backdrop-blur-lg text-white p-6 flex flex-col justify-between rounded-none md:rounded-r-2xl">

        <div className="flex flex-col gap-4">
          {/* Data */}
          <div className="p-3 bg-gray-800 rounded-xl text-center shadow">
            <p className="text-3xl font-bold text-red-500">
              {formattedStartDate.formattedDay}
            </p>
            <p className="uppercase text-gray-300 font-semibold">
              {formattedStartDate.formattedMonth}
            </p>
            <p className="text-sm text-gray-400">
              {formattedStartDate.formattedYear}
            </p>
          </div>

          {/* Lokalizacja */}
          <div className="bg-gray-800 rounded-xl p-3 text-sm shadow text-center text-gray-300">
            <p>
              📍{" "}
              {formatLocalization(
                event.location.street_name,
                event.location.apartment_number,
                event.location.city_name,
                event.location.country_name
              )}
            </p>
          </div>
        </div>

        {/* Przycisk */}
        <button
          className="mt-6 w-full py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-semibold"
          onClick={(e) => {
            e.stopPropagation(); // zapobiega kliknięciu całej karty
            navigate(`/event/${event.id}`);
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default EventCard;
