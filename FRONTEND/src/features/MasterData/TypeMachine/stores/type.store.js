import { create } from "zustand";

export const useTypeMachineStore = create((set) => ({
  typeMachines: [],
  typeMachineById: null,

  setTypeMachines: (typeMachines) => set({ typeMachines }),

  setTypeMachineById: (data) =>
    set({
      typeMachineById: data,
    }),
}));
