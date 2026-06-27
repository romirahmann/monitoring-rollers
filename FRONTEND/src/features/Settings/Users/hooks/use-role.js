import { useEffect } from "react";
import { useRoleStore } from "../stores/role-store.js";
import { api } from "../../../../shared/api/axios.js";

export function useRole() {
  const { setRoles } = useRoleStore((state) => state);
  useEffect(() => {
    const initRole = async () => {
      let res = await api.get(`/users/roles`);
      setRoles(res.data.data);
    };

    initRole();
  }, []);
}
