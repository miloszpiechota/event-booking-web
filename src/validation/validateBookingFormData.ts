// validateBookingFormData.ts
export default function validateBookingFormData({ firstName, lastName, email, phoneNumber }) {
  let errors = {};

  // Walidacja imienia
  if (!firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (firstName.trim().length > 50) {
    errors.firstName = "First name must not exceed 50 characters";
  }

  // Walidacja nazwiska
  if (!lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (lastName.trim().length > 50) {
    errors.lastName = "Last name must not exceed 50 characters";
  }

  // Walidacja emaila
  if (!email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }
  }

  // Walidacja numeru telefonu
  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Contact phone is required";
  } else if (!/(?=(?:\d\s?){9,15}$)(?:\d\s?){8,14}\d$/.test(phoneNumber)) {
    errors.phoneNumber = "Invalid phone number. Format example: +48 890 789 678";
  }
  return errors;
}
