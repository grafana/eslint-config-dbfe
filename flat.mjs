import grafanaRootConfig from "@grafana/eslint-config";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import sortPlugin from "eslint-plugin-sort";
import jestPlugin from "eslint-plugin-jest";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";

// @grafana/eslint-config v10 exports its flat config from the package root.
// v9 exports a legacy config there and the flat config from flat.js, which
// v10 no longer has, so flat.js can only be loaded on demand.
const grafanaConfig = Array.isArray(grafanaRootConfig)
  ? grafanaRootConfig
  : (await import("@grafana/eslint-config/flat.js")).default;

// Note: eslint-plugin-deprecation is intentionally excluded from the flat config.
// It bundles an older @typescript-eslint/utils that references LegacyESLint (removed in ESLint 10).
// Use @typescript-eslint/no-deprecated (available in @typescript-eslint v7+) directly in your eslint.config.mjs instead.

export default [
  // Spread Grafana's base config
  ...grafanaConfig,

  // Import plugin configs
  importPlugin.flatConfigs.errors,
  importPlugin.flatConfigs.warnings,
  importPlugin.flatConfigs.typescript,

  // JSX a11y strict config
  jsxA11y.flatConfigs.strict,

  // TanStack Query recommended config
  ...tanstackQueryPlugin.configs["flat/recommended"],

  // Main DBFE config with custom rules
  {
    plugins: {
      sort: sortPlugin,
      jest: jestPlugin,
    },
    rules: {
      // Sort plugin recommended rules
      ...sortPlugin.configs.recommended.rules,
      // Custom rules
      "react/prop-types": "off",
      "jsx-a11y/no-autofocus": "off",
      // BEG: import sorting
      "import/no-duplicates": "error",
      "import/no-unresolved": "off",
      "sort/imports": [
        "error",
        {
          groups: [
            { type: "side-effect", order: 20 },
            { regex: "^@grafana", order: 30 },
            { regex: "^react$", order: 10 },
            { type: "dependency", order: 15 },
            { regex: "^.+\\.s?css$", order: 50 },
            { type: "other", order: 40 },
          ],
          separator: "\n",
        },
      ],
      "sort/type-properties": "error",
      "sort/string-enums": "error",
      "sort/string-unions": "error",
      "sort/exports": "off",
      // END: import sorting
    },
  },

  // Jest test files
  {
    files: ["*.test.tsx", "*.test.ts"],
    ...jestPlugin.configs["flat/recommended"],
  },
];
