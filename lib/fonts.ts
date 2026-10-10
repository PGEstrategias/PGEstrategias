import { Cormorant_Garamond, Inter, Syne } from "next/font/google";

/* Tipografía del sitio principal: dos familias, subset latino, swap y
   precarga. Solo se descarga en las rutas que usan PageShell. */
export const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-syne" });
export const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

/* PG Event Films: serif de papelería fina para los títulos. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});
