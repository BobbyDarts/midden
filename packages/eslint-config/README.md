# @midden/eslint-config

Shared ESLint configuration for Midden projects.

Provides two exports:

- **Default** — full ESLint configuration for Node.js and TypeScript projects.
- **`coreConfig`** — rules only (no parser setup), intended for framework-specific packages such as `@midden/eslint-config-vue`.

## Installation

```bash
pnpm add -D @midden/eslint-config @eslint/js eslint eslint-config-prettier eslint-plugin-import-x globals typescript-eslint
```

## Usage

**eslint.config.ts**

```ts
import middenConfig from "@midden/eslint-config";

export default middenConfig();
```

### Custom Import Path Groups

Projects can extend the default import ordering with additional path groups.

```ts
import middenConfig from "@midden/eslint-config";

export default middenConfig({
  pathGroups: [
    {
      pattern: "#/**",
      group: "internal",
    },
  ],
});
```

### Additional Local Overrides

Since the config returns a flat config array, you can append additional configuration as usual.

```ts
import middenConfig from "@midden/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...middenConfig(),

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
);
```

## Core Export

Framework-specific packages can reuse the shared rules without the parser configuration.

```ts
import { coreConfig } from "@midden/eslint-config";
```

## Peer Dependencies

- `@eslint/js >= 10.0.0`
- `eslint >= 10.0.0`
- `eslint-config-prettier >= 10.0.0`
- `eslint-plugin-import-x >= 4.0.0`
- `globals >= 17.0.0`
- `typescript-eslint >= 8.0.0`
