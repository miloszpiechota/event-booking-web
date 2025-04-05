import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../api/formatDateTime.ts";
import { useTicketAvailability } from "../../context/TicketAvailabilityContext.tsx";
import soldOutImage from "../assets/sold-out.png";
import { formatLocalization } from "../api/formatLocalization.ts";
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

interface CreatedEventCardProps {
  event: Event;
}

const CreatedEventCard: React.FC<CreatedEventCardProps> = ({ event }) => {
  const { availableTickets } = useTicketAvailability();
  const navigate = useNavigate();
  const isSoldOut = availableTickets <= 0;

  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  return (
    <div className="flex flex-col md:flex-row max-w-3xl w-full bg-black shadow-lg rounded-lg overflow-hidden">
      {/* LEWA STRONA - Obrazek wydarzenia */}
      <div
        className="relative w-full md:w-2/3 bg-cover bg-center min-h-[300px]"
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <h2 className="text-3xl font-bold text-white mb-2">{event.name}</h2>
          <p className="text-sm text-gray-200">{event.short_description}</p>
        </div>
      </div>

      {/* PRAWA STRONA - Szczegóły wydarzenia */}
      <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 flex flex-col justify-between">
        {/* Data i miejsce */}
        <div>
          <div className="mb-3">
            <p className="text-xs uppercase text-gray-400">Date</p>
            <p className="text-lg font-bold">{formattedStartDate.formattedDay} {formattedStartDate.formattedMonth}</p>
          </div>
          <div className="mb-3">
            <p className="text-xs uppercase text-gray-400">Location</p>
            <p className="text-lg font-bold">
            {formatLocalization(
                            event.location.street_name,
                            event.location.apartment_number,
                            event.location.city_name,
                            event.location.country_name
                          )}
            </p>
           
          </div>
        </div>

        {/* Przycisk akcji */}
        <button
          className={`w-full mt-4 px-6 py-2 text-white font-semibold rounded-lg transition duration-300 ${
            isSoldOut ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
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

export default CreatedEventCard;
