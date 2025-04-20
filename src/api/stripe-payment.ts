import { updateTicketQuantity } from "./updateTicketQuantity.ts";

// /functions/stripe-payment.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { tokenId, amount, eventId, ticketCount } = JSON.parse(event.body);

    // Utwórz PaymentIntent lub Charge, np.:
    const charge = await stripe.charges.create({
      amount: amount, // wartość w najmniejszych jednostkach waluty (np. grosze)
      currency: "pln", // lub inna waluta
      source: tokenId,
      description: `Payment for event ${eventId} - ${ticketCount} ticket(s)`,
    });

    // Możesz też wykonywać dalsze operacje, np. aktualizację ilości biletów
    await updateTicketQuantity(eventId, ticketCount);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, charge }),
    };
  } catch (error) {
    console.error("Stripe payment error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
