import grafanaConfig from '@grafana/eslint-config/flat.js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import sortPlugin from 'eslint-plugin-sort';
import jestPlugin from 'eslint-plugin-jest';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import deprecationPlugin from 'eslint-plugin-deprecation';

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
  ...tanstackQueryPlugin.configs['flat/recommended'],

  // Sort plugin recommended config
  {
    plugins: {
      sort: sortPlugin,
    },
    rules: {
      ...sortPlugin.configs.recommended.rules,
    },
  },

  // Main DBFE config
  {
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      sort: sortPlugin,
      jest: jestPlugin,
      '@tanstack/query': tanstackQueryPlugin,
    },
    rules: {
      'react/prop-types': 'off',
      'jsx-a11y/no-autofocus': 'off',
      // BEG: import sorting
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off',
      'sort/imports': [
        'error',
        {
          groups: [
            { type: 'side-effect', order: 20 },
            { regex: '^@grafana', order: 30 },
            { regex: '^react$', order: 10 },
            { type: 'dependency', order: 15 },
            { regex: '^.+\\.s?css$', order: 50 },
            { type: 'other', order: 40 },
          ],
          separator: '\n',
        },
      ],
      'sort/type-properties': 'error',
      'sort/string-enums': 'error',
      'sort/string-unions': 'error',
      'sort/exports': 'off',
      // END: import sorting
    },
  },

  // TypeScript files with deprecation warnings
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      deprecation: deprecationPlugin,
    },
    rules: {
      'deprecation/deprecation': 'warn',
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // Jest test files
  {
    files: ['*.test.tsx', '*.test.ts'],
    ...jestPlugin.configs['flat/recommended'],
  },
];
