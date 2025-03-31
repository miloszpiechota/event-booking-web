import React, { createContext, useState, useContext, useEffect } from "react";

interface TicketAvailabilityContextType {
  availableTickets: number;
  setAvailableTickets: (count: number) => void;
}

const TicketAvailabilityContext = createContext<TicketAvailabilityContextType | undefined>(undefined);

export const TicketAvailabilityProvider: React.FC<{ children: React.ReactNode; initialTickets: number }> = ({
  children,
  initialTickets,
}) => {
  const [availableTickets, setAvailableTickets] = useState<number>(initialTickets);

  return (
    <TicketAvailabilityContext.Provider value={{ availableTickets, setAvailableTickets }}>
      {children}
    </TicketAvailabilityContext.Provider>
  );
};

export const useTicketAvailability = () => {
  const context = useContext(TicketAvailabilityContext);
  if (!context) {
    throw new Error("useTicketAvailability must be used within a TicketAvailabilityProvider");
  }
  return context;
};
