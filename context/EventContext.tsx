import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchOrders } from "../src/api/fetchEvents.ts";

// Tworzymy kontekst
const EventContext = createContext();

// Komponent dostawcy kontekstu
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchOrders();
      setEvents(data);
      setLoading(false);
    };
    getEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading }}>
      {children}
    </EventContext.Provider>
  );
};

// Hook ułatwiający korzystanie z kontekstu
export const useEvents = () => useContext(EventContext);
