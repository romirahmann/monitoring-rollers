import { create } from "zustand";

export const useMachineStore = create((set) => ({
  machine: [],
  machineById: [],

  setMachineById: (id) =>
    set({
      machineById: id,
    }),
}));
