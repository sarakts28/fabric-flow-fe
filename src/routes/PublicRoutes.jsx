import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullPageLoader from "../commonComponents/loader/FullPageLoader";

export default function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <FullPageLoader />;

  // If user is logged in, redirect to home
  if (isAuthenticated) return <Navigate to="/" replace />;

  // Otherwise show public page (login, signup)
  return children;
}
