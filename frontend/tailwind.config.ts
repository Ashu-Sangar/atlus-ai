import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./context/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("light", ".light &");
        }),
    ],
};

export default config;
