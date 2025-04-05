import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/fetchEvents.ts';
import CreatedEventCard from './CreatedEventCard.tsx';

const CreatedEventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // Przechowujemy eventy
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState<string | null>(null); // Obsługa błędów

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchOrders();
        if (!response || !Array.isArray(response)) {
          throw new Error("Invalid data format received.");
        }
        setEvents(response);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      {loading ? (
        <p className="text-center text-gray-400">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : events.length > 0 ? (
        <div className="flex flex-col gap-6 items-center">
          {events.map((event) => (
            <CreatedEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No events found.</p>
      )}
    </div>
  );
};

export default CreatedEventList;
