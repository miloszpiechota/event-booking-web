import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/fetchOrders.ts';
import TicketCard from '../components/TicketCard.tsx';

function TicketList() {
  const [orders, setOrders] = useState([]); // Przechowujemy zamówienia
  const [loading, setLoading] = useState(true); // Stan ładowania

  // Pobieramy zamówienia z API
  useEffect(() => {
    const loadOrders = async () => {
      const response = await fetchOrders();
      console.log(response);
      setOrders(response);
      setLoading(false);
    };

    loadOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading tickets...</p>
      ) : orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <TicketCard key={index} orderTicket={order.order_ticket} />
          ))}
        </div>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
}

export default TicketList;
