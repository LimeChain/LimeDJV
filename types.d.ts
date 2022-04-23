declare module "react-toggle";
import { FunctionParam } from "./components/Proposal/ProposalActions";

interface AppContext {
  createVenture: any;
  createProposal: any;
  createProposal: any;
  isWalletConnected: boolean;
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

interface NetworkConfig {
  [protocol: string]: {
    network: Network;
    factory_address: string;
  };
}

interface ProposalAction {
  targetAddress: string;
  isProxyAddress: boolean;
  shouldAddValueAttribute: boolean;
  numberOfZeroes: number;
  shouldAddFunctionCall: boolean;
  selectedFunction: string;
  functionParams: FunctionParam[]
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

// Metamask types
// more info: https://docs.metamask.io/guide/rpc-api.html#parameters-4
interface MetamaskChainParams {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  chainId: string;
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
}

// more info: https://docs.metamask.io/guide/rpc-api.html#parameters-6
interface MetamaskAssetParamsOptions {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
}

interface MetamaskAssetParamsType {
  type: "ERC20";
}