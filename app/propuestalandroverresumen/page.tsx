import type { Metadata } from "next";
import PropuestaLandRoverResumenClient from "./PropuestaLandRoverResumenClient";

export const metadata: Metadata = {
  title: "Propuesta (resumen) — Land Rover Puebla · PG Estrategias",
  description:
    "Versión sintetizada de la propuesta para Land Rover Puebla: entregables mensuales, adaptación a los tiempos de aprobación e inversión.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaLandRoverResumenClient />;
}
