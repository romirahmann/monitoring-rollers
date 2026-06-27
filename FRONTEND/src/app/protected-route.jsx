import { Outlet, Navigate } from "react-router-dom";

import LoadingScreen from "../shared/components/loadingScreen.jsx";
import { useAuthStore } from "../features/Settings/Users/stores/auth-store.js";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
