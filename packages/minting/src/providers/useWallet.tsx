import { WalletAddress } from "@interfaces/MintingEmbed";
import React, { useContext } from "react";

export type WalletContextDefinition = {
  isConnected: boolean;
  address?: any;
  chainId?: number;
  connectWallet: (input: { address?: WalletAddress; chainId?: number }) => void;
  disconnectWallet: () => Promise<void>;
};

export const WalletContext = React.createContext<WalletContextDefinition>({} as WalletContextDefinition);
export const useWallet = (): WalletContextDefinition => useContext(WalletContext);
