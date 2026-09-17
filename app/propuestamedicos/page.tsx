import type { Metadata } from "next";
import PropuestaMedicosClient from "./PropuestaMedicosClient";

export const metadata: Metadata = {
  title: "Propuesta para médicos y clínicas · PG Estrategias",
  description:
    "Paquete Ignición para consultorios y clínicas: anuncios, video y página de ventas operados por un solo equipo en Puebla, con garantía por escrito.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaMedicosClient />;
}
