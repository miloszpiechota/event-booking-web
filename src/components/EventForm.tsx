import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAddress } from "../api/validateAddress.ts";
const EventForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [formData, setFormData] = useState({
    e_event_name: "",
    e_start_date: "",
    e_end_date: "",
    e_short_descryp: "",
    e_long_descryp: "",
    e_image_url: "",
    e_street: "",
    e_apartment_number: "",
    e_zip_code: "",
    e_city: "",
    e_country: "",
    e_latitude: "",
    e_longitude: "",
    e_start_time: "",
    e_end_time: "",
  });

  const formatDateTime = (date, time) => {
    if (!date || !time) return "";
    return `${date}T${time}:00`; // Pozostaje w lokalnym czasie
  };
  
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      let newFormData = { ...prev, [name]: value };
  
      if (["e_start_date", "e_start_time"].includes(name)) {
        newFormData.e_start_date = formatDateTime(newFormData.e_start_date, newFormData.e_start_time);
      }
  
      if (["e_end_date", "e_end_time"].includes(name)) {
        newFormData.e_end_date = formatDateTime(newFormData.e_end_date, newFormData.e_end_time);
      }
  
      return newFormData;
    });
  
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsValidatingAddress(true);
    const isAddressValid = await validateAddress(
      formData.e_street,
      formData.e_city,
      formData.e_zip_code,
      formData.e_country
    );
    setIsValidatingAddress(false);

    if (!isAddressValid) {
      setErrors((prev) => ({
        ...prev,
        e_street: "Invalid address. Please check your details.",
      }));
      return;
    }

    console.log("Form Data:", formData);
    navigate("/event-ticket-form");
  };

  const handleOnClick = () => {
    navigate("/event-ticket-form");
  };

  const validate = () => {
    let newErrors = {};
    const now = new Date();
    now.setSeconds(0, 0); // Usunięcie sekund dla precyzyjnej walidacji


    if (!formData.e_event_name.trim()) {
      newErrors.e_event_name = "Event name is required";
    } else if (formData.e_event_name.trim().length > 100) {
      newErrors.e_event_name = "Event name must not exceed 100 characters";
    }
    
    if (!formData.e_short_descryp.trim())
      newErrors.e_short_descryp = "Short description is required";
    if (!formData.e_long_descryp.trim())
      newErrors.e_long_descryp = "Long description is required";
    if (!formData.e_image_url.trim())
      newErrors.e_image_url = "Image URL is required";

    if(!formData.e_street.trim()){
        newErrors.e_street = "Street is required";
    }
    if (!formData.e_apartment_number.trim()) {
      newErrors.e_apartment_number = "Apartment number is required";
    } else if (!/^\d+(\/\d+)?$/.test(formData.e_apartment_number.trim())) {
      newErrors.e_apartment_number =
        "Invalid apartment number format (e.g. 12/2)";
    }

    if (!formData.e_zip_code.trim()) {
      newErrors.e_zip_code = "Zip code is required";
    } else if (!/^\d{2}-\d{3}$/.test(formData.e_zip_code)) {
      newErrors.e_zip_code = "Invalid zip code format (XX-XXX)";
    }

    if (!formData.e_city.trim()) {
      newErrors.e_city = "City is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.e_city.trim())) {
      newErrors.e_city = "City can only contain letters, spaces, and hyphens";
    } else if (formData.e_city.trim().length > 50) {
      newErrors.e_city = "City must not exceed 50 characters";
    }

    if (!formData.e_country.trim()) {
      newErrors.e_country = "Country is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.e_country.trim())) {
      newErrors.e_country =
        "Country can only contain letters, spaces, and hyphens";
    } else if (formData.e_country.trim().length > 50) {
      newErrors.e_country = "Country must not exceed 50 characters";
    }

    if (!formData.e_latitude.trim())
      newErrors.e_latitude = "Latitude is required";
    if (!formData.e_longitude.trim())
      newErrors.e_longitude = "Longitude is required";

    // === Walidacja daty i czasu ===
    // Sprawdzamy, czy pola nie są puste (w wyniku łączenia daty i czasu)
    if (!formData.e_start_date) {
        newErrors.e_start_date = "Start date and time is required";
      }
      if (!formData.e_end_date) {
        newErrors.e_end_date = "End date and time is required";
      }
  
      // Jeśli oba pola zostały wypełnione, wykonujemy dalsze sprawdzenia
      if (formData.e_start_date && formData.e_end_date) {
        const startDate = new Date(formData.e_start_date);
        const endDate = new Date(formData.e_end_date);
  
        // Data/czas rozpoczęcia nie może być w przeszłości
        if (startDate < now) {
          newErrors.e_start_date = "Start date/time cannot be in the past";
        }
  
        // Data/czas zakończenia nie może być w przeszłości
        if (endDate < now) {
          newErrors.e_end_date = "End date/time cannot be in the past";
        }
  
        // Czas rozpoczęcia nie może być taki sam jak zakończenia
        // (oraz data zakończenia musi być późniejsza od daty rozpoczęcia)
        if (endDate <= startDate) {
          newErrors.e_end_date = "End date/time must be later than start date/time";
        }
  
        // Sprawdzamy, czy czas trwania wynosi co najmniej 1 godzinę
        const durationMs = endDate - startDate;
        if (durationMs < 3600000) {
          newErrors.e_end_date = "Event duration must be at least 1 hour";
        }
  
        // Sprawdzamy, czy zakres dat nie przekracza 2 tygodni (14 dni)
        if (durationMs > 1209600000) {
          newErrors.e_end_date = "Event duration cannot exceed 2 weeks";
        }
      }
      // ================================
   
  

  // Jeśli któreś z wymaganych pól jest puste, przerwij dalszą walidację
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return false;
  }

  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Complete your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Event Data:</h2>
        <div>
          <label htmlFor="e_event_name" className="block font-semibold">
            Event Name:
          </label>
          <input
            type="text"
            id="e_event_name"
            name="e_event_name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter event name"
          />
          {errors.e_event_name && (
            <p className="text-red-500 text-sm">{errors.e_event_name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_start_date" className="block font-semibold">
              Start Date:
            </label>
            <input
              type="date"
              id="e_start_date"
              name="e_start_date"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
             {errors.e_start_date && (
              <p className="text-red-500 text-sm">{errors.e_start_date}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_start_time" className="block font-semibold">
              Start Time:
            </label>
            <input
              type="time"
              id="e_start_time"
              name="e_start_time"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_end_date" className="block font-semibold">
              End Date:
            </label>
            <input
              type="date"
              id="e_end_date"
              name="e_end_date"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
             {errors.e_end_date && (
              <p className="text-red-500 text-sm">{errors.e_end_date}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_end_time" className="block font-semibold">
              End Time:
            </label>
            <input
              type="time"
              id="e_end_time"
              name="e_end_time"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              
            />
            
          </div>
        </div>

        <div>
          <label htmlFor="e_short_descryp" className="block font-semibold">
            Short Description:
          </label>
          <input
            type="text"
            id="e_short_descryp"
            name="e_short_descryp"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter short description max 100 characters"
          />
          {errors.e_short_descryp && (
            <p className="text-red-500 text-sm">{errors.e_short_descryp}</p>
          )}
        </div>

        <div>
          <label htmlFor="e_long_descryp" className="block font-semibold">
            Long Description:
          </label>
          <input
            type="text"
            id="e_long_descryp"
            name="e_long_descryp"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter long description max 500 characters"
          />
          {errors.e_long_descryp && (
            <p className="text-red-500 text-sm">{errors.e_long_descryp}</p>
          )}
        </div>

        <div>
          <label htmlFor="e_image_url" className="block font-semibold">
            Image URL:
          </label>
          <input
            type="text"
            id="e_image_url"
            name="e_image_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.e_image_url && (
            <p className="text-red-500 text-sm">{errors.e_image_url}</p>
          )}
        </div>

        <h2 className="text-xl font-semibold mt-6">Event Address:</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_street" className="block font-semibold">
              Street:
            </label>
            <input
              type="text"
              id="e_street"
              name="e_street"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="123 Main St."
            />
            {errors.e_street && (
              <p className="text-red-500 text-sm">{errors.e_street}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_apartment_number" className="block font-semibold">
              Apartment Number:
            </label>
            <input
              type="text"
              id="e_apartment_number"
              name="e_apartment_number"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="23/4"
            />
            {errors.e_apartment_number && (
              <p className="text-red-500 text-sm">
                {errors.e_apartment_number}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="e_zip_code" className="block font-semibold">
              Zip Code:
            </label>
            <input
              type="text"
              id="e_zip_code"
              name="e_zip_code"
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.e_zip_code && "border-red-500"
              }`}
              placeholder="XX-XXX"
            />
            {errors.e_zip_code && (
              <p className="text-red-500 text-sm">{errors.e_zip_code}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_city" className="block font-semibold">
              City Name:
            </label>
            <input
              type="text"
              id="e_city"
              name="e_city"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.e_city && (
              <p className="text-red-500 text-sm">{errors.e_city}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_country" className="block font-semibold">
              Country:
            </label>
            <input
              type="text"
              id="e_country"
              name="e_country"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="PL"
            />
            {errors.e_country && (
              <p className="text-red-500 text-sm">{errors.e_country}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_latitude" className="block font-semibold">
              Latitude:
            </label>
            <input
              type="text"
              id="e_latitude"
              name="e_latitude"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.e_latitude && (
              <p className="text-red-500 text-sm">{errors.e_latitude}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_longitude" className="block font-semibold">
              Longitude:
            </label>
            <input
              type="text"
              id="e_longitude"
              name="e_longitude"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.e_longitude && (
              <p className="text-red-500 text-sm">{errors.e_longitude}</p>
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

export default EventForm;
