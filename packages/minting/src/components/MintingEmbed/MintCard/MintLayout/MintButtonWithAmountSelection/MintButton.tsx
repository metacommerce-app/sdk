import React, { useState } from "react";
import { useEmbed } from "../../../providers/useEmbed";
import { Network } from "@interfaces/MintingEmbed";
import { calculateAmountToMint } from "@components/MintingEmbed/utils";
import { useContract } from "@components/MintingEmbed/providers/useContract";
import { useMint } from "@components/MintingEmbed/hooks/useMint";
import logger from "@services/logger";
import Button from "@components/Button";
import { ethers } from "ethers";
import DisplayIf from "@components/conditionals/DIsplayIf";

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
      setErrorMsg(error.message);
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <Button type="primary" disabled={isContractLoading} loading={loading} onClick={handleMint} className="w-full">
        {loading ? "Minting..." : `Mint ${amountToMint} for ${ethers.formatEther(amountInWei.toString())} ETH`}
      </Button>
      <DisplayIf condition={() => Boolean(errorMsg)}>
        <p className="w-[500px] text-center text-red-500">{errorMsg}</p>
      </DisplayIf>
    </div>
  );
};

export default MintButton;
