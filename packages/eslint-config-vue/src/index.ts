// /packages/eslint-config-vue/src/index.ts

import coreConfig from "@midden/eslint-config/core";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import skipFormatting from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import-x";
import pluginVue from "eslint-plugin-vue";

export default defineConfigWithVueTs(
  {
    name: "midden-vue/files",
    files: ["**/*.{vue,ts,mts,tsx,js}"],
  },

  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },

  ...pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,

  // Core Midden rules (TypeScript, import ordering, etc.)
  ...coreConfig,

  // Import ordering with Vue path group support
  {
    plugins: {
      "import-x": importPlugin,
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
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // Vue-specific rules
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-side-effects-in-computed-properties": "error",
      "vue/require-v-for-key": "error",
      "vue/block-order": ["warn", { order: ["script", "template", "style"] }],
      "vue/no-setup-props-destructure": "off",
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineProps", "defineEmits", "defineSlots", "defineExpose"],
        },
      ],
      "vue/no-undef-components": [
        "error",
        {
          ignorePatterns: ["RouterView", "router-view"],
        },
      ],
      "vue/require-macro-variable-name": "error",
    },
  },

  skipFormatting,
) as ReturnType<typeof defineConfigWithVueTs>;
