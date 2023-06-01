import { waitForTransaction, writeContract } from "@wagmi/core";
import { StudioProxyTemplate } from "../../../lib/StudioProxyTemplate";
import { useEmbed } from "src/components/MintingEmbed/providers/useEmbed";
import logger from "src/services/logger";
import { networkToChainId } from "src/utils/chain.utils";
import { Network } from "src/interfaces/MintingEmbed";

export const useMint = () => {
  const { embed } = useEmbed();

  const mint = async (amountToMint: number, amountInWei: bigint) => {
    logger.debug(`Minting ${amountToMint} tokens`);
    logger.debug(`Minting ${amountInWei} ETH`);

    const { hash } = await writeContract({
      address: embed.definition.contractAddress,
      chainId: networkToChainId[embed.definition.network as Network],
      abi: StudioProxyTemplate,
      functionName: "mint",
      args: [amountToMint],
      value: amountInWei.toString() as any,
    });

    if (!hash) {
      throw new Error("Invalid hash");
    }

    const tx = await waitForTransaction({ hash });

    return tx;
  };

  return { mint };
};
