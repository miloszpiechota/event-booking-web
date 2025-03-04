
import React, { useState, useEffect } from "react";
import { fetchPaymentMethod } from "../api/fetchPaymentMethod.ts"; // Import the function from your file
import { BookingContext } from "../../context/BookingContext.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventContext.tsx";

const PaymentForm = () => {
  const [paymentMethods, setPaymentMethods] = useState([]); // Store payment methods
  const [paymentMethod, setPaymentMethod] = useState("mastercard");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  

  // Fetch payment methods when the component is mounted
  useEffect(() => {
    const getPaymentMethods = async () => {
      const methods = await fetchPaymentMethod();
      setPaymentMethods(methods);
    };
    getPaymentMethods();
  }, []);

  // Handle the payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment data:", {
      paymentMethod,
      cardholderName,
      cardNumber,
      expiryDate,
      ccv,
      saveDetails,
    });
  };

 
  

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{event.name}</h2>

      {/* Wybór metody płatności */}
      <div className="flex items-center space-x-4 mb-6">
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <button
              key={method.id} // Assuming each payment method has a unique ID
              type="button"
              onClick={() => handlePaymentMethodChange(method.name)}
              className={`border rounded p-2 transition-colors ${
                paymentMethod === method.name ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img
                src={method.icon_url} // Assuming 'icon_url' is the field in your database
                alt={method.name}
                className="w-10 h-auto"
              />
            </button>
          ))
        ) : (
          <p>No payment methods available.</p>
        )}
      </div>

      {/* Cardholder name */}
      <label className="block mb-1 font-medium text-gray-700">Cardholder name</label>
      <input
        type="text"
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="e.g. John Doe"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
      />

      {/* Card details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Card number</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Date</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">CCV</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="123"
            value={ccv}
            onChange={(e) => setCcv(e.target.value)}
          />
        </div>
      </div>

      {/* Payment info */}
      <p className="text-sm text-gray-600 flex items-center mb-4">
        <svg
          className="w-4 h-4 mr-2 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 2a7 7 0 100 14 7 7 0 000-14zM8 6h2v2H8V6zm0 4h2v4H8v-4z" />
        </svg>
        Credit Card payments may take up to 24h to be processed
      </p>

      {/* Save card details checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="saveDetails"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          checked={saveDetails}
          onChange={() => setSaveDetails(!saveDetails)}
        />
        <label htmlFor="saveDetails" className="ml-2 text-gray-700">
          Save my payment details for future purchases
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;

function useContext(BookingContext: any): { event: any; firstName: any; setFirstName: any; lastName: any; setLastName: any; email: any; setEmail: any; phonePrefix: any; setPhonePrefix: any; phoneNumber: any; setPhoneNumber: any; selectedPrice: any; setSelectedPrice: any; ticketCount: any; setTicketCount: any; } {
  throw new Error("Function not implemented.");
}
