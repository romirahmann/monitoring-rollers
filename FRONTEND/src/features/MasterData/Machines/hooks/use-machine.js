import { useEffect } from "react";

import { useMachineStore } from "../stores/machine.store.js";
import { fetchMachines } from "../services/fetchMachine.js";

export function useMachine() {
  const setMachines = useMachineStore((state) => state.setMachines);

  useEffect(() => {
    loadMachines();
  }, []);

  async function loadMachines(query = "") {
    const machines = await fetchMachines(query);

    setMachines(machines);
  }

  return {
    loadMachines,
  };
}
