import { useContract } from "@components/MintingEmbed/providers/useContract";
import { useEmbed } from "@components/MintingEmbed/providers/useEmbed";
import DisplayIf from "@components/conditionals/DIsplayIf";
import { isNullOrEmptyObject } from "@utils/utils";
import { ethers } from "ethers";
import React from "react";

const MintInfo: React.FC = () => {
  const { embed } = useEmbed();
  const { contractData } = useContract();

  const mintPriceInEth = ethers.formatEther(contractData.priceInWei?.toString() || "0");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <h5 className="text-2xl">{embed.definition.name}</h5>
        <p className="text-bold text-lg">{mintPriceInEth} ETH</p>
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
