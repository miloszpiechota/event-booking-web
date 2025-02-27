import React, { useState } from "react";
import FormSteps from "../components/FormSteps.tsx";
import EventDetails from "../components/EventDetails.tsx";
import BookingDetails from "../components/BookingDetails.tsx";
import BookingSummary from "../components/BookingSummary.tsx";
import PaymentForm from "../components/PaymentForm"; // Upewnij się, że ścieżka jest poprawna
import { useLocation } from "react-router-dom";
import Header from "../components/Header.tsx";
import { BookingProvider } from "../../context/BookingContext.tsx";

function BookEvent() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { state } = useLocation();
  const { event } = state || {};

  return (
    <BookingProvider event={event}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Krok 1: Górna sekcja z kolejnymi etapami formularza */}
        <FormSteps />

        {/* Krok 2: Główny layout - 2 kolumny */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Lewa kolumna */}
          <div className="mb-4 lg:mb-0 lg:w-2/3">
            {showPaymentForm ? (
              <PaymentForm />
            ) : (
              <BookingDetails event={event} />
            )}
          </div>

          {/* Prawa kolumna: BookingSummary */}
          <div className="lg:w-1/3">
            <BookingSummary onCompletePayment={() => setShowPaymentForm(true)} event={event} />
          </div>
        </div>
      </div>
    </BookingProvider>
  );
}

export default BookEvent;
