import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // UUID do generowania unikalnego identyfikatora
import QRCode from "react-qr-code";
import validateEventTicketFormData from "../api/validateEventTicketFormData.ts";

const EventTicketForm = () => {
  const navigate = useNavigate();
  const [formTicketData, setFormTicketData] = useState({
    t_ticket_name: "",
    t_quantity: "",
    t_qr_code: "",
    t_ticket_price: "",
    t_vip_price: "",
  });

  const { formOrganizerData, formEventData } = useLocation().state;
  const [errors, setErrors] = useState({});
  const [qrCodeValue, setQrCodeValue] = useState(""); // Przechowuje link do QR kodu

  // Generowanie unikalnego kodu QR po każdej zmianie nazwy biletu
  useEffect(() => {
    if (formTicketData.t_ticket_name) {
      const uniqueId = uuidv4(); // Tworzymy unikalny identyfikator
      const qrLink = `https://goEvent.com/ticket/${uniqueId}`; // Generujemy link biletu
      setQrCodeValue(qrLink);
      setFormTicketData((prev) => ({ ...prev, t_qr_code: qrLink }));
    }
  }, [formTicketData.t_ticket_name]); // QR generuje się, gdy użytkownik wpisze nazwę biletu

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "t_quantity" && !/^\d*$/.test(value)) return;
    if ((name === "t_ticket_price" || name === "t_vip_price") && !/^\d*\.?\d{0,2}$/.test(value)) return;

    setFormTicketData({ ...formTicketData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEventTicketFormData(formTicketData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formTicketData);
      navigate("/summary", { state: { formOrganizerData, formEventData, formTicketData } });
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
            <input type="text" name="t_ticket_name" onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.t_ticket_name && <p className="text-red-500 text-sm">{errors.t_ticket_name}</p>}
          </div>

          <div>
            <label className="block font-semibold">Max Quantity:</label>
            <input type="text" name="t_quantity" onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.t_quantity && <p className="text-red-500 text-sm">{errors.t_quantity}</p>}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6">QR Code:</h2>
        <div className="flex flex-col items-center">
          {qrCodeValue ? (
            <QRCode value={qrCodeValue} size={150} className="mt-2" />
          ) : (
            <p className="text-gray-500">Enter a ticket name to generate QR code</p>
          )}
          <input type="text" name="t_qr_code" value={qrCodeValue} readOnly className="w-full p-2 border rounded mt-2 text-center bg-gray-100" />
        </div>

        <h2 className="text-xl font-semibold mt-6">Ticket Pricing:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Single Ticket Price:</label>
            <input type="text" name="t_ticket_price" onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.t_ticket_price && <p className="text-red-500 text-sm">{errors.t_ticket_price}</p>}
          </div>
          <div>
            <label className="block font-semibold">VIP Ticket Price:</label>
            <input type="text" name="t_vip_price" onChange={handleChange} className="w-full p-2 border rounded" />
            {errors.t_vip_price && <p className="text-red-500 text-sm">{errors.t_vip_price}</p>}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Next
        </button>
      </form>
    </div>
  );
};

export default EventTicketForm;
