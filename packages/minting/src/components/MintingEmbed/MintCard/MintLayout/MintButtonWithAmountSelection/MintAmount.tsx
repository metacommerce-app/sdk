import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import IconButton from "src/components/IconButton";
import Input from "src/components/Input";
import { useContract } from "src/components/MintingEmbed/providers/useContract";

interface MintAmountProps {
  amount: number;
  onChange: (amount: number) => void;
  isPaused: boolean;
}

const MintAmount: React.FC<MintAmountProps> = ({ amount, onChange, isPaused }) => {
  const { contractData, isLoading } = useContract();
  const { MAX_PER_WALLET: maxAmountPerWallet, MAX_PER_TX: maxAmountPerTx } = contractData;

  const maxAmount = Math.min(maxAmountPerWallet, maxAmountPerTx);

  const handleReduce = () => {
    let newAmount = amount - 1;

    if (amount <= 1) newAmount = 1;

    onChange(newAmount);
  };

  const handleIncrease = () => {
    let newAmount = amount + 1;

    if (amount >= maxAmount) newAmount = maxAmount;

    onChange(newAmount);
  };

  const handleChange = (e: any) => {
    let newAmount = parseInt(e.target.value as any, 10);

    if (Number.isNaN(newAmount)) return;
    if (newAmount >= maxAmount) newAmount = maxAmount;

    onChange(newAmount);
  };

  return (
    <div className="flex w-full items-center">
      <IconButton disabled={isLoading || amount <= 1 || isPaused} icon={<MinusOutlined />} onClick={handleReduce} />
      <div className="w-full rounded-lg p-2">
        <Input className="text-center" disabled={isPaused} type="number" value={amount} onChange={handleChange} />
      </div>
      <IconButton disabled={isLoading || amount >= maxAmount || isPaused} icon={<PlusOutlined />} onClick={handleIncrease} />
    </div>
  );
};

export default MintAmount;
