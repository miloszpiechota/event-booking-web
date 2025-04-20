import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Publiczny klucz Stripe

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ onPaymentSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe nie zostało jeszcze załadowane. Proszę czekać.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: 1999, currency: "pln" }),
      });

      const data = await res.json();
      console.log("📦 Odpowiedź z serwera:", data);

      if (!res.ok) {
        throw new Error(
          data.error || "Błąd serwera podczas tworzenia PaymentIntent."
        );
      }

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Maciej Kuropatwa",
          },
        },
      });
      
      console.log("💳 Wynik płatności:", result);
      

      if (result.error) {
        setMessage(result.error.message || "Błąd podczas płatności.");
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("✅ Płatność zakończona sukcesem!");
        onPaymentSuccess(); // Wywołanie funkcji po sukcesie
      }
    } catch (error) {
      setMessage("Wystąpił błąd podczas przetwarzania płatności.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">Płatność</h2>

      <div className="border rounded-md p-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isProcessing ? "Przetwarzanie..." : "Zapłać 19,99 zł"}
      </button>

      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
};

const PaymentWrapper = ({ onPaymentSuccess, onClose }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm onPaymentSuccess={onPaymentSuccess} onClose={onClose} />
  </Elements>
);

export default PaymentWrapper;
