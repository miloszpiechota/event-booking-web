// src/utils/validateFormData.js

import { EventData } from "../api/payment.ts";

interface EventFormErrors {
    e_event_name?: string;
    e_short_descryp?: string;
    e_long_descryp?: string;
    e_image_url?: string;
    e_apartment_number?: string;
    e_street?: string;
    e_city?: string;
    e_country?: string;
    e_zip_code?: string;
    e_latitude?: string;
    e_longitude?: string;
    e_start_date?: string;
    e_end_date?: string;

    
}

export const validateEventFormData = (data:EventData): EventFormErrors => {
    const errors: EventFormErrors = {};
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

    if (!data.e_apartment_number.trim()) {
      errors.e_apartment_number = "Apartment number is required";
    } else if (!/^\d+(\/\d+)?$/.test(data.e_apartment_number.trim())) {
      errors.e_apartment_number = "Invalid apartment number format";
    }
  
    if (!data.e_street.trim()) {
      errors.e_street = "Street is required";
    } else if (data.e_street.trim().length > 100) {
      errors.e_street = "Street must not exceed 100 characters";
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
  
    if (!data.e_zip_code.trim()) {
      errors.e_zip_code = "Zip code is required";
    } else if (
      !(/^\d{2}-\d{3}$/.test(data.e_zip_code.trim()) || /^\d{5}(-\d{4})?$/.test(data.e_zip_code.trim()))
    ) {
      errors.e_zip_code = "Invalid zip code format. Please use the appropriate format: 23-123 (Poland), 12345 (USA), 12345-6789 (USA), or 12345 (Germany)";
    }
   
  
    // Walidacja współrzędnych
    if (!data.e_latitude.trim())
      errors.e_latitude = "Latitude is required";
    if (!data.e_longitude.trim())
      errors.e_longitude = "Longitude is required";
  
    // Sprawdzenie, czy podano datę i godzinę rozpoczęcia oraz zakończenia
  if (!data.e_start_date || !data.e_start_time) {
    errors.e_start_date = "Start date and time are required.";
  }
  if (!data.e_end_date || !data.e_end_time) {
    errors.e_end_date = "End date and time are required.";
  }

  // Jeśli brakuje dat/godzin, zwracamy błędy
  if (errors.e_start_date || errors.e_end_date) {
    return errors;
  }

  // Tworzymy obiekty Date na podstawie daty i czasu
  const startDateTime = new Date(`${data.e_start_date}T${data.e_start_time}`);
  const endDateTime = new Date(`${data.e_end_date}T${data.e_end_time}`);
  

  // Sprawdzenie, czy daty zostały poprawnie sparsowane
  if (isNaN(startDateTime.getTime())) {
    errors.e_start_date = "Invalid start date/time format.";
  }
  if (isNaN(endDateTime.getTime())) {
    errors.e_end_date = "Invalid end date/time format.";
  }
  if (errors.e_start_date || errors.e_end_date) {
    return errors;
  }

  // 1. Data rozpoczęcia i zakończenia nie mogą być w przeszłości
  if (startDateTime < now) {
    errors.e_start_date = "Start date/time cannot be in the past.";
  }
  if (endDateTime < now) {
    errors.e_end_date = "End date/time cannot be in the past.";
  }

  // 2. Data rozpoczęcia i zakończenia nie mogą być takie same
  if (startDateTime.getTime() === endDateTime.getTime()) {
    errors.e_end_date = "Start and end date/time cannot be the same.";
  }

  // 3. Wydarzenie musi rozpocząć się i zakończyć najwcześniej 1 dzień (24h) od teraz
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  if (startDateTime < tomorrow) {
    errors.e_start_date = "Event must start at least 1 day from now.";
  }
  if (endDateTime < tomorrow) {
    errors.e_end_date = "Event must end at least 1 day from now.";
  }

  // 4. Data zakończenia musi być po dacie rozpoczęcia
  if (endDateTime <= startDateTime) {
    errors.e_end_date = "End date/time must be after start date/time.";
  }

  // 5. Czas trwania wydarzenia: min 1 godzina, max 2 tygodnie
  const durationMs = endDateTime.getTime() - startDateTime.getTime();
  const oneHour = 60 * 60 * 1000;
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;
  if (durationMs < oneHour) {
    errors.e_end_date = "Event duration must be at least 1 hour.";
  }
  if (durationMs > twoWeeks) {
    errors.e_end_date = "Event duration cannot exceed 2 weeks.";
  }

  // 6. Data wydarzenia nie może być odległa o więcej niż 1 rok od teraz
  const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  if (startDateTime > oneYearFromNow) {
    errors.e_start_date = "Event start date cannot be more than 1 year from now.";
  }
  if (endDateTime > oneYearFromNow) {
    errors.e_end_date = "Event end date cannot be more than 1 year from now.";
  }
  
    return errors;
  };
  