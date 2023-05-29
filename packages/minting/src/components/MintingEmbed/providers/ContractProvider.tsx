import React, { useEffect, useMemo, useState } from "react";
import { ContractContext, ContractContextDefinition } from "./useContract";
import { useWallet } from "../../../providers/useWallet";
import { readContract } from "@wagmi/core";
import { ContractData, Network, WalletProof } from "@interfaces/MintingEmbed";
import { contractRead, contractReads } from "@hooks/useContractRead";
import {
  studioProxyTemplateFunctions,
  studioProxyTemplateFunctionsWithArgs,
  studioProxyTemplateFunctionsWithoutArgs,
} from "../../../lib/StudioProxyTemplate";
import logger from "@services/logger";
import { isBigInt } from "@services/wagmi";
import { isNullOrEmpty } from "@utils/utils";

export type ContractProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  contractAddress: `0x${string}`;
  network: Network;
};

export const ContractProvider = (props: ContractProviderProps) => {
  const { children, contractAddress, network } = props;
  const { address } = useWallet();

  const [contractData, setContractData] = useState<ContractData>({} as ContractData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getContractData = async () => {
      try {
        setIsLoading(true);

        const newContractData: Record<string, unknown> = {};

        const noArgsData = await contractReads(contractAddress, studioProxyTemplateFunctionsWithoutArgs);
        const argsData = await contractRead(contractAddress, "balanceOf", [address]);

        const data = [...noArgsData, argsData];

        studioProxyTemplateFunctions.forEach((functionName, index) => {
          const contractDataElement = data[index];
          newContractData[functionName] = contractDataElement;
        });

        setContractData(newContractData as ContractData);
      } catch (error) {
        logger.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (contractAddress && network) {
      getContractData();
    }
  }, [contractAddress, network]);

  const checkIfWalletCanMint = async (amountToMint: number, maybeProofs?: WalletProof) => {
    // check if contract is paused
    if (contractData.paused) {
      return { error: "Contract is paused", canMint: false };
    }

    // enforce number for safety
    const balanceNr = Number(contractData.balanceOf.toString());
    const amountToMintNr = Number(amountToMint.toString());

    // check if whitelist is active ==> why ??

    if (balanceNr + amountToMintNr > contractData.MAX_PER_WALLET) {
      return { error: "Exceeds max per wallet during public sale", canMint: false };
    }

    if (balanceNr + amountToMintNr > contractData.MAX_SUPPLY) {
      return { error: "Exceeds max supply", canMint: false };
    }

    if (!amountToMintNr) {
      return { error: "Need to mint at least 1 NFT", canMint: false };
    }

    if (contractData.whitelistActive) {
      if (!maybeProofs || maybeProofs.proof.length === 0) {
        return { error: "Connected wallet cannot mint this token.", canMint: false };
      }

      if (isNullOrEmpty(contractData.priceWhitelist?.toString()) && isNullOrEmpty(contractData.priceInWei?.toString())) {
        return { error: "Could not fetch mint price", canMint: false };
      }
    }

    if (isNullOrEmpty(contractData.priceInWei?.toString())) {
      return { error: "Could not fetch mint price", canMint: false };
    }

    return { canMint: true };
  };

  const wrapper: ContractContextDefinition = useMemo(
    () => ({
      isLoading,
      contractData,
      checkIfWalletCanMint,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractData, isLoading],
  );

  return <ContractContext.Provider value={wrapper}>{children}</ContractContext.Provider>;
};
