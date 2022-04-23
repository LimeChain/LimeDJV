import { useWeb3React } from "@web3-react/core";

import { useRouter } from "next/dist/client/router";

function Home() {
  const { account, library, deactivate, chainId, error } = useWeb3React();

  const router = useRouter();
  
  return (
    <div className="container">
     

      <header>
        <nav>
          
        </nav>
      </header>

      <main>
        <div className="welcome-title">
          <div className="first-line-text">
            <h1 className="blue">Create</h1>
            <h1 className="green">joint ventures</h1>
          </div>
          <div className="second-line-text">
            <h1 className="blue margin-top-negative">on-chain</h1>
          </div>
          <div className="button-wrapper">
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
