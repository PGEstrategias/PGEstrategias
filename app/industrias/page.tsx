import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import s from "@/components/home/home.module.css";
import { INDUSTRIAS } from "@/data/home";

export const metadata: Metadata = {
  title: "Industrias | PG Estrategias",
  description:
    "Marketing digital y producción audiovisual para concesionarias, médicos y clínicas, eventos y restaurantes en Puebla.",
  alternates: { canonical: "/industrias" },
};

export default function IndustriasPage() {
  return (
    <PageShell>
      <PageHero
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Industrias", href: "/industrias" },
        ]}
        eyebrow="Industrias"
        titulo="Industrias que atendemos"
        sub="Cada giro vende distinto. Adaptamos el contenido, las campañas y el seguimiento a cómo compra tu cliente."
      />
      <section className={s.section} style={{ paddingTop: 40 }}>
        <div className={`${s.container} ${s.grid3}`}>
          {INDUSTRIAS.map((ind, i) => (
            <Link
              prefetch={false}
              key={ind.href}
              href={ind.href}
              className={`${s.card} ${s.industry} ${s.lift} ${s.reveal}`}
              data-reveal
              data-reveal-delay={i * 80}
            >
              <h2 className={s.cardTitle}>{ind.nombre}</h2>
              <p className={s.cardText}>{ind.linea}</p>
              <span className={s.arrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
