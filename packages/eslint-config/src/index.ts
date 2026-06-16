// /packages/eslint-config/src/index.ts

import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

import coreConfig from "./core.js";

export { default as coreConfig } from "./core.js";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.node,
      },
    },
  },

  ...coreConfig,

  prettier,
);
