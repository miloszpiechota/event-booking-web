import React from "react";
import backgroundImage from "../assets/backgroundImage.jpg";

export default function EventMainCard() {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex justify-center relative w-full max-w-200 h-96 rounded-2xl overflow-hidden shadow-lg">
          {/* Tło z obrazkiem */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
          
          {/* Półprzezroczysty kontener tekstowy */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-opacity-50 p-4 flex flex-col justify-center text-white backdrop-blur-sm">
            <h2 className="text-xl font-bold">Tytuł karty</h2>
            <p className="text-sm mt-2">Tutaj znajduje się przykładowy opis, który można dostosować do własnych potrzeb.</p>
          </div>
        </div>
      </div>
    );
}
