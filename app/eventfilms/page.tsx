import type { Metadata } from "next";
import BodasHeader from "@/components/bodas/Header";
import BodasProductShowcase from "@/components/bodas/ProductShowcase";
import BodasPricing from "@/components/bodas/Pricing";
import BodasCallToAction from "@/components/bodas/CallToAction";
import BodasFooter from "@/components/bodas/Footer";
import { BodasWhatsAppButton } from "@/components/bodas/WhatsAppButton";
import EventShell from "@/components/eventfilms/EventShell";
import EventFilmsHero from "@/components/eventfilms/Hero";
import Ticker from "@/components/eventfilms/Ticker";
import Eventos from "@/components/eventfilms/Eventos";
import Peliculas from "@/components/eventfilms/Peliculas";
import InvitacionesTeaser from "@/components/eventfilms/InvitacionesTeaser";
import Proceso from "@/components/eventfilms/Proceso";

const TITLE = "PG Event Films | Video y foto para bodas, XV años y eventos en Puebla";
const DESCRIPTION =
  "Productora de eventos sociales en Puebla: bodas, XV años, brindis y bautizos filmados con calidad de cine. Película, cineminuto, fotografía e invitaciones digitales.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/eventfilms" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/eventfilms",
    type: "website",
    locale: "es_MX",
    siteName: "PG Event Films",
    images: [
      {
        url: "https://res.cloudinary.com/djduba5fd/video/upload/so_1,c_fill,ar_1.91,w_1200,f_jpg,q_auto/v1779377735/Reel_t5pucv.jpg",
        width: 1200,
        height: 628,
      },
    ],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const NAV = [
  { label: "Eventos", href: "#eventos" },
  { label: "Películas", href: "#peliculas" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Wedding planner", href: "/weddingplanner" },
  { label: "Invitaciones", href: "/invitacionesdebodas" },
  { label: "Contacto", href: "#contacto" },
];

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PG Event Films",
  description: DESCRIPTION,
  url: "https://pgestrategias.com/eventfilms",
  parentOrganization: { "@type": "Organization", name: "PG Estrategias", url: "https://pgestrategias.com" },
  areaServed: "Puebla",
  address: { "@type": "PostalAddress", addressLocality: "Puebla", addressRegion: "Puebla", addressCountry: "MX" },
};

export default function EventFilmsPage() {
  return (
    <EventShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <BodasHeader
        links={NAV}
        ctaLabel="Reservar fecha"
        ctaMessage="Hola, quiero reservar mi fecha con PG Event Films."
      />
      <main>
        <EventFilmsHero />
        <Ticker />
        <Eventos />
        <Peliculas />
        <BodasProductShowcase />
        <BodasPricing />
        <InvitacionesTeaser />
        <Proceso />
        <BodasCallToAction
          title="Tu fecha se puede"
          titleAccent="llenar pronto"
          text="Cuéntanos qué celebras, la fecha y el lugar. Te respondemos con la cobertura que mejor le queda a tu evento."
          ctaLabel="Cotizar por WhatsApp"
          ctaMessage="Hola, quiero cotizar la cobertura de mi evento con PG Event Films."
          secondaryLabel="Ver las invitaciones digitales"
          secondaryHref="/invitacionesdebodas"
        />
      </main>
      <BodasFooter
        tagline="Video y fotografía con calidad de cine para bodas, XV años y todas tus celebraciones."
        links={[
          { label: "Eventos", href: "#eventos" },
          { label: "Películas", href: "#peliculas" },
          { label: "Paquetes", href: "#paquetes" },
          { label: "Wedding planner", href: "/weddingplanner" },
          { label: "Invitaciones digitales", href: "/invitacionesdebodas" },
          { label: "Blog de bodas", href: "/blog?pilar=bodas-eventos" },
        ]}
      />
      <BodasWhatsAppButton mensaje="Hola, quiero información de PG Event Films para mi evento." />
    </EventShell>
  );
}
