import { useEffect } from "react";

import { fetchRollers } from "../services/fetchRollers.js";
import { useRollerStore } from "../stores/roller.store.js";

export function useRoller() {
  const setRollers = useRollerStore((state) => state.setRollers);

  useEffect(() => {
    loadRollers();
  }, []);

  async function loadRollers(query = "") {
    const rollers = await fetchRollers(query);
    // console.log("Fetched rollers:", rollers);
    setRollers(rollers);
  }

  return {
    loadRollers,
  };
}
