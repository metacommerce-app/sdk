import { ethers } from "ethers";
import React, { useState } from "react";
import Button from "src/components/Button";
import { useMint } from "src/components/MintingEmbed/hooks/useMint";
import { useContract } from "src/components/MintingEmbed/providers/useContract";
import { calculateAmountToMint } from "src/components/MintingEmbed/utils";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import logger from "src/services/logger";
import { extractErrorMessage } from "src/utils/chain.utils";

interface MintButtonProps {
  amountToMint: number;
  onMint: (txHash: string) => void;
}

const MintButton: React.FC<MintButtonProps> = ({ amountToMint, onMint }) => {
  const { checkIfWalletCanMint, contractData, isLoading: isContractLoading } = useContract();
  const { mint } = useMint();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const amountInWei = calculateAmountToMint(contractData.priceInWei, amountToMint);

  const handleMint = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      // check if wallet can mint
      const { canMint, error: mintError } = await checkIfWalletCanMint(amountToMint);

      if (!canMint) {
        setErrorMsg(mintError as string);
        logger.error(mintError);
        return;
      }

      const tx = await mint(amountToMint, amountInWei);

      onMint(tx.transactionHash);
    } catch (err) {
      const error = err as Error;
      const msg = extractErrorMessage(error.message);

      setErrorMsg(msg);
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <Button type="primary" disabled={isContractLoading} loading={loading} onClick={handleMint} className="w-full">
        {loading ? "Minting..." : `Mint ${amountToMint} for ${ethers.formatEther(amountInWei.toString())} ETH`}
      </Button>
      <DisplayIf condition={() => Boolean(errorMsg)}>
        <p className="truncate text-center text-red-500">{errorMsg}</p>
      </DisplayIf>
    </div>
  );
};

export default MintButton;
