import globals from "globals";
import tsbConfig from "@technologiestiftung/eslint-config";
import { plugin as tsbPlugin } from "@technologiestiftung/eslint-plugin";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";

export default [
  ...tsbConfig,
  reactRecommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "@technologiestiftung/no-default-export": "error",
    },
    plugins: { "@technologiestiftung": tsbPlugin },
  },
];
