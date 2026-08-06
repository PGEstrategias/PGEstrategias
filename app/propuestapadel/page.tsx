import type { Metadata } from "next";
import PadelLomasClient from "./PadelLomasClient";

const OG_IMAGE =
  "https://res.cloudinary.com/dxcr9utre/video/upload/v1785518826/AQOkcMRjen17JpeUiSzw4b-cKRuJJH58DFv4WwoemuxvsQiBr4lsVz5LjAI7PTiTmA6PGfnkmjgJ71sDeNMwv6FB_tygqnj.jpg";

const DESCRIPTION =
  "Producción audiovisual y marketing digital para que Pádel Lomas se vea en Instagram como se ve en persona. Paquete Tracción — PG Estrategias.";

export const metadata: Metadata = {
  title: "Propuesta PG Estrategias × Pádel Lomas",
  description: DESCRIPTION,
  openGraph: {
    title: "Propuesta PG Estrategias × Pádel Lomas",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propuesta PG Estrategias × Pádel Lomas",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function PadelLomasPage() {
  return <PadelLomasClient />;
}
