// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient.ts";

interface AuthContextType {
  user: any;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let logoutTimeout: ReturnType<typeof setTimeout>;

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user && session.user.confirmed_at) {
        setUser(session.user);
        startAutoLogout();
      } else {
        setUser(null);
      }
    };

    const startAutoLogout = () => {
      logoutTimeout = setTimeout(() => {
        supabase.auth.signOut();
      }, 1000 * 60 * 30); // 30 minut
    };

    // Nasłuch zmian autoryzacji
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && session.user.confirmed_at) {
        setUser(session.user);
        startAutoLogout();
      } else {
        setUser(null);
      }
    });

    fetchSession();

    return () => {
      clearTimeout(logoutTimeout);
      authListener.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
