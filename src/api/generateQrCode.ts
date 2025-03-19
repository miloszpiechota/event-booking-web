// generateQrCode.ts
import { v4 as uuidv4 } from "uuid";

export function generateQrCode(data: { t_ticket_name: string; t_event_id?: string }) {
  const payload = {
    ticketId: uuidv4(),
    ticketName: data.t_ticket_name,
    eventId: data.t_event_id,
    issuedAt: Date.now(),
  };

  const token = btoa(JSON.stringify(payload));
  const qrLink = `https://goEventApp.com/ticket?token=${token}`;

  return { token, qrLink };
}
