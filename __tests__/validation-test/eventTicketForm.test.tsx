import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EventTicketForm from "../../src/components/EventTicketForm.tsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect"; // zapewnia matchery takie jak toBeInTheDocument

// Mocker nawigację
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Zamockowanie funkcji generującej QR Code
jest.mock("../../src/api/generateQrCode", () => ({
  generateQrCode: jest.fn(() => ({
    token: "test-token",
    qrLink: "http://test-qr-link.com",
  })),
}));

// Zamockowanie funkcji walidującej dane biletu
jest.mock("../../src/validation/validateEventTicketFormData", () => ({
  default: jest.fn(),
}));

// Definicja typu danych biletu
interface TicketData {
  t_ticket_name: string;
  t_quantity: string;
  t_ticket_price: string;
  t_vip_price: string;
  t_qr_code: string;
}

// Definicja kontekstu i jego typu
interface FormDataContextProps {
  ticketData: TicketData;
  setTicketData: React.Dispatch<React.SetStateAction<TicketData>>;
}

const TestFormDataContext = React.createContext<FormDataContextProps>({
  ticketData: {
    t_ticket_name: "",
    t_quantity: "",
    t_ticket_price: "",
    t_vip_price: "",
    t_qr_code: "",
  },
  setTicketData: () => {},
});

// Nadpisanie hooka useFormData, aby używał naszego testowego kontekstu
jest.mock("../../src/context/FormDataContext", () => ({
  useFormData: () => React.useContext(TestFormDataContext),
}));

// Provider testowy – tutaj zwracamy React.ReactElement
const TestFormDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }): React.ReactElement => {
  const [ticketData, setTicketData] = useState<TicketData>({
    t_ticket_name: "",
    t_quantity: "",
    t_ticket_price: "",
    t_vip_price: "",
    t_qr_code: "",
  });
  return (
    <TestFormDataContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TestFormDataContext.Provider>
  );
};

// Funkcja pomocnicza do renderowania z providerem i routerem
const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <TestFormDataProvider>{ui}</TestFormDataProvider>
    </BrowserRouter>
  );
};

// Importujemy zamockowaną funkcję walidującą oraz generateQrCode
import validateEventTicketFormData from "../../src/validation/validateEventTicketFormData";
import { generateQrCode } from "../../src/api/generateQrCode";

describe("EventTicketForm", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
    (validateEventTicketFormData as jest.Mock).mockReset();
  });

  it("renders form and shows placeholder when no ticket name is provided", () => {
    renderWithProvider(<EventTicketForm />);
    expect(screen.getByPlaceholderText("Event Ticket Name")).toBeInTheDocument();
    expect(
      screen.getByText(/Enter a ticket name to generate QR code/i)
    ).toBeInTheDocument();
  });

  it("generates QR code when ticket name is provided", async () => {
    renderWithProvider(<EventTicketForm />);
    const ticketNameInput = screen.getByPlaceholderText("Event Ticket Name");
    fireEvent.change(ticketNameInput, { target: { value: "VIP Entry" } });
    await waitFor(() => {
      expect(generateQrCode).toHaveBeenCalled();
    });
    const qrCodeInput = screen.getByPlaceholderText("Your QR Code URL");
    expect(qrCodeInput).toHaveValue("http://test-qr-link.com");
  });

  it("navigates to /confirm-new-event when form is submitted with valid data", async () => {
    // Walidacja zwraca pusty obiekt – brak błędów
    (validateEventTicketFormData as jest.Mock).mockReturnValue({});
    renderWithProvider(<EventTicketForm />);
    fireEvent.change(screen.getByPlaceholderText("Event Ticket Name"), {
      target: { value: "Standard Ticket" },
    });
    // Załóżmy, że pole "Number Of Tickets" ma placeholder "1"
    fireEvent.change(screen.getByPlaceholderText("1"), {
      target: { value: "100" },
    });
    // Wyszukujemy pola cenowe po etykietach
    const singlePriceInput = screen.getByLabelText(/Single Ticket Price:/i);
    fireEvent.change(singlePriceInput, { target: { value: "50" } });
    const vipPriceInput = screen.getByLabelText(/VIP Ticket Price:/i);
    fireEvent.change(vipPriceInput, { target: { value: "80" } });
    // Submitujemy formularz
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));
    await waitFor(() => {
      expect(validateEventTicketFormData).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("/confirm-new-event");
    });
  });

  it("displays validation errors when form data is invalid", async () => {
    (validateEventTicketFormData as jest.Mock).mockReturnValue({
      t_ticket_name: "Ticket name is required",
    });
    renderWithProvider(<EventTicketForm />);
    const ticketNameInput = screen.getByPlaceholderText("Event Ticket Name");
    fireEvent.change(ticketNameInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));
    await waitFor(() => {
      expect(screen.getByText("Ticket name is required")).toBeInTheDocument();
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
