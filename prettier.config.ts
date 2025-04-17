import { type Config } from "prettier";

const config: Config = {
	plugins: ["prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
	useTabs: true,
	tabWidth: 4,
	semi: true,
	singleQuote: false,
	printWidth: 120,

	tailwindFunctions: ["cva", "cn"],
};

export default config;
