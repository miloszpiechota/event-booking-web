import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: '../.env' });

import express from "express";
import Stripe from "stripe";
import process from "node:process";  // Keep process if it's needed for other purposes

// Declare `stripe` only once
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // lub "*" tylko w testach!
  credentials: true,
}));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
