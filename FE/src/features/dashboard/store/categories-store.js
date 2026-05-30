import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
  categories: [],
  setCategoryById: [],
  setCategories: (categories) =>
    set({
      categories,
    }),
  setCategoryById: (category) =>
    set({
      category,
    }),
}));
