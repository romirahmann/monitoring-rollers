import { api } from "../../../../shared/api/axios.js";

export async function fetchInstallations(query = "") {
  const res = await api.get(`/installations?search=${query}`);
  console.log("fetchInstallations res", res.data.data);
  return res.data.data;
}
