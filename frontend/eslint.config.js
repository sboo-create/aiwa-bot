/* Минимальный гейт для исходников Mini App.
   Главное правило — no-undef: именно ссылка на несуществующую переменную
   (`menuMissing` после переименования) уронила экран «Питание» в проде,
   а тесты бандла этого не видели. */
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "no-undef": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-dupe-keys": "error",
      "no-unreachable": "error",
    },
  },
];
