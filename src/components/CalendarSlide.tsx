import React, { useState, useMemo } from "react";
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

  // Sortowanie wydarzeń po dacie i ograniczenie do 4 najbliższych
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

  const closePopup = () => {
    setActiveEvent(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Główny kontener */}
      <div className="max-w-3xl w-full backdrop-blur-lg shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Kalendarz */}
        <div className="w-full md:w-2/3 min-h-[400px] p-4 flex justify-center items-center">
          <DayPicker
            numberOfMonths={1}
            className="custom-day-picker w-full h-full bg-gray-800"
            selected={eventDates}
            modifiers={{ highlighted: eventDates }}
            modifiersClassNames={{ highlighted: "highlighted-day" }}
            onDayClick={handleDateClick}
          />
        </div>

        {/* Upcoming Events */}
        <div className="w-full md:w-1/3 bg-black text-white p-6 flex flex-col relative rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-3 text-center">Upcoming Events</h2>

          {nearestEvents.length === 0 ? (
            <p className="text-sm text-gray-200 text-center">Brak wydarzeń...</p>
          ) : (
            <div className="flex flex-col space-y-2">
              {nearestEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="bg-gray-800 p-2 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center cursor-pointer hover:bg-gray-700 transition duration-200"
                >
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">📍 {event.location.city_name}</p>
                  <p className="text-xs text-gray-500">🗓️ {new Date(event.start_date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeEvent && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-50 rounded-lg"
          onClick={closePopup} // Kliknięcie w tło zamyka popup
        >
          <div
            className="relative w-full max-w-3xl  backdrop-blur-lg rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden transition-all duration-300"
            onClick={(e) => e.stopPropagation()} // Zatrzymuje propagację, by nie zamykać po kliknięciu wewnątrz popupu
          >
            {/* Przycisk zamknięcia */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition duration-200 z-10"
            >
              ✖
            </button>

            {/* Lewa część - obrazek */}
            {activeEvent.image_url && (
              <div className="md:w-2/5">
                <img
                  src={activeEvent.image_url}
                  alt={activeEvent.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Prawa część - informacje */}
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

              <p className="text-sm text-gray-200 mt-4">{activeEvent.description}</p>

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
