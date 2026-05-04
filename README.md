# midden

A collection of small, focused utility libraries for JavaScript and TypeScript applications.

## Packages

| Package                             | Version | Description                            |
| ----------------------------------- | ------- | -------------------------------------- |
| [`@midden/stamp`](./packages/stamp) | 0.1.0   | Temporal-based time stamping utilities |

## Monorepo Structure

```
midden/
├── packages/
│   └── stamp/        # @midden/stamp
├── package.json      # Workspace root
├── turbo.json        # Turborepo config
├── tsconfig.base.json
└── eslint.config.ts
```

## Development

This monorepo uses [pnpm](https://pnpm.io/) workspaces and [Turborepo](https://turbo.build/).

### Prerequisites

- Node.js 18+
- pnpm 10+

### Install dependencies

```bash
pnpm install
```

### Build all packages

```bash
pnpm run build
```

### Validate all packages (lint, format, test, typecheck)

```bash
pnpm run validate
```

## Adding a New Package

1. Create a new directory under `packages/`
2. Add a `package.json` with `"name": "@midden/<name>"`
3. Extend `../../tsconfig.base.json` in the package tsconfig
4. Import the root `eslint.config.ts` in the package eslint config

## Publishing

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
# Document a change
pnpm changeset

# Bump versions based on changesets
pnpm version

# Publish changed packages to npm
pnpm publish
```

## License

MIT
