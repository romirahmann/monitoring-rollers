import { api } from "../../shared/api/axios.js";

export async function getMe() {
  const response = await api.get("/auth/me");

  return response.data;
}
