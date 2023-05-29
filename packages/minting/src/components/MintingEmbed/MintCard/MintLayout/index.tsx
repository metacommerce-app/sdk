import React from "react";
import { Network } from "@interfaces/MintingEmbed";
import ConnectedWalletButton from "./ConnectedWalletButton";
import MintButtonWithAmountSelection from "./MintButtonWithAmountSelection";

interface MintLayoutProps {
  onMint: (txHash: string) => void;
}

const MintLayout: React.FC<MintLayoutProps> = ({ onMint }) => {
  return (
    <div className="flex flex-col gap-5">
      <MintButtonWithAmountSelection onMint={onMint} />
      <ConnectedWalletButton />
    </div>
  );
};

export default MintLayout;
