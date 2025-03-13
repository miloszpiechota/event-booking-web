import { useState } from 'react'

import './App.css'
import Home from './pages/Home.tsx';
import CreateEvent from './pages/CreateEvent.tsx';
import EventForm from './components/EventForm.tsx';
import { Route, Routes } from 'react-router-dom';
import EventTicketForm from './components/EventTicketForm.tsx';
import Auth from './pages/Auth.tsx';
import ConfirmNewEvent from './components/ConfirmNewEvent.tsx';
import { FormDataProvider } from "../context/FormDataContext.tsx";
import { EventProvider } from "../context/EventContext.tsx"; 
import ShowEvent from './pages/ShowEvent.tsx';
import BookEvent from './pages/BookEvent.tsx';
import PaymentForm from './components/PaymentForm.tsx';
import TicketBox from './pages/TicketBox.tsx';
function App() {
  return (

    <EventProvider>
    <FormDataProvider>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/event-form" element={<EventForm />} />
      <Route path="/event-ticket-form" element={<EventTicketForm />} />
      <Route path="/confirm-new-event" element={<ConfirmNewEvent />} />
      <Route path="/event/:id" element={<ShowEvent />} />
      <Route path="/event/:id/book" element={<BookEvent />} />
      <Route path="/event/:id/book/payment" element={<PaymentForm/>} />
      <Route path="/ticket-box" element={<TicketBox/>} />
    </Routes>
    </FormDataProvider>
    </EventProvider>
    
  )
}

export default App
