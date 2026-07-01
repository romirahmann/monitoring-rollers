import { useEffect } from "react";
import { useTypeMachineStore } from "../stores/type.store.js";
import { fetchTypeMachines } from "../services/fetchType.js";

export function useTypeMachine() {
  const setTypeMachines = useTypeMachineStore((state) => state.setTypeMachines);

  useEffect(() => {
    loadTypeMachines();
  }, []);

  async function loadTypeMachines(query = "") {
    const data = await fetchTypeMachines(query);
    setTypeMachines(data);
  }

  return {
    loadTypeMachines,
  };
}
