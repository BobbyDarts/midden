# @midden/tsconfig

Shared TypeScript configurations for Midden projects.

## Installation

```bash
pnpm add -D @midden/tsconfig typescript
```

## Presets

### `@midden/tsconfig/base`

Core compiler options shared across all environments. Use as the foundation for custom configs.

### `@midden/tsconfig/app`

Extends `base` with DOM lib, Vue-compatible settings, and `allowImportingTsExtensions`. For use in browser/Vue app source files.

### `@midden/tsconfig/node`

Extends `base` with Node.js types and `module: preserve`. For use in config files, scripts, and server-side code.

## Usage

**`tsconfig.app.json`**

```jsonc
{
  "extends": "@midden/tsconfig/app",
  "include": ["src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "composite": true,
    "paths": { "@/*": ["./src/*"] },
  },
}
```

**`tsconfig.node.json`**

```jsonc
{
  "extends": "@midden/tsconfig/node",
  "include": ["vite.config.*", "eslint.config.*"],
}
```

## Peer Dependencies

- `typescript >= 6.0.0`
