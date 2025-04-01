import React from 'react';
import TicketList from '../components/TicketList.tsx';

function TicketBox() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
      <TicketList /> {/* Komponent odpowiedzialny za pobieranie danych */}
    </div>
  );
}

export default TicketBox;
