import { useEffect } from "react";
import { useInspectionStore } from "../stores/inspection.store.js";
import { fetchInspection } from "../services/fetchInspection.js";

export function useInspections() {
  const setInspections = useInspectionStore((state) => state.setInspections);

  useEffect(() => {
    loadInspections();
  }, []);

  async function loadInspections(query = "") {
    const inspections = await fetchInspection(query);
    setInspections(inspections);
  }

  return {
    loadInspections,
  };
}
