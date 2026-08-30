import type { Metadata } from "next";
import PropuestaAutonacionMensualClient from "./PropuestaAutonacionMensualClient";

export const metadata: Metadata = {
  title: "Iguala mensual — Autonación · PG Estrategias",
  description:
    "Propuesta de iguala mensual para Autonación: producción audiovisual a la altura del inventario y una operación de marketing que la convierte en tráfico a piso.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaAutonacionMensualClient />;
}
