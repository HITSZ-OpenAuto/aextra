import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // Ignore files
  {
    ignores: ["public/scripts/*", "scripts/*", ".astro/", "src/env.d.ts"],
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },
]);
