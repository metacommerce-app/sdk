import { MintingEmbed, Network } from "@interfaces/MintingEmbed";
import React, { useContext } from "react";

export type EmbedContextDefinition = {
  embed: MintingEmbed;
  network: Network;
  chainId: number;
};

export const EmbedContext = React.createContext<EmbedContextDefinition>({} as EmbedContextDefinition);
export const useEmbed = (): EmbedContextDefinition => useContext(EmbedContext);
