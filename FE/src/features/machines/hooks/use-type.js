import { useEffect } from "react";
import { useTypeStore } from "../store/type.store.js";
import { api } from "../../../shared/api/axios.js";

export const fetchTypeMachine = async (type, setTypeByName) => {
  const res = await api.get(`/master/type/name/${type}`);

  setTypeByName(res.data.data);

  return res.data.data;
};

export const useTypeMachine = (type) => {
  const setTypeByName = useTypeStore((state) => state.setTypeByName);

  useEffect(() => {
    fetchTypeMachine(type, setTypeByName);
  }, [type]);
};
