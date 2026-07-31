import type { Metadata } from "next";
import WasabiClient from "./WasabiClient";

const DESCRIPTION =
  "Producción audiovisual y campañas con retorno medible para Wasabi Puebla. Paquete Tracción — PG Estrategias.";

// Al pegar la URL del demo reel en WasabiClient.tsx, agregar aquí su poster
// (misma URL cambiando .mp4 por .jpg) dentro de openGraph.images.
export const metadata: Metadata = {
  title: "Propuesta PG Estrategias × Wasabi",
  description: DESCRIPTION,
  openGraph: {
    title: "Propuesta PG Estrategias × Wasabi",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
  twitter: {
    card: "summary_large_image",
    title: "Propuesta PG Estrategias × Wasabi",
    description: DESCRIPTION,
  },
};

export default function PropuestaWasabiPage() {
  return <WasabiClient />;
}
