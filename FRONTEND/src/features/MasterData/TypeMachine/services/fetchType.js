import { api } from "../../../../shared/api/axios.js";

export async function fetchTypeMachines(query = "") {
  const res = await api.get(`/master/type-machine?search=${query}`);

  return res.data.data;
}
