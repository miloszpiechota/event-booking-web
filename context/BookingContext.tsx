import React, { createContext, useState } from "react";

// Tworzymy kontekst
export const BookingContext = createContext();

// Komponent Provider, który będzie udostępniał stan całej aplikacji
export function BookingProvider({ children, event }) {
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [email, setEmail]             = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+48");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [ticketCount, setTicketCount]     = useState(1);

  return (
    <BookingContext.Provider
      value={{
        // Udostępniamy obiekt event, żeby móc go wszędzie używać
        event,
        
        // Dane osobowe
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phonePrefix,
        setPhonePrefix,
        phoneNumber,
        setPhoneNumber,

        // Dane biletu
        selectedPrice,
        setSelectedPrice,
        ticketCount,
        setTicketCount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
