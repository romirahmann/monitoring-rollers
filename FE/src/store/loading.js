import { create } from "zustand";

export const useLoading = create((set) => ({
  isLoading: false,
  setLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));
