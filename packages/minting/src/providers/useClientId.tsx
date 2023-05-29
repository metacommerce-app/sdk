import { MintingEmbed, Network } from "@interfaces/MintingEmbed";
import React, { useContext } from "react";

export type ClientIdContextDefinition = {
  CLIENT_ID: string;
  isValid: boolean;
  loading: boolean;
};

export const ClientIdContext = React.createContext<ClientIdContextDefinition>({} as ClientIdContextDefinition);
export const useClientId = (): ClientIdContextDefinition => useContext(ClientIdContext);
