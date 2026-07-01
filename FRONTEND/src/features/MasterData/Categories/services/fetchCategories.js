import { api } from "../../../../shared/api/axios.js";

export async function fetchCategories(query) {
  const res = await api.get(`/master/categories-machine?search=${query}`);
  return res.data.data;
}
