import MintCard from "@components/MintingEmbed/MintCard";
import { usePublicMintingEmbedById } from "@components/MintingEmbed/hooks/useMintingEmbed";
import { ContractProvider } from "@components/MintingEmbed/providers/ContractProvider";
import { EmbedProvider } from "@components/MintingEmbed/providers/EmbedProvider";
import DisplayIf from "@components/conditionals/DIsplayIf";
import DisplayIfWalletConnected from "@components/conditionals/DisplayIfWalletConnected";
import { networkToChainId } from "@utils/chain.utils";
import React from "react";
import { WalletProvider } from "../../providers/WalletProvider";
import DisplayIfClientIdValid from "@components/conditionals/DisplayIfClientIdValid";

export interface MintingEmbedProps {
  config: {
    /**
     * Your Metacommerce Minting Embed ID
     * @required
     * @example "abc-123-xyz-456"
     * @see https://engage.metacommerce.app/marketing/minting/manage
     */
    embedId: string;

    /**
     * Your Metacommerce API Key
     * @note This is only required if you are NOT using the MetacommerceProvider
     *
     */
    API_KEY?: string;

    /**
     * The Metacommerce API URL (defaults to https://api.metacommerce.app)
     * @optional
     */
    API_URL?: string;
  };
}

/**
 * The MintingEmbed component is the main component for the Metacommerce Minting Embed.
 * It handles the logic for connecting to the Metamask wallet, switching networks, and minting NFTs.
 * @requires MetacommerceProvider
 */
const MintingEmbed: React.FC<MintingEmbedProps> = ({ config }) => {
  const { isLoading, data: embed } = usePublicMintingEmbedById(config.embedId);

  if (isLoading) return <div>Loading...</div>;

  if (!embed) return <div>Embed not found</div>;

  const { definition } = embed;
  const { network, contractAddress } = definition;

  return (
    <DisplayIfClientIdValid>
      <DisplayIf condition={() => !isLoading}>
        <WalletProvider>
          <DisplayIfWalletConnected targetChainId={networkToChainId[network]}>
            <EmbedProvider embed={embed}>
              <ContractProvider contractAddress={contractAddress} network={network}>
                <MintCard />
              </ContractProvider>
            </EmbedProvider>
          </DisplayIfWalletConnected>
        </WalletProvider>
      </DisplayIf>
    </DisplayIfClientIdValid>
  );
};

export default MintingEmbed;
