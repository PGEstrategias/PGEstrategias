import type { Metadata } from "next";
import LuisJimenezClient from "./LuisJimenezClient";

export const metadata: Metadata = {
  title: "Propuesta Publicitaria — Despacho Jurídico Luis Jiménez · PG Estrategias",
  description:
    "Propuesta publicitaria a la medida del presupuesto para el Despacho Jurídico Luis Jiménez — plan de 3 meses con producción de contenido, landing page y pauta publicitaria.",
};

export default function LuisJimenezPage() {
  return <LuisJimenezClient />;
}
