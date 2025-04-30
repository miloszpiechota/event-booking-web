import React, { useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BookingContext } from "../../context/BookingContext.tsx";
import { handlePayment, TicketType } from "../api/payment.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1F2937",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: {
      color: "#EF4444",
      iconColor: "#EF4444",
    },
  },
};

const CheckoutForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !isCardComplete) {
      return;
    }

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
          card: elements.getElement(CardElement),
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
        // ✅ dopiero teraz wykonaj handlePayment
        await handlePayment({
          event,
          ticketCount,
          ticketType: getTicketType(),
          totalPrice: totalAmount,
          paymentMethod: "stripe",
        });

        setMessage("✅ Płatność zakończona sukcesem!");
      }
    } catch (error) {
      console.error("❌ Payment error:", error);
      setMessage("Płatność nie powiodła się. Spróbuj ponownie.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dane płatności</h2>

      <div className="border rounded-md p-4 shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition">
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={(e) => setIsCardComplete(e.complete)}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !isCardComplete || isProcessing}
        className={`w-full text-white py-2 px-4 rounded-md transition font-semibold ${
          isProcessing
            ? "bg-gray-400 cursor-wait"
            : isCardComplete
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {isProcessing ? "Przetwarzanie..." : `Zapłać ${totalAmount.toFixed(2)} zł`}
      </button>

      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
};

const PaymentFormStripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentFormStripe;
