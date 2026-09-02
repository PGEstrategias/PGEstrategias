import type { Metadata } from "next";
import NuestroTrabajoClient from "./NuestroTrabajoClient";

export const metadata: Metadata = {
  title: "Nuestro Trabajo — Galería de Reels · PG Estrategias",
  description:
    "Galería de reels producidos por PG Estrategias: contenido dopamínico, spots, marca personal, piezas cinematográficas y recaps de eventos que convierten atención en clientes.",
  openGraph: {
    title: "Nuestro Trabajo — PG Estrategias",
    description:
      "Reels que enganchan, convierten y elevan tu marca. Mira el portafolio de PG Estrategias.",
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

export default function NuestroTrabajoPage() {
  return <NuestroTrabajoClient />;
}
