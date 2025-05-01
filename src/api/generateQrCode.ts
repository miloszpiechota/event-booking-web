export async function generateQrCode(data: { ticketId: string; t_ticket_name: string }) {
  const issuedAt = Date.now();
  const secretKey = "YOUR_SECRET_KEY";
  const raw = `${data.ticketId}:${issuedAt}${secretKey}`;

  const buffer = new TextEncoder().encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const checksum = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  const payload = {
    ticketId: data.ticketId,
    issuedAt,
    checksum,
  };

  const token = btoa(JSON.stringify(payload));
  const qrLink = `https://goEventApp.com/ticket?token=${token}`;
  return { token, qrLink };
}
