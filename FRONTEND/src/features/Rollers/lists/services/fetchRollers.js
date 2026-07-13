import { api } from "../../../../shared/api/axios.js";

export async function fetchRollers(query = "") {
  const res = await api.get(`/master/rollers?search=${query}`);

  return res.data.data;
}

export async function fetchRollerByMachine(id) {
  const res = await api.get(`/inspections/machine/${id}`);
  return res.data.data;
}
