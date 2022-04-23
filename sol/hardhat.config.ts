import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
// import "hardhat-gas-reporter"; //! todo uncomment
import "solidity-coverage";
import "hardhat-contract-sizer";

dotenv.config();

const lazyImport = async (module: any) => {
  return await import(module);
};

task("deploy", "Deploys contracts").setAction(async () => {
  const { deploy } = await lazyImport("./scripts/deploy");
  await deploy();
});

task("verify-greeter", "Verifies contracts").setAction(async () => {
  const { verify } = await lazyImport("./scripts/verify");
  await verify();
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    coverage: {
      url: "http://localhost:8545",
    },
    hardhat: {},
    rinkeby: {
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINKEBY_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_KEY}`,
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY!],
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY!],
    },
    optimism: {
      url: "https://kovan.optimism.io",
      chainId: 69,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },

  //! todo uncomment
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  // },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
