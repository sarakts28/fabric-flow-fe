import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../commonComponents/DashboardLayout";
import Home from "../screens/dashboard/pages/Home";
import Settings from "../screens/dashboard/pages/Settings";
import NotFound from "../screens/NotFound";
import { Login } from "../screens/auth";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import Reports from "../screens/dashboard/pages/Reports";
import Inventory from "../screens/dashboard/pages/Inventory";
const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "reports", element: <Reports /> },
      { path: "inventory", element: <Inventory /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
