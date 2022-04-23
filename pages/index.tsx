import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Account from "../components/Account";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import TokenBalance from "../components/TokenBalance";
import { ALBT_TOKEN_ADDRESS } from "../constants";
import Button from "../components/Shared/Button";
import { useRouter } from "next/dist/client/router";
import { addNetwork, changeCurrentNetwork, getMetamaskNetworkParams, getMetamaskProvider, MetamaskErrorCodes } from "../utils/metamask";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useEffect } from "react";
import { getNetworkIndex } from "../utils/network";


function Home() {
  const { account, library, deactivate, chainId, error } = useWeb3React();

  const router = useRouter();
  
  return (
    <div className="container">
      <Head>
        <title>Hackaton</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap" rel="stylesheet"></link>
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/how-it-works">
            <a>How it works</a>
          </Link>
          <Link href="/my-ventures">
            <a>Dashboard</a>
          </Link>
          {/* <Account triedToEagerConnect={triedToEagerConnect} /> */}
        </nav>
      </header>

      <main>
        {/* <h1>
          Welcome to Hackaton template
        </h1>

        {isConnected && (
          <section>
            <NativeCurrencyBalance />

            <TokenBalance tokenAddress={ALBT_TOKEN_ADDRESS} symbol="ALBT" />
          </section>
        )} */}
        <div className="welcome-title">
          <div className="first-line-text">
            <h1 className="blue">Create</h1>
            <h1 className="green">joint ventures</h1>
          </div>
          <div className="second-line-text">
            <h1 className="blue margin-top-negative">on-chain</h1>
          </div>
          <div className="button-wrapper">
          <Button label="start now" disabled={false} onClick={() => {router.push('/my-ventures')}}></Button>
          </div>
        </div>
      </main>
      <footer>
        <p>Powered by Toni Storaro</p>
      </footer>

      <style jsx>{`
        .container {
          height: 100%;
          background: url('/svgs/left.svg') 75% 300% no-repeat, url('/svgs/right.svg') 95% 60% no-repeat;
          background-color: #EEEEFF;
        }
        .blue {
          color: #25067D;
          font-weight: 500;
        }
        .green {
          color: #00E0B8;
          margin-left: 10px;
          font-weight: 700;
        }
        .welcome-title {
          position: absolute;
          margin-left: auto;
          margin-right: auto;
          left: 35%;
          right: 0;
          top: 45%;
          text-align: center;
        }
        .first-line-text {
          display: flex;
        }
        .second-line-text {
          display: flex;
        }
        .button-wrapper {
          display: flex;
        }
        nav {
          padding-top: 40px;
          display: flex;
          justify-content: space-evenly;
          color: #25067D;
        }

        main {
          text-align: center;
        }

        footer {
          position: absolute;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          margin: auto;
          bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;
