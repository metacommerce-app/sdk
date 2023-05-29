import { defineConfig, Options } from "tsup";

const BASE_CONFIG: Options = {};

export default defineConfig({
  entry: ["./src/index.ts"],
  external: ["ethers", "react", "wagmi"],
  format: ["esm"],
  platform: "browser",
  sourcemap: true,
  target: "esnext",
  clean: true,
  dts: true,
  env: {
    NODE_ENV: "production",
  },
});
