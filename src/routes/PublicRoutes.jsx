import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullPageLoader from "../commonComponents/loader/FullPageLoader";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // If user is logged in, redirect to home
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  // Otherwise show public page (login, signup)
  return children;
}
