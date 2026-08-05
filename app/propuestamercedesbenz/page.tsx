import type { Metadata } from "next";
import PropuestaMercedesClient from "./PropuestaMercedesClient";

export const metadata: Metadata = {
  title: "Propuesta — Mercedes-Benz Reyes Huerta · PG Estrategias",
  description:
    "El estándar global de Mercedes-Benz aplicado a la operación local. Producción, campañas y sistema completo para convertir demanda en citas de showroom.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaMercedesClient />;
}
