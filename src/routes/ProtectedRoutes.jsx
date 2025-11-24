import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullPageLoader from "../commonComponents/loader/FullPageLoader";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <FullPageLoader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
