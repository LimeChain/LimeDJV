import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";

export const getNetworkIndex = (
  chainId: number,
  options: Network[]
): number => {
  let networkIndex = 0;
  for (let index = 0; index < options.length; index++) {
    if (options[index]?.chainId === chainId) {
      networkIndex = index;
      break;
    }
  }
  return networkIndex;
};

export default function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
) {
  return new Web3Provider(provider);
}
