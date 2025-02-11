import React, { useState } from "react";
import validateEventTicketFormData from "../api/validateEventTicketFormData.ts";
import { useLocation, useNavigate } from "react-router-dom";

const EventTicketForm = () => {
  const navigate = useNavigate();
  const [formTicketData, setFormData] = useState({
    t_ticket_name: "",
    t_quantity: "",
    t_qr_code: "",
    t_ticket_price: "",
    t_vip_price: "",
  });
  const {formOrganizerData, formEventData} = useLocation().state;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "t_quantity") {
      if (!/^\d*$/.test(value)) return; // Pozwala tylko na liczby całkowite
    }
  
    if (name === "t_ticket_price" || name === "t_vip_price") {
      if (!/^\d*\.?\d{0,2}$/.test(value)) return; // Pozwala na liczby dziesiętne do 2 miejsc po przecinku
    }
  
    setFormData({ ...formTicketData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateEventTicketFormData(formTicketData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formTicketData);
      // Możesz tutaj dodać logikę do wysyłania danych do API
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Complete your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Event Ticket Data:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="t_ticket_name" className="block font-semibold">
              Event Ticket Name:
            </label>
            <input
              type="text"
              id="t_ticket_name"
              name="t_ticket_name"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.t_ticket_name && (
              <p className="text-red-500 text-sm">{errors.t_ticket_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="t_quantity" className="block font-semibold">
              Max Quantity:
            </label>
            <input
              type="text"
              id="t_quantity"
              name="t_quantity"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.t_quantity && (
              <p className="text-red-500 text-sm">{errors.t_quantity}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="t_qr_code" className="block font-semibold">
            Generate QR code for ticket:
          </label>
          <input
            type="text"
            id="t_qr_code"
            name="t_qr_code"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.t_qr_code && (
            <p className="text-red-500 text-sm">{errors.t_qr_code}</p>
          )}
        </div>

        <h2 className="text-xl font-semibold mt-6">Ticket Pricing:</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="t_ticket_price" className="block font-semibold">
              Single Ticket Price:
            </label>
            <input
              type="text"
              id="t_ticket_price"
              name="t_ticket_price"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.t_ticket_price && (
              <p className="text-red-500 text-sm">{errors.t_ticket_price}</p>
            )}
          </div>
          <div>
            <label htmlFor="t_vip_price" className="block font-semibold">
              VIP Ticket Price:
            </label>
            <input
              type="text"
              id="t_vip_price"
              name="t_vip_price"
              onChange={handleChange}
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
      </form>
    </div>
  );
};

export default EventTicketForm;
