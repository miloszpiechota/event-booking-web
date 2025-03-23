import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../styles/customDayPicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEvents } from "../../context/EventContext.tsx"; // Import kontekstu wydarzeń
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const EventMainCard: React.FC = () => {
  const { events, loading } = useEvents(); // Pobranie eventów z kontekstu

  // Pobranie dat wydarzeń i przekonwertowanie ich na obiekty Date
  const eventDates = events.map((event) => new Date(event.start_date));

  // Stan do obsługi aktywnego popupu
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  // Funkcja obsługująca kliknięcie na datę
  const handleDateClick = (date: Date) => {
    // Zmiana na prostsze porównanie dat bez uwzględniania godziny
    const event = events.find((event) => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString(); // Porównanie tylko dat
    });

    if (event) {
      setActiveEvent(event); // Ustawienie wydarzenia w stanie
    } else {
      setActiveEvent(null); // Jeśli brak wydarzenia, ukrycie popupa
    }
  };

  // const customIcon = new L.Icon({
  //   iconUrl: "https://example.com/custom-marker-icon.png", // URL do własnej ikony
  //   iconSize: [32, 32], // Rozmiar ikony
  //   iconAnchor: [16, 32], // Wskaźnik ikony
  //   popupAnchor: [0, -32], // Wskaźnik okna popup
  // });

  // Tworzenie niestandardowej ikony z emoji 📍
  const createCustomIcon = () => {
    return L.divIcon({
      className: "custom-icon",
      html: "<span style='font-size: 24px;'>📍</span>", // Emoji 📍
      iconSize: [50, 50], // Wymiary ikony
      iconAnchor: [15, 30], // Punkt kotwiczenia ikony (na dole)
      popupAnchor: [0, -30], // Pop-up pojawi się powyżej markera
    });
  };

  return (
    <div className="flex justify-center py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-3xl"
      >
        {/* 🔥 Slajd 1: Mapa z eventami */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="max-w-3xl w-full backdrop-blur-lg shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="relative w-full md:w-2/3 min-h-[400px] p-4 bg-black">
                <MapContainer
                  center={[52.2298, 21.0122]}
                  zoom={5}
                  className="w-full h-full rounded-lg"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {loading ? (
                    <p className="text-center text-white">Ładowanie wydarzeń...</p>
                  ) : (
                    events.map((event) => (
                      <Marker
                      key={event.id}
                      position={[
                        event.location.latitude,
                        event.location.longitude,
                      ]}
                      icon={createCustomIcon()} // Ustawienie niestandardowej ikony
                    >
                        <Popup>
                          <strong>{event.name}</strong>
                          <br />
                          📍 {event.location.city_name}
                        </Popup>
                      </Marker>
                    ))
                  )}
                </MapContainer>
              </div>
              {/* Prawa część z danymi wydarzenia */}
              <div className="w-full md:w-1/3 bg-black text-white p-6 flex flex-col relative rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-2">Events Near You!</h2>
                <p className="text-sm text-gray-200">
                  Odkryj wydarzenia w swojej okolicy
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* 🔥 Slajd 2: Kalendarz */}
        <SwiperSlide>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Discover Event Dates!
            </h2>
            <div className="w-full max-w-3xl h-[400px] bg-black/30 backdrop-blur-lg rounded-lg overflow-hidden flex justify-center items-center">
              <DayPicker
                numberOfMonths={2}
                className="custom-day-picker w-full h-full bg-black/40 backdrop-blur-lg"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                selected={eventDates} // Zastosowanie zaznaczonych dat
                modifiers={{ highlighted: eventDates }} // Podświetlenie dni wydarzeń
                modifiersClassNames={{
                  highlighted: "highlighted-day", // Klasa CSS dla zaznaczonych dni
                }}
                onDayClick={handleDateClick} // Obsługa kliknięcia na datę
              />
              {/* Pokazanie popupa z detalami wydarzenia */}
              {activeEvent && (
                <div className="popup-overlay">
                  <div className="popup max-w-3xl w-full bg-black/30 backdrop-blur-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                    {/* Sekcja obrazka */}
                    <div
                      className="relative w-full bg-cover bg-center min-h-[300px]"
                      style={{
                        backgroundImage: `url(${activeEvent.image_url})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {activeEvent.name}
                        </h2>
                        <p className="text-sm text-gray-200">
                          {activeEvent.location.city_name},{" "}
                          {activeEvent.location.street_name}
                        </p>
                        <p className="text-sm text-gray-200">
                          {activeEvent.location.country_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default EventMainCard;
