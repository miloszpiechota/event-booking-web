import React, { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/BookingContext.tsx";
import { formatDateTime } from "../api/formatDateTime.ts";
import { fetchPaymentMethod } from "../api/fetchPaymentMethod.ts";
import { handlePayment, TicketType } from "../api/payment.ts";

type BookingSummaryProps = {
  onCompletePayment: (method: string) => void;
};

function BookingSummary({ onCompletePayment }: BookingSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<
    { label: string; value: string }[]
  >([
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Apple Pay", value: "apple_pay" },
  ]);

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

  useEffect(() => {
    const loadPaymentMethods = async () => {
      const methods = await fetchPaymentMethod();
      if (methods?.length > 0) {
        setPaymentMethods(
          methods.map((method: { name: string; id: string }) => ({
            label: method.name,
            value: method.id,
          }))
        );
      }
    };

    loadPaymentMethods();
  }, []);

  const { formattedStartDate, formattedEndDate } = formatDateTime(
    event.start_date,
    event.end_date
  );

  const totalPrice = selectedPrice ? selectedPrice * ticketCount : 0;

  let ticketType: TicketType | "N/A" = "N/A";
  const pricing = event?.event_ticket?.ticket_pricing;

  if (pricing) {
    if (selectedPrice === pricing.ticket_price) {
      ticketType = "Standard";
    } else if (selectedPrice === pricing.vip_price) {
      ticketType = "VIP";
    }
  }

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\d+$/.test(phone);

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    isValidEmail(email) &&
    phonePrefix !== "" &&
    phoneNumber.trim() !== "" &&
    isValidPhone(phoneNumber);

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

  const renderTicketType = () => (
    <div className="flex justify-between">
      <span className="text-gray-600">Ticket Type:</span>
      <span className={`font-semibold ${ticketType === "N/A" ? "text-red-500" : ""}`}>
        {ticketType !== "N/A" ? ticketType : "not selected"}
      </span>
    </div>
  );

  const onPaymentClick = async () => {
    if (ticketType === "N/A") {
      window.alert("Please select a valid ticket type.");
      return;
    }

    await handlePayment({
      event,
      ticketCount,
      ticketType,
      totalPrice,
      paymentMethod: paymentMethod || "",
    });
  };

  const handleCompletePayment = () => {
    if (paymentMethod === "stripe") {
      setIsProcessingStripe(true);
      onCompletePayment("stripe");
    } else {
      onPaymentClick();
    }
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
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          disabled={!isFormValid || isProcessingStripe}
          onClick={handleCompletePayment}
          className={`w-full ${
            isFormValid && !isProcessingStripe
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          } text-white font-semibold py-3 rounded-lg transition`}
        >
          {isProcessingStripe ? "Payment in process..." : "Complete Payment"}
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
