import DisabledMintButton from "@components/MintingEmbed/MintCard/MintLayout/MintButtonWithAmountSelection/DisabledMintButton";
import MintAmount from "@components/MintingEmbed/MintCard/MintLayout/MintButtonWithAmountSelection/MintAmount";
import MintButton from "@components/MintingEmbed/MintCard/MintLayout/MintButtonWithAmountSelection/MintButton";
import { useContract } from "@components/MintingEmbed/providers/useContract";
import DisplayIf from "@components/conditionals/DIsplayIf";
import { Network } from "@interfaces/MintingEmbed";
import React, { useState } from "react";

interface MintButtonWithAmountSelectionProps {
  onMint: (txHash: string) => void;
}

const MintButtonWithAmountSelection: React.FC<MintButtonWithAmountSelectionProps> = ({ onMint }) => {
  const [amountToMint, setAmountToMint] = useState(1);
  const { contractData } = useContract();

  const isPaused: boolean = contractData.paused as boolean;
  const handleChange = (amount: number) => {
    setAmountToMint(amount);
  };
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <MintAmount amount={amountToMint} onChange={handleChange} isPaused={isPaused} />
      <DisplayIf condition={() => !isPaused} falsy={<DisabledMintButton />}>
        <DisplayIf condition={() => contractData.whitelistActive} falsy={<MintButton amountToMint={amountToMint} onMint={onMint} />}>
          {/* <MintWhiteListButton amountToMint={amountToMint} onMint={onMint} /> */}
        </DisplayIf>
      </DisplayIf>
    </div>
  );
};

export default MintButtonWithAmountSelection;
