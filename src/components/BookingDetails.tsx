import React, { useContext } from "react";
import { BookingContext } from "../../context/BookingContext.tsx";
import EventDetails from "./EventDetails.tsx";

function BookingDetails() {
  const {
    event,

    // Dane osobowe i ich settery
    firstName, setFirstName,
    lastName,  setLastName,
    email,     setEmail,
    phonePrefix, setPhonePrefix,
    phoneNumber, setPhoneNumber,

    // Bilety
    selectedPrice, setSelectedPrice,
    ticketCount, setTicketCount,
  } = useContext(BookingContext);

  // Funkcja wyboru ceny biletu
  const handleSelectPrice = (price) => {
    setSelectedPrice(price);
  };

  // Funkcja zmiany liczby biletów
  const handleTicketCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= event.event_ticket.quantity) {
      setTicketCount(value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full md:w-6/6">
      <EventDetails event={event} />

      <h2 className="text-2xl font-semibold mb-6">
        Enter your personal details
      </h2>

      {/* Formularz danych osobowych */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            First Name
          </label>
          <input
            type="text"
            placeholder="Maciej"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Kuropatwa"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Phone Number
          </label>
          <div className="flex">
            <select
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={phonePrefix}
              onChange={(e) => setPhonePrefix(e.target.value)}
            >
              <option value="+48">+48</option>
              <option value="+49">+49</option>
              <option value="+44">+44</option>
              <option value="+1">+1</option>
            </select>
            <input
              type="tel"
              placeholder="567 890 123"
              className="w-full border border-gray-300 border-l-0 rounded-r px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </form>

      {/* Sekcja wyboru biletu */}
      <h2 className="text-2xl font-semibold mt-6 mb-4">Choose your ticket</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Lewa kolumna - wybór biletu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Select Ticket Pricing
          </label>
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              className={`w-full py-3 rounded-lg text-white font-bold ${
                selectedPrice === event.event_ticket.ticket_pricing.ticket_price
                  ? "bg-purple-600"
                  : "bg-gray-400"
              }`}
              onClick={() =>
                handleSelectPrice(event.event_ticket.ticket_pricing.ticket_price)
              }
            >
              Standard - {event.event_ticket.ticket_pricing.ticket_price} zł
            </button>

            <button
              type="button"
              className={`w-full py-3 rounded-lg text-white font-bold ${
                selectedPrice === event.event_ticket.ticket_pricing.vip_price
                  ? "bg-purple-600"
                  : "bg-gray-400"
              }`}
              onClick={() =>
                handleSelectPrice(event.event_ticket.ticket_pricing.vip_price)
              }
            >
              VIP - {event.event_ticket.ticket_pricing.vip_price} zł
            </button>
          </div>
        </div>

        {/* Prawa kolumna - liczba biletów */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Number of Tickets
          </label>
          <input
            type="number"
            min="1"
            max={event.event_ticket.quantity}
            value={ticketCount}
            onChange={handleTicketCountChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Max available: {event.event_ticket.quantity}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
