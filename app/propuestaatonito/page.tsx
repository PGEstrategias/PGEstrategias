import type { Metadata } from "next";
import PropuestaAtonitoClient from "./PropuestaAtonitoClient";

export const metadata: Metadata = {
  title: "Propuesta — Atónito · PG Estrategias",
  description:
    "Propuesta de colaboración para Atónito, boutique de carnes: el sabor del norte como eje de contenido, dinámicas en piso, comunidad de marca y venta directa.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaAtonitoClient />;
}
