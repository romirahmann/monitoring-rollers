import { create } from "zustand";

export const useMachineStore = create((set) => ({
  machines: [],
  machineById: null,

  setMachines: (machines) =>
    set({
      machines,
    }),

  setMachineById: (machine) =>
    set({
      machineById: machine,
    }),
}));
