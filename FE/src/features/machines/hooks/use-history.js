import { useEffect } from "react";
import { useHistoryStore } from "../store/history.store.js";
import { api } from "../../../shared/api/axios.js";

export const useHistoryRoller = (id) => {
  const setHistoryById = useHistoryStore((state) => state.setHistoryById);
  useEffect(() => {
    const initHistory = async () => {
      let res = await api.get(`/master/roller/${id}`);
      //   console.log("Get Rollers: ", res.data.data);
      setHistoryById(res.data.data);
    };
    initHistory();
  });
};
