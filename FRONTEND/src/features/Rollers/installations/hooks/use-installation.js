import { useEffect } from "react";
import { useInstallationStore } from "../stores/installation.store.js";
import { fetchInstallations } from "../services/fetchInstallation.js";

export function useInstallations() {
  const setInstallations = useInstallationStore(
    (state) => state.setInstallations,
  );

  useEffect(() => {
    loadInstallations();
  }, []);

  async function loadInstallations(query = "") {
    const data = await fetchInstallations(query);
    setInstallations(data);
  }

  return {
    loadInstallations,
  };
}
