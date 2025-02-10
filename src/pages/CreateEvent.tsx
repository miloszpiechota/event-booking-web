import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAddress } from "../api/validateAddress.ts";
const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    u_first_name: "",
    u_last_name: "",
    u_birth_date: "",
    u_contact_phone: "",
    u_contact_email: "",
    u_street: "",
    u_apartment_number: "",
    u_zip_code: "",
    u_city: "",
    u_country: "",
    u_contact_info: "",
  });
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.u_first_name.trim()) {
        newErrors.u_first_name = "First name is required";
      } else if (formData.u_first_name.trim().length > 50) {
        newErrors.u_first_name = "First name must not exceed 50 characters";
      }
      
      if (!formData.u_last_name.trim()) {
        newErrors.u_last_name = "Last name is required";
      } else if (formData.u_last_name.trim().length > 50) {
        newErrors.u_last_name = "Last name must not exceed 50 characters";
      }
      
    if (!/^\d{9,15}$/.test(formData.u_contact_phone)) newErrors.u_contact_phone = "Invalid phone number";
    if (!/^\S+@\S+\.\S+$/.test(formData.u_contact_email)) newErrors.u_contact_email = "Invalid email format";
    if (formData.u_apartment_number.trim() && !/^\d+(\/\d+)?$/.test(formData.u_apartment_number.trim())) {
        newErrors.u_apartment_number = "Apartment number must be a simple number (e.g., 23) or in the format 'apartment building number/flat number' (e.g., 23/4)";
      }
      
    if (!formData.u_street.trim()) {
        newErrors.u_street = "Street is required";
      } else if (formData.u_street.trim().length > 100) {
        newErrors.u_street = "Street must not exceed 100 characters";
      }
    //   } else if (!/^[A-Za-z0-9\s.,'-]+$/.test(formData.u_street.trim())) {
    //     newErrors.u_street = "Street contains invalid characters. Only letters, numbers, spaces, commas, periods, hyphens, and apostrophes are allowed.";
    //   }
      
      
      if (!formData.u_city.trim()) {
        newErrors.u_city = "City is required";
      } else if (!/^[A-Za-z\s-]+$/.test(formData.u_city.trim())) {
        newErrors.u_city = "City can only contain letters, spaces, and hyphens";
      } else if (formData.u_city.trim().length > 50) {
        newErrors.u_city = "City must not exceed 50 characters";
      }
      
      if (!formData.u_country.trim()) {
        newErrors.u_country = "Country is required";
      } else if (!/^[A-Za-z\s-]+$/.test(formData.u_country.trim())) {
        newErrors.u_country = "Country can only contain letters, spaces, and hyphens";
      } else if (formData.u_country.trim().length > 50) {
        newErrors.u_country = "Country must not exceed 50 characters";
      }
      
    if (!/^\d{2}-\d{3}$/.test(formData.u_zip_code))newErrors.u_zip_code = "Invalid zip code (XX-XXX)";
    // Validate birth date and check if user is at least 18 years old
    if (!formData.u_birth_date) {
      newErrors.u_birth_date = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.u_birth_date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.u_birth_date = "You must be at least 18 years old";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsValidatingAddress(true); // Włączamy stan ładowania walidacji adresu
    const isAddressValid = await validateAddress(
      formData.u_street,
      formData.u_city,
      formData.u_zip_code,
      formData.u_country
    );
    setIsValidatingAddress(false); // Wyłączamy stan ładowania

    if (!isAddressValid) {
      setErrors((prev) => ({
        ...prev,
        u_street: "Invalid address. Please check your details.",
      }));
      return;
    }

    console.log("Form Data:", formData);
    navigate("/event-form");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Complete Your Contact Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Personal Data</h2>

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
              className={`w-full p-2 border rounded ${
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
              
              className={`w-full p-2 border rounded ${
                errors.u_contact_email && "border-red-500"
              }`}
            />
            {errors.u_contact_email && (
              <p className="text-red-500 text-sm">{errors.u_contact_email}</p>
            )}
          </div>
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
              placeholder="23/4"
              className="w-full p-2 border rounded"
            />
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
              placeholder="PL"
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
