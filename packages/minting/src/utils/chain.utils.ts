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

export const ChainIdToNetwork: Record<number, Network> = {
  11155111: Network.EthereumSepolia,
  1: Network.EthereumMainnet,
  5: Network.EthereumGoerli,
};

// This is a hack due to the inability to retrieve the error reason using wagmi handlers
// Unfortunately, wagmi doesnt let us gracefully handle errors: https://github.com/wagmi-dev/wagmi/discussions/1511
export const extractWagmiErrorReason = (message: string): string => {
  const extractedMessage = message.split("reason=")[1]?.split('"')[1];
  if (extractedMessage) {
    return extractedMessage;
  }
  return "An unsupported error occured";
};

export const extractErrorMessage = (message: string): string => {
  if (message.includes("The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.")) {
    return "Not enough funds to cover gas fees";
  }

  if (message.includes("Connector not found")) {
    return "No web3 provider found";
  }

  return message;
};
