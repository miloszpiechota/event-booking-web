import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../../context/EventContext.tsx";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();

  // Wyszukaj event o podanym id
  const event = events.find((event) => event.id.toString() === id);

  if (!event) {
    return <p>Wydarzenie nie zostało znalezione.</p>;
  }

  return (
    <div
      className="flex flex-col sm:flex-row w-full max-w-4xl rounded overflow-hidden shadow-lg bg-white/30 dark:bg-black/30 backdrop-blur-md border border-grey p-4 sm:p-6 gap-x-6 cursor-pointer mb-6"
      
    >
      {/* Obrazek (po lewej) */}
      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={event.image_url}
          alt={event.name}
        />
      </div>

      {/* Treść (po prawej) */}
      <div className="w-full sm:w-2/3 flex flex-col items-start text-left space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {event.name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {event.short_description}
        </p>
        <p className="text-gray-300">
          {event.start_date} - {event.end_date}
        </p>
        <p className="text-gray-300">
          {event.location.city_name}, {event.location.street_name},{" "}
          {event.location.country_name}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;