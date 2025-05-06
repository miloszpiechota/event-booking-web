import React, { useContext, useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEvents } from "../../context/EventContext.tsx";
import "../styles/customDayPicker.css";
import { useNavigate } from "react-router-dom";
import { formatLocalization } from "../api/formatLocalization.ts";

const CalendarSlide: React.FC = () => {
  const { events } = useEvents();
  const eventDates = events.map((event) => new Date(event.start_date));
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  const nearestEvents = useMemo(() => {
    return events
      .sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      )
      .slice(0, 4);
  }, [events]);

  const handleDateClick = (date: Date) => {
    const event = events.find((event) => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString();
    });
    setActiveEvent(event || null);
  };

  const closePopup = () => setActiveEvent(null);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        {/* Kalendarz */}
        <div className="relative w-full md:w-2/3 min-h-[400px] p-4">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 backdrop-blur-md bg-black/20 flex items-center justify-center">
            <DayPicker
              numberOfMonths={1}
              className="custom-day-picker text-white"
              selected={eventDates}
              modifiers={{ highlighted: eventDates }}
              modifiersClassNames={{ highlighted: "highlighted-day" }}
              onDayClick={handleDateClick}
            />
          </div>
        </div>

        {/* Nadchodzące wydarzenia */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Upcoming Events</h2>
          {nearestEvents.length === 0 ? (
            <p className="text-sm text-gray-300 text-center">No events...</p>
          ) : (
            <div className="flex flex-col space-y-3">
              {nearestEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="cursor-pointer bg-gray-800/60 hover:bg-gray-700/80 transition duration-200 p-4 rounded-xl shadow hover:scale-[1.02]"
                >
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-400">📍 {event.location.city_name}</p>
                  <p className="text-xs text-gray-500">🗓️ {new Date(event.start_date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup ze szczegółami */}
      {activeEvent && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="relative w-full max-w-3xl backdrop-blur-md rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden transition-all duration-300 bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition duration-200 z-10"
            >
              ✖
            </button>

            {activeEvent.image_url && (
              <div className="md:w-2/5">
                <img
                  src={activeEvent.image_url}
                  alt={activeEvent.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="md:w-3/5 flex flex-col justify-between p-6 text-white">
              <h2 className="text-2xl font-bold text-center">{activeEvent.name}</h2>
              <div className="mt-2 text-sm">
                {formatLocalization(
                  activeEvent.location.street_name,
                  activeEvent.location.apartment_number,
                  activeEvent.location.city_name,
                  activeEvent.location.country_name
                )}
              </div>
              <p className="text-sm text-gray-300 mt-4">{activeEvent.description}</p>
              <div className="flex justify-between items-center mt-6 text-sm">
                <p className="flex items-center gap-2">
                  📅 {new Date(activeEvent.start_date).toLocaleDateString()}{" "}
                  {new Date(activeEvent.start_date).toLocaleTimeString()}
                </p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  onClick={() => navigate(`/event/${activeEvent.id}`)}
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSlide;
