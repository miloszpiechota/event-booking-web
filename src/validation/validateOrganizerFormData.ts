import { OrganizerData } from "../../context/FormDataContext.tsx";
type OrganizerErrors = {
  u_first_name?: string;
  u_last_name?: string;
  u_contact_phone?: string;
  u_contact_email?: string;
  u_contact_info?: string;
  u_apartment_number?: string;
  u_street?: string;
  u_city?: string;
  u_country?: string;
  u_zip_code?: string;
  u_birth_date?: string;
};
const validDomains = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
    "wp.pl", "onet.pl", "interia.pl", "o2.pl", "zoho.com", "protonmail.com"
  ];
  
  export const validateOrganizerFormData = (organizerData: OrganizerData) => {
    let newErrors: OrganizerErrors = {};
  
    if (!organizerData.u_first_name.trim()) {
      newErrors.u_first_name = "First name is required";
    } else if (organizerData.u_first_name.trim().length > 50) {
      newErrors.u_first_name = "First name must not exceed 50 characters";
    }
  
    if (!organizerData.u_last_name.trim()) {
      newErrors.u_last_name = "Last name is required";
    } else if (organizerData.u_last_name.trim().length > 50) {
      newErrors.u_last_name = "Last name must not exceed 50 characters";
    }
  
    if (!organizerData.u_contact_phone.trim()) {
      newErrors.u_contact_phone = "Contact phone is required";
    } else if (!/^\+\d{1,3}\s+(?=(?:\d\s?){9,15}$)(?:\d\s?){8,14}\d$/.test(organizerData.u_contact_phone)) {
      newErrors.u_contact_phone = "Invalid phone number. Format example: +48 890 789 678";
    }
  
    if (!organizerData.u_contact_email.trim()) {
      newErrors.u_contact_email = "Email is required";
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(organizerData.u_contact_email)) {
        newErrors.u_contact_email = "Invalid email format";
      } else {
        const domain = organizerData.u_contact_email.split("@")[1];
        if (!validDomains.includes(domain)) {
          newErrors.u_contact_email = "Unrecognized email domain";
        }
      }
    }
  
    if (!organizerData.u_contact_info.trim()) {
      newErrors.u_contact_info = "Contact info is required";
    } else if (organizerData.u_contact_info.trim().length > 300) {
      newErrors.u_contact_info = "Contact info must not exceed 300 characters";
    }
    
  
    if (!organizerData.u_apartment_number.trim()) {
      newErrors.u_apartment_number = "Apartment number is required";
    } else if (!/^\d+(\/\d+)?$/.test(organizerData.u_apartment_number.trim())) {
      newErrors.u_apartment_number = "Invalid apartment number format";
    }
  
    if (!organizerData.u_street.trim()) {
      newErrors.u_street = "Street is required";
    } else if (organizerData.u_street.trim().length > 100) {
      newErrors.u_street = "Street must not exceed 100 characters";
    }
  
    if (!organizerData.u_city.trim()) {
      newErrors.u_city = "City is required";
    } else if (!/^[A-Za-z\s-]+$/.test(organizerData.u_city.trim())) {
      newErrors.u_city = "City can only contain letters, spaces, and hyphens";
    } else if (organizerData.u_city.trim().length > 50) {
      newErrors.u_city = "City must not exceed 50 characters";
    }
  
    if (!organizerData.u_country.trim()) {
      newErrors.u_country = "Country is required";
    } else if (!/^[A-Za-z\s-]+$/.test(organizerData.u_country.trim())) {
      newErrors.u_country = "Country can only contain letters, spaces, and hyphens";
    } else if (organizerData.u_country.trim().length > 50) {
      newErrors.u_country = "Country must not exceed 50 characters";
    }
  
    if (!organizerData.u_zip_code.trim()) {
      newErrors.u_zip_code = "Zip code is required";
    } else if (
      !(/^\d{2}-\d{3}$/.test(organizerData.u_zip_code.trim()) || /^\d{5}(-\d{4})?$/.test(organizerData.u_zip_code.trim()))
    ) {
      newErrors.u_zip_code = "Invalid zip code format. Please use the appropriate format: 23-123 (Poland), 12345 (USA), 12345-6789 (USA), or 12345 (Germany)";
    }
    
    
    if (!organizerData.u_birth_date) {
      newErrors.u_birth_date = "Date of birth is required";
    } else {
      const birthDate = new Date(organizerData.u_birth_date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
  
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      if (age < 18) {
        newErrors.u_birth_date = "You must be at least 18 years old";
      }
    }
  
    return newErrors;
  };
  