import { NETWORK_CONFIG } from "../config/network";

  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
   // Ethereum mainnet
   4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
   97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
   80001: 'https://rpc-mumbai.maticvigil.com',
   69: 'https://kovan.optimism.io/'
  };

  // Contract addresses
  export const ALBT_TOKEN_ADDRESS = "";
  export const FACTORY_ADDRESS = "";

  // Network chain ids
  export const SUPPORTED_CHAINIDS: number[] | undefined = Object.values(
    NETWORK_CONFIG
  )?.map((config: any): number => config.network.chainId);

  export const localStorageKeys: { [key: string]: string } = {
    walletConnection: "ventures:connected",
  };
  