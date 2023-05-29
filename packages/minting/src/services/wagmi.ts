import { configureChains, createConfig } from "@wagmi/core";
import { mainnet, goerli, sepolia, polygon } from "@wagmi/chains";

import { publicProvider } from "@wagmi/core/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia, polygon],
  [
    alchemyProvider({
      apiKey: process.env.ALCHEMY_MAINNET as string,
    }),
    alchemyProvider({
      apiKey: process.env.ALCHEMY_GOERLI as string,
    }),
    alchemyProvider({
      apiKey: process.env.ALCHEMY_SEPOLIA as string,
    }),
    alchemyProvider({
      apiKey: process.env.ALCHEMY_POLYGON as string,
    }),
    publicProvider(),
  ],
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

/**
 * Check if unknown data is of type BigInt
 */
export const isBigInt = (data: unknown): data is bigint => {
  return typeof data === "bigint";
};
