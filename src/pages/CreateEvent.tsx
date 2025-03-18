import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAddress } from "../api/validateAddress.ts";
import { validateOrganizerFormData } from "../api/validateOrganizerFormData.ts";
import { useFormData } from "../../context/FormDataContext.tsx";
const CreateEvent = () => {
  const navigate = useNavigate();

  const { organizerData, setOrganizerData } = useFormData();
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizerData({ ...organizerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateOrganizerFormData(organizerData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsValidatingAddress(true);
    const isAddressValid = await validateAddress(
      organizerData.u_street,
      organizerData.u_city,
      organizerData.u_zip_code,
      organizerData.u_country
    );
    setIsValidatingAddress(false);

    if (!isAddressValid) {
      setErrors((prev) => ({
        ...prev,
        u_street: "Invalid address. Please check your details.",
      }));
      return;
    }

    console.log("Form Data:", organizerData);
    navigate("/event-form");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg mt-6" style={{ backgroundColor: "rgba(73, 126, 207, 0.13)" }}>

      <h1 className="text-2xl font-bold mb-4">Complete Your Contact Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Personal Data</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="u_first_name" className="block font-semibold ">
              First Name:
            </label>
            <input
              type="text"
              id="u_first_name"
              name="u_first_name"
              placeholder="John"
              onChange={handleChange}
              value={organizerData.u_first_name}
              className={`w-full p-2  border-black-500 rounded bg-white ${
                errors.u_first_name && "border-red-500"
              }`}
            />
            {errors.u_first_name && (
              <p className="text-red-500 text-sm">{errors.u_first_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="u_last_name" className="block font-semibold">
              Last Name:
            </label>
            <input
              type="text"
              id="u_last_name"
              name="u_last_name"
              onChange={handleChange}
              value={organizerData.u_last_name}
              placeholder="Doe"
              className={`w-full p-2 border rounded ${
                errors.u_last_name && "border-red-500"
              }`}
            />
            {errors.u_last_name && (
              <p className="text-red-500 text-sm">{errors.u_last_name}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="u_birth_date" className="block font-semibold">
            Date of Birth:
          </label>
          <input
            type="date"
            id="u_birth_date"
            name="u_birth_date"
            onChange={handleChange}
            value={organizerData.u_birth_date}
            className={`w-full p-2 border rounded ${
              errors.u_birth_date && "border-red-500"
            }`}
          />
          {errors.u_birth_date && (
            <p className="text-red-500 text-sm">{errors.u_birth_date}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="u_contact_phone" className="block font-semibold">
              Contact Phone:
            </label>
            <input
              type="text"
              id="u_contact_phone"
              name="u_contact_phone"
              onChange={handleChange}
              value={organizerData.u_contact_phone}
              className={`w-full p-2 border rounded ${
                errors.u_contact_phone && "border-red-500"
              }`}
            />
            {errors.u_contact_phone && (
              <p className="text-red-500 text-sm">{errors.u_contact_phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="u_contact_email" className="block font-semibold">
              Contact Email:
            </label>
            <input
              type="email"
              id="u_contact_email"
              name="u_contact_email"
              onChange={handleChange}
              value={organizerData.u_contact_email}
              className={`w-full p-2 border rounded ${
                errors.u_contact_email && "border-red-500"
              }`}
            />
            {errors.u_contact_email && (
              <p className="text-red-500 text-sm">{errors.u_contact_email}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="u_contact_info" className="block font-semibold">
            Contact info:
          </label>
          <input
            type="text"
            id="u_contact_info"
            name="u_contact_info"
            onChange={handleChange}
            placeholder="Enter phone, email, or social media link"
            value={organizerData.u_contact_info}
            className={`w-full p-2 border rounded ${
              errors.u_contact_info && "border-red-500"
            }`}
          />
          {errors.u_contact_info && (
            <p className="text-red-500 text-sm">{errors.u_contact_info}</p>
          )}
        </div>

        <h2 className="text-xl font-semibold mt-6">Organizer Address</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="u_street" className="block font-semibold">
              Street:
            </label>
            <input
              type="text"
              id="u_street"
              name="u_street"
              onChange={handleChange}
              value={organizerData.u_street}
              placeholder="123 Main St."
              className={`w-full p-2 border rounded ${
                errors.u_street && "border-red-500"
              }`}
            />
            {errors.u_street && (
              <p className="text-red-500 text-sm">{errors.u_street}</p>
            )}
          </div>

          <div>
            <label htmlFor="u_apartment_number" className="block font-semibold">
              Apartment Number:
            </label>
            <input
              type="text"
              id="u_apartment_number"
              name="u_apartment_number"
              onChange={handleChange}
              value={organizerData.u_apartment_number}
              placeholder="23/4"
              className="w-full p-2 border rounded"
            />
            {errors.u_apartment_number && (
              <p className="text-red-500 text-sm">
                {errors.u_apartment_number}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="u_zip_code" className="block font-semibold">
              Zip Code:
            </label>
            <input
              type="text"
              id="u_zip_code"
              name="u_zip_code"
              onChange={handleChange}
              value={organizerData.u_zip_code}
              placeholder="XX-XXX"
              className={`w-full p-2 border rounded ${
                errors.u_zip_code && "border-red-500"
              }`}
            />
            {errors.u_zip_code && (
              <p className="text-red-500 text-sm">{errors.u_zip_code}</p>
            )}
          </div>

          <div>
            <label htmlFor="u_city" className="block font-semibold">
              City Name:
            </label>
            <input
              type="text"
              id="u_city"
              name="u_city"
              onChange={handleChange}
              value={organizerData.u_city}
              className={`w-full p-2 border rounded ${
                errors.u_city && "border-red-500"
              }`}
            />
            {errors.u_city && (
              <p className="text-red-500 text-sm">{errors.u_city}</p>
            )}
          </div>

          <div>
            <label htmlFor="u_country" className="block font-semibold">
              Country Code:
            </label>
            <input
              type="text"
              id="u_country"
              name="u_country"
              onChange={handleChange}
              value={organizerData.u_country}
              className={`w-full p-2 border rounded ${
                errors.u_country && "border-red-500"
              }`}
            />
            {errors.u_country && (
              <p className="text-red-500 text-sm">{errors.u_country}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={isValidatingAddress}
        >
          {isValidatingAddress ? "Validating Address..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
