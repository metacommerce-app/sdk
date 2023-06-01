import MintCard from "src/components/MintingEmbed/MintCard";
import { usePublicMintingEmbedById } from "src/components/MintingEmbed/hooks/useMintingEmbed";
import { ContractProvider } from "src/components/MintingEmbed/providers/ContractProvider";
import { EmbedProvider } from "src/components/MintingEmbed/providers/EmbedProvider";
import DisplayIf from "src/components/conditionals/DIsplayIf";
import DisplayIfApiKeyValid from "src/components/conditionals/DisplayIfApiKeyValid";
import { WalletProvider } from "src/providers/WalletProvider";

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
    // API_KEY?: string;

    /**
     * The Metacommerce API URL (defaults to https://api.metacommerce.app)
     * @optional
     */
    // API_URL?: string;
  };
}

/**
 * The MintingEmbed component is the main component for the Metacommerce Minting Embed.
 * It handles the logic for connecting to the Metamask wallet, switching networks, and minting NFTs.
 * @requires MetacommerceProvider
 */
const MintingEmbed: React.FC<MintingEmbedProps> = ({ config }) => {
  const { isLoading, data: embed } = usePublicMintingEmbedById(config.embedId);

  if (isLoading) return <div className="h-24 animate-pulse bg-gray-200" />;

  if (!embed) return <div className="rounded-lg border border-red-500 p-3 text-red-500">Embed not found</div>;

  const { definition } = embed;
  const { network, contractAddress } = definition;

  return (
    <DisplayIfApiKeyValid>
      <DisplayIf condition={() => !isLoading}>
        <WalletProvider>
          <EmbedProvider embed={embed}>
            <ContractProvider contractAddress={contractAddress} network={network}>
              <MintCard />
            </ContractProvider>
          </EmbedProvider>
        </WalletProvider>
      </DisplayIf>
    </DisplayIfApiKeyValid>
  );
};

export default MintingEmbed;
