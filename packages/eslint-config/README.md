# @midden/eslint-config

Shared ESLint configuration for Midden projects.

Provides two exports:

- **Default** — full config for Node.js and non-Vue TypeScript projects
- **`/core`** — rules only, no parser setup, for use in framework-specific configs like `@midden/eslint-config-vue`

## Installation

```bash
pnpm add -D @midden/eslint-config @eslint/js eslint eslint-config-prettier eslint-plugin-import-x globals typescript-eslint
```

## Usage

**`eslint.config.ts`**

```ts
import middenConfig from "@midden/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(...middenConfig);
```

With local overrides:

```ts
import middenConfig from "@midden/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(...middenConfig, {
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
  },
});
```

## Core Export

For framework-specific configs that handle their own parser setup:

```ts
import { coreConfig } from "@midden/eslint-config/core";
```

## Peer Dependencies

- `@eslint/js >= 10.0.0`
- `eslint >= 10.0.0`
- `eslint-config-prettier >= 10.0.0`
- `eslint-plugin-import-x >= 4.0.0`
- `globals >= 17.0.0`
- `typescript-eslint >= 8.0.0`
