import { api } from "../../../../shared/api/axios.js";

export async function fetchInstallations(query = "") {
  const res = await api.get(`/installations?search=${query}`);

  return res.data.data;
}
