import { v4 as uuidv4 } from "uuid";
import * as CryptoJS from "crypto-js";

export const generateQrCode = async ({
  ticketName,
  eventName,
}: {
  ticketName: string;
  eventName: string;
}) => {
  const ticketId = uuidv4();
  const issuedAt = Date.now();
  const secretKey = import.meta.env.VITE_QR_SECRET_KEY || "fallback";

  
  
  const rawData = `${ticketName}:${eventName}:${issuedAt}`;
  const checksum = CryptoJS.SHA256(rawData + secretKey).toString();
  console.log("📄 rawData (Web):", rawData);
  console.log("🛡️ secretKey (Web):", secretKey);
  console.log("🔐 hash input (Web):", rawData + secretKey);

  const payload = {
    ticketId,
    ticketName,
    eventName,
    issuedAt,
    checksum,
  };

  const json = JSON.stringify(payload);

  // ✅ Kompatybilne z przeglądarką
  const base64Token = btoa(unescape(encodeURIComponent(json)));

  return {
    token: base64Token,
    ticketId,
    qrLink: base64Token,
  };
};
