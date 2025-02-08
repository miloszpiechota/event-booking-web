import { useState } from 'react'

import './App.css'
import Home from './pages/Home.tsx';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    
  )
}

export default App
