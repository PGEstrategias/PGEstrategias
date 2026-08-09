import type { Metadata } from "next";
import TallerMecanicoClient from "./TallerMecanicoClient";

const OG_IMAGE =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.jpg";

const DESCRIPTION =
  "Producción audiovisual, campañas locales y un bot de WhatsApp que reactiva a los clientes que ya conocen el taller. Paquete Ignición — PG Estrategias.";

export const metadata: Metadata = {
  title: "Propuesta PG Estrategias × Taller mecánico",
  description: DESCRIPTION,
  openGraph: {
    title: "Propuesta PG Estrategias × Taller mecánico",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propuesta PG Estrategias × Taller mecánico",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function TallerMecanicoPage() {
  return <TallerMecanicoClient />;
}
