import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth-store.js";
import LoadingScreen from "../shared/components/loadingScreen.jsx";

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
