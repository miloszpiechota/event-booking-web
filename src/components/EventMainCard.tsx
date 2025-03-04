import React from "react";
import backgroundImage from "../assets/backgroundImage.jpg";

const EventMainCard: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="relative w-full max-w-5xl h-80 rounded-2xl overflow-hidden shadow-2xl">
        {/* Tło z obrazkiem */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Nakładka dla lepszego kontrastu */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Półprzezroczysty kontener tekstowy */}
        <div className="absolute inset-y-0 left-0 w-2/5 bg-black/60 text-white p-6 flex flex-col justify-center backdrop-blur-md rounded-l-2xl">
          <h2 className="text-3xl font-extrabold">Tytuł wydarzenia</h2>
          <p className="text-lg mt-3">
            Tutaj znajduje się przykładowy opis, który można dostosować do własnych potrzeb. Sprawdź szczegóły i bądź na bieżąco!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventMainCard;
