import React, { useState } from "react";
import FormSteps from "../components/FormSteps.tsx";
import EventDetails from "../components/EventDetails.tsx";
import BookingDetails from "../components/BookingDetails.tsx";
import BookingSummary from "../components/BookingSummary.tsx";
import { useLocation } from "react-router-dom";

function BookEvent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    ticketType: "standard",
  });
  const { state } = useLocation();
  const { event } = state || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data submitted:", formData);
    alert("Your ticket has been booked!");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Krok 1: Górna sekcja z kolejnymi etapami formularza */}
        <FormSteps />

        {/* Krok 2: Główny layout - 2 kolumny */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Lewa kolumna */}
          <div className="mb-4 lg:mb-0 lg:w-2/3">
            {/* Kontener 1: EventDetails */}
            <EventDetails event={event}/>

            {/* Kontener 2: BookingDetails */}
            <BookingDetails />
          </div>

          {/* Prawa kolumna: BookingSummary */}
          <div className="lg:w-1/3">
            <BookingSummary />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookEvent;