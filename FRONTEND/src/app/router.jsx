import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout.jsx";
import { LoginPage } from "../auth/pages/Login.jsx";
import { MainLayout } from "../layouts/MainLayout.jsx";

import UserPage from "../features/Settings/Users/pages/UserPage.jsx";
import DashboardPage from "../features/Dashboard/pages/Dashboard.jsx";
import { ProtectedRoute } from "./protected-route.jsx";
import RolePage from "../features/Settings/Roles/pages/RolePage.jsx";
import CategoriesPage from "../features/MasterData/Categories/pages/CategoriesPage.jsx";
import TypeMachinePage from "../features/MasterData/TypeMachine/pages/TypeMachinePage.jsx";
import MachinePage from "../features/MasterData/Machines/pages/MachinePage.jsx";
import PositionPage from "../features/MasterData/Positions/pages/PositionPage.jsx";
import RollerPage from "../features/Rollers/lists/pages/RollerPage.jsx";
import { RollerForm } from "../features/Rollers/lists/components/RollerForm.jsx";
import { RollerCreatePage } from "../features/Rollers/lists/pages/RollerCreatePage.jsx";
import { RollerEditPage } from "../features/Rollers/lists/pages/RollerEditPage.jsx";
import InstallationPage from "../features/Rollers/installations/pages/InstallationPage.jsx";

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
            path: "/master/categories",
            element: <CategoriesPage />,
          },
          {
            path: "/master/type",
            element: <TypeMachinePage />,
          },
          {
            path: "/master/machines",
            element: <MachinePage />,
          },
          {
            path: "/master/machines/:machineId/position",
            element: <PositionPage />,
          },
          {
            path: "/rollers",
            element: <RollerPage />,
          },
          {
            path: "/rollers/create",
            element: <RollerCreatePage />,
          },
          {
            path: "/rollers/:id/edit",
            element: <RollerEditPage />,
          },
          {
            path: "/installations",
            element: <InstallationPage />,
          },
          {
            path: "/setting/users",
            element: <UserPage />,
          },
          {
            path: "/setting/role",
            element: <RolePage />,
          },
        ],
      },
    ],
  },
]);
