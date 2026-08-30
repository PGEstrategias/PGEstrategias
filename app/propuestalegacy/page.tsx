import type { Metadata } from "next";
import PropuestaLegacyClient from "./PropuestaLegacyClient";

export const metadata: Metadata = {
  title: "Propuesta — Legacy · PG Estrategias",
  description:
    "Propuesta de colaboración para Legacy Athletic Performance & Studio y Legacy Sportwear: producción audiovisual constante y estrategia comercial en dos igualas mensuales.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaLegacyClient />;
}
