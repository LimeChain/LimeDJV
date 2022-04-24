import { useEffect, useState } from "react";

import { localStorageKeys } from "../constants";
import { getLocalStorage, setLocalStorage } from "../utils/localstorage";

export const useWalletConnection = (initialState: any) => {
  const [isWalletConnected, setIsWalletConnected] = useState(initialState);

  const _isWalletConnected = () => {
    const isConnected = getLocalStorage(localStorageKeys.walletConnection);
    return isConnected;
  }

  const _setIsWalletConnected = (connected: boolean) =>
    setLocalStorage(localStorageKeys.walletConnection, connected.toString());

  useEffect(() => {
    setIsWalletConnected(_isWalletConnected());
  }, []);

  useEffect(() => {
    _setIsWalletConnected(isWalletConnected);
  }, [isWalletConnected]);

  return [isWalletConnected, setIsWalletConnected];
};
