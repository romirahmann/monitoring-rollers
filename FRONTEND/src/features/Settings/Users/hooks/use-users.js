import { useEffect } from "react";
import { UserStore } from "../stores/users.store.js";
import { api } from "../../../../shared/api/axios.js";
import { getUsers } from "../services/fetchUser.js";

export function useUser() {
  const setUser = UserStore((state) => state.setUser);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const users = await getUsers();
    setUser(users);
  }

  return {
    loadUsers,
  };
}
