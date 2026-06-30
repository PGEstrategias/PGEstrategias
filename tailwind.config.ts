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
        "pg-black": "#0D0D0D",
        "pg-lime": "#A6E22E",
        "pg-light": "#F5F5F5",
        "pg-white": "#FFFFFF",
        // Paleta Brief Narrativo v3.0 (experiencia /experiencia)
        "exp-black": "#0A0A0A",
        "exp-bg": "#1E1E1E",
        "exp-bg-2": "#2A2A2A",
        "exp-bg-dark": "#141414",
        "exp-green": "#A7E12F",
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
