import { ContractData, WalletProof } from "@interfaces/MintingEmbed";
import React, { useContext } from "react";

export type ContractContextDefinition = {
  isLoading: boolean;
  contractData: ContractData;
  checkIfWalletCanMint: (amountToMint: number, maybeProofs?: WalletProof) => Promise<{ canMint: boolean; error?: string }>;
};

export const ContractContext = React.createContext<ContractContextDefinition>({} as ContractContextDefinition);
export const useContract = (): ContractContextDefinition => useContext(ContractContext);
