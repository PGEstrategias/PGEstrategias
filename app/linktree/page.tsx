import type { Metadata } from "next";
import LinktreeClient from "./LinktreeClient";

export const metadata: Metadata = {
  title: "PG Estrategias — Enlaces",
  description: "Todos nuestros enlaces en un solo lugar. YouTube, Instagram, WhatsApp y más.",
  openGraph: {
    title: "PG Estrategias — Enlaces",
    description: "Conecta con PG Estrategias en todas nuestras redes.",
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

export default function LinktreePage() {
  return <LinktreeClient />;
}
