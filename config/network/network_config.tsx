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
  };
  