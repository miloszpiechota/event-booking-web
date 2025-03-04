import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "../../context/BookingContext.tsx";
import EventDetails from "./EventDetails.tsx";
import validateBookingFormData from "../api/validateBookingFormData.ts";

function BookingDetails() {
  const {
    event,
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
    selectedPrice,
    setSelectedPrice,
    ticketCount,
    setTicketCount,
  } = useContext(BookingContext);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validationErrors = validateBookingFormData({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [firstName, lastName, email, phoneNumber]);

  const handleSelectPrice = (price) => {
    setSelectedPrice(price);
  };

  const handleTicketCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= event.event_ticket.quantity) {
      setTicketCount(value);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full md:w-6/6">
      <EventDetails event={event} />

      <h2 className="text-2xl font-semibold mb-6">
        Enter your personal details
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            First Name
          </label>
          <input
            type="text"
            placeholder="Maciej"
            value={firstName}
            onChange={handleInputChange(setFirstName)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Kuropatwa"
            value={lastName}
            onChange={handleInputChange(setLastName)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleInputChange(setEmail)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Phone Number
          </label>
          <div className="flex">
            <select
              value={phonePrefix}
              onChange={(e) => setPhonePrefix(e.target.value)}
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="+48">+48</option>
              <option value="+49">+49</option>
              <option value="+44">+44</option>
              <option value="+1">+1</option>
            </select>
            <input
              type="tel"
              placeholder="567 890 123"
              value={phoneNumber}
              onChange={handleInputChange(setPhoneNumber)}
              className={`w-full border border-l-0 rounded-r px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.phoneNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Sekcja wyboru biletu */}
       

        <div className="relative md:grid-cols-2 gap-6 items-start">
        <h2 className="text-2xl font-semibold mt-6 mb-4">Choose your ticket</h2>
          {/* Wybór ceny biletu - po lewej stronie */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Select Ticket Pricing
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`w-full py-3 rounded-lg text-white font-bold ${
                  selectedPrice ===
                  event.event_ticket.ticket_pricing.ticket_price
                    ? "bg-purple-600"
                    : "bg-gray-400"
                }`}
                onClick={() =>
                  handleSelectPrice(
                    event.event_ticket.ticket_pricing.ticket_price
                  )
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

          {/* Liczba biletów - po prawej stronie */}
          <div className="flex flex-col">
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
      </form>
    </div>
  );
}

export default BookingDetails;
