import type { Metadata } from "next";
import BodasHeader from "@/components/bodas/Header";
import BodasFooter from "@/components/bodas/Footer";
import BodasCallToAction from "@/components/bodas/CallToAction";
import { BodasWhatsAppButton } from "@/components/bodas/WhatsAppButton";
import InvitacionesHero from "@/components/invitaciones/Hero";
import InvitacionesComoFunciona from "@/components/invitaciones/ComoFunciona";
import InvitacionesPricing from "@/components/invitaciones/Pricing";

const DESCRIPTION =
  "Invitaciones de boda digitales con confirmación automática: landing con tu historia, RSVP conectado a Excel, pases en PDF y reporte para el banquetero. Desde $1,999 MXN.";

export const metadata: Metadata = {
  title: "Invitaciones de Boda Digitales — PG Estrategias",
  description: DESCRIPTION,
  openGraph: {
    title: "Invitaciones de Boda Digitales — PG Estrategias",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
  },
};

const NAV = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Video de boda", href: "/bodas" },
  { label: "Contacto", href: "#contacto" },
];

export default function InvitacionesDeBodasPage() {
  return (
    /* .bodas-root aplica la paleta nupcial sin tocar el resto del sitio */
    <div className="bodas-root">
      <BodasHeader
        links={NAV}
        ctaLabel="Cotizar"
        ctaMessage="Hola, quiero cotizar las invitaciones digitales para mi boda."
      />
      <main>
        <InvitacionesHero />
        <InvitacionesComoFunciona />
        <InvitacionesPricing />
        <BodasCallToAction
          title="Tus invitados confirman esta"
          titleAccent="misma semana"
          text="Mándanos tu fecha y el número aproximado de invitados. Te decimos qué paquete te conviene y cuánto tarda en estar listo."
          ctaLabel="Cotizar por WhatsApp"
          ctaMessage="Hola, quiero cotizar las invitaciones digitales para mi boda."
          secondaryLabel="Ver también la cobertura de video"
          secondaryHref="/bodas"
        />
      </main>
      <BodasFooter
        tagline="Invitaciones digitales con confirmación automática, pases en PDF y la lista de tu banquete resuelta."
        links={[
          { label: "Cómo funciona", href: "#como-funciona" },
          { label: "Paquetes", href: "#paquetes" },
          { label: "Video de boda", href: "/bodas" },
          { label: "Nuestro trabajo", href: "/nuestrotrabajo" },
        ]}
      />
      <BodasWhatsAppButton mensaje="Hola, quiero información sobre las invitaciones digitales para mi boda." />
    </div>
  );
}
