import type { Metadata } from "next";
import FPAutomotrizClient from "./FPAutomotrizClient";

const OG_IMAGE =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.jpg";

const DESCRIPTION =
  "Producción audiovisual, campañas locales y un bot de WhatsApp que reactiva a los clientes que ya conocen FP Automotriz. Paquete Ignición — PG Estrategias.";

export const metadata: Metadata = {
  title: "Propuesta PG Estrategias × FP Automotriz",
  description: DESCRIPTION,
  openGraph: {
    title: "Propuesta PG Estrategias × FP Automotriz",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propuesta PG Estrategias × FP Automotriz",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function FPAutomotrizPage() {
  return <FPAutomotrizClient />;
}
