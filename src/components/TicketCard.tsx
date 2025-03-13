import React, { useState } from 'react';

function TicketCard({
  orderTicket // orderTicket to cały obiekt z danymi
}) {
  if (!orderTicket) {
    // Zwróć pusty komponent lub placeholder, jeśli orderTicket jest undefined
    return <div>Order details not available</div>;
  }

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  // Destrukturyzacja orderTicket
  const { event_ticket, ticket_pricing, quantity, unit_price, created_at } = orderTicket;

  // Bezpieczne sprawdzenie, aby uniknąć błędów przy braku danych
  const { name, qr_code } = event_ticket || {}; // Bezpieczne odwołanie do event_ticket
  const { ticket_price, vip_price, fee } = ticket_pricing || {}; // Bezpieczne odwołanie do ticket_pricing

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 cursor-pointer transition-transform hover:scale-105">
      {/* Obrazek wydarzenia */}
      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
        {/* Używamy qr_code do generowania obrazu */}
        {qr_code ? (
          <img
            className="object-cover h-full w-full rounded-2xl sm:rounded-none"
            src={qr_code} // Zmieniamy na pełny URL z qr_code
            alt={`QR code for ${name || 'Event'}`}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-2xl sm:rounded-none">
            <p>No QR Code Available</p> {/* Komunikat, jeśli nie ma qr_code */}
          </div>
        )}
      </div>

      {/* Opis wydarzenia */}
      <div className="w-full sm:w-2/3 p-6 flex flex-col space-y-3">
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{name || 'Event Name'}</h5>

        <div className="text-base text-gray-600 dark:text-gray-300">
          <p><strong>Quantity:</strong> {quantity || 'N/A'}</p>
          <p><strong>Unit Price:</strong> ${unit_price || '0.00'}</p>
          <p><strong>Ticket Price:</strong> ${ticket_price || '0.00'}</p>
          <p><strong>VIP Price:</strong> ${vip_price || '0.00'}</p>
          <p><strong>Fee:</strong> ${fee || '0.00'}</p>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 mt-3">
          {isReadMore ? 'Full description or more details here.' : 'Short description or overview of the event...'}
        </p>
        <button
          onClick={toggleReadMore}
          className="text-sm text-blue-600 dark:text-blue-400 mt-2"
        >
          {isReadMore ? "Read Less" : "Read More"}
        </button>

        {/* Data wydarzenia */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>Created At:</strong> {created_at ? new Date(created_at).toLocaleString() : 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default TicketCard;
