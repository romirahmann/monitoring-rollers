import { api } from "../../../../shared/api/axios.js";

export async function fetchPositions(machineId, query = "") {
  const res = await api.get(`/master/positions/machine/${machineId}`);

  return res.data.data;
}

export async function fetchAllPositions(query = "") {
  const res = await api.get(`/master/positions?search=${query}`);
  return res.data.data;
}
