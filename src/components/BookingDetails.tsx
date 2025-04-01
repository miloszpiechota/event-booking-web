import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookingContext } from "../../context/BookingContext.tsx";
import EventCard from "./EventCardV.tsx";
import validateBookingFormData from "../validation/validateBookingFormData.ts";
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

  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const { availableTickets } = useTicketAvailability();
  const navigate = useNavigate();

  const isEventSoldOut = event?.event_ticket?.quantity <= 0;
  const isSoldOut = isEventSoldOut || availableTickets <= 0;

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

  const handleSelectPrice = (price) => setSelectedPrice(price);

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
    if (isFormValid) onNextStep();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-6/6">
      {isSoldOut && (
        <p className="text-red-600 text-lg font-bold">⚠ Brak dostępnych biletów</p>
      )}
      <EventCard event={event} />

      <h2 className="text-2xl font-semibold mt-6 mb-6">Enter your personal details</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "First Name", value: firstName, setter: setFirstName, placeholder: "Maciej", field: "firstName" },
          { label: "Last Name", value: lastName, setter: setLastName, placeholder: "Kuropatwa", field: "lastName" },
          { label: "Email Address", value: email, setter: setEmail, placeholder: "example@email.com", field: "email", type: "email" },
          { label: "Phone Number", value: phoneNumber, setter: setPhoneNumber, placeholder: "567 890 123", field: "phoneNumber", isPhone: true },
        ].map(({ label, value, setter, placeholder, field, type = "text", isPhone }) => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">{label}</label>
            {isPhone ? (
              <div className="flex">
                <select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  {["+48", "+49", "+44", "+1"].map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder={placeholder}
                  value={value}
                  onChange={handleInputChange(setter, field)}
                  className={`w-full border border-l-0 rounded-r px-3 py-2 focus:outline-none focus:ring-1 ${
                    touchedFields[field] && errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                  }`}
                />
              </div>
            ) : (
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange(setter, field)}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
                  touchedFields[field] && errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                }`}
              />
            )}
            {touchedFields[field] && errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
          </div>
        ))}

        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mt-6 mb-4">Choose your ticket</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["ticket_price", "vip_price"].map((type) => (
            <button
              key={type}
              type="button"
              className={`w-full py-3 rounded-lg text-white font-bold ${selectedPrice === event.event_ticket.ticket_pricing[type] ? "bg-red-600" : "bg-gray-400"}`}
              onClick={() => handleSelectPrice(event.event_ticket.ticket_pricing[type])}
            >
              {type === "ticket_price" ? "Standard" : "VIP"} - {event.event_ticket.ticket_pricing[type]} zł
            </button>
          ))}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">Number of Tickets</label>
          <input
            type="number"
            min="1"
            max={isSoldOut ? 0 : availableTickets}
            value={ticketCount}
            onChange={handleTicketCountChange}
            disabled={isSoldOut}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="col-span-2 mt-4">
          <button type="button" onClick={handleNext} disabled={!isFormValid || isSoldOut} className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition-colors disabled:opacity-50">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingDetails;