import { useCallback, useEffect } from "react";
import { usePositionStore } from "../store/position.store.js";
import { api } from "../../../shared/api/axios.js";

export const usePosition = (machineId) => {
  const setPositionByMachineId = usePositionStore(
    (state) => state.setPositionByMachineId,
  );

  const getPositionByMachineId = useCallback(async () => {
    if (!machineId) return;

    const res = await api.get(`/master/positions/machine/${machineId}`);

    setPositionByMachineId(res.data.data);
  }, [machineId, setPositionByMachineId]);

  useEffect(() => {
    getPositionByMachineId();
  }, [getPositionByMachineId]);

  return {
    getPositionByMachineId,
  };
};
