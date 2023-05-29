import { Network } from "../interfaces/MintingEmbed";

export const networkToChainId: Record<Network, number> = {
  [Network.EthereumSepolia]: 11155111,
  [Network.EthereumMainnet]: 1,
  [Network.EthereumGoerli]: 5,
  [Network.Polygon]: 137,
};

export const getEtherscanLink = (network: Network, contractAddress: string, type: string) => {
  switch (network) {
    case Network.EthereumGoerli:
      return `https://goerli.etherscan.io/${type}/${contractAddress}`;
    case Network.EthereumSepolia:
      return `https://sepolia.etherscan.io/${type}/${contractAddress}`;
    case Network.Polygon:
      return `https://polygonscan.com/${type}/${contractAddress}`;
    case Network.EthereumMainnet:
    default:
      return `https://etherscan.io/${type}/${contractAddress}`;
  }
};

export const getReadableNetwork = (network: Network) => {
  switch (network) {
    case Network.EthereumGoerli:
      return "Ethereum (Goerli)";
    case Network.EthereumSepolia:
      return "Ethereum (Sepolia)";
    case Network.Polygon:
      return "Polygon";
    case Network.EthereumMainnet:
      return "Ethereum (Mainnet)";
    default:
      return `Unknown Network`;
  }
};

export const networkToReadableBlockExplorer = (network: Network) => {
  switch (network) {
    case Network.EthereumGoerli || Network.EthereumSepolia || Network.EthereumMainnet:
      return "Etherscan";
    case Network.Polygon:
      return "Polyscan";
    default:
      return `Etherscan`;
  }
};
