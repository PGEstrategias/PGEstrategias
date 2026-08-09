import type { Metadata } from "next";
import WasabiClient from "./WasabiClient";

const DESCRIPTION =
  "Producción audiovisual y campañas con retorno medible para Wasabi Puebla. Paquete Tracción — PG Estrategias.";

// Poster del demo reel: misma URL del video cambiando .mp4 por .jpg
const OG_IMAGE =
  "https://res.cloudinary.com/dxcr9utre/video/upload/v1783103607/reel1_d1nzzx.jpg";

export const metadata: Metadata = {
  title: "Propuesta PG Estrategias × Wasabi",
  description: DESCRIPTION,
  openGraph: {
    title: "Propuesta PG Estrategias × Wasabi",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propuesta PG Estrategias × Wasabi",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function PropuestaWasabiPage() {
  return <WasabiClient />;
}
