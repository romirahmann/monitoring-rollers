import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout.jsx";
import { LoginPage } from "../auth/pages/Login.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";

import UserPage from "../features/Settings/Users/pages/UserPage.jsx";
import DashboardPage from "../features/Dashboard/pages/Dashboard.jsx";
import { ProtectedRoute } from "./protected-route.jsx";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/setting/users",
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);
