import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { NETWORK_CONFIG } from "../config/network";
import { ConnectorNames, connectorsByName, walletConnect } from "../connectors";
import { useGlobalContext } from "../hooks/useGlobalContext";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { getNetworkIndex } from "../utils/network";
import { addNetwork, changeCurrentNetwork, getMetamaskNetworkParams, MetamaskErrorCodes } from "../utils/metamask";
import Button from "./Shared/Button";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, deactivate, chainId, account, setError, library } =
    useWeb3React();

    const {
      networkOptions,
      currentNetwork,
      networkIndex,
      triedConnecting,
      isWalletConnected,
      setCurrentNetwork,
      setNetworkIndex,
      setNetworkOptions,
      setTriedConnecting,
      setIsWalletConnected
    } = useGlobalContext();

    const {
      isMetaMaskInstalled,
      isWeb3Available,
      startOnboarding,
      stopOnboarding,
    } = useMetaMaskOnboarding();

    useEffect(() => {
      const loadNetworkOptions = () => {
        const networkOptions_ = Object.values(NETWORK_CONFIG)?.map(
          (item: any) => item?.network
        );
        setNetworkOptions(networkOptions_);
      };
  
      loadNetworkOptions();
    }, []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  useEffect(() => {
    const setCurrentNetworkIndex = () => {
      if (isWalletConnected) {
        const chainId_ = chainId && active ? chainId : currentNetwork?.chainId;
        setNetworkIndex(getNetworkIndex(chainId_, networkOptions));
      } else {
        setNetworkIndex(
          getNetworkIndex(currentNetwork?.chainId, networkOptions)
        );
      }
    };

    setCurrentNetworkIndex();
  }, [chainId, triedConnecting, isWalletConnected, currentNetwork]);

  async function changeNetwork(option: Network) {
    try {
      if (isWalletConnected) {
        await changeCurrentNetwork(option.chainId, library.provider);
      }
      setCurrentNetwork(option);
    } catch (err: any) {
      if (err.code === MetamaskErrorCodes.NotNetworkFound) {
        try {
          await addNetwork(getMetamaskNetworkParams(option), library.provider);
        } catch (err) {
          console.error(
            "MetaMask - Add Network: An error ocurred when trying to add a new network.",
            err
          );
          setNetworkIndex(getNetworkIndex(chainId!, networkOptions));
        }
      } else if (err.code === MetamaskErrorCodes.UserRejectedRequest) {
        setNetworkIndex(getNetworkIndex(chainId!, networkOptions));
      }
    }
  }


  function handleDisconnect() {
    deactivate();
    setIsWalletConnected(false);
    setTriedConnecting(false);
  }

  async function handleConnectInjected() {
    await activate(connectorsByName[ConnectorNames.Injected]);
    setNetworkIndex(getNetworkIndex(currentNetwork?.chainId, networkOptions));
    setTriedConnecting(true);
    setIsWalletConnected(true);
    const { ethereum } = window as any;
    ethereum?.removeAllListeners(["networkChanged"]);
  }

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  return (
    <>
   {!isWalletConnected && <>
    {isWeb3Available ? (
       <Button
        className='margin-right'
        disabled={connecting}
        onClick={handleConnectInjected}
        label={isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
        size={'sm'}
      >
      </Button> 
    ) : (
      <Button onClick={startOnboarding} label={'Install Metamask'} size={'sm'}></Button>
    )}
    {(<Button
        className='margin-right'
        disabled={connecting}
        onClick={async () => {
          try {
            await activate(walletConnect(currentNetwork.chainId), undefined, true)
            setIsWalletConnected(true)
          } catch (e) {
            console.log(e)
            if (error instanceof UserRejectedRequestError) {
              setConnecting(false);
            } else {
              setError(error);
            }
          }
        }}
        label={'Wallet Connect'}
        size={'sm'}
        >
      </Button>)
    }
  </>}
  {isWalletConnected && 
      <>
      <Button
        className='margin-right'
        label={`${shortenEthereumAddress(account)}`}
        size={'sm'}
      >
      </Button>
      <Button
        className='margin-right'
        onClick={handleDisconnect}
        label={'Disconnect'}
        size={'sm'}
        >
      </Button>
    </>}
    <Select
        optionsList={Object.values(NETWORK_CONFIG)?.map(
          (item: any) => item?.network
        )}
        displayFields={{
          primary: "chainName",
          secondary: "",
          icon: "chainIcon",
        }}
        size="sm"
        selected={networkIndex}
        onSelectOptionChange={(option) => changeNetwork(option)}
        />
  </>

  );
}
export default Account;
function shortenEthereumAddress(account: string | null | undefined) {
  throw new Error("Function not implemented.");
}

