import type { Metadata } from "next";
import PropuestaProveedoresClient from "./PropuestaProveedoresClient";

export const metadata: Metadata = {
  title: "Propuesta para proveedores de Ex Hacienda San Bartolo · PG Estrategias",
  description:
    "Paquete Ignición para proveedores de eventos: anuncios, video y página de ventas operados por un solo equipo en Puebla, con garantía por escrito.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaProveedoresClient />;
}
