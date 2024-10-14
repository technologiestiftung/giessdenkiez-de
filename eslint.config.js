import globals from "globals";
import technologiestiftung from "@technologiestiftung/eslint-config";
import react from "eslint-plugin-react";

export default [
	...technologiestiftung,
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		plugins: {
			react,
		},
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
			// suppress errors for missing 'import React' in files
			"react/react-in-jsx-scope": "off",
		},
	},
];
