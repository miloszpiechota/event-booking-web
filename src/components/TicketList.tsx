import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/fetchOrders.ts';
import TicketCard from '../components/TicketCard.tsx';

function TicketList() {
  const [orders, setOrders] = useState([]); // Przechowujemy zamówienia
  const [loading, setLoading] = useState(true); // Stan ładowania

  // useEffect do pobrania zamówień z API
  useEffect(() => {
    const loadOrders = async () => {
      const response = await fetchOrders(); // Pobierz zamówienia
      console.log(response); // Sprawdź, co zwraca API
      setOrders(response); // Ustaw zamówienia w stanie
      setLoading(false); // Zmieniamy stan ładowania na false
    };

    loadOrders(); // Wywołanie funkcji do pobrania zamówień
  }, []); // Pusty array oznacza, że ten kod wykona się tylko raz, po załadowaniu komponentu

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading tickets...</p> // Komunikat, gdy dane są jeszcze ładowane
      ) : orders.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mapujemy po zamówieniach i wyświetlamy dla każdego TicketCard */}
          {orders.map((order, index) => (
            <TicketCard key={index} orderTicket={order.order_ticket} />
          ))}
        </div>
      ) : (
        <p>No tickets found.</p> // Komunikat, gdy brak zamówień
      )}
    </div>
  );
}

export default TicketList;
