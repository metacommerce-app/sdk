import { LoadingOutlined } from "@ant-design/icons";

import React from "react";
import { MintWithProofsButton } from "src/components/MintingEmbed/MintCard/MintLayout/AccessList/MintWithProofsButton";
import { useAccessListQueries } from "src/components/MintingEmbed/hooks/useAccessList";
import { useEmbed } from "src/components/MintingEmbed/providers/useEmbed";
import { useWallet } from "src/providers/useWallet";

interface Props {
  amountToMint: number;
  onMint: (txHash: string) => void;
}

export const MintWhiteListButton: React.FC<Props> = ({ amountToMint, onMint }) => {
  const { address } = useWallet();
  const { embed } = useEmbed();

  const { isLoading: isLoadingProofs, data: proofs } = useAccessListQueries(embed.id, address);

  if (isLoadingProofs) {
    return (
      <p className="flex items-center gap-4 truncate truncate text-center text-gray-500">
        <LoadingOutlined /> {"Loading minting configuration..."}
      </p>
    );
  }

  if (!proofs) {
    return (
      <p className="flex items-center gap-4 truncate truncate text-center text-red-500">
        {"An error occurred while fetching the configuration, please refresh and try again."}
      </p>
    );
  }

  return <MintWithProofsButton amountToMint={amountToMint} onMint={onMint} proofs={proofs} />;
};
