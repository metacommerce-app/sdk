import { useQuery } from "@tanstack/react-query";
import { WalletProof } from "src/interfaces/MintingEmbed";
import { useApiKey } from "src/providers/useApiKey";
import logger from "src/services/logger";

export const useAccessListQueries = (id: string, address: string) => {
  const { API_URL, API_KEY } = useApiKey();

  return useQuery(["mint", address, "proofs"], async () => {
    try {
      const response = await fetch(`${API_URL}/minting/accesslist?id=${id}&address=${address} `, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const proofs: WalletProof = await response.json();

      return proofs;
    } catch (err) {
      const e = err as Error;
      logger.error(e, e.message);
      throw e;
    }
  });
};
