import type { Metadata } from "next";
import BodasHeader from "@/components/bodas/Header";
import EventShell from "@/components/eventfilms/EventShell";
import BodasFooter from "@/components/bodas/Footer";
import BodasCallToAction from "@/components/bodas/CallToAction";
import { BodasWhatsAppButton } from "@/components/bodas/WhatsAppButton";
import InvitacionesHero from "@/components/invitaciones/Hero";
import InvitacionesComoFunciona from "@/components/invitaciones/ComoFunciona";
import InvitacionesPricing from "@/components/invitaciones/Pricing";

const DESCRIPTION =
  "Invitaciones digitales para bodas, XV años y eventos, con confirmación automática: RSVP conectado a Excel, pases en PDF y reporte para el banquetero. Desde $2,999 MXN.";

export const metadata: Metadata = {
  title: "Invitaciones digitales para bodas y XV años | PG Event Films",
  description: DESCRIPTION,
  openGraph: {
    title: "Invitaciones digitales para bodas y XV años | PG Event Films",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Event Films",
  },
};

const NAV = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Event Films", href: "/eventfilms" },
  { label: "Wedding planner", href: "/weddingplanner" },
  { label: "Contacto", href: "#contacto" },
];

export default function InvitacionesDeBodasPage() {
  return (
    <EventShell>
      <BodasHeader
        links={NAV}
        ctaLabel="Cotizar"
        ctaMessage="Hola, quiero cotizar invitaciones digitales para mi evento."
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
          ctaMessage="Hola, quiero cotizar invitaciones digitales para mi evento."
          secondaryLabel="Ver PG Event Films: video y foto"
          secondaryHref="/eventfilms"
        />
      </main>
      <BodasFooter
        tagline="Invitaciones digitales de PG Event Films: confirmación automática, pases en PDF y la lista de tu banquete resuelta."
        links={[
          { label: "Cómo funciona", href: "#como-funciona" },
          { label: "Paquetes", href: "#paquetes" },
          { label: "Video y foto de eventos", href: "/eventfilms" },
          { label: "Wedding planner", href: "/weddingplanner" },
          { label: "Nuestro trabajo", href: "/nuestrotrabajo" },
          { label: "Blog de bodas", href: "/blog?pilar=bodas-eventos" },
        ]}
      />
      <BodasWhatsAppButton mensaje="Hola, quiero información sobre las invitaciones digitales de PG Event Films." />
    </EventShell>
  );
}
