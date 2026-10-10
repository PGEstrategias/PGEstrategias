import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import VideoGrid from "@/components/site/VideoGrid";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import s from "@/components/home/home.module.css";
import { TESTIMONIOS } from "@/data/testimonios";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonios | PG Estrategias",
  description: "Lo que dicen médicos, venues de eventos y empresas de Puebla que trabajan con PG Estrategias.",
  alternates: { canonical: "/testimonios" },
};

export default function TestimoniosPage() {
  return (
    <PageShell>
      <PageHero
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Testimonios", href: "/testimonios" },
        ]}
        eyebrow="Testimonios"
        titulo="Lo que dicen nuestros clientes"
        sub="En sus palabras y en video. Toca cualquier tarjeta para verlo completo con sonido."
      />
      <section className={s.section} style={{ paddingTop: 40 }}>
        <div className={s.container}>
          <h2 className={`${s.h2} ${s.head}`}>Testimonios en video</h2>
          <VideoGrid
            items={TESTIMONIOS.map((t) => ({
              etiqueta: t.industria,
              titulo: t.nombre,
              texto: `“${t.cita}”`,
              video: t.video,
              poster: t.poster,
            }))}
          />
        </div>
      </section>
      <section className={`${s.section} ${s.sectionDark}`}>
        <div className={`${s.container} ${s.reveal}`} data-reveal>
          <h2 className={s.h2}>¿Tu marca es la siguiente?</h2>
          <p className={s.sub}>Cuéntanos qué necesitas y te respondemos con una propuesta.</p>
          <div className={s.ctas}>
            <a className={`${s.btn} ${s.btnPrimary}`} href={waLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
