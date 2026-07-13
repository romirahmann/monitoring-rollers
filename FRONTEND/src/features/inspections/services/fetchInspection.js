import { api } from "../../../shared/api/axios.js";

export async function fetchInspection(query) {
  const res = await api.get(`/inspections?search=${query}`);
  // console.log("fetchInspection", res.data.data);
  return res.data.data;
}

export async function fetchInspectionById(id) {
  const res = await api.get(`/inspections/${id}`);
  // console.log("fetchInspectionById", res.data.data);
  return res.data.data;
}
