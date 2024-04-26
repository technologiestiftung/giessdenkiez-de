/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["IBM", "sans-serif"],
			},
			colors: {
				"gdk-gray": "#2C303B",
				"gdk-light-gray": "#808080",
				"gdk-lighter-gray": "#EFEFEF",
				"gdk-white": "#FEFEFE",
				"gdk-blue": "#1169EE",
				"gdk-dark-blue": "#0948A7",
				"gdk-light-blue": "#96BCF4",
				"gdk-lighter-blue": "#E7F0FD",
				"gdk-dark-red": "#BD0909",
				"gdk-light-red": "#DA7B7B",
				"gdk-neon-green": "#3DF99A",
				"gdk-dark-green": "#07964E",
				"gdk-purple": "#660A9C",
				"gdk-orange": "#FF8617",
				"gdk-watering-blue": "#468AEF",
				"gdk-rain-blue": "#0B4295",
				"gdk-tree-orange": "#FD9531",
				"gdk-tree-yellow": "#FDE725",
				"gdk-tree-gray": "#9E9FA0",

			},
			blur: {
				xs: "2px",
			},
			boxShadow: {
				"gdk-soft": "0px 3px 6px 0px rgba(184, 184, 184, 0.10);",
				"gdk-hard": "0px 3px 6px 0px rgba(105, 105, 105, 0.10);",
				"gdk-hard-up": "0px -3px 6px 0px rgba(105, 105, 105, 0.08);",
			},
			keyframes: {
				shimmer: {
					"100%": { transform: "translateX(100%)" },
				},
			},
		},
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
};
