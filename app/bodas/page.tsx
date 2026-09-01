import type { Metadata } from "next";
import BodasHeader from "@/components/bodas/Header";
import BodasHero from "@/components/bodas/Hero";
import BodasProductShowcase from "@/components/bodas/ProductShowcase";
import BodasPricing from "@/components/bodas/Pricing";
import BodasCallToAction from "@/components/bodas/CallToAction";
import BodasFooter from "@/components/bodas/Footer";
import { BodasWhatsAppButton } from "@/components/bodas/WhatsAppButton";

const DESCRIPTION =
  "PG Estrategias captura tu boda con calidad cinematográfica: cobertura total, cineminuto, video largo y fotografía profesional. Paquetes desde $32,000 MXN.";

export const metadata: Metadata = {
  title: "Bodas Cinematográficas — PG Estrategias",
  description: DESCRIPTION,
  openGraph: {
    title: "Bodas Cinematográficas — PG Estrategias",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

export default function BodasPage() {
  return (
    /* .bodas-root aplica el branding PG a la landing sin tocar el resto del sitio */
    <div className="bodas-root">
      <BodasHeader />
      <main>
        <BodasHero />
        <BodasProductShowcase />
        <BodasPricing />
        <BodasCallToAction />
      </main>
      <BodasFooter />
      <BodasWhatsAppButton />
    </div>
  );
}
