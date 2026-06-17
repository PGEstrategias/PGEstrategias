import type { Metadata } from "next";
import DrGragedaClient from "./DrGragedaClient";

export const metadata: Metadata = {
  title: "Bienvenida — Dr. Edgar Grageda · PG Estrategias",
  description:
    "Portal de bienvenida para el Dr. Edgar Grageda. Tier 1: Ignición — Plan de 30 días, entregables y fechas clave.",
};

export default function DrGragedaPage() {
  return <DrGragedaClient />;
}
