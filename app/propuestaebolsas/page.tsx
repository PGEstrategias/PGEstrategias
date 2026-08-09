import type { Metadata } from "next";
import PropuestaEbolsasClient from "./PropuestaEbolsasClient";

export const metadata: Metadata = {
  title: "Propuesta — e-bolsas · PG Estrategias",
  description:
    "Optimización de página de ventas, creativos para Meta, estrategia y configuración de campaña. Propuesta preferente para e-bolsas.com.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaEbolsasClient />;
}
