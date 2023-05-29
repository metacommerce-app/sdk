import Button from "@components/Button";
import React from "react";

const DisabledMintButton: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      <Button disabled>Mint</Button>
      <p className="w-[500px] text-center text-red-500">Please come back later, minting has not started.</p>
    </div>
  );
};

export default DisabledMintButton;
