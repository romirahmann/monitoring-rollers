import { useEffect } from "react";
import { useAuthStore } from "../stores/auth-store.js";
import { getMe } from "../../../../auth/api/get-me.js";

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getMe();

        setUser(data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        logout();
      }
    };
    initAuth();
  }, []);
}
