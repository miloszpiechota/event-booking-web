import { useState } from 'react'

import './App.css'
import Home from './pages/Home.tsx';
import CreateEvent from './pages/CreateEvent.tsx';
import EventForm from './components/EventForm.tsx';
import { Route, Routes } from 'react-router-dom';
import EventTicketForm from './components/EventTicketForm.tsx';
import Auth from './pages/Auth.tsx';
import ConfirmNewEvent from './components/ConfirmNewEvent.tsx';
import { FormDataProvider } from "../context/FormDataContext.tsx"; // dostosuj ścieżkę
function App() {
  return (
    <FormDataProvider>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/event-form" element={<EventForm />} />
      <Route path="/event-ticket-form" element={<EventTicketForm />} />
      <Route path="/confirm-new-event" element={<ConfirmNewEvent />} />
    </Routes>
    </FormDataProvider>
    
  )
}

export default App
