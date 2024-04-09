import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  clean: true,
});
