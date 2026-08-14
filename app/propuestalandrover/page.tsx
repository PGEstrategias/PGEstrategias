import type { Metadata } from "next";
import PropuestaLandRoverClient from "./PropuestaLandRoverClient";

export const metadata: Metadata = {
  title: "Propuesta — Land Rover Puebla · PG Estrategias",
  description:
    "Contenido a la altura de Land Rover. Producción cinematográfica, campañas de precisión y automatización para convertir interés en citas de prueba de manejo.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaLandRoverClient />;
}
