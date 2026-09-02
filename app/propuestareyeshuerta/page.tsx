import type { Metadata } from "next";
import PropuestaReyesHuertaClient from "./PropuestaReyesHuertaClient";

export const metadata: Metadata = {
  title: "Propuesta — Mercedes-Benz Reyes Huerta · PG Estrategias",
  description:
    "Marketing digital y producción audiovisual a la altura de Mercedes-Benz: contenido con narrativa, experiencias y un sistema mensual para Reyes Huerta.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaReyesHuertaClient />;
}
