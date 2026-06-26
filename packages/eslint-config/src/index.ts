// /packages/eslint-config/src/index.ts

import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

import coreConfig, { type MiddenConfigOptions } from "./core";

export { default as coreConfig } from "./core";
export type { MiddenConfigOptions, ImportPathGroup } from "./core";

export default function eslintConfig(options: MiddenConfigOptions = {}) {
  return tseslint.config(
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

    ...coreConfig(options),

    prettier,
  );
}
