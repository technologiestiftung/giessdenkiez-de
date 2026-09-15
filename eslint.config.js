import globals from "globals";
import technologiestiftung from "@technologiestiftung/eslint-config";

export default [
	...technologiestiftung,
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
	},
];
