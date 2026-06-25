import { useEffect } from "react";
import { api } from "../../../shared/api/axios.js";
import { useRollerStore } from "../store/roller.store.js";

export const useRollerByPosition = (id) => {
  const setRollerByPosition = useRollerStore(
    (state) => state.setRollerByPosition,
  );
  useEffect(() => {
    const initRoller = async () => {
      let res = await api.get(`/master/roller/position/${id}`);
      console.log("Get Rollers: ", res.data);
      setRollerByPosition(res.data.data);
    };
    initRoller();
  }, [id]);
};
