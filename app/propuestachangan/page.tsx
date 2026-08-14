import type { Metadata } from "next";
import PropuestaChanganClient from "./PropuestaChanganClient";

export const metadata: Metadata = {
  title: "Propuesta — Changan Puebla · PG Estrategias",
  description:
    "La demanda de Changan ya existe en Puebla. Producción audiovisual, búsqueda local y sistema de respuesta para que llegue a tu piso de venta y no al de al lado.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaChanganClient />;
}
