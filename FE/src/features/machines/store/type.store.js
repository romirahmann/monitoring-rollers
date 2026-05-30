import { create } from "zustand";

export const useTypeStore = create((set) => ({
  type: [],
  typeByName: [],

  setTypeByName: (type) =>
    set({
      typeByName: type,
    }),
}));
