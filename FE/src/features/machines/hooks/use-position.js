import { useEffect } from "react";
import { usePositionStore } from "../store/position.store.js";
import { api } from "../../../shared/api/axios.js";

export const usePosition = (machineId) => {
  const setPositionByMachineId = usePositionStore(
    (state) => state.setPositionByMachineId,
  );

  useEffect(() => {
    const initPosition = async () => {
      console.log("Machine ID: ", machineId);
      let res = await api.get(`/master/positions/machine/${machineId}`);
      console.log("Get Position: ", res.data.data);
      setPositionByMachineId(res.data.data);
    };
    initPosition();
  }, [machineId]);
};
