import { create } from "zustand";
import { useRollerByPosition } from "../hooks/use-rollers.js";

export const useRollerStore = create((set) => ({
  rollers: [],
  rollerByCategoryId: [],
  rollerByPosition: [],

  setRollers: (data) => {
    set({
      rollers: data,
    });
  },
  setRollerByCategory: (data) => {
    set({
      rollerByCategoryId: data,
    });
  },
  setRollerByPosition: (data) => {
    set({
      rollerByPosition: data,
    });
  },
}));
