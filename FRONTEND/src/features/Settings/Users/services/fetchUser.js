import { api } from "../../../../shared/api/axios.js";
import { UserStore } from "../stores/users.store.js";

export async function getUsers() {
  const res = await api.get("/users");
  return res.data.data;
}
