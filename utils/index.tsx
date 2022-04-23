import { ethers } from "ethers";

export const shortenEthereumAddress = (address) =>
  `${address?.substring(0, 5)}...${address?.substring(
    address?.length - 6,
    address?.length
  )}`;

export const toHex = (number: number): string => {
  return ethers.utils.hexStripZeros(ethers.utils.hexlify(number));
};
