import { create } from "zustand";

export const useInspectionStore = create((set) => ({
  inspections: [],
  inspectionById: null,

  setInspections: (inspections) => set({ inspections }),

  setInspectionById: (data) =>
    set({
      inspectionById: data,
    }),
}));
