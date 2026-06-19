import { useEffect } from "react";
import { api } from "../../../shared/api/axios.js";
import { useRollerStore } from "../store/roller.store.js";

export const useRollerByCategory = (id) => {
  const setRollerByCategory = useRollerStore(
    (state) => state.setRollerByCategory,
  );
  useEffect(() => {
    const initRoller = async () => {
      let res = await api.get(`/master/roller/${id}`);
      console.log("Get Rollers: ", res.data.data);
      setRollerByCategory(res.data.data);
    };
    initRoller();
  });
};
