import type { Metadata } from "next";
import ZenithMotorsClient from "./ZenithMotorsClient";

export const metadata: Metadata = {
  title: "Propuesta de Campaña 360 — Zenith Motors · PG Estrategias",
  description:
    "Campaña intensiva de 90 días para Zenith Motors. Síntesis estratégica: posicionamiento boutique de seminuevos, pilares de comunicación, sistema 360 e inversión.",
};

export default function ZenithMotorsPage() {
  return <ZenithMotorsClient />;
}
