import { useQuery } from "@tanstack/react-query";
import { useApiKey } from "../../../providers/useApiKey";
import { MintingEmbed, MintingEmbedDefinition } from "src/interfaces/MintingEmbed";

export const usePublicMintingEmbedById = (id: string) => {
  const { API_KEY } = useApiKey();

  return useQuery(
    ["minting", id],
    async () => {
      // TODO: implement API in the BE to fetch minting embed public data
      // logger.info(`Fetching minting embed for ${id}`);
      // logger.info(`${process.env.API_URL}/api/minting/${id}`);

      console.log(`Fetching minting embed for ${id}, with key ${API_KEY}`);

      const res = await fetch(`https://rest.dev.metacommerce.app/v1/minting/embed/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      });

      console.log(res);

      // const res = {
      //   ok: true,
      //   json: async () =>
      //     ({
      //       __typename: "MintingEmbedV2",
      //       updatedAt: "2023-05-18T12:34:18.832Z",
      //       createdAt: "2023-05-18T12:34:18.832Z",
      //       definition: {
      //         name: "hello world",
      //         description: "",
      //         contractAddress: "0x41be8df6b1f807497c748d71afb10149e5f074b3",
      //         color: "#0033FF",
      //         network: "EthereumGoerli",
      //       },
      //       owner: "a20cf6be-ef5d-4aba-b1b7-75dda817bc5e",
      //       id: "caf9274e-f9ff-4f3a-b9bc-2ae50fc993dd",
      //     } as any),
      // };

      if (!res.ok) {
        throw new Error("Failed to fetch minting embed");
      }

      const embed: MintingEmbed = await res.json();

      console.log(embed);

      return embed as MintingEmbed & { definition: MintingEmbedDefinition };
    },
    {
      enabled: Boolean(id),
    },
  );
};
