import React, { useEffect, useMemo } from "react";
import { ApiKeyContext, ApiKeyContextDefinition } from "./useApiKey";
import logger from "src/services/logger";
import { defaultApiUrl } from "src/utils/CONSTANTS";

export type ApiKeyProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  API_KEY: string;
  API_URL?: string;
};

export const ApiKeyProvider = (props: ApiKeyProviderProps) => {
  const { children, API_KEY, API_URL } = props;

  const [loading, setLoading] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        setLoading(true);

        console.log("Checking API key", { API_KEY });

        logger.debug(`Checking API key: ${API_KEY}`);

        const response = await fetch(`https://rest.dev.metacommerce.app/v1/me`, {
          method: "GET",
          mode: "cors",
          // credentials: "include",
          headers: {
            "Content-type": "application/json",
            "x-api-key": API_KEY,
          },
        });

        logger.debug(`API key check response: ${response.status}`);

        if (!response.ok) {
          throw new Error("Could not validate API key");
        }

        if (response.status !== 200) {
          throw new Error("API key is not valid");
        }

        logger.debug(`API key is valid`);

        setIsValid(true);
      } catch (e) {
        logger.error(e);
        console.log(`API key is not valid, error occurred`);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkApiKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrapper: ApiKeyContextDefinition = useMemo(
    () => ({
      API_KEY,
      API_URL: API_URL || defaultApiUrl,
      loading,
      isValid,
    }),
    [API_KEY, API_URL, loading, isValid],
  );

  return <ApiKeyContext.Provider value={wrapper}>{children}</ApiKeyContext.Provider>;
};
