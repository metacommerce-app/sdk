import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ApiKeyProvider } from "./ApiKeyProvider";
import { QueryClient } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export type MetacommerceProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  config: {
    /**
     * Your Metacommerce Restrcited API Key
     * @required
     */
    API_KEY: string;

    /**
     * The Metacommerce API URL (defaults to https://api.metacommerce.app)
     * @optional
     */
    API_URL?: string;
  };
};

/**
 * Wrap your app with this provider to enable Metacommerce features across your application.
 * @param config configuration object for the MetacommerceProvider
 */
export const MetacommerceProvider = (props: MetacommerceProviderProps) => {
  const { children, config } = props;
  const { API_KEY, API_URL } = config;

  return (
    <ApiKeyProvider API_KEY={API_KEY} API_URL={API_URL}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiKeyProvider>
  );
};
