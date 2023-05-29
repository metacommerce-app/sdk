import React, { useEffect, useMemo } from "react";
import { ClientIdContext, ClientIdContextDefinition } from "./useClientId";
import DisplayIf from "@components/conditionals/DIsplayIf";

export type ClientIdProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  CLIENT_ID: string;
};

export const ClientIdProvider = (props: ClientIdProviderProps) => {
  const { children, CLIENT_ID } = props;

  const [loading, setLoading] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  useEffect(() => {
    const checkClientId = async () => {
      setTimeout(async () => {
        try {
          setLoading(true);

          // const response = await fetch(`https://api.opensea.io/api/v1/asset_contract/${CLIENT_ID}`);
          // TODO: replace with real check
          const response = {
            ok: true,
            json: async () => ({ isValid: true }),
          };

          if (!response.ok) {
            throw new Error("Could not fetch client id");
          }

          const data: { isValid: boolean } = await response.json();

          if (!data.isValid) {
            throw new Error("Client id is not valid");
          }

          setIsValid(true);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    checkClientId();
  }, []);

  const wrapper: ClientIdContextDefinition = useMemo(
    () => ({
      CLIENT_ID,
      loading,
      isValid,
    }),
    [CLIENT_ID, loading, isValid],
  );

  return <ClientIdContext.Provider value={wrapper}>{children}</ClientIdContext.Provider>;
};
