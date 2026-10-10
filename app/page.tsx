import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/site/PageShell";
import VideoGrid from "@/components/site/VideoGrid";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import HeroVideo from "@/components/home/HeroVideo";
import ContactoForm from "@/components/home/ContactoForm";
import RotatingWord from "@/components/home/RotatingWord";
import s from "@/components/home/home.module.css";
import {
  HERO_POSTER,
  INDUSTRIAS,
  LOGOS,
  PAQUETES,
  PASOS,
  TESTIMONIO,
  TRABAJOS,
} from "@/data/home";
import { PILARES, publicados } from "@/lib/blog";
import { EMAIL, SITE_URL, WHATSAPP_NUMERO, waLink } from "@/lib/site";

/* PLACEHOLDER: título y descripción definitivos de la home. */
const TITLE = "PG Estrategias | Producción audiovisual y Meta Ads en Puebla";
const DESCRIPTION =
  "Videos que venden y campañas que se miden: producción audiovisual, Meta Ads y landing pages para marcas en Puebla.";
/* PLACEHOLDER: imagen OG definitiva (1200×630). */
const OG_IMAGE = HERO_POSTER.desktop(1200);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    type: "website",
    locale: "es_MX",
    siteName: "PG Estrategias",
    images: [{ url: OG_IMAGE, width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PG Estrategias",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`, // PLACEHOLDER: logo en archivo (PNG/SVG)
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Puebla",
    addressRegion: "Puebla",
    addressCountry: "MX",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${WHATSAPP_NUMERO}`,
    contactType: "sales",
    areaServed: "MX",
    availableLanguage: "es",
  },
};

const H1 = "Videos que venden. Campañas que se miden.";
const INDUSTRIAS_HERO = [
  "concesionarias",
  "médicos y clínicas",
  "eventos y bodas",
  "restaurantes",
  "industria",
];

function Ph({ children }: { children: string }) {
  return children.startsWith("[") ? <span className={s.ph}>{children}</span> : <>{children}</>;
}

export default function Home() {
  const articulos = publicados().slice(0, 3);

  return (
    <PageShell overHero>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
        {/* 1 · HERO */}
        <section className={s.hero} aria-labelledby="hero-title">
          <HeroVideo />
          <div className={`${s.container} ${s.heroInner}`}>
            <h1 id="hero-title" className={s.h1} aria-label={H1}>
              {H1.split(" ").map((w, i) => (
                <span key={i} aria-hidden="true">
                  <span className={s.word} style={{ animationDelay: `${i * 40}ms` }}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className={s.heroSub}>
              Producción audiovisual, Meta Ads y landing pages para marcas en Puebla.
            </p>
            <p className={s.heroIndustries}>
              <span className={s.srOnly}>
                Atendemos concesionarias, médicos y clínicas, eventos y bodas, restaurantes, industria y
                otros giros.
              </span>
              <span aria-hidden="true">Atendemos </span>
              <RotatingWord words={INDUSTRIAS_HERO} />
              <span aria-hidden="true"> y más.</span>{" "}
              <Link prefetch={false} href="/industrias" className={s.heroLink}>
                Ver industrias <span aria-hidden="true">→</span>
              </Link>
            </p>
            <div className={s.ctas}>
              <a
                className={`${s.btn} ${s.btnPrimary}`}
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Hablemos por WhatsApp
              </a>
              <Link prefetch={false} className={`${s.btn} ${s.btnOnDark}`} href="/testimonios">
                Ver testimonios
              </Link>
            </div>
          </div>
        </section>

        {/* 2 · MARCAS */}
        <section className={s.section} aria-labelledby="marcas-title">
          <div className={s.container}>
            <h2 id="marcas-title" className={`${s.h2} ${s.head} ${s.reveal}`} data-reveal>
              Marcas con las que hemos colaborado
            </h2>
            <div className={s.marquee}>
              {[0, 1].map((copia) => (
                <ul key={copia} className={s.track} aria-hidden={copia === 1 ? true : undefined}>
                  {LOGOS.map((l) => (
                    <li key={l.nombre} className={s.logo}>
                      <picture>
                        {l.fallback && <source srcSet={l.src} type="image/webp" />}
                        <img
                          src={l.fallback ?? l.src}
                          alt={copia === 0 ? l.nombre : ""}
                          width={l.w}
                          height={l.h}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · TRABAJOS DESTACADOS */}
        <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="trabajos-title">
          <div className={s.container}>
            <div className={`${s.head} ${s.reveal}`} data-reveal>
              <h2 id="trabajos-title" className={s.h2}>
                Trabajos que hablan por nosotros
              </h2>
              <p className={s.sub}>Tres proyectos, tres industrias.</p>
            </div>
            <VideoGrid items={TRABAJOS} />
          </div>
        </section>

        {/* 4 · TESTIMONIO (solo con permiso de publicación) */}
        {TESTIMONIO.permisoConfirmado && (
          <section className={s.section} aria-labelledby="testimonio-title">
            <div className={`${s.container} ${s.reveal}`} data-reveal>
              <h2 id="testimonio-title" className={`${s.h2} ${s.head}`}>
                Lo que dicen nuestros clientes
              </h2>
              <figure>
                <blockquote className={s.quote}>“{TESTIMONIO.cita}”</blockquote>
                <figcaption className={s.quoteAuthor}>— {TESTIMONIO.autor}</figcaption>
              </figure>
              <p style={{ marginTop: 28 }}>
                <Link prefetch={false} href="/testimonios" className={s.link}>
                  Ver todos los testimonios <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </section>
        )}

        {/* 5 · SERVICIOS */}
        <section className={s.section} aria-labelledby="servicios-title">
          <div className={s.container}>
            <div className={`${s.head} ${s.reveal}`} data-reveal>
              <h2 id="servicios-title" className={s.h2}>
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

        {/* 6 · CÓMO TRABAJAMOS */}
        <section className={`${s.section} ${s.sectionDark}`} aria-labelledby="proceso-title">
          <div className={s.container}>
            <h2 id="proceso-title" className={`${s.h2} ${s.head} ${s.reveal}`} data-reveal>
              Del diagnóstico a los resultados
            </h2>
            <ol className={s.steps}>
              {PASOS.map((p, i) => (
                <li
                  key={p.titulo}
                  className={`${s.step} ${s.reveal}`}
                  data-reveal
                  data-reveal-delay={i * 200}
                >
                  <span className={s.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={s.stepTitle}>{p.titulo}</h3>
                    <p className={s.stepText}>{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 · INDUSTRIAS */}
        <section className={s.section} aria-labelledby="industrias-title">
          <div className={s.container}>
            <h2 id="industrias-title" className={`${s.h2} ${s.head} ${s.reveal}`} data-reveal>
              Industrias que atendemos
            </h2>
            <div className={s.grid3}>
              {INDUSTRIAS.map((ind, i) => (
                <Link
                  prefetch={false}
                  key={ind.href}
                  href={ind.href}
                  className={`${s.card} ${s.industry} ${s.lift} ${s.reveal}`}
                  data-reveal
                  data-reveal-delay={i * 80}
                >
                  <h3 className={s.cardTitle}>{ind.nombre}</h3>
                  <p className={s.cardText}>
                    <Ph>{ind.linea}</Ph>
                  </p>
                  <span className={s.arrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · BLOG */}
        {articulos.length > 0 && (
          <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="blog-title">
            <div className={s.container}>
              <h2 id="blog-title" className={`${s.h2} ${s.head} ${s.reveal}`} data-reveal>
                Desde el blog
              </h2>
              <div className={s.grid3}>
                {articulos.map((a, i) => (
                  <article
                    key={a.slug}
                    className={`${s.card} ${s.post} ${s.reveal}`}
                    data-reveal
                    data-reveal-delay={i * 80}
                  >
                    <p className={s.date}>
                      {PILARES[a.pillar].label} ·{" "}
                      <time dateTime={a.date}>
                      {new Date(`${a.date}T12:00:00`).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      </time>
                    </p>
                    <h3 className={s.cardTitle}>
                      {a.title}
                    </h3>
                    <p className={s.cardText}>
                      {a.description}
                    </p>
                    <Link prefetch={false} href={`/blog/${a.slug}`} className={s.link}>
                      Leer artículo <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
              <p style={{ marginTop: 32 }}>
                <Link prefetch={false} href="/blog" className={s.link}>
                  Ver todos los artículos <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </section>
        )}

        {/* 9 · CTA FINAL */}
        <section className={s.section} aria-labelledby="cta-title" id="contacto">
          <div className={`${s.container} ${s.ctaGrid}`}>
            <div className={s.reveal} data-reveal>
              <h2 id="cta-title" className={s.h2}>
                ¿Tu marca es la siguiente?
              </h2>
              <p className={s.sub}>Cuéntanos qué necesitas y te respondemos con una propuesta.</p>
              <div className={s.ctas}>
                <a
                  className={`${s.btn} ${s.btnPrimary}`}
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
            <div className={s.reveal} data-reveal data-reveal-delay={100}>
              <ContactoForm />
            </div>
          </div>
        </section>
    </PageShell>
  );
}
