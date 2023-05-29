import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ClientIdProvider } from "./ClientIdProvider";
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
  CLIENT_ID: string;
};

/**
 * Wrap your app with this provider to enable Metacommerce features across your application.
 * @param CLIENT_ID Your Metacommerce Client ID (required)
 */
export const MetacommerceProvider = (props: MetacommerceProviderProps) => {
  const { children, CLIENT_ID } = props;

  return (
    <ClientIdProvider CLIENT_ID={CLIENT_ID}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClientIdProvider>
  );
};
