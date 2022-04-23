import { useContext } from "react";
import { GlobalContext, UpdateGlobalContext } from "../context/GlobalContext";


export function useGlobalContext() {
  const globalContext = useContext(GlobalContext);
  const updateGlobalContext = useContext(UpdateGlobalContext);

  return {
    ...globalContext,
    ...updateGlobalContext,
  };
}
