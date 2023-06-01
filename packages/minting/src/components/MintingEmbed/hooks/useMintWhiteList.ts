import { waitForTransaction, writeContract } from "@wagmi/core";
import { useEmbed } from "src/components/MintingEmbed/providers/useEmbed";
import { Network } from "src/interfaces/MintingEmbed";
import { StudioProxyTemplate } from "src/lib/StudioProxyTemplate";
import { networkToChainId } from "src/utils/chain.utils";

export const useMintWhitelist = () => {
  const { embed } = useEmbed();

  const mintWhiteList = async (input: { amountInWei: bigint; amountToMint: number; allowance: number; toAsciiProofs: string[] }) => {
    const { amountInWei, amountToMint, allowance, toAsciiProofs } = input;

    if (!amountInWei || !amountToMint || !allowance || !toAsciiProofs) {
      throw new Error("Missing argument");
    }

    const { hash } = await writeContract({
      address: embed.definition.contractAddress,
      chainId: networkToChainId[embed.definition.network as Network],
      abi: StudioProxyTemplate,
      functionName: "whitelistMint",
      value: amountInWei.toString() as any,
      args: [
        amountToMint, // total assets to mint
        allowance, // allowance,
        toAsciiProofs, // proofs
      ],
    });

    if (!hash) {
      throw new Error("Invalid hash");
    }

    const tx = await waitForTransaction({ hash });

    return tx;
  };

  return { mintWhiteList };
};
