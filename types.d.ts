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

  interface SelectProps {
    optionsList: Option[];
    onSelectOptionChange?: ((option: any) => void) | undefined;
    selected?: number;
    optionsListName?: string;
    className?: string | string[];
    size?: "sm" | "md" | "lg";
    displayFields: {
      primary: string;
      secondary: string;
      icon?: string;
      network?: string;
    };
    disabled?: boolean;
    placeholder?: {
      text: string;
      icon?: string;
      iconSize?: 8 | 12 | 14 | 16 | 18 | 20 | 24 | 32;
      reset?: boolean;
      active?: boolean;
    };
    customEmptyText?: string;
  }
  
  interface Option {
    [key: string]: any;
  }