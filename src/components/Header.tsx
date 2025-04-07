import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient.ts"; // dostosuj ścieżkę do swojego klienta

const Header = () => {
  const [username, setUsername] = useState<string>("...");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Failed to get user:", error.message);
        setUsername("Guest");
        return;
      }

      // Możesz użyć np. user.email lub user.user_metadata.full_name, jeśli masz to w metadanych
      const nameFromMeta = user?.user_metadata?.full_name;
      setUsername(nameFromMeta || user?.email || "User");
    };

    getUserInfo();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error during logout:", error.message);
      return;
    }
    setUsername("Guest");
    // Przekierowanie do strony logowania, jeśli chcesz
    navigate("/auth");
  };

  return (
    <header className="text-white p-2 shadow-lg">
      <div className="container mx-auto flex items-center">
        {/* Lewa sekcja: Logo */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">GoEvent SPA</h1>
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
              <li className="border-l-2 border-gray-300 px-6">
                <Link to="/create" className="hover:text-gray-300 transition">
                  Create New Event
                </Link>
              </li>
              <li className="border-l-2 border-gray-300 px-6">
                <Link to="/ticket-box" className="hover:text-gray-300 transition">
                  Your Ticket Box
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Prawa sekcja: Powitanie i link do wylogowania */}
        <div className="flex-1 text-right flex flex-col items-end">
          <span className="mb-1">Hello, {username}</span>
          {username !== "Guest" && (
            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
