# @midden/oxlint-config

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter.html) configuration for Midden projects.

## Installation

```bash
pnpm add -D @midden/oxlint-config oxlint
```

## Usage

In your app's `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@midden/oxlint-config/index.json"],
  "ignorePatterns": ["src/components/ui/**"]
}
```

App-specific `ignorePatterns` stay in the consuming app.

## Configuration

| Option                   | Value                                                     |
| ------------------------ | --------------------------------------------------------- |
| `plugins`                | `eslint`, `typescript`, `unicorn`, `oxc`, `vue`, `vitest` |
| `env.browser`            | `true`                                                    |
| `categories.correctness` | `error`                                                   |

## Peer Dependencies

- `oxlint >= 0.16.0`
