import React from "react";
import Button from "src/components/Button";

const DisabledMintButton: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-1">
      <Button disabled>Mint</Button>
      <p className="truncate text-center text-red-500">Please come back later, minting has not started.</p>
    </div>
  );
};

export default DisabledMintButton;
