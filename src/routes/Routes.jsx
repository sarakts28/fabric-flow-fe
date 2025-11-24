import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../commonComponents/DashboardLayout";
import Home from "../screens/dashboard/pages/Home";
import Settings from "../screens/dashboard/pages/Settings";
import NotFound from "../screens/NotFound";
import { Login } from "../screens/auth";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import Article from "../screens/dashboard/pages/Article";
import ArticlePlanning from "../screens/dashboard/pages/ArticlePlanning";
import Routes from "../screens/dashboard/pages/Routes";
import Categories from "../screens/dashboard/pages/Categories";
const router = createBrowserRouter([
  {
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
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
      { path: "dashboard", index: true, element: <Home /> },
      { path: "settings", element: <Settings /> },
      { path: "article", element: <Article /> },
      { path: "article-planning", element: <ArticlePlanning /> },
      { path: "routes", element: <Routes /> },
      { path: "categories", element: <Categories /> },
    ],
  },
]);

export default router;
