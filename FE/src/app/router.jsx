import { createBrowserRouter } from "react-router-dom";
import { LayoutAdmin } from "../layouts/index.jsx";
import { LoginPage } from "../features/auth/pages/login.jsx";
import { ProtectedRoute } from "../routes/protected-route.jsx";
import { LayoutAuth } from "../layouts/auth.jsx";
import { LandingPage } from "../features/dashboard/pages/LandingPage.jsx";
import { MachinePage } from "../features/machines/pages/MachinePage.jsx";
import { PositionPage } from "../features/machines/pages/possitionPage.jsx";
import { DetailPage } from "../features/machines/pages/DetailPage.jsx";

export const router = createBrowserRouter([
  {
    element: <LayoutAuth />,
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
        element: <LayoutAdmin />,
        children: [
          {
            path: "/",
            element: <LandingPage />,
          },
        ],
      },
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "/machine-page/:category",
            element: <MachinePage />,
          },
          {
            path: "/machine-page/:category/position/:unit",
            element: <PositionPage />,
          },
          {
            path: "/machine-page/:machine_id/position/:position_id/detail",
            element: <DetailPage />,
          },
        ],
      },
    ],
  },
]);
