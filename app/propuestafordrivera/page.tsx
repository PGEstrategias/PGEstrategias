import type { Metadata } from "next";
import PropuestaFordRiveraClient from "./PropuestaFordRiveraClient";

export const metadata: Metadata = {
  title: "Iguala mensual — Ford Rivera · PG Estrategias",
  description:
    "Propuesta de iguala mensual para Ford Rivera: producción audiovisual a la altura del inventario y una operación de marketing que la convierte en tráfico a piso.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaFordRiveraClient />;
}
