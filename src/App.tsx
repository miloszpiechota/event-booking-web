// App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import CreateEvent from "./pages/CreateEvent.tsx";
import EventForm from "./components/EventForm.tsx";
import EventTicketForm from "./components/EventTicketForm.tsx";
import Auth from "./pages/Auth.tsx";
import ConfirmNewEvent from "./components/ConfirmNewEvent.tsx";
import ShowEvent from "./pages/ShowEvent.tsx";
import BookEvent from "./pages/BookEvent.tsx";
import PaymentForm from "./components/PaymentForm.tsx";
import TicketBox from "./pages/TicketBox.tsx";
import EventBox from "./pages/EventBox.tsx";
import ProtectedRoute from "../src/pages/ProtectedRoute.tsx";
import { FormDataProvider } from "../context/FormDataContext.tsx";
import { EventProvider } from "../context/EventContext.tsx"; 

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentFormStripe from "./components/PaymentFormStripe.tsx";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function App() {
  return (
    <Elements stripe={stripePromise}>
    
      <EventProvider>
        <FormDataProvider>
          <Routes>
            {/* Trasa autoryzacji dostępna zawsze */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Wszystkie trasy zabezpieczone */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateEvent />} />
              <Route path="/event-form" element={<EventForm />} />
              <Route path="/event-ticket-form" element={<EventTicketForm />} />
              <Route path="/confirm-new-event" element={<ConfirmNewEvent />} />
              <Route path="/event/:id" element={<ShowEvent />} />
              <Route path="/event/:id/book" element={<BookEvent />} />

              {/* <Route path="/event/:id/book/payment" element={<PaymentForm />} /> */}
              <Route path="/event/:id/book/payment" element={<PaymentFormStripe />} />
              <Route path="/ticket-box" element={<TicketBox />} />
              <Route path="/your-created-events" element={<EventBox />} />
            </Route>
          </Routes>
        </FormDataProvider>
      </EventProvider>
   
    </Elements>
  );
}

export default App;
