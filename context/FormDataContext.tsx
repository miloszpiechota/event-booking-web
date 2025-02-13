// FormDataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Definicje interfejsów – dostosuj je do swoich pól
export interface OrganizerData {
  u_first_name: string;
  u_last_name: string;
  u_birth_date: string;
  u_contact_phone: string;
  u_contact_email: string;
  u_street: string;
  u_apartment_number: string;
  u_zip_code: string;
  u_city: string;
  u_country: string;
  u_contact_info: string;
}

export interface EventData {
  e_event_name: string;
  e_start_date: string;
  e_end_date: string;
  e_short_descryp: string;
  e_long_descryp: string;
  e_image_url: string;
  e_street: string;
  e_apartment_number: string;
  e_zip_code: string;
  e_city: string;
  e_country: string;
  e_latitude: string;
  e_longitude: string;
  e_start_time: string;
  e_end_time: string;
}

export interface TicketData {
  t_ticket_name: string;
  t_quantity: string;
  t_qr_code: string;
  t_ticket_price: string;
  t_vip_price: string;
}

interface FormDataContextType {
  organizerData: OrganizerData;
  eventData: EventData;
  ticketData: TicketData;
  setOrganizerData: (data: OrganizerData) => void;
  setEventData: (data: EventData) => void;
  setTicketData: (data: TicketData) => void;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [organizerData, setOrganizerData] = useState<OrganizerData>({
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

  const [eventData, setEventData] = useState<EventData>({
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

  const [ticketData, setTicketData] = useState<TicketData>({
    t_ticket_name: "",
    t_quantity: "",
    t_qr_code: "",
    t_ticket_price: "",
    t_vip_price: "",
  });

  return (
    <FormDataContext.Provider value={{
        organizerData,
        eventData,
        ticketData,
        setOrganizerData,
        setEventData,
        setTicketData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
