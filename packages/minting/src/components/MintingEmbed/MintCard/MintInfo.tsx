import { ethers } from "ethers";
import React from "react";
import { useContract } from "src/components/MintingEmbed/providers/useContract";
import { useEmbed } from "src/components/MintingEmbed/providers/useEmbed";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import { isNullOrEmpty, isNullOrEmptyObject } from "src/utils/utils";

const MintInfo: React.FC = () => {
  const { embed } = useEmbed();
  const { contractData } = useContract();

  const mintPriceInEth = contractData.priceInWei ? ethers.formatEther(contractData.priceInWei?.toString() || "0") : undefined;

  return (
    <div className="flex flex-grow flex-col gap-2">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <h5 className="text-2xl">{embed.definition.name}</h5>
        <DisplayIf condition={() => !isNullOrEmpty(mintPriceInEth)}>
          <p className="text-bold text-lg">{mintPriceInEth} ETH</p>
        </DisplayIf>
      </div>
      <DisplayIf condition={() => !isNullOrEmptyObject(contractData)}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <p>Available:</p>
          <p>
            <span className="font-bold">{contractData.MAX_SUPPLY - contractData.totalSupply}</span> / {contractData.MAX_SUPPLY}
          </p>
        </div>
      </DisplayIf>
    </div>
  );
};

export default MintInfo;
