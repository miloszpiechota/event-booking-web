// validateOrganizerFormData.ts

export const validateOrganizerFormData = (formOrganizerData) => {
    let newErrors = {};
  
    if (!formOrganizerData.u_first_name.trim()) {
      newErrors.u_first_name = "First name is required";
    } else if (formOrganizerData.u_first_name.trim().length > 50) {
      newErrors.u_first_name = "First name must not exceed 50 characters";
    }

    if (formOrganizerData.u_first_name.trim().length > 100) {
        newErrors.u_contact_info = "Contact info must not exceed 50 characters";
      }
  
    if (!formOrganizerData.u_last_name.trim()) {
      newErrors.u_last_name = "Last name is required";
    } else if (formOrganizerData.u_last_name.trim().length > 50) {
      newErrors.u_last_name = "Last name must not exceed 50 characters";
    }
  
    if (!/\d{9,15}$/.test(formOrganizerData.u_contact_phone)) {
      newErrors.u_contact_phone = "Invalid phone number";
    }
    if (!/\S+@\S+\.\S+$/.test(formOrganizerData.u_contact_email)) {
      newErrors.u_contact_email = "Invalid email format";
    }
  
    

    if (!formOrganizerData.u_apartment_number.trim()) {
        newErrors.u_apartment_number = "Apartment number is required";
      } else if(formOrganizerData.u_apartment_number.trim() &&
      !/^\d+(\/\d+)?$/.test(formOrganizerData.u_apartment_number.trim())){
        newErrors.u_apartment_number = "Invalid apartment number format";
      }
  
    if (!formOrganizerData.u_street.trim()) {
      newErrors.u_street = "Street is required";
    } else if (formOrganizerData.u_street.trim().length > 100) {
      newErrors.u_street = "Street must not exceed 100 characters";
    }
  
    if (!formOrganizerData.u_city.trim()) {
      newErrors.u_city = "City is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formOrganizerData.u_city.trim())) {
      newErrors.u_city = "City can only contain letters, spaces, and hyphens";
    } else if (formOrganizerData.u_city.trim().length > 50) {
      newErrors.u_city = "City must not exceed 50 characters";
    }
  
    if (!formOrganizerData.u_country.trim()) {
      newErrors.u_country = "Country is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formOrganizerData.u_country.trim())) {
      newErrors.u_country = "Country can only contain letters, spaces, and hyphens";
    } else if (formOrganizerData.u_country.trim().length > 50) {
      newErrors.u_country = "Country must not exceed 50 characters";
    }
  
    if (!/^\d{2}-\d{3}$/.test(formOrganizerData.u_zip_code)) {
      newErrors.u_zip_code = "Invalid zip code (XX-XXX)";
    }
  
    if (!formOrganizerData.u_birth_date) {
      newErrors.u_birth_date = "Date of birth is required";
    } else {
      const birthDate = new Date(formOrganizerData.u_birth_date);
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
  
    return newErrors;
  };
  