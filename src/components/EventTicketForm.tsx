import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";
import validateEventTicketFormData from "../validation/validateEventTicketFormData.ts";
import { useFormData } from "../../context/FormDataContext.tsx";
import { generateQrCode } from "../api/generateQrCode.ts";
const EventTicketForm = () => {
  const navigate = useNavigate();
  const { ticketData, setTicketData } = useFormData();
  const [errors, setErrors] = useState({});
  const [qrCodeValue, setQrCodeValue] = useState("");

  useEffect(() => {
    const generate = async () => {
      if (ticketData.t_ticket_name) {
        const ticketId = uuidv4();
        const { token, qrLink } = await generateQrCode({
          ticketId,
          t_ticket_name: ticketData.t_ticket_name,
        });
  
        setQrCodeValue(qrLink);
        setTicketData((prev) => ({ ...prev, t_qr_code: token }));
      }
    };
    generate();
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
    <div className="max-w-2xl bg-black/40 backdrop-blur-lg mx-auto p-6 shadow-md rounded-lg mt-6 text-white">
      <button onClick={() => navigate(-1)} className="btn-back">
        &larr; Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Complete your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="h2-primary">Event Ticket Data:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Event Ticket Name:</label>
            <input
              type="text"
              name="t_ticket_name"
              onChange={handleChange}
              placeholder="Event Ticket Name"
              value={ticketData.t_ticket_name}
              className="w-full p-2 border rounded"
            />
            {errors.t_ticket_name && (
              <p className="text-red-500 text-sm">{errors.t_ticket_name}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Number Of Tickets:</label>
            <input
              type="text"
              name="t_quantity"
              onChange={handleChange}
              placeholder="1"
              value={ticketData.t_quantity}
              className="w-full p-2 border rounded"
            />
            {errors.t_quantity && (
              <p className="text-red-500 text-sm">{errors.t_quantity}</p>
            )}
          </div>
        </div>

        <h2 className="h2-primary mt-5">
          Your QR Code for Tickets will be generated here:
        </h2>
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
            placeholder="Your QR Code URL"
            readOnly
            className="w-full p-2 border rounded mt-2 text-center  bg-black/1 backdrop-blur-lg mt-10 mb-5"
          />
        </div>

        <h2 className="h2-primary">Ticket Pricing:</h2>
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

        <button type="submit" className="btn-primary">
          Next
        </button>
      </form>
    </div>
  );
};

export default EventTicketForm;
