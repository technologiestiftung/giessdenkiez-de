import globals from "globals";
import tsbConfig from "@technologiestiftung/eslint-config";
import { plugin as tsbPlugin } from "@technologiestiftung/eslint-plugin";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";

// eslint-disable-next-line @technologiestiftung/no-default-export
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
				...globals.node,
			},
		},
		rules: {
			"@technologiestiftung/no-default-export": "error",
		},
		plugins: { "@technologiestiftung": tsbPlugin },
	},
];
