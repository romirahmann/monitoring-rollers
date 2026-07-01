import { create } from "zustand";

export const usePositionStore = create((set) => ({
  positions: [],
  positionById: null,

  setPositions: (positions) =>
    set({
      positions,
    }),

  setPositionById: (position) =>
    set({
      positionById: position,
    }),
}));
