import { BigNumberish } from "ethers";

export interface MintingEmbedDefinition {
  name: string;
  description: string;
  color: string;
  contractAddress: `0x${string}`;
  network: Network;
}

export type ContractAddress = `0x${string}`;

export type ContractData = {
  totalSupply: number;
  amountToMint: number;
  name: string;
  whitelistActive: boolean;
  revealed: boolean;
  priceInWei: bigint; // mintPrice
  priceWhitelist: bigint;
  paused: boolean;
  MAX_SUPPLY: number; // maxSupply
  MAX_PER_TX: number; // maxAmountPerTx
  MAX_PER_WALLET: number; // maxAmount to mint
  MAX_WHITELIST: number; // maxWhitelist
  merkleRoot: string;
  balanceOf: number;
};

export type WalletAddress = `0x${string}`;

export enum Network {
  EthereumMainnet = "EthereumMainnet",
  EthereumGoerli = "EthereumGoerli",
  Polygon = "Polygon",
  EthereumSepolia = "EthereumSepolia",
}

export type MintingEmbed = {
  id: string;
  definition: MintingEmbedDefinition;
  workspaceId?: string | null;
  owner?: string | null;
  groups?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type WalletProof = {
  walletAddress: string;
  proof: string[];
  allowance: number;
};
