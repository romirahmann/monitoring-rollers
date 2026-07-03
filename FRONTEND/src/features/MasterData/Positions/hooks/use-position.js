import { useEffect } from "react";

import { usePositionStore } from "../stores/position.store.js";
import {
  fetchAllPositions,
  fetchPositions,
} from "../services/fetchPosition.js";

export function usePosition(params) {
  const setPositions = usePositionStore((state) => state.setPositions);

  useEffect(() => {
    loadPositions(params);
  }, []);

  async function loadPositions(machine, query = "") {
    const positions = await fetchPositions(machine, query);

    setPositions(positions);
  }

  return {
    loadPositions,
  };
}

export function useAllPositions() {
  const setAllPositions = usePositionStore((state) => state.setAllPositions);

  useEffect(() => {
    loadAllPositions();
  }, []);

  async function loadAllPositions(query = "") {
    const allPositions = await fetchAllPositions(query);
    // console.log("allPositions", allPositions);
    setAllPositions(allPositions);
  }
  return {
    loadAllPositions,
  };
}
