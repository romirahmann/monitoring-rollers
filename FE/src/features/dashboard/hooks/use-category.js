import { useEffect } from "react";
import { useCategoriesStore } from "../store/categories-store.js";
import { api } from "../../../shared/api/axios.js";

export const useCategories = () => {
  const setCategories = useCategoriesStore((state) => state.setCategories);
  useEffect(() => {
    const initCategories = async () => {
      const res = await api.get("/master/categories-machine");
      console.log("Get Categories", res.data.data);
      setCategories(res.data.data);
    };
    initCategories();
  }, []);
};
