import type { Metadata } from "next";
import EstrategiaEdgarClient from "./EstrategiaEdgarClient";

export const metadata: Metadata = {
  title: "Estrategia Meta Ads — Dr. Edgar · PG Estrategias",
  description:
    "Estrategia de Meta Ads para el Dr. Edgar — Cirugía General, enfoque en hernias. Nueva oferta, ángulos creativos y plan de campaña.",
};

export default function EstrategiaEdgarPage() {
  return <EstrategiaEdgarClient />;
}
