import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient.ts";

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
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-lg text-white px-6 py-4 shadow-lg rounded-b-2xl">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold hover:scale-105 transition-transform duration-300">
            🚀 GoEvent Platform
          </span>
        </div>

        {/* Navigation */}
        <nav className="w-full md:w-auto">
          <ul className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-[20px]">
            <li>
              <Link
                to="/"
                className="relative group hover:text-white text-gray-300 transition"
              >
                Home
                <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="relative group hover:text-white text-gray-300 transition"
              >
                Create Event
                <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </li>
            <li>
              <Link
                to="/ticket-box"
                className="relative group hover:text-white text-gray-300 transition"
              >
                Ticket Box
                <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* User info + logout */}
        <div className="flex items-center space-x-4 text-sm text-[17px]">
          <span>👤 {username}</span>
          {username !== "Guest" && (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition"
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
