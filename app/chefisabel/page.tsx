import type { Metadata } from "next";
import ChefIsabelClient from "./ChefIsabelClient";

export const metadata: Metadata = {
  title: "¡Feliz Cumpleaños, Chef Isabel Balderas! · Santa Catrina",
  description:
    "Celebrando a la mujer que lleva el corazón de México a Polonia. 17 años de trayectoria, sabor y resiliencia. Puebla y el mundo te celebran.",
  openGraph: {
    title: "¡Feliz Cumpleaños, Chef Isabel Balderas!",
    description: "Celebrando a la mujer que lleva el corazón de México a Polonia.",
    type: "website",
    locale: "es_MX",
  },
};

export default function ChefIsabelPage() {
  return <ChefIsabelClient />;
}
