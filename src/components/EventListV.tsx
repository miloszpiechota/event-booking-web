import React from "react";
import EventCard from "./EventCardV.tsx";
import { useEvents } from "../../context/EventContext.tsx";

const EventList = ({ searchTerm }) => {
  const { events, loading } = useEvents();

  if (loading) {
    return <p className="text-white text-center mt-10">Ładowanie wydarzeń...</p>;
  }

  // 🔍 Filtrujemy wydarzenia według wpisanej frazy
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-6">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-white text-center">Brak pasujących wydarzeń</p>
      )}
    </div>
  );
};

export default EventList;
