import tseslint from "typescript-eslint";

import rootConfig from "../../eslint.config.ts";

const tsconfigPath = "packages/stamp/tsconfig.eslint.json";

export default tseslint.config(
  ...rootConfig,

  {
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
    rules: {
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/core",
              from: "./src",
              except: ["./core"],
            },
            {
              target: "./src/convert",
              from: "./src",
              except: ["./core", "./convert"],
            },
            {
              target: "./src/compare",
              from: "./src",
              except: ["./core", "./convert", "./compare"],
            },
            {
              target: "./src/format",
              from: "./src",
              except: ["./core", "./convert", "./format"],
            },
            {
              target: "./src/period",
              from: "./src",
              except: ["./core", "./convert", "./compare", "./period"],
            },
            {
              target: "./src/stamp.ts",
              from: "./src",
              except: [
                "./core",
                "./convert",
                "./compare",
                "./format",
                "./period",
                "./types",
              ],
            },
            {
              target: "./src/index.ts",
              from: "./src",
              except: [
                "./stamp.ts",
                "./compare",
                "./convert",
                "./format",
                "./period",
                "./core",
              ],
            },
            {
              target: "./src/testing.ts",
              from: "./src",
              except: ["./core", "./test-utils"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{test,spec}.{ts,js}"],
    rules: {
      "import-x/no-restricted-paths": "off",
    },
  },
);
