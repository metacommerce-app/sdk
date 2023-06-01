import React, { useState } from "react";
import { connect, switchNetwork } from "@wagmi/core";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { useWallet } from "../providers/useWallet";
import Button from "src/components/Button";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import logger from "src/services/logger";
import { extractErrorMessage } from "src/utils/chain.utils";

interface ConnectWalletButtonProps {
  targetChainId?: number;
  className?: string;
}

/**
 * ConnectWalletButton component is responsible for connecting the user's wallet to the application.
 * it also handles the logic for switching between chains using
 * @param targetChainId (optional) the chainId to switch to
 * @requires WalletProvider
 */
const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ targetChainId, className }) => {
  const { connectWallet: onConnect, isConnected, chainId } = useWallet();

  const needsSwitch = isConnected && targetChainId && chainId !== targetChainId;

  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async () => {
    try {
      setErrorMsg("");

      const result = await connect({
        chainId: targetChainId,
        connector: new InjectedConnector(),
      });

      if (!result) return;

      onConnect({ address: result.account, chainId: result.chain.id });
    } catch (error) {
      const err = error as Error;
      const msg = extractErrorMessage(err.message);

      setErrorMsg(msg);
      logger.error(err);
    }
  };

  const handleSwitch = async () => {
    const result = await switchNetwork({
      chainId: targetChainId as number,
    });

    if (!result) return;

    onConnect({ chainId: result.id });
  };

  if (needsSwitch) {
    return (
      <Button type="primary" className={`w-full ${className}`} onClick={handleSwitch}>
        Switch Network
      </Button>
    );
  }

  return (
    <>
      <Button type="primary" className={`w-full ${className}`} onClick={handleClick}>
        Connect Wallet
      </Button>
      <DisplayIf condition={() => !!errorMsg}>
        <p className="truncate text-center text-red-500">{errorMsg}</p>
      </DisplayIf>
    </>
  );
};

export default ConnectWalletButton;
