import React, { useState } from "react";
import { convertDateTime } from "../api/convertDateTime.ts"; // Funkcja do formatowania daty

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
  };
}

interface EventCard2Props {
  event: Event;
}

const EventCard2: React.FC<EventCard2Props> = ({ event }) => {
  const { formattedStartDate, formattedEndDate } = convertDateTime(event.start_date, event.end_date);

  const [isReadMore, setIsReadMore] = useState(false);

  // Funkcja do obsługi "Read More / Read Less"
  const toggleReadMore = () => {
    setIsReadMore((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full max-w-xs bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg ">
      {/* Obrazek */}
      <div className="h-48 w-full">
        <img src={event.image_url} alt={event.name} className="w-full h-full object-cover" />
      </div>

      {/* Treść */}
      <div className="p-4 flex flex-col space-y-3">
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{event.name}</h5>

        {/* Opis */}
        <p className="text-base text-gray-600 dark:text-gray-300">
          {isReadMore ? event.short_description : `${event.short_description.substring(0, 100)}...`}
        </p>

        {/* Przycisk Read More */}
        <button
          onClick={toggleReadMore}
          className="text-sm text-blue-600 dark:text-blue-400 mt-2"
        >
          {isReadMore ? "Read Less" : "Read More"}
        </button>

        {/* Data */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formattedStartDate} - {formattedEndDate}
        </p>

        {/* Lokalizacja */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {event.location.city_name}, {event.location.street_name}, {event.location.country_name}
        </p>
      </div>
    </div>
  );
};

export default EventCard2;
