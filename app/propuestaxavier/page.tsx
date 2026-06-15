import type { Metadata } from "next";
import XavierClient from "./XavierClient";

export const metadata: Metadata = {
  title: "Propuesta Publicitaria — Xavier · PG Estrategias",
  description:
    "Propuesta publicitaria integral para Xavier — estrategia de adquisición de clientes B2B para renta de baños portátiles, desazolve y pipas de extracción en Oaxaca, Puebla y Veracruz.",
};

export default function XavierPage() {
  return <XavierClient />;
}
