import type { Metadata } from "next";
import BodasHeader from "@/components/bodas/Header";
import BodasCallToAction from "@/components/bodas/CallToAction";
import BodasFooter from "@/components/bodas/Footer";
import { BodasWhatsAppButton } from "@/components/bodas/WhatsAppButton";
import EventShell from "@/components/eventfilms/EventShell";
import PlaneacionHero from "@/components/planeacion/Hero";
import PlaneacionPaquetes from "@/components/planeacion/Paquetes";
import PlaneacionRespaldo from "@/components/planeacion/Respaldo";

const DESCRIPTION =
  "Wedding planner en Puebla y Cholula. Dos paquetes: coordinación del día del evento, o Planeación 360 con todo incluido desde $29,500 MXN hasta 150 personas.";

export const metadata: Metadata = {
  title: "Wedding Planner en Puebla — Coordinación y Planeación 360",
  description: DESCRIPTION,
  alternates: { canonical: "/weddingplanner" },
  openGraph: {
    title: "Wedding Planner en Puebla — Coordinación y Planeación 360",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "PG Event Films",
    url: "/weddingplanner",
  },
};

/* El vertical de bodas se navega entre sí: planeación, video e invitaciones
   son tres piezas de la misma boda, no tres sitios distintos. */
const NAV = [
  { label: "Paquetes", href: "#paquetes" },
  { label: "Seguridad", href: "#seguridad" },
  { label: "Event Films", href: "/eventfilms" },
  { label: "Invitaciones", href: "/invitacionesdebodas" },
  { label: "Contacto", href: "#contacto" },
];

const MSG_CTA = "Hola, quiero cotizar los servicios de wedding planner para mi boda.";

export default function WeddingPlannerPage() {
  return (
    <EventShell>
      <BodasHeader
        links={NAV}
        ctaLabel="Agendar cita"
        ctaMessage="Hola, quiero agendar una cita para platicar sobre la planeación de mi boda."
      />
      <main>
        <PlaneacionHero />
        <PlaneacionPaquetes />
        <PlaneacionRespaldo />
        <BodasCallToAction
          title="Las fechas buenas"
          titleAccent="se apartan temprano"
          text="Cuéntennos la fecha y el lugar que tienen en mente y les decimos con honestidad si podemos tomarla y cuál de los dos paquetes les conviene."
          ctaLabel="Escribir por WhatsApp"
          ctaMessage={MSG_CTA}
          secondaryLabel="Ver la cobertura de video y foto del evento"
          secondaryHref="/eventfilms"
        />
      </main>
      <BodasFooter
        tagline="Planeación y coordinación de bodas en Puebla y Cholula, para que el día solo haya que vivirlo."
        links={[
          { label: "Paquetes", href: "#paquetes" },
          { label: "Event Films", href: "/eventfilms" },
          { label: "Invitaciones digitales", href: "/invitacionesdebodas" },
          { label: "Nuestro trabajo", href: "/nuestrotrabajo" },
        ]}
      />
      <BodasWhatsAppButton mensaje="Hola, quiero información sobre los servicios de wedding planner." />
    </EventShell>
  );
}
