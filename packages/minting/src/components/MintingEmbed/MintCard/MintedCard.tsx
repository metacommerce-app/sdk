import { RedoOutlined } from "@ant-design/icons";
import Button from "@components/Button";
import { useEmbed } from "@components/MintingEmbed/providers/useEmbed";
import { getEtherscanLink, networkToReadableBlockExplorer } from "@utils/chain.utils";
import React from "react";

interface MintedCardProps {
  onClose: () => void;
  txHash: string;
}

const MintedCard: React.FC<MintedCardProps> = ({ onClose, txHash }) => {
  const { network } = useEmbed();

  return (
    <div className="p-2 h-full w-full flex items-center justify-center ">
      <div className="flex flex-col items-center gap-3">
        <div className="transition ease-in-out delay-150 ">{/* <LottieAnimation type="success" width="150px" height="150px" autoplay /> */}</div>
        <h4 className="text-xl whitespace-nowrap">{"Your transaction has been submitted!"}</h4>
        <p>
          {"You can view your transaction on "}
          <a href={getEtherscanLink(network, txHash, "tx")} target="_blank" rel="noreferrer" className="text-blue-500">
            {networkToReadableBlockExplorer(network)}.
          </a>
        </p>
        <Button className="w-full" icon={<RedoOutlined />} type="primary" onClick={onClose}>
          {"Mint again"}
        </Button>
      </div>
    </div>
  );
};

export default MintedCard;
