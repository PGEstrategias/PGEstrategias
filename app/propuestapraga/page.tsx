import type { Metadata } from "next";
import PropuestaPragaClient from "./PropuestaPragaClient";

export const metadata: Metadata = {
  title: "Propuesta — Praga · PG Estrategias",
  description:
    "Propuesta de producción audiovisual y marketing digital para Praga: temporada Octubre–Noviembre 2026.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaPragaClient />;
}
