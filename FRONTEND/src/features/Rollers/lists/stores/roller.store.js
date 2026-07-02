import { create } from "zustand";

export const useRollerStore = create((set) => ({
  rollers: [],
  rollerById: null,

  setRollers: (rollers) =>
    set({
      rollers,
    }),

  setRollerById: (roller) =>
    set({
      rollerById: roller,
    }),
}));
