import { ethers } from "ethers";
import { useState } from "react";
import Button from "src/components/Button";
import { useMintWhitelist } from "src/components/MintingEmbed/hooks/useMintWhiteList";
import { useContract } from "src/components/MintingEmbed/providers/useContract";
import { calculateAmountToMint } from "src/components/MintingEmbed/utils";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import { WalletProof } from "src/interfaces/MintingEmbed";
import { extractWagmiErrorReason } from "src/utils/chain.utils";
import { isNullOrEmpty } from "src/utils/utils";

interface Props {
  amountToMint: number;
  onMint: (txHash: string) => void;
  proofs: WalletProof;
}
export const MintWithProofsButton: React.FC<Props> = ({ amountToMint, onMint, proofs }) => {
  const { checkIfWalletCanMint, contractData, isLoading: isContractLoading } = useContract();
  const { mintWhiteList } = useMintWhitelist();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const amountWhiteListInWei = calculateAmountToMint(contractData.priceWhitelist, amountToMint);

  const handleMint = async () => {
    try {
      setErrorMsg("");
      setLoading(true);

      // check if wallet can mint
      const { canMint, error: mintError } = await checkIfWalletCanMint(amountToMint, proofs);

      if (!canMint && mintError) {
        throw new Error(mintError);
      }

      const toAsciiProofs = proofs?.proof.map((_) => {
        return ethers.hexlify(Buffer.from(_.slice(2), "hex"));
      });

      const tx = await mintWhiteList({
        amountInWei: amountWhiteListInWei, // amount to mint in wei
        amountToMint, // total assets to mint
        allowance: proofs.allowance, // allowance,
        toAsciiProofs, // proofs
      });

      onMint(tx.transactionHash);
    } catch (error) {
      const err = error as Error;

      // don't need to show error if user rejected request
      if (err?.message === "User rejected request") return;

      const extractedMessage = extractWagmiErrorReason(err.message);
      setErrorMsg(extractedMessage);

      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <Button disabled={isContractLoading || !isNullOrEmpty(errorMsg)} loading={loading} type="primary" onClick={handleMint} className="w-full">
        {loading ? "Minting..." : `Mint ${amountToMint} for ${ethers.formatEther(amountWhiteListInWei.toString())} ETH`}
      </Button>
      <DisplayIf condition={() => Boolean(errorMsg)}>
        <p className="truncate text-center text-red-500">{errorMsg}</p>
      </DisplayIf>
    </div>
  );
};
