import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useGlobalContext } from "../hooks/useGlobalContext";
import useNativeCurrencyBalance from "../hooks/useNativeCurrencyBalance";
import { parseBalance } from "../util";
import Button from "./Shared/Button";

const NativeCurrencyBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useNativeCurrencyBalance(account);

  const { currentNetwork } = useGlobalContext();

  return (
    <Button
      size="sm"
      className="margin-right"
      label={`Balance: ${currentNetwork.nativeCurrency.symbol} ${parseBalance(
        data ?? 0
      )}`}
    ></Button>
  );
};

export default NativeCurrencyBalance;
