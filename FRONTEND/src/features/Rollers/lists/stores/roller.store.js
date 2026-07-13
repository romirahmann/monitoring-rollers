import { create } from "zustand";

export const useRollerStore = create((set) => ({
  rollers: [],
  rollerById: null,
  rollerByMachine: [],

  setRollers: (rollers) =>
    set({
      rollers,
    }),

  setRollerById: (roller) =>
    set({
      rollerById: roller,
    }),

  setRollerByMachine: (data) =>
    set({
      rollerByMachine: data,
    }),
}));
