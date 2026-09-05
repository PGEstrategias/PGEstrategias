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

const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Invitaciones", href: "/invitacionesdebodas" },
  { label: "Contacto", href: "#contacto" },
];

const MSG_CTA = "Hola, quiero cotizar la cobertura de video de mi boda.";

export default function BodasPage() {
  return (
    /* .bodas-root aplica la paleta nupcial sin tocar el resto del sitio */
    <div className="bodas-root">
      <BodasHeader
        links={NAV}
        ctaLabel="Reservar fecha"
        ctaMessage="Hola, quiero reservar mi fecha para la cobertura de mi boda."
      />
      <main>
        <BodasHero />
        <BodasProductShowcase />
        <BodasPricing />
        <BodasCallToAction
          title="Tu fecha se puede"
          titleAccent="llenar pronto"
          text="No dejes tu día más importante al azar. Escríbenos hoy y platiquemos sobre cómo hacer de tu boda un recuerdo que dure para siempre."
          ctaLabel="Cotizar por WhatsApp"
          ctaMessage={MSG_CTA}
          secondaryLabel="Ver también las invitaciones digitales"
          secondaryHref="/invitacionesdebodas"
        />
      </main>
      <BodasFooter
        tagline="Producción audiovisual con calidad de cine para el día más importante de tu vida."
        links={[
          { label: "Servicios", href: "#servicios" },
          { label: "Paquetes", href: "#paquetes" },
          { label: "Invitaciones digitales", href: "/invitacionesdebodas" },
          { label: "Nuestro trabajo", href: "/nuestrotrabajo" },
        ]}
      />
      <BodasWhatsAppButton mensaje="Hola, quiero información sobre la cobertura de video y foto para mi boda." />
    </div>
  );
}
