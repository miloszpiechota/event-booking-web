import { useState } from 'react'

import './App.css'
import Home from './pages/Home.tsx';
import CreateEvent from './pages/CreateEvent.tsx';
import EventForm from './components/EventForm.tsx';
import { Route, Routes } from 'react-router-dom';
import EventTicketForm from './components/EventTicketForm.tsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/event-form" element={<EventForm />} />
      <Route path="/event-ticket-form" element={<EventTicketForm />} />
    </Routes>
    
  )
}

export default App
