import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
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

  const handleOnClick = () => {
    navigate("/event-form");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Możesz tutaj dodać logikę do wysyłania danych do API
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Compleate your contact data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Personal Data:</h2>
        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="event_ticket_name" className="block font-semibold">
              First Name:
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
              Last Name:
            </label>
            <input
              type="text"
              id="max_quantity"
              name="max_quantity"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor="birth_date" className="block font-semibold">
            Date Of Birth:
          </label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactPhone" className="block font-semibold">
              Contact Phone:
            </label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block font-semibold">
              Contact Email:
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Organizer Details */}
        <h2 className="text-xl font-semibold mt-6">Organizer Address:</h2>

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

        <div>
          <label htmlFor="contactInfo" className="block font-semibold">
            Contact Info:
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
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

export default CreateEvent;
