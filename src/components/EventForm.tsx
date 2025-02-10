import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const EventForm = () => {
    const navigate = useNavigate();
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

  const handleOnClick = () => {
    navigate("/event-ticket-form");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Compleate your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-semibold mt-6">Event Data:</h2>
        {/* Event Details */}
        
          <div>
            <label htmlFor="event_ticket_name" className="block font-semibold">
              Event Name:
            </label>
            <input
              type="text"
              id="event_ticket_name"
              name="event_ticket_name"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          
        

        <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="block font-semibold">
            Start Date:
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="end_date" className="block font-semibold">
            End Date:
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        </div>

        
          <div>
            <label htmlFor="qr_code" className="block font-semibold">
              Short Description:
            </label>
            <input
              type="text"
              id="qr_code"
              name="qr_code"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="long_description" className="block font-semibold">
             Long Description:
            </label>
            <input
              type="long_description"
              id="long_description"
              name="long_descritpion"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="ticket_price" className="block font-semibold">
             Image Url:
            </label>
            <input
              type="image_url"
              id="ticket_price"
              name="ticket_price"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        

        {/* Organizer Details */}
        <h2 className="text-xl font-semibold mt-6">Event Address:</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="street" className="block font-semibold">
              Street:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="apartmentNumber" className="block font-semibold">
              Apartment Number:
            </label>
            <input
              type="text"
              id="apartmentNumber"
              name="apartmentNumber"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="zipCode" className="block font-semibold">
              Zip Code:
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="city" className="block font-semibold">
              City Name:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="country" className="block font-semibold">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block font-semibold">
              Latitude:
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="alongitude" className="block font-semibold">
              Longitude:
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>


        <button
        onClick={handleOnClick}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default EventForm;
