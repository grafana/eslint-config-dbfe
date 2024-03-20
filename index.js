"use strict";

module.exports = {
  extends: [
    "@grafana/eslint-config",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/strict",
    "plugin:sort/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  overrides: [
    {
      plugins: ["deprecation"],
      files: ["src/**/*.{ts,tsx}"],
      rules: {
        "deprecation/deprecation": "warn",
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    {
      files: ["*.test.tsx"],
      env: {
        jest: true,
      },
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
    },
  ],
  plugins: ["import", "jsx-a11y", "sort", "jest", "@tanstack/query"],
  rules: {
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
};
