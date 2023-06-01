import React, { useContext } from "react";

export type ApiKeyContextDefinition = {
  API_KEY: string;
  API_URL: string;
  isValid: boolean;
  loading: boolean;
};

export const ApiKeyContext = React.createContext<ApiKeyContextDefinition>({} as ApiKeyContextDefinition);
export const useApiKey = (): ApiKeyContextDefinition => useContext(ApiKeyContext);
