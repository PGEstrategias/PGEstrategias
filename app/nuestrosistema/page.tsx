import type { Metadata } from "next";
import NuestroSistemaClient from "./NuestroSistemaClient";

export const metadata: Metadata = {
  title: "Nuestro Sistema — PG Estrategias",
  description:
    "Una VSL interactiva: navega el escritorio de un negocio que pasa del caos al orden con el Sistema PG.",
};

export default function NuestroSistemaPage() {
  return <NuestroSistemaClient />;
}
