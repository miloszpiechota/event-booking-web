const validateEventTicketFormData = (formData) => {
    let errors = {};
  
    if (!formData.t_ticket_name.trim()) {
      errors.t_ticket_name = "Event ticket name is required.";
    } else if (formData.t_ticket_name.trim().length > 100) {
      errors.t_ticket_name = "Event ticket name must not exceed 100 characters.";
    }
  
    if (!formData.t_quantity) {
      errors.t_quantity = "Max quantity is required.";
    } else if (isNaN(formData.t_quantity) || formData.t_quantity <= 0) {
      errors.t_quantity = "Please enter a valid positive number.";
    }
  
    if (!formData.t_qr_code.trim()) {
      errors.t_qr_code = "QR code is required.";
    }
  
    if (!formData.t_ticket_price) {
      errors.t_ticket_price = "Single ticket price is required.";
    } else if (
      !/^\d+(\.\d{1,2})?$/.test(formData.t_ticket_price) ||
      Number(formData.t_ticket_price) <= 0
    ) {
      errors.t_ticket_price =
        "Enter a valid ticket price greater than 0 (e.g., 5 or 3.30).";
    }
  
    if (!formData.t_vip_price) {
      errors.t_vip_price = "VIP ticket price is required.";
    } else if (
      !/^\d+(\.\d{1,2})?$/.test(formData.t_vip_price) ||
      Number(formData.t_vip_price) <= 0
    ) {
      errors.t_vip_price =
        "Enter a valid VIP ticket price greater than 0 (e.g., 10 or 15.50).";
    }
  
    return errors;
  };
  
  export default validateEventTicketFormData;
  