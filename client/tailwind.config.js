/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: {
				100: "#ffffff69",
				200: "#eeeeee",
				300: "#7c7c7c",
				400: "#f6feff",
				900: "#ffffff",
			},
			purple: "#3f3cbb",
			violet: { 100: "#5f43b2", 900: "#902bf5" },
			midnight: "#13193a",
			metal: "#4261f1",
			tahiti: "#3ab7bf",
			silver: "#c7c7d0",
			bermuda: "#78dcca",
			black: "#000",
			red: "#dd112e",
			blood: "#de2c2c",
			green: "#09c360",
			yellow: "#ff0",
			yellowX: "#e2b100",
			gray: {
				bg: "#181a1b",
				darkest: "#1f2d3d",
				dark: "#3c4858",
				DEFAULT: "#1a1a1a",
				light: "#e0e6ed",
				lightest: "#f9fafc",
			},
		},

		extend: {
			dropShadow: {
				"dark-lg": "0 0 3px #30375d",
				"dark-2xl": "0 0 25px #1e254a",
			},
			shadow: {
				"dark-lg": "0 0 25px #1e254a",
			},
		},
	},
	plugins: [],
};
