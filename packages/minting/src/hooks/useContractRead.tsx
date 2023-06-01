import { readContract as wReadContract } from "@wagmi/core";
import { StudioProxyTemplate } from "../lib/StudioProxyTemplate";

export const contractReads = async (contract: `0x${string}`, functionNames: string[]) => {
  const contractData: unknown[] = [];

  await Promise.all(
    functionNames.map(async (functionName) => {
      let data = await wReadContract({
        address: contract as `0x${string}`,
        abi: StudioProxyTemplate,
        functionName: functionName,
        args: [],
      });

      if (typeof data === "bigint") {
        data = Number(data.toString());
      }

      contractData.push(data);
    }),
  );

  return contractData;
};

export const contractRead = async (contract: `0x${string}`, functionName: string, args?: unknown[]) => {
  return wReadContract({
    address: contract as `0x${string}`,
    abi: StudioProxyTemplate,
    functionName: functionName,
    args: args || [],
  });
};
