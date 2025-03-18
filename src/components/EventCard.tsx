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
  const { formattedStartDate, formattedEndDate } = convertDateTime(
    event.start_date,
    event.end_date
  );
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => setIsReadMore((prev) => !prev);

  return (
    <div
      className="max-w-3xl w-full backdrop-blur-lg shadow-lg rounded-lg overflow-hidden flex flex-row cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      {/* Sekcja obrazka */}
      <div
        className="relative w-2/3 bg-cover bg-center min-h-[300px]"
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <h2 className="text-3xl font-bold text-white mb-2">{event.name}</h2>
          <p className="text-sm text-gray-200">
            {event.location.city_name}, {event.location.street_name}
          </p>
          <p className="text-sm text-gray-200">{event.location.country_name}</p>
          <p className="text-sm text-gray-100 mt-4">
            {isReadMore
              ? event.short_description
              : `${event.short_description.substring(0, 100)}...`}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleReadMore();
            }}
            className="mt-2 w-max text-blue-300 text-xs font-semibold hover:underline"
          >
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* Sekcja szczegółów */}
      <div className="w-1/3 bg-black/40 backdrop-blur-lg  text-white p-6 flex flex-col relative rounded-r-lg shadow-lg">
        <div className="flex-1">
          <div className="mb-3">
            <p className="text-xs uppercase text-gray-300">Start Date</p>
            <p className="text-lg font-bold">{formattedStartDate}</p>
          </div>
          <div className="mb-3">
            <p className="text-xs uppercase text-gray-300">End Date</p>
            <p className="text-lg font-bold">{formattedEndDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
