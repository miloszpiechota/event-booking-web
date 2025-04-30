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
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    isValidEmail(email) &&
    phonePrefix !== "" &&
    phoneNumber.trim() !== "" &&
    isValidPhone(phoneNumber) &&
    selectedPrice &&
    ticketCount > 0 &&
    paymentMethod === "stripe";

  const renderField = (
    label: string,
    value: string,
    isValid: boolean
  ) => (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${!isValid ? "text-red-500" : ""}`}>
        {isValid ? value : "not completed"}
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
      if (selectedPrice === pricing.ticket_price) {
        ticketType = "Standard";
      } else if (selectedPrice === pricing.vip_price) {
        ticketType = "VIP";
      }
    }

    return (
      <div className="flex justify-between">
        <span className="text-gray-600">Ticket Type:</span>
        <span className={`font-semibold ${ticketType === "N/A" ? "text-red-500" : ""}`}>
          {ticketType !== "N/A" ? ticketType : "not selected"}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-6">Your Summary</h2>

      <div className="space-y-4">
        {renderField("First Name:", firstName, firstName.trim() !== "")}
        {renderField("Last Name:", lastName, lastName.trim() !== "")}
        {renderField("Email:", email, isValidEmail(email))}
        {renderPhone()}

        <div className="flex justify-between">
          <span className="text-gray-600">Start Date:</span>
          <span className="font-semibold">
            {formattedStartDate.formattedDate} {formattedStartDate.formattedTime}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">End Date:</span>
          <span className="font-semibold">
            {formattedEndDate.formattedDate} {formattedEndDate.formattedTime}
          </span>
        </div>

        {renderTicketType()}

        <div className="flex justify-between">
          <span className="text-gray-600">Number of Tickets:</span>
          <span className="font-semibold">{ticketCount}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total Price:</span>
          <span>{totalPrice} zł</span>
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Payment Method:</label>
          <select
            value={paymentMethod || ""}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select payment method
            </option>
            <option value="stripe">Stripe payments</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          disabled={!isFormValid}
          onClick={() => onCompletePayment("stripe")}
          className={`w-full ${
            isFormValid
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          } text-white font-semibold py-3 rounded-lg transition`}
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
