import { useEffect } from "react";

import { useCategoryStore } from "../store/categories.store.js";
import { fetchCategories } from "../services/fetchCategories.js";

export function useCategories() {
  const setCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories(query = "") {
    const categories = await fetchCategories(query);
    setCategories(categories);
  }

  return {
    loadCategories,
  };
}
