import type { Metadata } from "next";
import PropuestaDjArturoClient from "./PropuestaDjArturoClient";

export const metadata: Metadata = {
  title: "Propuesta — DJ Arturo · PG Estrategias",
  description:
    "Iguala mensual para DJ Arturo: cobertura de eventos con acabado de nivel comercial y presencia digital constante que convierte cada evento en más contrataciones.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaDjArturoClient />;
}
