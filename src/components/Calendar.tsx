import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Importing styles for react-day-picker

const CalendarComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full p-6 bg-gray-900">
      <div className="w-full max-w-4xl flex space-x-8">
        {/* Left side - Event Information */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-white">Informacje o Wydarzeniu</h3>
          <p className="text-lg mb-4 text-gray-300">
            <strong>Tytuł:</strong> Przykładowe Wydarzenie
          </p>
          <p className="text-lg mb-4 text-gray-300">
            <strong>Data:</strong> 12 marca 2025, godzina 18:00
          </p>
          <p className="text-lg mb-4 text-gray-300">
            <strong>Opis:</strong> To jest przykładowe wydarzenie, które ma miejsce w marcu 2025. Przyjdź i baw się dobrze!
          </p>
          <p className="text-lg text-gray-300">
            <strong>Lokalizacja:</strong> Warszawa, Polska
          </p>
        </div>

        {/* Right side - Day Picker with Cyberpunk Style */}
        <div
          className="flex w-1/2 items-center justify-center rounded-lg "
          
        >
          
            <DayPicker
              className="shadow-lg rounded-lg"
              style={{
                backgroundColor:"rgba(47, 52, 94, 0.8)", // Dark background for cyberpunk effect
               
              }}
            />
         
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
