import Factory_ABI from "../contracts/Factory.json";
import useContract from "./useContract";

export default function useFactoryContract(contractAddress?: string) {
  return useContract<any>(contractAddress, Factory_ABI);
}
