import { api } from "../../../../shared/api/axios.js";

export async function getUsers(query) {
  const res = await api.get(`/users?search=${query}`);
  return res.data.data;
}
