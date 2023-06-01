import { disconnect, getAccount, watchAccount, watchNetwork } from "@wagmi/core";
import React, { useEffect, useMemo, useState } from "react";
import { WalletContext, WalletContextDefinition } from "./useWallet";
import { WalletAddress } from "src/interfaces/MintingEmbed";

export type WalletProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const WalletProvider = (props: WalletProviderProps) => {
  const { children } = props;

  watchNetwork((network) => {
    setChainId(network.chain?.id);
  });

  watchAccount((account) => {
    setAddress(account?.address);
  });

  const [address, setAddress] = useState<WalletAddress>();
  const [chainId, setChainId] = useState<number>();

  const handleConnect = (input: { address?: WalletAddress; chainId?: number }) => {
    if (input.address) setAddress(input.address);
    if (input.chainId) setChainId(input.chainId);
  };

  const handleDisconnect = async () => {
    await disconnect();
    setAddress(undefined);
    setChainId(undefined);
  };

  // /**
  //  * Check if connected
  //  */
  useEffect(() => {
    const getAddress = async () => {
      const account = getAccount();
      setAddress(account?.address);

      const chain = await account?.connector?.getChainId();
      setChainId(chain);
    };
    getAddress();
  }, []);

  const wrapper: WalletContextDefinition = useMemo(
    () => ({
      isConnected: !!address && !!chainId,
      address,
      chainId,
      connectWallet: handleConnect,
      disconnectWallet: handleDisconnect,
    }),
    [address, chainId],
  );

  return <WalletContext.Provider value={wrapper}>{children}</WalletContext.Provider>;
};
