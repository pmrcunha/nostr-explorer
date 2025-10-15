import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import securityPlugin from 'eslint-plugin-security';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';
import erasableSyntax from 'eslint-plugin-erasable-syntax-only';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Security
  securityPlugin.configs.recommended,
  {
    files: ['src/**/*.ts'],
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    rules: {
      'func-style': ['warn', 'expression'],
      'no-restricted-syntax': ['off', 'ForOfStatement'],
      'no-console': ['error'],
      'prefer-template': 'error',
    },
  },
  // TypeScript Eslint
  ...tsPlugin.configs.recommended,
  {
    name: 'typescript-eslint-overwrites',
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    name: 'erasable-syntax',
    ...erasableSyntax.configs.recommended,
  },
  // Prettier
  {
    name: 'prettier',
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': [
        1,
        {
          endOfLine: 'lf',
          printWidth: 180,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
        },
      ],
    },
  },
  // Unicorn
  {
    name: 'unicorn',
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/empty-brace-spaces': 'off',
      'unicorn/no-null': 'off',
    },
  },
  pluginJs.configs.recommended,
];
