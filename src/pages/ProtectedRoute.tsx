// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx"; // przykładowy kontekst autoryzacji

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth(); // np. user to obiekt zalogowanego użytkownika lub null

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
