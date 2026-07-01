import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: [],
  categoryById: null,

  setCategories: (categories) => set({ categories }),

  setCategoryById: (data) =>
    set({
      categoryById: data,
    }),
}));
