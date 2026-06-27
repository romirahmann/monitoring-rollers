import { api } from "../../shared/api/axios.js";

export async function signout() {
  const res = await api.post("/auth/logout");
  return res;
}
