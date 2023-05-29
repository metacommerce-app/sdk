import MintInfo from "@components/MintingEmbed/MintCard/MintInfo";
import MintLayout from "@components/MintingEmbed/MintCard/MintLayout";
import MintedCard from "@components/MintingEmbed/MintCard/MintedCard";
import { useContract } from "@components/MintingEmbed/providers/useContract";
import { useEmbed } from "@components/MintingEmbed/providers/useEmbed";
import DisplayIf from "@components/conditionals/DIsplayIf";
import DisplayIfWalletConnected from "@components/conditionals/DisplayIfWalletConnected";
import { Network } from "@interfaces/MintingEmbed";
import { networkToChainId } from "@utils/chain.utils";
import React, { useState } from "react";
import { useWallet } from "../../../providers/useWallet";

const MintCard: React.FC = () => {
  const { isLoading } = useContract();
  const { disconnectWallet } = useWallet();
  const { embed } = useEmbed();

  const [isMinted, setIsMinted] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleIsMinted = (txHash: string) => {
    setIsMinted(true);
    setTxHash(txHash);
  };

  /**
   * Close the minted overlay & disconnect wallet
   */
  const handleClose = async () => {
    setIsMinted(false);
    await disconnectWallet();
  };

  const network: Network = embed.definition.network;

  return (
    <div
      style={{ minHeight: 350, minWidth: 350 }}
      className={`flex h-full w-full flex-col items-center justify-center rounded-lg border shadow ${
        isLoading ? "animate-pulse bg-gray-200" : "bg-white"
      }`}
    >
      <DisplayIf condition={() => !isLoading}>
        <DisplayIf condition={() => !isMinted} falsy={<MintedCard onClose={handleClose} txHash={txHash} />}>
          <div className="flex w-full flex-col gap-3 whitespace-nowrap p-4">
            <MintInfo />
            <DisplayIfWalletConnected targetChainId={networkToChainId[network]}>
              <MintLayout onMint={handleIsMinted} />
            </DisplayIfWalletConnected>
          </div>
        </DisplayIf>
      </DisplayIf>
    </div>
  );
};

export default MintCard;
