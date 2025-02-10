import React, { useState } from "react";

const EventTicketForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    userLocation: "",
    contactEmail: "",
    contactInfo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Możesz tutaj dodać logikę do wysyłania danych do API
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Compleate your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-semibold mt-6">Event Ticket Data:</h2>
        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="event_ticket_name" className="block font-semibold">
              Event Ticket Name:
            </label>
            <input
              type="text"
              id="event_ticket_name"
              name="event_ticket_name"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="max_quantity" className="block font-semibold">
              Max Quantity:
            </label>
            <input
              type="number"
              id="max_quantity"
              name="max_quantity"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          
        </div>



        
          <div>
            <label htmlFor="qr_code" className="block font-semibold">
              Generate qr code for ticket:
            </label>
            <input
              type="text"
              id="qr_code"
              name="qr_code"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <h2 className="text-xl font-semibold mt-6">Ticket Pricing:</h2>

          <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ticket_price" className="block font-semibold">
             Single Ticket Price:
            </label>
            <input
              type="image_url"
              id="ticket_price"
              name="ticket_price"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="ticket_price" className="block font-semibold">
             VIP Ticket Price:
            </label>
            <input
              type="image_url"
              id="ticket_price"
              name="ticket_price"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
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
