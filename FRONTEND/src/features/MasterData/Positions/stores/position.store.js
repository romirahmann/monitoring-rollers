import { create } from "zustand";

export const usePositionStore = create((set) => ({
  positions: [],
  allPositions: [],
  positionById: null,

  setPositions: (positions) =>
    set({
      positions,
    }),

  setAllPositions: (allPositions) =>
    set({
      allPositions,
    }),

  setPositionById: (position) =>
    set({
      positionById: position,
    }),
}));
