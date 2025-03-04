// src/components/BookingSummary.tsx
import React, { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/BookingContext.tsx";
import { convertDateTime } from "../api/convertDateTime.ts";
import { fetchPaymentMethod } from "../api/fetchPaymentMethod.ts";
import { handlePayment, TicketType, EventData } from "../api/payment.ts";

function BookingSummary() {
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

  const [paymentMethods, setPaymentMethods] = useState([
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Apple Pay", value: "apple_pay" },
  ]);

  useEffect(() => {
    const loadPaymentMethods = async () => {
      const methods = await fetchPaymentMethod();
      if (methods && methods.length > 0) {
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

  const { formattedStartDate, formattedEndDate } = convertDateTime(
    event.start_date,
    event.end_date
  );

  // Kalkulacja ceny łącznej
  const totalPrice = selectedPrice ? selectedPrice * ticketCount : 0;

  // Ustalenie typu biletu na podstawie ceny
  let ticketType: TicketType | "N/A" = "N/A";
  if (selectedPrice === event.event_ticket.ticket_pricing.ticket_price) {
    ticketType = "Standard";
  } else if (selectedPrice === event.event_ticket.ticket_pricing.vip_price) {
    ticketType = "VIP";
  }

  // Funkcje walidujące pola
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\d+$/.test(phone);

  const isFirstNameValid = firstName.trim() !== "";
  const isLastNameValid = lastName.trim() !== "";
  const isEmailValid = email && isValidEmail(email);
  const isPhoneValid = phonePrefix && phoneNumber && isValidPhone(phoneNumber);

  const isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid;

  // Pomocnicze funkcje renderujące pola
  const renderField = (label: string, value: string, condition: boolean) => (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${!condition ? "text-red-500" : ""}`}>
        {condition ? value : "not completed"}
      </span>
    </div>
  );

  const renderEmailField = () => renderField("Email:", email, isEmailValid);

  const renderPhoneField = () =>
    renderField(
      "Phone:",
      phonePrefix && phoneNumber ? `${phonePrefix} ${phoneNumber}` : "",
      isPhoneValid
    );

  const renderTicketType = () => (
    <div className="flex justify-between">
      <span className="text-gray-600">Ticket Type:</span>
      {ticketType === "N/A" ? (
        <span className="font-semibold text-red-500">not selected</span>
      ) : (
        <span className="font-semibold">{ticketType}</span>
      )}
    </div>
  );

  // Wywołanie funkcji handlePayment z przekazaniem niezbędnych danych
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-full">
      <h2 className="text-2xl font-semibold mb-6">Your Summary</h2>

      <div className="space-y-4">
        {renderField("First Name:", firstName, isFirstNameValid)}
        {renderField("Last Name:", lastName, isLastNameValid)}
        {renderEmailField()}
        {renderPhoneField()}

        <div className="flex justify-between">
          <span className="text-gray-600">Start Date:</span>
          <span className="font-semibold">{formattedStartDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">End Date:</span>
          <span className="font-semibold">{formattedEndDate}</span>
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

        {/* Select do wyboru metody płatności */}
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
          disabled={!isFormValid}
          onClick={onPaymentClick}
          className={`w-full ${
            isFormValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          } text-white font-semibold py-3 rounded-lg transition`}
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
