import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookingContext } from "../../context/BookingContext.tsx";
import EventCard from "./EventCardV.tsx";
import validateBookingFormData from "../validation/validateBookingFormData.ts";
import { useTicketAvailability } from "../../context/TicketAvailabilityContext.tsx";


function BookingDetails({ onNextStep }) {
  const navigate = useNavigate();

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

  const { availableTickets } = useTicketAvailability();
  
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  const isSoldOut = event?.event_ticket?.quantity <= 0 || availableTickets <= 0;
  console.log("Available tickets:", availableTickets);

  useEffect(() => {
    const validationErrors = validateBookingFormData({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    if (!selectedPrice) validationErrors.selectedPrice = "Select a price.";
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [firstName, lastName, email, phoneNumber, selectedPrice]);

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && !isSoldOut) {
      onNextStep();
    } else {
      setTouchedFields({
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      });
    }
  };

  const handleSelectPrice = (price) => setSelectedPrice(price);

  return (
    <div className="bg-black/40 backdrop-blur-lg text-white p-8 rounded-2xl shadow-xl w-full space-y-6">
      {isSoldOut && (
        <p className="text-red-500 font-semibold text-lg text-center">
          ❌ Brak dostępnych biletów
        </p>
      )}

      <EventCard event={event} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold">Personal Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "First Name",
              val: firstName,
              setter: setFirstName,
              field: "firstName",
              placeholder: "John",
            },
            {
              label: "Last Name",
              val: lastName,
              setter: setLastName,
              field: "lastName",
              placeholder: "Doe",
            },
            {
              label: "Email",
              val: email,
              setter: setEmail,
              field: "email",
              placeholder: "example@mail.com",
              type: "email",
            },
            {
              label: "Phone Number",
              val: phoneNumber,
              setter: setPhoneNumber,
              field: "phoneNumber",
              placeholder: "567 890 123",
              isPhone: true,
            },
          ].map(
            ({
              label,
              val,
              setter,
              field,
              placeholder,
              type = "text",
              isPhone,
            }) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                {isPhone ? (
                  <div className="flex">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="rounded-l-md bg-gray-800 text-white border border-gray-700 px-3 py-2 focus:outline-none"
                    >
                      {["+48", "+49", "+44", "+1"].map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={val}
                      onChange={handleInputChange(setter, field)}
                      placeholder={placeholder}
                      className={`w-full rounded-r-md bg-gray-800 text-white border border-l-0 px-3 py-2 focus:outline-none ${
                        touchedFields[field] && errors[field]
                          ? "border-red-500"
                          : "border-gray-700 focus:ring-1 focus:ring-red-500"
                      }`}
                    />
                  </div>
                ) : (
                  <input
                    type={type}
                    value={val}
                    onChange={handleInputChange(setter, field)}
                    placeholder={placeholder}
                    className={`w-full rounded-md bg-gray-800 text-white border px-3 py-2 focus:outline-none ${
                      touchedFields[field] && errors[field]
                        ? "border-red-500"
                        : "border-gray-700 focus:ring-1 focus:ring-red-500"
                    }`}
                  />
                )}
                {touchedFields[field] && errors[field] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            )
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Choose your ticket</h2>
          <div className="grid grid-cols-2 gap-4">
            {["ticket_price", "vip_price"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  handleSelectPrice(event.event_ticket.ticket_pricing[type])
                }
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  selectedPrice === event.event_ticket.ticket_pricing[type]
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {type === "ticket_price" ? "Standard" : "VIP"} –{" "}
                {event.event_ticket.ticket_pricing[type]} zł
              </button>
            ))}
          </div>
          {errors.selectedPrice && (
            <p className="text-red-400 text-sm mt-2">{errors.selectedPrice}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
          The number of tickets
          </label>
          <input
            type="number"
            min={1}
            max={availableTickets}
            value={ticketCount}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                if (value >= 1 && value <= availableTickets) {
                  setTicketCount(value);
                } else if (value < 1) {
                  setTicketCount(1);
                } else if (value > availableTickets) {
                  setTicketCount(availableTickets);
                }
              } else {
                setTicketCount(1); // fallback
              }
            }}
            className="w-full rounded-md bg-gray-800 text-white border px-3 py-2 focus:outline-none border-gray-700 focus:ring-1 focus:ring-red-500"
          />
          <p className="text-sm text-gray-400 mt-1">
          The available number of tickets is: {availableTickets}
          </p>
        </div>
      </form>
    </div>
  );
}

export default BookingDetails;
