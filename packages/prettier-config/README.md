# @midden/prettier-config

Shared [Prettier](https://prettier.io) configuration for Midden projects.

## Installation

```bash
pnpm add -D @midden/prettier-config prettier
```

## Usage

**`prettier.config.js`**

```js
import middenPrettier from "@midden/prettier-config";

export default middenPrettier;
```

With local overrides:

```js
import middenPrettier from "@midden/prettier-config";

export default {
  ...middenPrettier,
  vueIndentScriptAndStyle: false,
};
```

## Configuration

| Option           | Value      |
| ---------------- | ---------- |
| `printWidth`     | `80`       |
| `tabWidth`       | `2`        |
| `semi`           | `true`     |
| `singleQuote`    | `false`    |
| `trailingComma`  | `"all"`    |
| `bracketSpacing` | `true`     |
| `arrowParens`    | `"always"` |
| `endOfLine`      | `"lf"`     |

## Peer Dependencies

- `prettier >= 3.0.0`
