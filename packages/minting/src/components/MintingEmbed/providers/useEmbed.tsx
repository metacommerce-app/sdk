import React, { useContext } from "react";
import { MintingEmbed, Network } from "src/interfaces/MintingEmbed";

export type EmbedContextDefinition = {
  embed: MintingEmbed;
  network: Network;
  chainId: number;
};

export const EmbedContext = React.createContext<EmbedContextDefinition>({} as EmbedContextDefinition);
export const useEmbed = (): EmbedContextDefinition => useContext(EmbedContext);
