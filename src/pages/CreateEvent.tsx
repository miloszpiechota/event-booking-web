import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { validateAddress } from "../validation/validateAddress.ts";
import { validateOrganizerFormData } from "../validation/validateOrganizerFormData.ts";
import { useFormData } from "../../context/FormDataContext.tsx";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { organizerData, setOrganizerData } = useFormData();
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phonePrefix, setPhonePrefix] = useState("+48");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOrganizerData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    },
    [setOrganizerData]
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setPhoneNumber(number);
    setOrganizerData((prevData) => ({
      ...prevData,
      u_contact_phone: `${phonePrefix} ${number}`,
    }));
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prefix = e.target.value;
    setPhonePrefix(prefix);
    setOrganizerData((prevData) => ({
      ...prevData,
      u_contact_phone: `${prefix} ${phoneNumber}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = validateOrganizerFormData(organizerData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate address
    setIsValidatingAddress(true);
    try {
      const isAddressValid = await validateAddress(
        organizerData.u_street,
        organizerData.u_city,
        organizerData.u_zip_code,
        organizerData.u_country
      );

      if (!isAddressValid) {
        setErrors((prev) => ({
          ...prev,
          u_street: "Invalid address. Please check your details.",
        }));
        return;
      }
    } catch (error) {
      console.error("Address validation error:", error);
      setErrors((prev) => ({
        ...prev,
        u_street: "Error validating address. Try again later.",
      }));
    } finally {
      setIsValidatingAddress(false);
    }

    console.log("Form Data:", organizerData);
    navigate("/event-form");
  };

  return (
    <div className="max-w-2xl bg-black/40 backdrop-blur-lg mx-auto p-6 shadow-md rounded-lg mt-6 text-white">
      <h1 className="text-2xl font-bold mb-10">Complete Your Contact Data</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Data Section */}
        <h2 className="text-xl font-semibold border-b border-gray-500 pb-2">
          Personal Data
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="u_first_name" className="block font-semibold">
              First Name:
            </label>
            <input
              type="text"
              id="u_first_name"
              name="u_first_name"
              placeholder="John"
              onChange={handleChange}
              value={organizerData.u_first_name || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
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
              placeholder="Doe"
              onChange={handleChange}
              value={organizerData.u_last_name || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
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
          <div className="flex">
            <select
              value={phonePrefix}
              onChange={handlePrefixChange}
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 bg-transparent text-white"
            >
              <option value="+48">+48</option>
              <option value="+49">+49</option>
              <option value="+44">+44</option>
              <option value="+1">+1</option>
            </select>
            <input
              type="tel"
              id="u_contact_phone"
              name="u_contact_phone"
              placeholder="XXX XXX XXX"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`w-full border border-l-0 rounded-r px-3 py-2 focus:outline-none focus:ring-1 bg-transparent text-white placeholder-white/50 ${
                errors.u_contact_phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
          </div>
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
            placeholder="example@domain.com"
            onChange={handleChange}
            value={organizerData.u_contact_email || ""}
            className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
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
            Contact Info:
          </label>
          <input
            type="text"
            id="u_contact_info"
            name="u_contact_info"
            placeholder="Enter phone, email, or social media link"
            onChange={handleChange}
            value={organizerData.u_contact_info || ""}
            className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
              errors.u_contact_info && "border-red-500"
            }`}
          />
          {errors.u_contact_info && (
            <p className="text-red-500 text-sm">{errors.u_contact_info}</p>
          )}
        </div>

        {/* Address Section */}
        <h2 className="text-xl font-semibold mt-6 border-b border-gray-500 pb-2 mt-10">
          Organizer Address
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="u_street" className="block font-semibold">
              Street:
            </label>
            <input
              type="text"
              id="u_street"
              name="u_street"
              placeholder="Main St."
              onChange={handleChange}
              value={organizerData.u_street || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
                errors.u_street && "border-red-500"
              }`}
            />
            {errors.u_street && (
              <p className="text-red-500 text-sm">{errors.u_street}</p>
            )}
          </div>
          <div>
            <label htmlFor="u_apartment_number" className="block font-semibold">
              House or Apartment Number:
            </label>
            <input
              type="text"
              id="u_apartment_number"
              name="u_apartment_number"
              placeholder="23/4"
              onChange={handleChange}
              value={organizerData.u_apartment_number || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
                errors.u_zip_code && "border-red-500"
              }`}
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
              placeholder="XX-XXX"
              onChange={handleChange}
              value={organizerData.u_zip_code || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
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
              placeholder="City Name"
              onChange={handleChange}
              value={organizerData.u_city || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
                errors.u_city && "border-red-500"
              }`}
            />
            {errors.u_city && (
              <p className="text-red-500 text-sm">{errors.u_city}</p>
            )}
          </div>
          <div>
            <label htmlFor="u_country" className="block font-semibold">
              Country Name:
            </label>
            <input
              type="text"
              id="u_country"
              name="u_country"
              onChange={handleChange}
              placeholder="Country Name"
              value={organizerData.u_country || ""}
              className={`w-full p-2 border rounded bg-transparent placeholder-white/50 focus:ring-green-500 ${
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
          className="btn-primary"
          disabled={isValidatingAddress}
        >
          {isValidatingAddress ? "Validating Address..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
