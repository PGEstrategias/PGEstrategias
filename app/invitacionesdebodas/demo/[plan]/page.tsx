import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FICHAS, PLANES, esPlan, type Plan } from "@/lib/invitaciones/planes";
import { FECHA_LARGA, NOVIOS } from "@/lib/invitaciones/demo";
import Portada from "@/components/invitaciones/demo/Portada";
import Historia from "@/components/invitaciones/demo/Historia";
import Lugares from "@/components/invitaciones/demo/Lugares";
import Itinerario from "@/components/invitaciones/demo/Itinerario";
import DressCode from "@/components/invitaciones/demo/DressCode";
import Regalos from "@/components/invitaciones/demo/Regalos";
import Rsvp from "@/components/invitaciones/demo/Rsvp";
import Bloqueado from "@/components/invitaciones/demo/Bloqueado";
import BarraDemo from "@/components/invitaciones/demo/BarraDemo";
import Musica from "@/components/invitaciones/demo/Musica";

type Props = { params: { plan: string } };

export function generateStaticParams() {
  return PLANES.map((plan) => ({ plan }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!esPlan(params.plan)) return {};
  const ficha = FICHAS[params.plan];
  const titulo = `Demo del paquete ${ficha.nombre} — Invitaciones de boda digitales`;
  const descripcion = `Invitación digital de muestra para ${NOVIOS.ella} y ${NOVIOS.el}. ${ficha.promesa} Paquete ${ficha.nombre}, ${ficha.precio} MXN.`;

  return {
    title: `${titulo} | PG Estrategias`,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      type: "website",
      locale: "es_MX",
      siteName: "PG Estrategias",
    },
  };
}

export default function DemoInvitacionPage({ params }: Props) {
  if (!esPlan(params.plan)) notFound();
  const plan: Plan = params.plan;

  return (
    /* Sin header ni footer de la agencia: el invitado de una boda real no ve
       una barra de navegación corporativa, y el demo tiene que sentirse como
       la invitación que se entrega, no como una página de producto. */
    <div className="bodas-root">
      {/* Aire para que la barra fija no tape el final de la invitación. */}
      <main className="pb-24">
        <Portada />
        <Historia />
        <Lugares />
        <Itinerario />
        <DressCode />
        <Regalos />
        <Rsvp plan={plan} />
        <Bloqueado />

        <footer className="bodas-dark py-14 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />
          <p className="bodas-heading text-3xl mb-3">
            {NOVIOS.ella}
            <span className="mx-2.5" style={{ color: "#C4A052" }}>
              &amp;
            </span>
            {NOVIOS.el}
          </p>
          <p
            className="font-body text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "rgba(247,243,238,0.4)" }}
          >
            {FECHA_LARGA}
          </p>
          <p
            className="font-body text-[12px] tracking-[0.12em] mt-6"
            style={{ color: "#C4A052" }}
          >
            {NOVIOS.hashtags.join("  ·  ")}
          </p>
          <p
            className="font-body text-[11px] leading-relaxed mt-10 max-w-sm mx-auto px-6"
            style={{ color: "rgba(247,243,238,0.25)" }}
          >
            {NOVIOS.ellaCompleto} y {NOVIOS.elCompleto} son una pareja ficticia.
            Esta invitación es una muestra de PG Estrategias.
          </p>
        </footer>
      </main>

      <Musica />
      <BarraDemo plan={plan} />
    </div>
  );
}
