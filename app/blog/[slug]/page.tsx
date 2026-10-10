import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import s from "@/components/home/home.module.css";
import { cld, HERO_POSTER, posterDe } from "@/data/home";
import { PILARES, porSlug, publicados, relacionados, renderArticulo, urlArticulo, type Articulo } from "@/lib/blog";
import { SITE_URL, waLink } from "@/lib/site";

/* Solo existen las páginas de artículos publicados; los bloqueados dan 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return publicados().map((a) => ({ slug: a.slug }));
}

const esCloudinary = (u: string) => u.includes("res.cloudinary.com") && u.includes("/video/upload/");
function portada(a: Articulo) {
  return esCloudinary(a.caso_real.video_url)
    ? posterDe(a.caso_real.video_url, "so_1,c_fill,ar_1.91,g_auto,w_1200,f_jpg,q_auto")
    : HERO_POSTER.desktop(1200);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = porSlug(params.slug);
  if (!a) return {};
  const img = portada(a);
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url: `/blog/${a.slug}`,
      publishedTime: a.date,
      locale: "es_MX",
      siteName: "PG Estrategias",
      images: [{ url: img, width: 1200, height: 628 }],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: [img] },
  };
}

function Video({ url, titulo }: { url: string; titulo: string }) {
  if (esCloudinary(url)) {
    return (
      <video
        controls
        playsInline
        preload="none"
        poster={posterDe(url, "so_1,c_fill,ar_9:16,w_560,f_auto,q_auto")}
        aria-label={`Video del caso: ${titulo}`}
      >
        <source src={cld(url, "c_limit,w_1080,q_auto,vc_h264")} type="video/mp4" />
      </video>
    );
  }
  return (
    <iframe
      src={url}
      title={`Video del caso: ${titulo}`}
      loading="lazy"
      allow="encrypted-media; picture-in-picture"
      allowFullScreen
      style={{ width: "100%", aspectRatio: "9 / 16", border: 0, borderRadius: 12 }}
    />
  );
}

const fecha = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });

export default function ArticuloPage({ params }: { params: { slug: string } }) {
  const a = porSlug(params.slug);
  if (!a) notFound();
  const { cuerpoHtml, faqs, ctaHtml, resultado } = renderArticulo(a);
  const pilar = PILARES[a.pillar];
  const rel = relacionados(a, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    mainEntityOfPage: urlArticulo(a.slug),
    image: [portada(a)],
    author: { "@type": "Organization", name: "PG Estrategias", url: SITE_URL },
    publisher: { "@type": "Organization", name: "PG Estrategias", url: SITE_URL },
    keywords: a.primary_keyword,
  };
  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuestaTexto },
        })),
      }
    : null;

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <article>
        <header className={s.pageHero}>
          <div className={s.container}>
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: a.title, href: `/blog/${a.slug}` },
              ]}
            />
            <h1 className={`${s.pageTitle} ${s.enter}`} style={{ maxWidth: "24ch" }}>
              {a.title}
            </h1>
            <p className={`${s.meta} ${s.enter} ${s.enterLate}`}>
              <time dateTime={a.date}>{fecha(a.date)}</time>
              <span aria-hidden="true">·</span>
              <Link prefetch={false} href={pilar.href}>
                {pilar.label}
              </Link>
              <span aria-hidden="true">·</span>
              <span>PG Estrategias</span>
            </p>
          </div>
        </header>

        <div className={s.container} style={{ paddingTop: 32 }}>
          <div className={`${s.prose} ${s.enter} ${s.enterLate}`} dangerouslySetInnerHTML={{ __html: cuerpoHtml }} />

          {faqs.length > 0 && (
            <section className={`${s.faq} ${s.reveal}`} data-reveal style={{ marginTop: 56 }} aria-labelledby="faq-title">
              <h2 id="faq-title" className={s.blockTitle} style={{ marginBottom: 12 }}>
                Preguntas frecuentes
              </h2>
              {faqs.map((f) => (
                <details key={f.pregunta}>
                  <summary>{f.pregunta}</summary>
                  <div className={`${s.answer} ${s.prose}`} dangerouslySetInnerHTML={{ __html: f.respuestaHtml }} />
                </details>
              ))}
            </section>
          )}

          <section className={`${s.caso} ${s.reveal}`} data-reveal style={{ marginTop: 56 }} aria-labelledby="caso-title">
            <Video url={a.caso_real.video_url} titulo={a.caso_real.cliente} />
            <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <p className={s.casoLabel}>Caso real</p>
              <h2 id="caso-title" className={s.blockTitle}>
                {a.caso_real.cliente}
              </h2>
              <p>
                <strong>Qué hicimos:</strong> {a.caso_real.que_hicimos}
              </p>
              {resultado && (
                <p>
                  <strong>Resultado:</strong> {resultado}
                </p>
              )}
              {ctaHtml && <div dangerouslySetInnerHTML={{ __html: ctaHtml }} />}
              <div className={s.ctas} style={{ marginTop: 8 }}>
                <a
                  className={`${s.btn} ${s.btnPrimary}`}
                  href={waLink(`Hola, leí el artículo "${a.title}" y quiero platicar.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Escríbenos por WhatsApp
                </a>
                <Link prefetch={false} className={`${s.btn} ${s.btnOnDark}`} href="/testimonios">
                  Ver testimonios
                </Link>
              </div>
            </div>
          </section>

          <p style={{ marginTop: 32 }}>
            <Link prefetch={false} href={pilar.href} className={s.link}>
              Más sobre {pilar.label.toLowerCase()} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </article>

      {rel.length > 0 && (
        <section className={`${s.section} ${s.sectionAlt}`} style={{ marginTop: 64 }} aria-labelledby="rel-title">
          <div className={s.container}>
            <h2 id="rel-title" className={`${s.h2} ${s.head}`}>
              Artículos relacionados
            </h2>
            <div className={s.grid3}>
              {rel.map((r, i) => (
                <article key={r.slug} className={`${s.card} ${s.post} ${s.lift} ${s.reveal}`} data-reveal data-reveal-delay={i * 80}>
                  <p className={s.date}>
                    <time dateTime={r.date}>{fecha(r.date)}</time>
                  </p>
                  <h3 className={s.cardTitle}>{r.title}</h3>
                  <p className={s.cardText}>{r.description}</p>
                  <Link prefetch={false} href={`/blog/${r.slug}`} className={s.link} aria-label={`Leer artículo: ${r.title}`}>
                    Leer artículo <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <div style={{ height: 64 }} />
    </PageShell>
  );
}
