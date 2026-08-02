import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pg-black": "#1C1C1A",
        "pg-red": "#D63A27",
        "pg-warm": "#A79F99",
        "pg-cream": "#E4E0DD",
        "pg-white": "#FFFFFF",
        // Compat aliases (deprecated, kept for legacy component styles)
        "pg-lime": "#D63A27",
        "pg-light": "#E4E0DD",
      },
      fontFamily: {
        title: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
