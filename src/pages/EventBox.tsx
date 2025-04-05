import React from 'react';
import CreatedEventList from '../components/CreatedEventList.tsx'; // Komponent odpowiedzialny za pobieranie danych

const EventBox: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Your Created Events</h2>

      <CreatedEventList /> {/* Pobiera dane i wyświetla listę wydarzeń */}
    </div>
  );
};

export default EventBox;
