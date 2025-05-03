import { getUserToken, getUserId } from "../api/auth.ts";
import { updateTicketQuantity } from "../api/updateTicketQuantity.ts"; // Import funkcji aktualizującej bilety

interface TicketOrder {
  event_ticket_id: string; // UUID jako string
  quantity: number;
  unit_price: number;
  ticket_pricing_id: number;
  status: string;
  created_at: string;
}

interface PaymentRequestBody {
  user_id: string;
  ticket_order: TicketOrder;
  payment_method_id: string;
  total_price: number;
  event_ticket_id: string; // UUID jako string
}

interface EventTicketPricing {
  ticket_price: number;
  vip_price: number;
  id: number;
}

interface EventTicket {
  id: string; // UUID jako string
  ticket_pricing: EventTicketPricing;
}

export interface EventFormData {
  event_ticket: EventTicket;
  start_date: string;
  end_date: string;
}

export type TicketType = "VIP" | "Standard";

interface PaymentParams {
  event: EventFormData;
  ticketCount: number;
  ticketType: TicketType;
  totalPrice: number;
  paymentMethod: number;
}

export async function handlePayment(params: PaymentParams): Promise<void> {
  try {
    const { event, ticketCount, ticketType, totalPrice, paymentMethod } = params;

    if (!paymentMethod) {
      window.alert("Please select a payment method.");
      return;
    }

    const token = await getUserToken();
    const userId = await getUserId();

    if (!token || !userId) {
      window.alert("User is not authenticated.");
      return;
    }

    const ticket_order: TicketOrder = {
      event_ticket_id: event.event_ticket.id,
      quantity: ticketCount,
      unit_price:
        ticketType === "VIP"
          ? event.event_ticket.ticket_pricing.vip_price
          : event.event_ticket.ticket_pricing.ticket_price,
      ticket_pricing_id: event.event_ticket.ticket_pricing.id,
      status: "paid",
      created_at: new Date().toISOString(),
    };

    const requestBody: PaymentRequestBody = {
      user_id: userId,
      ticket_order,
      payment_method_id: paymentMethod.toString(),
      total_price: totalPrice,
      event_ticket_id: event.event_ticket.id,
    };

    console.log("🛒 Wysyłane dane do API:", JSON.stringify(requestBody, null, 2));

    const supabaseFunctionDomain = import.meta.env.VITE_SUPABASE_FUNCTION_DOMAIN;
    if (!supabaseFunctionDomain) {
      console.error("Supabase function domain is not set in .env");
      window.alert("Server configuration error.");
      return;
    }

    const paymentUrl = `https://${supabaseFunctionDomain}.supabase.co/functions/v1/payment-process`;

    const response = await fetch(paymentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json().catch(() => null);
    console.log("📩 Odpowiedź serwera:", data);

    if (!response.ok || !data) {
      window.alert("Server error. Please try again.");
      return;
    }

    // 📉 Aktualizacja ilości biletów po udanej płatności
    await updateTicketQuantity(event.event_ticket.id, ticketCount);

    window.alert("Order placed successfully!");
  } catch (error) {
    console.error("❌ Payment error:", error);
    window.alert("Failed to process the payment.");
  }
}
