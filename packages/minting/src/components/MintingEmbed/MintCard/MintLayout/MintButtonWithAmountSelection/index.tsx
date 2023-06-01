import React, { useState } from "react";
import { MintWhiteListButton } from "src/components/MintingEmbed/MintCard/MintLayout/AccessList";
import DisabledMintButton from "src/components/MintingEmbed/MintCard/MintLayout/MintButtonWithAmountSelection/DisabledMintButton";
import MintAmount from "src/components/MintingEmbed/MintCard/MintLayout/MintButtonWithAmountSelection/MintAmount";
import MintButton from "src/components/MintingEmbed/MintCard/MintLayout/MintButtonWithAmountSelection/MintButton";
import { useContract } from "src/components/MintingEmbed/providers/useContract";
import DisplayIf from "src/components/conditionals/DIsplayIf";

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
    <div className="flex w-full flex-col items-center gap-3">
      <MintAmount amount={amountToMint} onChange={handleChange} isPaused={isPaused} />
      <DisplayIf condition={() => !isPaused} falsy={<DisabledMintButton />}>
        <DisplayIf condition={() => contractData.whitelistActive} falsy={<MintButton amountToMint={amountToMint} onMint={onMint} />}>
          <MintWhiteListButton amountToMint={amountToMint} onMint={onMint} />
        </DisplayIf>
      </DisplayIf>
    </div>
  );
};

export default MintButtonWithAmountSelection;
