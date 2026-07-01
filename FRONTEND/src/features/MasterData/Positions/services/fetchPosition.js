import { api } from "../../../../shared/api/axios.js";

export async function fetchPositions(machineId, query = "") {
  console.log(machineId);
  const res = await api.get(`/master/positions/machine/${machineId}`);

  return res.data.data;
}
