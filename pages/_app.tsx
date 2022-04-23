import type { AppProps } from "next/app";
import { GlobalProvider } from "../context/GlobalContext";
import "react-toggle/style.css"; // for ES6 modules
import "../styles/globals.css";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default NextWeb3App;
