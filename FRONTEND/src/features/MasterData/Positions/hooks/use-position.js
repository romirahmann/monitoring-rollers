import { useEffect } from "react";

import { usePositionStore } from "../stores/position.store.js";
import { fetchPositions } from "../services/fetchPosition.js";

export function usePosition(params) {
  const setPositions = usePositionStore((state) => state.setPositions);

  useEffect(() => {
    loadPositions(params);
  }, []);

  async function loadPositions(machine, query = "") {
    const positions = await fetchPositions(machine, query);
    console.log(positions);
    setPositions(positions);
  }

  return {
    loadPositions,
  };
}
