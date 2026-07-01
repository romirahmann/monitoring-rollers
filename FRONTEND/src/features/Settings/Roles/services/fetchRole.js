import { api } from "../../../../shared/api/axios.js";

export async function fetchRole(search) {
  const res = await api.get(`/users/roles?search=${search}`);

  return res.data.data;
}
