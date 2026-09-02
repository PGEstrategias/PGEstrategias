import type { Metadata } from "next";
import PropuestaZenithMotorsClient from "./PropuestaZenithMotorsClient";

export const metadata: Metadata = {
  title: "Propuesta — Zenith Motors · PG Estrategias",
  description:
    "Propuesta de colaboración para Zenith Motors: producción audiovisual constante para la rotación del inventario y estrategia comercial en dos igualas mensuales.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PropuestaZenithMotorsClient />;
}
