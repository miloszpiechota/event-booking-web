import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";
import validateEventTicketFormData from "../validation/validateEventTicketFormData.ts";
import { useFormData } from "../../context/FormDataContext.tsx";

const EventTicketForm = () => {
  const navigate = useNavigate();
  const { ticketData, setTicketData } = useFormData();
  const [errors, setErrors] = useState({});
  const [qrCodeValue, setQrCodeValue] = useState("");

  // Funkcja do generowania "bezpiecznego" tokenu
  // UWAGA: W prawdziwej aplikacji token należy generować na serwerze!
  const generateTicketToken = (data) => {
    const payload = {
      ticketId: uuidv4(),
      ticketName: data.t_ticket_name,
      eventId: data.t_event_id, // załóżmy, że masz identyfikator wydarzenia w danych formularza
      issuedAt: Date.now(),
    };
    // Na potrzeby demo używamy btoa do "zakodowania" payloadu.
    // W produkcji użyj JWT lub innego mechanizmu z podpisem cyfrowym.
    return btoa(JSON.stringify(payload));
  };

  useEffect(() => {
    if (ticketData.t_ticket_name) {
      // Generujemy token zabezpieczający dane biletu
      const token = generateTicketToken(ticketData);
      // Link zawiera token, a dedykowany endpoint zweryfikuje token i zwróci obraz QR
      const qrLink = `https://goEventApp.com/ticket?token=${token}`;
      setQrCodeValue(qrLink);
      // Zapisujemy token w danych biletu, aby móc później go wykorzystać
      setTicketData((prev) => ({ ...prev, t_qr_code: token }));
    }
  }, [ticketData.t_ticket_name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEventTicketFormData(ticketData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Event Ticket Form Data:", ticketData);
      navigate("/confirm-new-event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Complete your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Event Ticket Data:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Event Ticket Name:</label>
            <input
              type="text"
              name="t_ticket_name"
              onChange={handleChange}
              value={ticketData.t_ticket_name}
              className="w-full p-2 border rounded"
            />
            {errors.t_ticket_name && (
              <p className="text-red-500 text-sm">{errors.t_ticket_name}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Max Quantity:</label>
            <input
              type="text"
              name="t_quantity"
              onChange={handleChange}
              value={ticketData.t_quantity}
              className="w-full p-2 border rounded"
            />
            {errors.t_quantity && (
              <p className="text-red-500 text-sm">{errors.t_quantity}</p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6">QR Code:</h2>
        <div className="flex flex-col items-center">
          {qrCodeValue ? (
            <QRCode value={qrCodeValue} size={150} className="mt-2" />
          ) : (
            <p className="text-gray-500">
              Enter a ticket name to generate QR code
            </p>
          )}
          <input
            type="text"
            name="t_qr_code"
            value={qrCodeValue}
            readOnly
            className="w-full p-2 border rounded mt-2 text-center bg-gray-100"
          />
        </div>

        <h2 className="text-xl font-semibold mt-6">Ticket Pricing:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Single Ticket Price:</label>
            <input
              type="text"
              name="t_ticket_price"
              onChange={handleChange}
              value={ticketData.t_ticket_price}
              className="w-full p-2 border rounded"
            />
            {errors.t_ticket_price && (
              <p className="text-red-500 text-sm">{errors.t_ticket_price}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">VIP Ticket Price:</label>
            <input
              type="text"
              name="t_vip_price"
              onChange={handleChange}
              value={ticketData.t_vip_price}
              className="w-full p-2 border rounded"
            />
            {errors.t_vip_price && (
              <p className="text-red-500 text-sm">{errors.t_vip_price}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EventTicketForm;
