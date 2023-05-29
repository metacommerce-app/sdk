import { MintingEmbed, MintingEmbedDefinition } from "@interfaces/MintingEmbed";
import { useQuery } from "@tanstack/react-query";

export const usePublicMintingEmbedById = (id: string) => {
  return useQuery(
    ["minting", id],
    async () => {
      // TODO: implement API in the BE to fetch minting embed public data
      // logger.info(`Fetching minting embed for ${id}`);
      // logger.info(`${process.env.API_URL}/api/minting/${id}`);
      // const res = await fetch(`${process.env.API_URL}/api/minting/${id}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // });

      const res = {
        ok: true,
        json: async () =>
          ({
            __typename: "MintingEmbedV2",
            updatedAt: "2023-05-18T12:34:18.832Z",
            createdAt: "2023-05-18T12:34:18.832Z",
            definition: {
              name: "hello world",
              description: "",
              contractAddress: "0x41be8df6b1f807497c748d71afb10149e5f074b3",
              color: "#0033FF",
              network: "EthereumGoerli",
            },
            owner: "a20cf6be-ef5d-4aba-b1b7-75dda817bc5e",
            id: "caf9274e-f9ff-4f3a-b9bc-2ae50fc993dd",
          } as any),
      };

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
