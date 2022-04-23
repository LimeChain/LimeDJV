import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { NETWORK_CONFIG } from '../config/network';
import Factory_ABI from "../contracts/Factory.json";
import { mappingChainIdConfig } from '../utils';
import useContract from "./useContract";

export default function useFactoryContract() {
  const { chainId } = useWeb3React();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if(chainId) {
      const config = NETWORK_CONFIG[mappingChainIdConfig[chainId]];
      setAddress(config.factory_address);
    }
  }, [chainId])
    return useContract<any>(address, Factory_ABI);
}
