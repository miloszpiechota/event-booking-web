import React, { useEffect, useState } from "react";
import { fetchOrders } from "../api/fetchOrders.ts";
import TicketCard from "../components/TicketCard.tsx";

const TicketList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders();
        console.log("Orders received in TicketList:", response);

        if (!response || !Array.isArray(response)) {
          throw new Error("Invalid data format received.");
        }
        setOrders(response);
      } catch (err) {
        setError("Failed to load tickets. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-gray-400">Loading tickets...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <TicketCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No tickets found.</p>
      )}
    </div>
  );
};

export default TicketList;
