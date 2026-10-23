import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import s from "@/components/home/home.module.css";
import { esPilar, PILARES, publicados, type Pilar } from "@/lib/blog";
import { waLink } from "@/lib/site";

const POR_PAGINA = 9;

export const metadata: Metadata = {
  title: "Blog | PG Estrategias",
  description:
    "Guías de producción audiovisual, Meta Ads y marketing digital en Puebla, y de video, invitaciones digitales y planeación para bodas y eventos.",
  alternates: { canonical: "/blog" },
};

const fecha = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });

function hrefLista(pilar?: Pilar, pagina = 1) {
  const q = new URLSearchParams();
  if (pilar) q.set("pilar", pilar);
  if (pagina > 1) q.set("pagina", String(pagina));
  const qs = q.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { pilar?: string; pagina?: string };
}) {
  const pilar = searchParams.pilar && esPilar(searchParams.pilar) ? searchParams.pilar : undefined;
  const todos = publicados(pilar);
  const paginas = Math.max(1, Math.ceil(todos.length / POR_PAGINA));
  const pagina = Math.min(paginas, Math.max(1, Number(searchParams.pagina) || 1));
  const lista = todos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <PageShell>
      <PageHero
        migas={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        eyebrow="Blog"
        titulo="Ideas para vender más con video y campañas"
        sub="Guías prácticas para negocios en Puebla: qué hacer, qué medir y qué errores evitar."
      >
        <nav aria-label="Filtrar por tema">
          <ul className={s.chips}>
            <li>
              <Link prefetch={false} className={s.chip} href="/blog" aria-current={!pilar ? "page" : undefined}>
                Todos
              </Link>
            </li>
            {(Object.keys(PILARES) as Pilar[]).map((p) => (
              <li key={p}>
                <Link prefetch={false} className={s.chip} href={hrefLista(p)} aria-current={pilar === p ? "page" : undefined}>
                  {PILARES[p].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className={s.section} style={{ paddingTop: 32 }}>
        <div className={s.container}>
          {lista.length === 0 ? (
            <div className={s.empty}>
              <p>
                {pilar
                  ? `Aún no hay artículos de ${PILARES[pilar].label}.`
                  : "Estamos preparando los primeros artículos."}{" "}
                Mientras tanto, cuéntanos qué necesitas.
              </p>
              <p style={{ marginTop: 16 }}>
                <a className={`${s.btn} ${s.btnPrimary}`} href={waLink()} target="_blank" rel="noopener noreferrer">
                  Escribir por WhatsApp
                </a>
              </p>
            </div>
          ) : (
            <div className={s.grid3}>
              {lista.map((a, i) => (
                <article
                  key={a.slug}
                  className={`${s.card} ${s.post} ${s.lift} ${s.reveal}`}
                  data-reveal
                  data-reveal-delay={(i % 3) * 80}
                >
                  <p className={s.date}>
                    {PILARES[a.pillar].label} · <time dateTime={a.date}>{fecha(a.date)}</time>
                  </p>
                  <h2 className={s.cardTitle}>
                    <Link prefetch={false} href={`/blog/${a.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {a.title}
                    </Link>
                  </h2>
                  <p className={s.cardText}>{a.description}</p>
                  <Link prefetch={false} href={`/blog/${a.slug}`} className={s.link} aria-label={`Leer artículo: ${a.title}`}>
                    Leer artículo <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {paginas > 1 && (
            <nav aria-label="Paginación">
              <ul className={s.pager}>
                {Array.from({ length: paginas }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <Link
                      prefetch={false}
                      className={s.chip}
                      href={hrefLista(pilar, n)}
                      aria-current={n === pagina ? "page" : undefined}
                      aria-label={`Página ${n}`}
                    >
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </PageShell>
  );
}
