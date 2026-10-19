import type { Metadata } from "next";
import BodasCallToAction from "@/components/bodas/CallToAction";
import BodasFooter from "@/components/bodas/Footer";
import { BodasWhatsAppButton } from "@/components/bodas/WhatsAppButton";
import PJShell from "@/components/planeacion/PJShell";
import PJHeader from "@/components/planeacion/PJHeader";
import PlaneacionDetalles from "@/components/planeacion/Detalles";
import { PJ } from "@/components/planeacion/marca";
import PlaneacionHero from "@/components/planeacion/Hero";
import PlaneacionPaquetes from "@/components/planeacion/Paquetes";
import PlaneacionRespaldo from "@/components/planeacion/Respaldo";

const DESCRIPTION =
  "Paola Jiménez Weddings & Events, by PG Event Films. Wedding planner en Puebla y Cholula. Dos paquetes: coordinación del día del evento, o Planeación 360 con todo incluido desde $29,500 MXN hasta 150 personas.";

export const metadata: Metadata = {
  title: "Paola Jiménez Weddings & Events — Wedding Planner en Puebla · by PG Event Films",
  description: DESCRIPTION,
  alternates: { canonical: "/weddingplanner" },
  openGraph: {
    title: "Paola Jiménez Weddings & Events · by PG Event Films",
    description: DESCRIPTION,
    type: "website",
    locale: "es_MX",
    siteName: "Paola Jiménez Weddings & Events",
    images: [{ url: "/paolajimenez/logo.png", width: 1000, height: 647 }],
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

const MSG_CTA = "Hola, quiero cotizar los servicios de wedding planner de Paola Jiménez para mi boda.";

export default function WeddingPlannerPage() {
  return (
    <PJShell>
      <PJHeader
        links={NAV}
        ctaLabel="Agendar cita"
        ctaMessage="Hola, quiero agendar una cita para platicar sobre la planeación de mi boda."
      />
      <main>
        <PlaneacionHero />
        <PlaneacionPaquetes />
        <PlaneacionRespaldo />
        <PlaneacionDetalles />
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
        brand={
          // eslint-disable-next-line @next/next/no-img-element
          <img src={PJ.logoMarfil} alt={`${PJ.nombre} ${PJ.linea}`} width={1000} height={647} loading="lazy" style={{ width: 190, height: "auto" }} />
        }
        copyright={`${PJ.nombre} ${PJ.linea} · ${PJ.firma}, una marca de PG Estrategias · Puebla`}
        tagline="Planeación y coordinación de bodas en Puebla y Cholula, para que el día solo haya que vivirlo. Sueña · Planea · Celebra."
        links={[
          { label: "Paquetes", href: "#paquetes" },
          { label: "Event Films", href: "/eventfilms" },
          { label: "Invitaciones digitales", href: "/invitacionesdebodas" },
          { label: "Nuestro trabajo", href: "/nuestrotrabajo" },
        ]}
      />
      <BodasWhatsAppButton mensaje="Hola, quiero información sobre los servicios de wedding planner de Paola Jiménez." />
    </PJShell>
  );
}
