import logger from "@services/logger";

export const calculateAmountToMint = (priceInWei: bigint | number, amountToMint: number) => {
  if (!priceInWei) {
    return BigInt(0);
  }

  // enforce bigint conversion for safety
  const amountBig = BigInt(amountToMint.toString());
  const priceBig = BigInt(priceInWei.toString());

  const totalBig = priceBig * amountBig;

  return totalBig;
};
