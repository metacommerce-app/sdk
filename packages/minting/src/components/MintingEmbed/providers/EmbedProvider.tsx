import React, { useMemo } from "react";
import { EmbedContext, EmbedContextDefinition } from "./useEmbed";
import { MintingEmbed } from "src/interfaces/MintingEmbed";
import { networkToChainId } from "src/utils/chain.utils";

export type EmbedProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  embed: MintingEmbed;
};

export const EmbedProvider = (props: EmbedProviderProps) => {
  const { children, embed } = props;

  const wrapper: EmbedContextDefinition = useMemo(
    () => ({
      embed,
      network: embed.definition.network,
      chainId: networkToChainId[embed.definition.network],
    }),
    [embed],
  );

  return <EmbedContext.Provider value={wrapper}>{children}</EmbedContext.Provider>;
};
