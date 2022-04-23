interface NetworkConfig {
    [protocol: string]: {
      network: Network;
      tokenAddresses: { [name: string]: string };
      EWTB?: { [name: string]: string };
    };
  }
  
  interface AppContext {
    createVenture: any;
    createProposal: {
      proposalDetails: {
        title: '',
        description: ''
      },
      proposalActions: ProposalAction[]
    }
    createProposal: any;
    triedConnecting: boolean;
    currentNetwork: Network;
    networkOptions: Network[];
    networkIndex: number;
  }
  
  interface UpdateAppContext {
    setVentureDetails: (state: any) => void;
    setVoters: (state: any) => void;
    setProposers: (state: any) => void;
    setProposalDetails: (state: any) => void;
    setProposalActions: (state: any) => void;
    setIsWalletConnected: (state: any) => void;
    setTriedConnecting: (state: boolean) => void;
    setCurrentNetwork: (network: Network) => void;
    setNetworkOptions: (networks: Network[]) => void;
    setNetworkIndex: (index: number) => void;
  }
  
  interface Network {
    symbol: string;
    chainId: number;
    chainName: string;
    chainIcon: string;
    chainTargetId: number;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    refreshClaimTimestamp: number;
    rpcUrl: string;
    blockExplorerUrl: string;
  }