export const config = {
    eth: {
      network: {
        symbol: "ETH",
        chainId: 4,
        chainName: "Ethereum - Rinkeby",
        chainIcon: "ethereum",
        chainTargetId: 1,
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrl: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
        blockExplorerUrl: "https://rinkeby.etherscan.io",
        refreshClaimTimestamp: 15000,
      },
    },
    bsc: {
      network: {
        chainId: 97,
        symbol: "BSC",
        chainName: "Smart Chain - Testnet",
        chainIcon: "binance",
        chainTargetId: 2,
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        blockExplorerUrl: "https://testnet.bscscan.com",
        refreshClaimTimestamp: 15000,
      },
    },
    polygon: {
      network: {
        symbol: "MATIC",
        chainId: 80001,
        chainName: "Polygon - Mumbai",
        chainIcon: "matic",
        chainTargetId: 4,
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrl: "https://rpc-mumbai.maticvigil.com",
        blockExplorerUrl: "https://explorer-mumbai.maticvigil.com",
        refreshClaimTimestamp: 15000,
      },
    },
    optimistic: {
      network: {
        symbol: "OPTIMISTIC",
        chainId: 69,
        chainName: "Optimistic - Kovan",
        chainIcon: "optimistic",
        chainTargetId: 7,
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrl: "https://kovan.optimism.io/",
        blockExplorerUrl: "https://kovan-optimistic.etherscan.io",
        refreshClaimTimestamp: 15000,
      },
    },
  };
  