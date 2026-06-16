import js from "@eslint/js";
import importPlugin from "eslint-plugin-import-x";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,js}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      "import-x": importPlugin,
    },

    settings: {
      "import-x/resolver": {
        typescript: {
          projectService: true,
        },
      },
    },

    rules: {
      "import-x/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import-x/no-unresolved": "error",
      "import-x/no-duplicates": "error",
      "import-x/no-useless-path-segments": ["warn", { noUselessIndex: true }],
      "import-x/no-extraneous-dependencies": [
        "error",
        { devDependencies: true },
      ],

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "prefer-const": "error",
      "no-unused-expressions": "error",
    },
  },

  // Test files (Vitest)
  {
    files: ["**/*.{test,spec}.{ts,js}"],
    languageOptions: {
      globals: {
        ...globals.node,
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
      },
    },
    rules: {
      "import-x/no-restricted-paths": "off",
    },
  },

  // Prettier
  prettier,
);
