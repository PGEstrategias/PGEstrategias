import type { Metadata } from "next";
import PropuestaDresscodeClient from "./PropuestaDresscodeClient";

export const metadata: Metadata = {
  title: "Propuesta Dresscode — PG Estrategias",
  description:
    "Propuesta de Gestión Digital para Dresscode: contenido, publicidad, Google Business y página de ventas para posicionar la marca de renta de vestidos en Puebla.",
  openGraph: {
    title: "Propuesta Dresscode — PG Estrategias",
    description:
      "Paquete Ignición: la estrategia digital diseñada para que Dresscode se convierta en la referencia de moda y renta de vestidos en Puebla.",
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

export default function PropuestaDresscodePage() {
  return <PropuestaDresscodeClient />;
}
