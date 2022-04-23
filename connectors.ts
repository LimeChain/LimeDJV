import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { SUPPORTED_CHAINIDS, walletConnectSupportedNetworks } from "./constants";

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINIDS,
});

export const walletConnect = (selectedChainId?: any) => {
  console.log(selectedChainId)
  return new WalletConnectConnector({
    rpc: {
      [selectedChainId]: walletConnectSupportedNetworks[selectedChainId || 1],
    },
    qrcode: true,
  });
};

export enum ConnectorNames {
  Injected,
}

export const connectorsByName: {
  [connectorName in ConnectorNames]: any;
} = {
  [ConnectorNames.Injected]: injected,
};

