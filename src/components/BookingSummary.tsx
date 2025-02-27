import React, { useContext } from "react";
import { BookingContext } from "../../context/BookingContext.tsx";
import { convertDateTime } from "../api/convertDateTime.ts";

function BookingSummary({ onCompletePayment }) {
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

  const { formattedStartDate, formattedEndDate } = convertDateTime(
    event.start_date,
    event.end_date
  );

  // Kalkulacja ceny łącznej
  const totalPrice = selectedPrice ? selectedPrice * ticketCount : 0;

  // Określenie typu biletu
  let ticketType = "N/A";
  if (selectedPrice === event.event_ticket.ticket_pricing.ticket_price) {
    ticketType = "Standard";
  } else if (selectedPrice === event.event_ticket.ticket_pricing.vip_price) {
    ticketType = "VIP";
  }

  // Funkcje walidujące pola
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d+$/.test(phone);

  const isFirstNameValid = firstName.trim() !== "";
  const isLastNameValid = lastName.trim() !== "";
  const isEmailValid = email && isValidEmail(email);
  const isPhoneValid = phonePrefix && phoneNumber && isValidPhone(phoneNumber);

  // Formularz jest prawidłowy, gdy wszystkie wymagane pola są poprawne
  const isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid;

  // Funkcja pomocnicza – renderuje pole oraz (jeżeli niepoprawne) komunikat błędu
  const renderField = (label, value, condition, errorMessage) => (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-gray-600">{label}</span>
        <span className={`font-semibold ${!condition ? "text-red-500" : ""}`}>
          {condition ? value : "not compleated"}
        </span>
      </div>
      {!condition && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );

  // Specjalne renderowanie pola Email z walidacją
  const renderEmailField = () =>
    renderField("Email:", email, isEmailValid, "Podaj poprawny email");

  // Specjalne renderowanie pola Phone z walidacją
  const renderPhoneField = () =>
    renderField(
      "Phone:",
      phonePrefix && phoneNumber ? `${phonePrefix} ${phoneNumber}` : "",
      isPhoneValid,
      "Podaj poprawny numer telefonu"
    );

  // Renderowanie typu biletu z komunikatem, gdy żaden nie został wybrany
  const renderTicketType = () => (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-gray-600">Ticket Type:</span>
        {ticketType === "N/A" ? (
          <span className="font-semibold text-red-500">not selected</span>
        ) : (
          <span className="font-semibold">{ticketType}</span>
        )}
      </div>
      {ticketType === "N/A" && (
        <p className="text-red-500 text-sm mt-1">Nie wybrano biletu</p>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-full">
      <h2 className="text-2xl font-semibold mb-6">Your Summary</h2>

      <div className="space-y-4">
        {renderField("First Name:", firstName, isFirstNameValid, "To pole jest wymagane")}
        {renderField("Last Name:", lastName, isLastNameValid, "To pole jest wymagane")}
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
      </div>

      <div className="mt-6">
        <button
          disabled={!isFormValid}
          onClick={() => {
            if (isFormValid) onCompletePayment();
          }}
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
