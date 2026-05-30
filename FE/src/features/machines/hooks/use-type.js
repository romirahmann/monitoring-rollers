import { useEffect } from "react";
import { useTypeStore } from "../store/type.store.js";
import { api } from "../../../shared/api/axios.js";

export const useTypeMachine = (type) => {
  const setTypeByName = useTypeStore((state) => state.setTypeByName);
  useEffect(() => {
    const initType = async () => {
      const res = await api.get(`/master/type/name/${type}`);
      //   console.log("Get Type: ", res.data.data);
      setTypeByName(res.data.data);
      return res.data.data;
    };
    initType();
  }, []);
};
