import React from "react";
import { Link } from "react-router-dom";

// Możesz przekazać nazwę użytkownika jako prop, np. <Header username="Michał" />
const Header = ({ username = "nazwa uzytkownika" }) => {
  return (
    <header className="bg-black text-white p-2 shadow-lg">
      <div className="container mx-auto flex items-center">
        {/* Lewa sekcja: Logo */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">My SPA App</h1>
        </div>

        {/* Środkowa sekcja: Nawigacja */}
        <div className="flex-1 text-center">
          <nav>
            <ul className="flex justify-center space-x-6">
              <li>
                <Link to="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition">
                  Create
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition">
                  Messages
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Prawa sekcja: Powitanie użytkownika */}
        <div className="flex-1 text-right">
          <span>Hello, {username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
