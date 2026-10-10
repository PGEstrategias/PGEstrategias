import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import VideoGrid from "@/components/site/VideoGrid";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import s from "@/components/home/home.module.css";
import { INDUSTRIAS_DETALLE, industriaPorSlug } from "@/data/paginas";
import { publicados } from "@/lib/blog";
import { waLink } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIAS_DETALLE.map((i) => ({ industria: i.slug }));
}

export function generateMetadata({ params }: { params: { industria: string } }): Metadata {
  const ind = industriaPorSlug(params.industria);
  if (!ind) return {};
  return {
    title: `${ind.titulo} | PG Estrategias`,
    description: ind.sub,
    alternates: { canonical: `/industrias/${ind.slug}` },
  };
}

export default function IndustriaPage({ params }: { params: { industria: string } }) {
  const ind = industriaPorSlug(params.industria);
  if (!ind) notFound();
  const articulos = publicados(ind.pilar).slice(0, 3);

  return (
    <PageShell>
      <PageHero
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Industrias", href: "/industrias" },
          { label: ind.nombre, href: `/industrias/${ind.slug}` },
        ]}
        eyebrow={ind.nombre}
        titulo={ind.titulo}
        sub={ind.sub}
      >
        <div className={`${s.ctas} ${s.enter} ${s.enterLate}`}>
          <a className={`${s.btn} ${s.btnPrimary}`} href={waLink(ind.mensaje)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Hablemos por WhatsApp
          </a>
          <Link prefetch={false} className={`${s.btn} ${s.btnGhost}`} href="/servicios">
            Ver servicios
          </Link>
        </div>
      </PageHero>

      <section className={s.section}>
        <div className={`${s.container} ${s.grid2}`} style={{ alignItems: "start" }}>
          <div className={s.reveal} data-reveal>
            <h2 className={s.blockTitle} style={{ marginBottom: 16 }}>
              Lo que vemos seguido
            </h2>
            <ul className={s.bullets}>
              {ind.retos.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className={s.grid2}>
            {ind.hacemos.map((h, i) => (
              <article key={h.titulo} className={`${s.card} ${s.block} ${s.reveal}`} data-reveal data-reveal-delay={i * 70}>
                <h3 className={s.cardTitle}>{h.titulo}</h3>
                <p className={s.cardText}>{h.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="trabajo">
        <div className={s.container}>
          <h2 id="trabajo" className={`${s.h2} ${s.head} ${s.reveal}`} data-reveal>
            Trabajo para {ind.nombre.toLowerCase()}
          </h2>
          <VideoGrid items={ind.trabajos} />
          <p style={{ marginTop: 32 }}>
            <Link prefetch={false} href="/testimonios" className={s.link}>
              Ver testimonios <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {articulos.length > 0 && (
        <section className={s.section} aria-labelledby="guias">
          <div className={s.container}>
            <h2 id="guias" className={`${s.h2} ${s.head}`}>
              Guías del blog
            </h2>
            <div className={s.grid3}>
              {articulos.map((a) => (
                <article key={a.slug} className={`${s.card} ${s.post} ${s.lift}`}>
                  <h3 className={s.cardTitle}>{a.title}</h3>
                  <p className={s.cardText}>{a.description}</p>
                  <Link prefetch={false} href={`/blog/${a.slug}`} className={s.link} aria-label={`Leer artículo: ${a.title}`}>
                    Leer artículo <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`${s.section} ${s.sectionDark}`}>
        <div className={`${s.container} ${s.reveal}`} data-reveal>
          <h2 className={s.h2}>¿Tu negocio es el siguiente?</h2>
          <p className={s.sub}>Cuéntanos qué necesitas y te respondemos con una propuesta.</p>
          <div className={s.ctas}>
            <a className={`${s.btn} ${s.btnPrimary}`} href={waLink(ind.mensaje)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
