import { toHex } from ".";

export enum MetamaskErrorCodes {
  /*
   * This error code indicates that the network we're going to switch it doesn't
   * exists in our Metamask Wallet
   * More info here: https://docs.metamask.io/guide/rpc-api.html#usage-with-wallet-switchethereumchain
   */
  NotNetworkFound = 4902,
  /*
   * This error code indicates that we have rejected the Metamask request
   * More info here: https://docs.metamask.io/guide/rpc-api.html#example
   */
  UserRejectedRequest = 4001,
}

export const getMetamaskProvider = () => {
  const { ethereum } = window as any;
  return ethereum;
};

export const isMetamask = (): boolean => {
  return window?.ethereum?.isMetaMask;
};

export const changeCurrentNetwork = async (chainId: number, provider: any) => {
  await provider.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: toHex(chainId) }],
  });
};

export const addNetwork = async (
  params: MetamaskChainParams,
  provider: any
) => {
  await provider.request({
    method: "wallet_addEthereumChain",
    params: [params],
  });
};

export const getMetamaskNetworkParams = (
  network: Network
): MetamaskChainParams => {
  return {
    chainId: toHex(network.chainId),
    chainName: network.chainName,
    nativeCurrency: {
      name: network.nativeCurrency.name,
      symbol: network.nativeCurrency.symbol,
      decimals: network.nativeCurrency.decimals,
    },
    rpcUrls: [network.rpcUrl],
    blockExplorerUrls: [network.blockExplorerUrl],
  };
};

export const addAsset = async (
  type: MetamaskAssetParamsType,
  options: MetamaskAssetParamsOptions,
  provider: any
) => {
  await provider.request({
    method: "wallet_watchAsset",
    params: {
      type,
      options,
    },
  });
};

export const getProvider = () => {
  if (!!window.ethereum) {
    return window.ethereum;
  } else if (!!window.web3) {
    return window.web3;
  } else {
    throw new Error("Provider Error: No Provider Found");
  }
};
