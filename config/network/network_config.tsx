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
      factory_address: "0x960c34B19Ef512Bd9Ad70e3810923B49D3E2C9a0"
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
      factory_address: "0x54B34418581f1627C3a02859bd3d22f2F741Df07"
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
      factory_address: "0x54B34418581f1627C3a02859bd3d22f2F741Df07"
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
      factory_address: "0x8288bEf5f877cd6C14Be4C330b7bc7C798ef3199"
    },
  };
  