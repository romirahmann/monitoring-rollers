import { useEffect } from "react";
import { useMachineStore } from "../store/machine.store.js";
import { api } from "../../../shared/api/axios.js";

export const useMachine = (id) => {
  const setMachineById = useMachineStore((state) => state.setMachineById);
  useEffect(() => {
    const initMachine = async () => {
      let res = await api.get(`/master/machines/${id}`);
      //   console.log("Get Machine: ", res.data.data);
      setMachineById(res.data.data);
    };
    initMachine();
  }, []);
};
