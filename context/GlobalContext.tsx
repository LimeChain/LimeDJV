import { Web3ReactProvider } from "@web3-react/core";
import React, { createContext, useState } from "react";
import { NETWORK_CONFIG } from "../config/network";
import { useWalletConnection } from "../hooks/useWalletConnection";
import getLibrary from "../utils/network";

const initialState: AppContext = {
  createVenture: {
    ventureDetails: {
      name: '',
      description: ''
    },
    voters: {
      address_one: '',
      address_two: ''
    },
    proposers: [
      { address: '', placeholder: 'Address 1' },
      { address: '', placeholder: 'Address 2' },
      { address: '', placeholder: 'Address 3' },
    ],
  },
  createProposal: {
    proposalDetails: {
      title: '',
      description: ''
    },
    proposalActions: []
  },
  isWalletConnected: false as boolean,
  triedConnecting: false as boolean,
  currentNetwork: NETWORK_CONFIG.eth.network,
  networkOptions: [] as Network[],
  networkIndex: 0 as number,
}

export const GlobalContext = createContext<AppContext>(
  initialState as AppContext
);

export const UpdateGlobalContext = createContext<UpdateAppContext>({
  setVentureDetails: (_value) => {
    return;
  },
  setVoters: (_value) => {
    return;
  },
  setProposers: (_value) => {
    return;
  },
  setProposalDetails: (_value) => {
    return;
  },
  setProposalActions: (_value: ProposalAction[]) => {
    return;
  },
  setIsWalletConnected: (_value: boolean) => {
    return;
  },
  setTriedConnecting: (_value: boolean) => {
    return;
  },
  setCurrentNetwork: (_value: Network) => {
    return;
  },
  setNetworkOptions: (_value: Network[]) => {
    return;
  },
  setNetworkIndex: (_value: number) => {
    return;
  },
});

export function GlobalProvider({
  children,
}: {
  children?: React.ReactChild | React.ReactChild[];
}) {
  const [ventureDetails, setVentureDetails] = useState<any>(initialState.createVenture.ventureDetails);
  const [voters, setVoters] = useState<any>(initialState.createVenture.voters);
  const [proposers, setProposers] = useState<any>(initialState.createVenture.proposers);
  const [proposalDetails, setProposalDetails] = useState<any>(initialState.createProposal);
  const [proposalActions, setProposalActions] = useState<ProposalAction[]>(initialState.createProposal.proposalActions)
  // const [addedForTransfer, setAddedForTransfer] = useState<any[]>(
  //   initialState.addedForTransfer
  // );
  const [isWalletConnected, setIsWalletConnected] = useWalletConnection(
    initialState.isWalletConnected
  );
  const [triedConnecting, setTriedConnecting] = useWalletConnection(
    initialState.triedConnecting
  );
  const [currentNetwork, setCurrentNetwork] = useState<Network>(
    initialState.currentNetwork
  );
  const [networkOptions, setNetworkOptions] = useState<Network[]>(
    initialState.networkOptions
  );
  const [networkIndex, setNetworkIndex] = useState<number>(
    initialState.networkIndex
  );

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalContext.Provider
        value={{
          ventureDetails,
          proposalDetails,
          proposalActions,
          voters,
          proposers,
          isWalletConnected,
          triedConnecting,
          currentNetwork,
          networkOptions,
          networkIndex,
        }}
      >
        <UpdateGlobalContext.Provider
          value={{
            setVentureDetails,
            setProposalDetails,
            setProposalActions,
            setVoters,
            setProposers,
            setIsWalletConnected,
            setTriedConnecting,
            setCurrentNetwork,
            setNetworkOptions,
            setNetworkIndex
          }}
        >
          {children}
        </UpdateGlobalContext.Provider>
      </GlobalContext.Provider>
    </Web3ReactProvider>
  );
}
