# @midden/eslint-config-vue

Shared Vue ESLint configuration for Midden projects. Extends `@midden/eslint-config/core` with Vue-specific rules and parser setup.

## Installation

```bash
pnpm add -D @midden/eslint-config-vue @midden/eslint-config @vue/eslint-config-typescript eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-vue typescript-eslint
```

## Usage

**`eslint.config.ts`**

```ts
import middenVueConfig from "@midden/eslint-config-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(...middenVueConfig);
```

With local overrides:

```ts
import middenVueConfig from "@midden/eslint-config-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(...middenVueConfig, {
  ignores: ["src/components/ui/**"],
});
```

## What's Included

- All rules from `@midden/eslint-config/core`
- Vue SFC parsing via `vue-eslint-parser`
- `eslint-plugin-vue` flat/recommended rules
- `@vue/eslint-config-typescript` integration
- Vue-specific rule overrides (`block-order`, `define-macros-order`, `no-undef-components`, etc.)
- Import ordering with `@/**` path group support
- Prettier integration via `eslint-config-prettier`

## Peer Dependencies

- `@vue/eslint-config-typescript >= 14.0.0`
- `eslint >= 10.0.0`
- `eslint-config-prettier >= 10.0.0`
- `eslint-plugin-import-x >= 4.0.0`
- `eslint-plugin-vue >= 9.0.0`
- `typescript-eslint >= 8.0.0`
