// src/utils/validateFormData.js

export const validateEventFormData = (data) => {
    const errors = {};
    const now = new Date();
    now.setSeconds(0, 0); // usuwamy sekundy dla precyzyjnej walidacji
  
    // Walidacja nazwy wydarzenia
    if (!data.e_event_name.trim()) {
      errors.e_event_name = "Event name is required";
    } else if (data.e_event_name.trim().length > 100) {
      errors.e_event_name = "Event name must not exceed 100 characters";
    }
  
    // Walidacja opisów
    if (!data.e_short_descryp.trim())
      errors.e_short_descryp = "Short description is required";
    if (!data.e_long_descryp.trim())
      errors.e_long_descryp = "Long description is required";
    if (!data.e_image_url.trim())
      errors.e_image_url = "Image URL is required";
  
    // Walidacja adresu – ulica, numer, kod, miasto, kraj
    if (!data.e_street.trim()) {
      errors.e_street = "Street is required";
    }
    if (!data.e_apartment_number.trim()) {
      errors.e_apartment_number = "Apartment number is required";
    } else if (!/^\d+(\/\d+)?$/.test(data.e_apartment_number.trim())) {
      errors.e_apartment_number = "Invalid apartment number format (e.g. 12/2)";
    }
    if (!data.e_zip_code.trim()) {
      errors.e_zip_code = "Zip code is required";
    } else if (!/^\d{2}-\d{3}$/.test(data.e_zip_code)) {
      errors.e_zip_code = "Invalid zip code format (XX-XXX)";
    }
    if (!data.e_city.trim()) {
      errors.e_city = "City is required";
    } else if (!/^[A-Za-z\s-]+$/.test(data.e_city.trim())) {
      errors.e_city = "City can only contain letters, spaces, and hyphens";
    } else if (data.e_city.trim().length > 50) {
      errors.e_city = "City must not exceed 50 characters";
    }
    if (!data.e_country.trim()) {
      errors.e_country = "Country is required";
    } else if (!/^[A-Za-z\s-]+$/.test(data.e_country.trim())) {
      errors.e_country = "Country can only contain letters, spaces, and hyphens";
    } else if (data.e_country.trim().length > 50) {
      errors.e_country = "Country must not exceed 50 characters";
    }
  
    // Walidacja współrzędnych
    if (!data.e_latitude.trim())
      errors.e_latitude = "Latitude is required";
    if (!data.e_longitude.trim())
      errors.e_longitude = "Longitude is required";
  
    // Walidacja daty i czasu
    if (!data.e_start_date) {
      errors.e_start_date = "Start date and time is required";
    }
    if (!data.e_end_date) {
      errors.e_end_date = "End date and time is required";
    }
    if (data.e_start_date && data.e_end_date) {
      const startDate = new Date(data.e_start_date);
      const endDate = new Date(data.e_end_date);
  
      if (startDate < now) {
        errors.e_start_date = "Start date/time cannot be in the past";
      }
      if (endDate < now) {
        errors.e_end_date = "End date/time cannot be in the past";
      }
      if (endDate <= startDate) {
        errors.e_end_date =
          "End date/time must be later than start date/time";
      }
      const durationMs = endDate - startDate;
      if (durationMs < 3600000) {
        errors.e_end_date = "Event duration must be at least 1 hour";
      }
      if (durationMs > 1209600000) {
        errors.e_end_date = "Event duration cannot exceed 2 weeks";
      }
    }
  
    return errors;
  };
  