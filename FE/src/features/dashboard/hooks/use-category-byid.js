import { useEffect } from "react";
import { useCategoriesStore } from "../store/categories-store.js";
import { api } from "../../../shared/api/axios.js";

export const useCategoryById = () => {
  const setCategoryById = useCategoriesStore((state) => state.setCategoryById);
  useEffect(() => {
    const initCategoryById = async () => {
      let res = await api.get("/master/");
    };
  }, []);
};
