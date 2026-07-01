import { api } from "../../../../shared/api/axios.js";

export async function fetchMachines(query = "") {
  const res = await api.get(`/master/machines?search=${query}`);

  return res.data.data;
}
