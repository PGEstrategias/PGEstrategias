import type { Metadata } from "next";
import PropuestaProctologoClient from "./PropuestaProctologoClient";

export const metadata: Metadata = {
  title: "Propuesta Estratégica — Consultorio de Proctología · PG Estrategias",
  description:
    "Plan de implementación mensual para la optimización y crecimiento del consultorio de proctología.",
};

export default function PropuestaProctologoPage() {
  return <PropuestaProctologoClient />;
}
