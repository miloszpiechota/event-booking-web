import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../../context/BookingContext.tsx";
import EventCard from "./EventCardV.tsx";
import validateBookingFormData from "../validation/validateBookingFormData.ts";
import { useParams } from "react-router-dom";
import { useTicketAvailability } from "../../context/TicketAvailabilityContext.tsx";
function BookingDetails({ onNextStep }) {
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

  const { id } = useParams(); // Event ID
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const { availableTickets } = useTicketAvailability();
// Sprawdzamy, czy event jest wyprzedany
const isEventSoldOut = event?.event_ticket?.quantity <= 0;
const isSoldOut = isEventSoldOut || availableTickets <= 0;
  const navigate = useNavigate();

  useEffect(() => {
    const validationErrors = validateBookingFormData({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    if (!selectedPrice) {
      validationErrors.selectedPrice = "You must select a ticket price.";
    }

    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [firstName, lastName, email, phoneNumber, selectedPrice]);

  const handleSelectPrice = (price) => {
    setSelectedPrice(price);
  };

  const handleTicketCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= event.event_ticket.quantity) {
      setTicketCount(value);
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onNextStep(); // Proceed to the next step
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full md:w-6/6">
       {isSoldOut && (
       
          <p className="text-white text-lg font-bold">⚠ Brak dostępnych biletów</p>
       
      )}
      <EventCard event={event} />

      <h2 className="text-2xl font-semibold mb-6 mt-6">Enter your personal details</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            First Name
          </label>
          <input
            type="text"
            placeholder="Maciej"
            value={firstName}
            onChange={handleInputChange(setFirstName, "firstName")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              touchedFields.firstName && errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {touchedFields.firstName && errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Kuropatwa"
            value={lastName}
            onChange={handleInputChange(setLastName, "lastName")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              touchedFields.lastName && errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {touchedFields.lastName && errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              touchedFields.email && errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {touchedFields.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number Field */}
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
              onChange={handleInputChange(setPhoneNumber, "phoneNumber")}
              className={`w-full border border-l-0 rounded-r px-3 py-2 focus:outline-none focus:ring-1 ${
                touchedFields.phoneNumber && errors.phoneNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
          </div>
          {touchedFields.phoneNumber && errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Ticket Section Header */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mt-6 mb-4">Choose your ticket</h2>
        </div>

        {/* Left Column - Ticket Pricing */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Select Ticket Pricing
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`w-full py-3 rounded-lg text-white font-bold ${
                selectedPrice === event.event_ticket.ticket_pricing.ticket_price
                  ? "bg-red-600"
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
                  ? "bg-red-600"
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

        {/* Right Column - Number of Tickets */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
            Number of Tickets
          </label>
          <input
            type="number"
            min="1"
          // max={event.event_ticket.quantity}
          max={isSoldOut ? 0 : availableTickets}
            value={ticketCount}
            onChange={handleTicketCountChange}
            disabled={isSoldOut}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {/* <p className="text-sm text-gray-500 mt-1">Max available: {event.event_ticket.quantity}</p> */}
          <p className="text-sm text-gray-500 mt-1">Max available: {event.event_ticket.quantity}</p>
        </div>

        {/* Next Button */}
        <div className="col-span-2 mt-4">
          <button
            type="button"
            onClick={handleNext}
            disabled={!isFormValid || isSoldOut}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingDetails;
