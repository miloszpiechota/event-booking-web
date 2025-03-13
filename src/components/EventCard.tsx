import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertDateTime } from "../api/convertDateTime.ts";

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

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const { formattedStartDate, formattedEndDate } = convertDateTime(event.start_date, event.end_date);

  const [isReadMore, setIsReadMore] = useState(false);

  // Funkcja do obsługi "Read More / Read Less"
  const toggleReadMore = () => {
    setIsReadMore((prev) => !prev);
  };

  return (
    <div 
      className="flex flex-col sm:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      {/* Obrazek (po lewej) */}
      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
        <img
          className="object-cover h-70 w-full rounded-2xl sm:rounded-none"
          src={event.image_url}
          alt={event.name}
        />
      </div>

      {/* Treść (po prawej) */}
      <div className="w-full sm:w-2/3 p-6 flex flex-col space-y-3">
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

export default EventCard;
