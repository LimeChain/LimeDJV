import type { AppProps } from "next/app";
import { GlobalProvider } from "../context/GlobalContext";
import "react-toggle/style.css"; // for ES6 modules
import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../utils/network";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </GlobalProvider>
  );
}

export default NextWeb3App;
