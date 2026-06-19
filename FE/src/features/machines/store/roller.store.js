import { create } from "zustand";

export const useRollerStore = create((set) => ({
  rollers: [],
  rollerByCategoryId: [],

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
}));
