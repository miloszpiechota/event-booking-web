import React, { useState } from "react";
import QRCode from "react-qr-code";

function TicketCard({ orderTicket }) {
  if (!orderTicket) {
    return <div>Order details not available</div>;
  }

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  // Destrukturyzacja danych z orderTicket
  const { event_ticket, ticket_pricing, quantity, unit_price, created_at } =
    orderTicket;
  const { name, qr_code } = event_ticket || {};
  const { ticket_price, vip_price, fee } = ticket_pricing || {};

  // Możesz podmienić te wartości, jeśli chcesz użyć innych danych z orderTicket
  const rowNumber = quantity || 3;
  const seatNumber = 4;
  const gateNumber = 2;
  const ticketNo = "0123456789";

  // Data i godzina – przykładowo używamy created_at, ale możesz to zmienić
  const dateString = created_at
    ? new Date(created_at).toLocaleDateString()
    : "27 May";
  const timeString = created_at
    ? new Date(created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "16:00 - 18:00";

  // Link do obrazu w tle (z Pexels)
  const backgroundImageUrl =
    "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Główna karta biletu */}
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-row">
        <div
          className="relative w-2/3 bg-cover bg-center min-h-[300px]"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          {/* Nakładka przyciemniona (zmniejszona z 0.40 do 0.20) */}
          <div className="absolute inset-0 bg-black-600 bg-opacity-50"></div>

          {/* Treść tekstowa na obrazie */}
          <div className="relative z-10 p-6 flex flex-col h-full justify-end">
            <h2 className="text-3xl font-bold text-white mb-2">
              {name || "Music Concert"}
            </h2>
            <p className="text-sm text-gray-200">Fauget Studio</p>
            <p className="text-sm text-gray-200">123 Anywhere St, Any City</p>

            {/* Przykładowy opis z Read More */}
            <p className="text-sm text-gray-100 mt-4">
              {isReadMore
                ? "Full description or more details here."
                : "Short description or overview of the event..."}
            </p>
            <button
              onClick={toggleReadMore}
              className="mt-2 w-max text-blue-300 text-xs font-semibold hover:underline"
            >
              {isReadMore ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* Prawa część z danymi biletu i QR */}
        <div className="w-1/3 bg-black text-white p-6 flex flex-col relative">
          {/* Górna część: dane o miejscu, bramce itp. */}
          <div className="flex-1">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
              <div>
                <p className="text-xs uppercase text-gray-400">Row</p>
                <p className="text-lg font-bold">{rowNumber}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">Seat</p>
                <p className="text-lg font-bold">{seatNumber}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">Gate</p>
                <p className="text-lg font-bold">{gateNumber}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Date</p>
              <p className="text-lg font-bold">{dateString}</p>
            </div>
            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Time</p>
              <p className="text-lg font-bold">{timeString}</p>
            </div>
            <div className="mb-3">
              <p className="text-xs uppercase text-gray-400">Ticket No</p>
              <p className="text-lg font-bold">{ticketNo}</p>
            </div>

            {/* Możesz tu dodać informacje o cenie, fee itp. */}
            <div className="border-t border-gray-700 pt-2 mt-4 text-sm text-gray-300">
              <p>
                <strong>Unit Price:</strong> ${unit_price || "0.00"}
              </p>
              <p>
                <strong>Ticket Price:</strong> ${ticket_price || "0.00"}
              </p>
              <p>
                <strong>VIP Price:</strong> ${vip_price || "0.00"}
              </p>
              <p>
                <strong>Fee:</strong> ${fee || "0.00"}
              </p>
            </div>
          </div>

          {/* QR code na dole (lub w dowolnym miejscu) */}
          <div className="flex justify-center mt-4">
            {qr_code ? (
              <QRCode value={qr_code} size={100} />
            ) : (
              <div className="text-gray-400">No QR Code Available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
