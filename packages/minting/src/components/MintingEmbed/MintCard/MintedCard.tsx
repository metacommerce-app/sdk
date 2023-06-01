import { RedoOutlined } from "@ant-design/icons";
import React from "react";
import Button from "src/components/Button";
import { useEmbed } from "src/components/MintingEmbed/providers/useEmbed";
import { getEtherscanLink, networkToReadableBlockExplorer } from "src/utils/chain.utils";

interface MintedCardProps {
  onClose: () => void;
  txHash: string;
}

const MintedCard: React.FC<MintedCardProps> = ({ onClose, txHash }) => {
  const { network } = useEmbed();

  return (
    <div className="flex h-full w-full items-center justify-center p-2 ">
      <div className="flex flex-col items-center gap-3">
        <div className="transition delay-150 ease-in-out ">{/* <LottieAnimation type="success" width="150px" height="150px" autoplay /> */}</div>
        <h4 className="whitespace-nowrap text-xl">{"Your transaction has been submitted!"}</h4>
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
