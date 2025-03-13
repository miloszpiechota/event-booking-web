
import { supabase } from '../../supabaseClient.ts'; 


export const fetchOrders = async () => {
    console.log('Fetching orders...'); // Dodaj logi do funkcji
    const { data, error } = await supabase
      .from("order")
      .select(`
        id,
        created_at,
        status,
        order_ticket:order_ticket_id(
          quantity,
          unit_price,
          created_at,
          status,
          ticket_pricing:ticket_pricing_id(
            ticket_price,
            vip_price,
            fee,
            created_at
          ),  
          event_ticket:event_ticket_id(
            name,
            qr_code,
            created_at
          )
        )
      `);
  
    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  
    console.log('Fetched data:', data); // Zobacz, co zwraca API
    return data;
  };
  