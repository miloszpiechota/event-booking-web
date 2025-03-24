import React, { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEvents } from "../../context/EventContext.tsx";
import "../styles/customDayPicker.css";
import { useNavigate } from "react-router-dom";

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
      .slice(0, 4); // Pobierz tylko 4 najbliższe wydarzenia
  }, [events]);

  const handleDateClick = (date: Date) => {
    const event = events.find((event) => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString();
    });

    setActiveEvent(event || null);
  };

  const closePopup = () => {
    setActiveEvent(null); // Zamknięcie popupu
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-4 w-full space-y-4 md:space-y-0">
      {/* Kalendarz - lewa część */}
      <div className="w-full md:w-2/3 border-solid border-red-800 bg-black text-white p-4 rounded-lg shadow-lg h-[450px] flex justify-center items-center">
        <DayPicker
          numberOfMonths={1}
          className="custom-day-picker w-full h-full bg-gray-800 backdrop-blur-lg"
          style={{
            display: "flex",
            flexDirection: "column", // Zmiana na kolumnowy układ, jeśli ma to pomóc w lepszym dopasowaniu
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
          selected={eventDates}
          modifiers={{ highlighted: eventDates }}
          modifiersClassNames={{ highlighted: "highlighted-day" }}
          onDayClick={handleDateClick}
        />
      </div>

      {/* Lista najbliższych wydarzeń - prawa część */}
      <div className="w-full md:w-2/3 bg-black text-white p-6 flex flex-col relative rounded-lg shadow-lg h-[450px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Upcoming Events</h2>
        {nearestEvents.length === 0 ? (
          <p className="text-sm text-gray-200 text-center">Brak wydarzeń...</p>
        ) : (
          <div className="space-y-4">
            {nearestEvents.map((event) => (
              <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 cursor-pointer hover:bg-gray-700 transition duration-200 max-w-xs mx-auto flex items-center justify-between"
            >
              {/* Kontener dla daty - lewa część kafelka */}
              <div className="w-full p-2 bg-gray-800 rounded-lg  flex flex-col items-center justify-center h-13">
                <p className="text-3xl font-extrabold text-red-600 leading-tight">
                  {new Date(event.start_date).toLocaleDateString("en-US", {
                    day: "numeric",
                  })}
                </p>
                <p className="text-md uppercase font-semibold text-gray-300">
                  {new Date(event.start_date).toLocaleDateString("en-US", {
                    month: "long",
                  })}
                </p>
                <p className="text-sm font-medium text-gray-400">
                  {new Date(event.start_date).toLocaleDateString("en-US", {
                    year: "numeric",
                  })}
                </p>
              </div>
            
              {/* Nazwa wydarzenia - prawa część kafelka */}
              <div className="w-2/3 pl-4">
                <h3 className="text-sm font-semibold text-white">{event.name}</h3>
                
              </div>
            </div>
            
            ))}
          </div>
        )}
      </div>

     {/* Wydarzenie po kliknięciu - popup */}
{activeEvent && (
  <div
    className="popup-overlay absolute inset-0 bg-gray-900/70 flex justify-center items-center z-50"
    onClick={closePopup} // Obsługa kliknięcia na overlay
  >
    <div
      className="w-full md:w-1/2 lg:w-1/3 bg-black text-white p-6 flex flex-col relative rounded-2xl shadow-xl transform transition-all duration-300 scale-95 hover:scale-100"
      onClick={(e) => e.stopPropagation()} // Zatrzymanie propagacji kliknięcia wewnątrz popupu
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">{activeEvent.name}</h2>

      {/* Dodajemy zdjęcie eventu */}
      {activeEvent.image_url && (
        <img
          src={activeEvent.image_url}
          alt={activeEvent.name}
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
      )}

      <div className="flex flex-col space-y-3">
        <p className="text-sm text-gray-200">
          📍 {activeEvent.location.city_name}, {activeEvent.location.street_name}
        </p>
        <p className="text-sm text-gray-200">{activeEvent.location.country_name}</p>
        <p className="text-sm text-gray-300">{activeEvent.description}</p>
        <p className="text-xs text-gray-400 mt-2">
          🗓️ {new Date(activeEvent.start_date).toLocaleDateString()}{" "}
          {new Date(activeEvent.start_date).toLocaleTimeString()}
        </p>
      </div>

      {/* Opcjonalny przycisk zamknięcia popupu */}
      <button
        onClick={closePopup}
        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition duration-200"
      >
        ✖
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default CalendarSlide;
