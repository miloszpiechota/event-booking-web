import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchOrders } from "../";

// Tworzymy kontekst
const OrderContext = createContext();

// Komponent dostawcy kontekstu
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    getEvents();
  }, []);

  return (
    <OrderContext.Provider value={{ events, loading }}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook ułatwiający korzystanie z kontekstu
export const useEvents = () => useContext(OrderContext);
