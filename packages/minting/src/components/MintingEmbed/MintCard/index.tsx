import React, { useState } from "react";
import { useWallet } from "../../../providers/useWallet";
import MintInfo from "src/components/MintingEmbed/MintCard/MintInfo";
import MintLayout from "src/components/MintingEmbed/MintCard/MintLayout";
import MintedCard from "src/components/MintingEmbed/MintCard/MintedCard";
import { useEmbed } from "src/components/MintingEmbed/providers/useEmbed";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import DisplayIfWalletConnected from "src/components/conditionals/DisplayIfWalletConnected";
import { networkToChainId } from "src/utils/chain.utils";
import { Network } from "src/interfaces/MintingEmbed";

const MintCard: React.FC = () => {
  // const { isLoading } = useContract();
  const isLoading = false;
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
      style={{ width: 450 }}
      className={`flex h-full w-full flex-col items-center justify-center rounded-lg border shadow ${
        isLoading ? "h-24 animate-pulse bg-gray-200" : "bg-white"
      }`}
    >
      <DisplayIf condition={() => !isMinted} falsy={<MintedCard onClose={handleClose} txHash={txHash} />}>
        <div className="flex w-full flex-col gap-3 whitespace-nowrap p-4">
          <MintInfo />
          <DisplayIfWalletConnected targetChainId={networkToChainId[network]}>
            <DisplayIf condition={() => !isLoading}>
              <MintLayout onMint={handleIsMinted} />
            </DisplayIf>
          </DisplayIfWalletConnected>
        </div>
      </DisplayIf>
    </div>
  );
};

export default MintCard;
