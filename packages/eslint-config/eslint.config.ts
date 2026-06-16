// /packages/eslint-config/eslint.config.ts

import tseslint from "typescript-eslint";

import rootConfig from "../../eslint.config.ts";

const tsconfigPath = "packages/eslint-config/tsconfig.eslint.json";

export default tseslint.config(...rootConfig, {
  files: ["**/*.{ts,js}"],
  languageOptions: {
    parserOptions: {
      projectService: false,
      project: tsconfigPath,
    },
  },
  settings: {
    "import-x/resolver": {
      typescript: {
        project: tsconfigPath,
      },
    },
  },
});
