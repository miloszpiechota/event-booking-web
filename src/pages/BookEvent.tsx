import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import BookingDetails from "../components/BookingDetails.tsx";
import BookingSummary from "../components/BookingSummary.tsx";
import PaymentFormStripe from "../components/PaymentFormStripe.jsx"; // Upewnij się, że rozszerzenie pasuje do pliku
import { BookingProvider } from "../../context/BookingContext.tsx";

function BookEvent() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { state } = useLocation();
  const { event } = state || {};

  if (!event) {
    return (
      <div className="text-center py-10 text-red-500">
        ❌ Nie znaleziono danych wydarzenia. Wróć i spróbuj ponownie.
      </div>
    );
  }

  return (
    <BookingProvider event={event}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="mb-4 lg:mb-0 lg:w-2/3">
            {showPaymentForm ? (
              <PaymentFormStripe
                onPreviousStep={() => setShowPaymentForm(false)}
              />
            ) : (
              <BookingDetails onNextStep={() => setShowPaymentForm(true)} />
            )}
          </div>

          <div className="lg:w-1/3">
            <BookingSummary
              onCompletePayment={(method) => {
                if (method === "stripe") {
                  setShowPaymentForm(true);
                } else {
                  // Można dodać obsługę innych metod płatności
                  alert(`Metoda płatności ${method} jeszcze nieobsługiwana.`);
                }
              }}
            />
          </div>
        </div>
      </div>
    </BookingProvider>
  );
}

export default BookEvent;
