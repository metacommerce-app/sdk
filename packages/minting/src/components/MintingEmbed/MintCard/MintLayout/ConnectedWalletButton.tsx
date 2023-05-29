import React from "react";
import { CheckCircleTwoTone, LogoutOutlined } from "@ant-design/icons";
import { useWallet } from "../../../../providers/useWallet";
import IconButton from "@components/IconButton";

const ConnectedWalletButton: React.FC = () => {
  const { address, disconnectWallet } = useWallet();

  const handleDisconnect = async () => {
    await disconnectWallet();
  };

  return (
    <div className="flex h-full items-center rounded-lg border px-4 py-1">
      <div className="flex w-full flex-row items-center justify-between gap-2 py-0 py-2">
        <div className="flex w-[75%] flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <p className="text-md truncate">{address}</p>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </div>
        </div>
        <div>
          <IconButton
            tooltip="Disconnect"
            icon={<LogoutOutlined />}
            className="float-right inline-block w-full rounded p-1 text-center"
            onClick={handleDisconnect}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectedWalletButton;
