import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "**/__tests__/**",
      "**/test/**",
      "**/*.test.*",
      "scripts/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "sonarjs/todo-tag": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Code Smell Detection Rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "no-unused-vars": "off", // Handled by TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Complexity Rules
      complexity: ["warn", 10],
      // "max-lines-per-function": [
      //   "warn",
      //   { max: 60, skipBlankLines: true, skipComments: true },
      // ],
      "max-depth": ["warn", 4],
      "max-nested-callbacks": ["warn", 3],
      "max-params": ["warn", 4],
      "max-statements": ["warn", 15],

      // Code Quality Rules (SonarJS)
      "sonarjs/cognitive-complexity": ["warn", 15],
      "sonarjs/no-duplicate-string": ["warn", { threshold: 3 }],
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-collapsible-if": "warn",
      "sonarjs/prefer-immediate-return": "warn",
      "sonarjs/prefer-single-boolean-return": "warn",
      "sonarjs/no-redundant-boolean": "warn",
      "sonarjs/no-useless-catch": "warn",
      "sonarjs/no-small-switch": "warn",
      "sonarjs/prefer-object-literal": "warn",

      // Best Practices
      eqeqeq: ["error", "always"],
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1, -1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],
      "no-nested-ternary": "warn",
      "no-return-await": "warn",
      "require-await": "warn",
      "no-empty-function": "warn",
      "no-lone-blocks": "warn",
      "no-multi-assign": "warn",
      "no-param-reassign": ["warn", { props: true }],
      "prefer-template": "warn",
      "prefer-arrow-callback": "warn",
      "prefer-destructuring": ["warn", { array: false, object: true }],

      // React Specific Code Smells
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      // "@typescript-eslint/no-floating-promises": "warn", // Disabled - requires type checking
    },
  }
);
