import type { Metadata } from "next";
import BienvenidaDanielClient from "./BienvenidaDanielClient";

export const metadata: Metadata = {
  title: "Bienvenido Daniel — PG Estrategias",
  description:
    "Propuesta de Crecimiento Digital para Daniel: identidad, web, contenido y campañas para impulsar la venta de casas y autos.",
  openGraph: {
    title: "Bienvenido Daniel — PG Estrategias",
    description:
      "Propuesta de Crecimiento Digital diseñada para Daniel por PG Estrategias.",
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

export default function BienvenidaDanielPage() {
  return <BienvenidaDanielClient />;
}
