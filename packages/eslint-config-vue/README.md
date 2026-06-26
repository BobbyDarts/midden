# @midden/eslint-config-vue

Shared ESLint configuration for Vue projects.

Builds on `@midden/eslint-config` by adding Vue parsing, Vue rules, and a default `@/**` import alias.

## Installation

```bash
pnpm add -D @midden/eslint-config-vue @midden/eslint-config @vue/eslint-config-typescript eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-vue typescript-eslint
```

## Usage

**eslint.config.ts**

```ts
import middenVueConfig from "@midden/eslint-config-vue";

export default middenVueConfig();
```

### Custom Import Path Groups

Vue projects automatically treat `@/**` as an internal import.

Additional project-specific path groups can be supplied:

```ts
import middenVueConfig from "@midden/eslint-config-vue";

export default middenVueConfig({
  pathGroups: [
    {
      pattern: "@/components/ui/**",
      group: "external",
      position: "after",
    },
  ],
});
```

The resulting import order will include both:

- `@/components/ui/**`
- `@/**`

### Additional Local Overrides

```ts
import middenVueConfig from "@midden/eslint-config-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...middenVueConfig(),

  {
    ignores: ["src/components/ui/**"],
  },
);
```

## What's Included

- Everything from `@midden/eslint-config`
- Vue Single File Component parsing
- `eslint-plugin-vue` recommended flat configuration
- `@vue/eslint-config-typescript` integration
- Vue-specific rule customizations
- Automatic `@/**` import alias support
- Prettier integration

## Peer Dependencies

- `@vue/eslint-config-typescript >= 14.0.0`
- `eslint >= 10.0.0`
- `eslint-config-prettier >= 10.0.0`
- `eslint-plugin-import-x >= 4.0.0`
- `eslint-plugin-vue >= 9.0.0`
- `typescript-eslint >= 8.0.0`
