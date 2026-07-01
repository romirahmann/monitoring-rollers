import { useEffect } from "react";
import { useRoleStore } from "../stores/role-store.js";
import { api } from "../../../../shared/api/axios.js";
import { fetchRole } from "../../Roles/services/fetchRole.js";

export function useRole() {
  const { setRoles } = useRoleStore((state) => state);

  useEffect(() => {
    loadRole();
  }, []);

  async function loadRole(query = "") {
    const roles = await fetchRole(query);
    setRoles(roles);
  }

  return {
    loadRole,
  };
}
