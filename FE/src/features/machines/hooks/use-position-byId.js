import { useEffect } from "react";
import { usePositionStore } from "../store/position.store.js";
import { api } from "../../../shared/api/axios.js";

export const usePositionById = (positionId) => {
  const setPositionById = usePositionStore((state) => state.setPositionById);

  useEffect(() => {
    if (!positionId) return;

    const fetchPosition = async () => {
      const res = await api.get(`/master/position/${positionId}`);
      console.log("Position By ID: ", res.data.data);
      setPositionById(res.data.data);
    };

    fetchPosition();
  }, [positionId]);
};
