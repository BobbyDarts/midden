// /packages/eslint-config/tsup.config.ts

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/core.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: [
    "eslint-import-resolver-typescript",
    "typescript-eslint",
    "eslint-plugin-import-x",
  ],
  splitting: false,
  treeshake: false,
});
