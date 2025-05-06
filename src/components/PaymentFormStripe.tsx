import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BookingContext } from "../../context/BookingContext.tsx";
import { handlePayment, TicketType } from "../api/payment.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#F3F4F6", // Tailwind's gray-100
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#9CA3AF", // Tailwind's gray-400
      },
    },
    invalid: {
      color: "#EF4444", // red-500
      iconColor: "#EF4444",
    },
  },
};

const CheckoutForm = () => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const {
    event,
    ticketCount,
    selectedPrice,
    firstName,
    lastName,
    email,
  } = useContext(BookingContext);

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const totalAmount = selectedPrice * ticketCount;

  const getTicketType = (): TicketType => {
    const pricing = event?.event_ticket?.ticket_pricing;
    if (!pricing) return "Standard";
    return selectedPrice === pricing.vip_price ? "VIP" : "Standard";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !isCardComplete) return;

    setIsProcessing(true);
    try {
      const res = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: totalAmount * 100, currency: "pln" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd serwera.");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${firstName} ${lastName}`,
            email,
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Błąd podczas płatności.");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        await handlePayment({
          event,
          ticketCount,
          ticketType: getTicketType(),
          totalPrice: totalAmount,
          paymentMethod: 3,
        });
        setMessage("✅ Płatność zakończona sukcesem!");
        navigate("/ticket-box");

      }
    } catch (error) {
      console.error("❌ Payment error:", error);
      setMessage("Płatność nie powiodła się. Spróbuj ponownie.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/40 backdrop-blur-lg text-white p-6 rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-bold">Payment</h2>

      <div className="rounded-lg bg-gray-800 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 transition">
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={(e) => setIsCardComplete(e.complete)}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !isCardComplete || isProcessing}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          isProcessing
            ? "bg-gray-500 cursor-wait"
            : isCardComplete
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        {isProcessing
          ? "Processing..."
          : `Pay ${totalAmount.toFixed(2)} zł`}
      </button>

      {message && (
        <p className="text-center text-sm text-red-400 mt-2">{message}</p>
      )}
    </form>
  );
};

const PaymentFormStripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentFormStripe;
