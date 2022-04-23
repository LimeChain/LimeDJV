interface NetworkConfig {
    [protocol: string]: {
      network: Network;
      tokenAddresses: { [name: string]: string };
      EWTB?: { [name: string]: string };
    };
  }
  