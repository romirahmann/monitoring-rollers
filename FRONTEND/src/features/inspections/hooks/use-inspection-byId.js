import { useEffect } from "react";
import { useInspectionStore } from "../stores/inspection.store.js";
import {
  fetchInspection,
  fetchInspectionById,
} from "../services/fetchInspection.js";

export function useInspectionById(id) {
  const setInspectionById = useInspectionStore(
    (state) => state.setInspectionById,
  );

  useEffect(() => {
    if (id) {
      loadInspectionById(id);
    }
  }, [id]);

  async function loadInspectionById(id) {
    const inspection = await fetchInspectionById(id);
    setInspectionById(inspection);
  }

  return {
    loadInspectionById,
  };
}
