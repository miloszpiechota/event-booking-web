import React, { useContext, useState } from "react";
import { BookingContext } from "../../context/BookingContext.tsx";
import { formatDateTime } from "../api/formatDateTime.ts";

type BookingSummaryProps = {
  onCompletePayment: (method: string) => void;
};

function BookingSummary({ onCompletePayment }: BookingSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const {
    event,
    firstName,
    lastName,
    email,
    phonePrefix,
    phoneNumber,
    selectedPrice,
    ticketCount,
  } = useContext(BookingContext);

  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  const totalPrice = selectedPrice ? selectedPrice * ticketCount : 0;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\d+$/.test(phone);

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    isValidEmail(email) &&
    phonePrefix &&
    phoneNumber.trim() &&
    isValidPhone(phoneNumber) &&
    selectedPrice &&
    ticketCount > 0 &&
    paymentMethod === "stripe";

  const renderField = (label: string, value: string, isValid: boolean) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-semibold text-sm ${!isValid ? "text-red-500" : "text-white"}`}>
        {isValid ? value : "Not completed"}
      </span>
    </div>
  );

  const renderPhone = () =>
    renderField(
      "Phone:",
      phonePrefix && phoneNumber ? `${phonePrefix} ${phoneNumber}` : "",
      phonePrefix !== "" && isValidPhone(phoneNumber)
    );

  const renderTicketType = () => {
    const pricing = event?.event_ticket?.ticket_pricing;
    let ticketType = "N/A";

    if (pricing) {
      if (selectedPrice === pricing.ticket_price) ticketType = "Standard";
      else if (selectedPrice === pricing.vip_price) ticketType = "VIP";
    }

    return (
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Ticket Type:</span>
        <span className={`font-semibold text-sm ${ticketType === "N/A" ? "text-red-500" : "text-white"}`}>
          {ticketType !== "N/A" ? ticketType : "Not selected"}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg text-white p-6 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold">Summary</h2>

      <div className="space-y-3 text-sm">
        {renderField("First Name:", firstName, !!firstName.trim())}
        {renderField("Last Name:", lastName, !!lastName.trim())}
        {renderField("Email:", email, isValidEmail(email))}
        {renderPhone()}

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Start Date:</span>
          <span className="font-semibold text-white text-sm">
            {formattedStartDate.formattedDate} {formattedStartDate.formattedTime}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">End Date:</span>
          <span className="font-semibold text-white text-sm">
            {formattedEndDate.formattedDate} {formattedEndDate.formattedTime}
          </span>
        </div>

        {renderTicketType()}

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Tickets:</span>
          <span className="font-semibold text-white text-sm">{ticketCount}</span>
        </div>

        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span>{totalPrice} zł</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm text-gray-400">Payment Method</label>
        <select
          value={paymentMethod || ""}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-lg bg-gray-800 text-white border border-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          <option value="" disabled>
            Choose method
          </option>
          <option value="stripe">Stripe</option>
        </select>
      </div>

      <button
        disabled={!isFormValid}
        onClick={() => onCompletePayment("stripe")}
        className={`w-full py-3 mt-4 rounded-xl font-semibold transition ${
          isFormValid
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-600 text-gray-300 cursor-not-allowed"
        }`}
      >
        Complete Payment
      </button>
    </div>
  );
}

export default BookingSummary;
