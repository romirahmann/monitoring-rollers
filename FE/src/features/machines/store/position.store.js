import { create } from "zustand";

export const usePositionStore = create((set) => ({
  positions: [],
  positionByMachineId: [],
  positionById: null,

  setPositionByMachineId: (id) =>
    set({
      positionByMachineId: id,
    }),
  setPositionById: (id) =>
    set({
      positionById: id,
    }),
}));
