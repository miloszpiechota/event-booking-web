import React from "react";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    title: "Music Festival 2025",
    date: "March 10, 2025",
    location: "New York, NY",
    description: "Join us for an amazing night of music, food, and fun!",
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "April 20, 2025",
    location: "San Francisco, CA",
    description: "The latest trends and innovations in the tech world.",
  },
  {
    id: 3,
    title: "Art Exhibition",
    date: "May 5, 2025",
    location: "Paris, France",
    description: "Explore stunning art pieces from world-renowned artists.",
  },
  {
    id: 4,
    title: "Art Exhibition",
    date: "May 5, 2025",
    location: "Paris, France",
    description: "Explore stunning art pieces from world-renowned artists.",
  },
];

const EventList = () => {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

export default EventList;
