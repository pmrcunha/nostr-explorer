import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
// Built in to Typescript 5.8, but not in Bun yet
import erasableSyntax from "eslint-plugin-erasable-syntax-only";
import security from "eslint-plugin-security";

export default defineConfig([
  {
    name: "base",
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "erasable-syntax",
    ...erasableSyntax.configs.recommended,
  },
  security.configs.recommended,
]);
