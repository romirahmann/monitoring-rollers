import { create } from "zustand";

export const useInstallationStore = create((set) => ({
  installations: [],

  setInstallations: (installations) => set({ installations }),
}));
