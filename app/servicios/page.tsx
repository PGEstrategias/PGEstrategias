import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import s from "@/components/home/home.module.css";
import { PAQUETES, PASOS } from "@/data/home";
import { LINEAS_SERVICIO } from "@/data/paginas";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios | Producción audiovisual y Meta Ads en Puebla | PG Estrategias",
  description:
    "Producción audiovisual, Meta Ads, landing pages y automatización para marcas en Puebla, en tres niveles según la etapa de tu negocio.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <PageShell>
      <PageHero
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
        ]}
        eyebrow="Servicios"
        titulo="Producimos el contenido y lo ponemos a vender"
        sub="Producción audiovisual, campañas, landing pages y seguimiento de leads, operados por un solo equipo en Puebla."
      >
        <div className={`${s.ctas} ${s.enter} ${s.enterLate}`}>
          <a className={`${s.btn} ${s.btnPrimary}`} href={waLink("Hola, quiero saber qué servicio me conviene.")} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Hablemos por WhatsApp
          </a>
        </div>
      </PageHero>

      <section className={s.section}>
        <div className={`${s.container} ${s.grid2}`}>
          {LINEAS_SERVICIO.map((l, i) => (
            <article
              key={l.id}
              id={l.id}
              className={`${s.card} ${s.block} ${s.reveal}`}
              data-reveal
              data-reveal-delay={(i % 2) * 80}
              style={{ scrollMarginTop: 96 }}
            >
              <h2 className={s.blockTitle}>{l.nombre}</h2>
              <p className={s.cardText}>{l.linea}</p>
              <ul className={s.bullets}>
                {l.puntos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="niveles">
        <div className={s.container}>
          <div className={`${s.head} ${s.reveal}`} data-reveal>
            <h2 id="niveles" className={s.h2}>
              Tres niveles según tu etapa
            </h2>
            <p className={s.sub}>Empieza donde lo necesitas y crece cuando quieras.</p>
          </div>
          <div className={s.grid3}>
            {PAQUETES.map((p, i) => (
              <article
                key={p.nombre}
                className={`${s.card} ${s.plan} ${s.lift} ${s.reveal} ${p.destacado ? s.planFeatured : ""}`}
                data-reveal
                data-reveal-delay={i * 80}
                style={{ overflow: "visible" }}
              >
                {p.destacado && <span className={s.badge}>Más elegido</span>}
                <h3 className={s.planName}>{p.nombre}</h3>
                <p className={s.cardText}>{p.linea}</p>
                <ul className={s.list}>
                  {p.incluye.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <a
                  className={`${s.btn} ${p.destacado ? s.btnPrimary : s.btnGhost}`}
                  href={waLink(`Hola, quiero el paquete ${p.nombre.toUpperCase()} de PG Estrategias.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero {p.nombre}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionDark}`} aria-labelledby="proceso">
        <div className={s.container}>
          <h2 id="proceso" className={`${s.h2} ${s.head} ${s.reveal}`} data-reveal>
            Del diagnóstico a los resultados
          </h2>
          <ol className={s.steps}>
            {PASOS.map((p, i) => (
              <li key={p.titulo} className={`${s.step} ${s.reveal}`} data-reveal data-reveal-delay={i * 200}>
                <span className={s.stepNum} aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className={s.stepTitle}>{p.titulo}</h3>
                  <p className={s.stepText}>{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 40 }}>
            <Link prefetch={false} className={`${s.btn} ${s.btnOnDark}`} href="/industrias">
              Ver industrias que atendemos
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
