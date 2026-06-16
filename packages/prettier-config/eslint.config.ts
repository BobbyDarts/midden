import tseslint from "typescript-eslint";

import rootConfig from "../../eslint.config.ts";

export default tseslint.config(...rootConfig, {
  files: ["**/*.js"],
  languageOptions: {
    parserOptions: {
      project: false,
    },
  },
});
