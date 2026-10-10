import { Inter, Syne } from "next/font/google";

/* Tipografía del sitio principal: dos familias, subset latino, swap y
   precarga. Solo se descarga en las rutas que usan PageShell. */
export const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-syne" });
export const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
