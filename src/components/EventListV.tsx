import React from "react";
import EventCard from "./EventCardV.tsx";
import { useEvents } from "../../context/EventContext.tsx"; // Importujemy hook kontekstu

const EventList = () => {
  const { events, loading } = useEvents(); // Pobieramy dane z kontekstu

  if (loading) {
    return <p className="text-white text-center mt-10">Ładowanie wydarzeń...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-6">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-white text-center">Brak dostępnych wydarzeń</p>
      )}
    </div>
  );
};

export default EventList;
