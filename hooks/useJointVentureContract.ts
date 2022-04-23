import JointVenture_ABI from "../contracts/JointVenture.json";
import useContract from "./useContract";

export default function useJointVentureContract(contractAddress?: string) {
  return useContract<any>(contractAddress, JointVenture_ABI);
}
