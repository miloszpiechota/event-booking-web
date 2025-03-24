import React from "react";
import EventCard from "./EventCardV.tsx";
import { useEvents } from "../../context/EventContext.tsx";

const EventList = ({ searchTerm, selectedCategory }) => {
  const { events, loading } = useEvents();

  if (loading) {
    return <p className="text-white text-center mt-10">Ładowanie wydarzeń...</p>;
  }

  // 🔍 Filtrujemy wydarzenia według nazwy i kategorii
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.event_category.name === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

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
