import React from "react";
import { useWallet } from "../../providers/useWallet";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import ConnectWalletButton from "src/components/ConnectWalletButton";

type Props = {
  targetChainId?: number;
  children?: React.ReactNode | React.ReactNode[];
};

/**
 * DisplayIfWalletConnected checks if the user is connected to a wallet.
 * If they are, it will display the children. If not, it will display a button to connect.
 * @param targetChainId (optional) the chainId to switch to
 * @requires WalletProvider
 */
const DisplayIfWalletConnected: React.FC<Props> = ({ children, targetChainId }) => {
  const { isConnected, chainId } = useWallet();

  const condition = () => {
    if (!targetChainId) return isConnected;
    return isConnected && chainId === targetChainId;
  };

  return (
    <DisplayIf condition={condition} falsy={<ConnectWalletButton className="min-w-[350px]" targetChainId={targetChainId} />}>
      {children}
    </DisplayIf>
  );
};

export default DisplayIfWalletConnected;
