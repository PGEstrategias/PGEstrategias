import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { SITE_URL } from "@/lib/site";

/* Blog: artículos en Markdown dentro de /content/blog. Cada archivo pasa por
   las reglas editoriales antes de publicarse; los que no las cumplen quedan
   bloqueados (no generan página, no salen en listados ni en el sitemap). */

const DIR = path.join(process.cwd(), "content", "blog");

export const PILARES = {
  "produccion-audiovisual": { label: "Producción audiovisual", href: "/servicios#produccion-audiovisual" },
  concesionarias: { label: "Concesionarias", href: "/industrias/concesionarias" },
  medicos: { label: "Médicos", href: "/industrias/medicos" },
  "meta-ads": { label: "Meta Ads", href: "/servicios#meta-ads" },
  "industrias-locales": { label: "Industrias locales", href: "/industrias/eventos-restaurantes" },
} as const;
export type Pilar = keyof typeof PILARES;
export const esPilar = (p: string): p is Pilar => p in PILARES;

export type CasoReal = {
  cliente: string;
  video_url: string;
  que_hicimos: string;
  resultado: string;
  permiso_publicacion: boolean;
};

export type Articulo = {
  archivo: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  pillar: Pilar;
  primary_keyword: string;
  caso_real: CasoReal;
  cuerpo: string;
};

export type Validacion = {
  archivo: string;
  slug: string;
  publicado: boolean;
  motivos: string[];
  lineas: { n: number; texto: string }[];
};

/* En YAML, `video_url: [PLACEHOLDER …]` se lee como lista: lo devolvemos a
   texto para poder detectarlo. */
function texto(v: unknown): string {
  if (Array.isArray(v)) return `[${v.join(", ")}]`;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v == null ? "" : String(v).trim();
}

const CORCHETE = /\[[^\]\n]+\](?!\()/g;
const esPlaceholder = (s: string) => /\[[^\]]+\]/.test(s);

function leer(archivo: string): { art: Articulo; val: Validacion } {
  const raw = fs.readFileSync(path.join(DIR, archivo), "utf8");
  const { data, content } = matter(raw);
  const cr = (data.caso_real ?? {}) as Record<string, unknown>;
  const art: Articulo = {
    archivo,
    slug: texto(data.slug),
    title: texto(data.title),
    description: texto(data.description),
    date: texto(data.date),
    pillar: texto(data.pillar) as Pilar,
    primary_keyword: texto(data.primary_keyword),
    caso_real: {
      cliente: texto(cr.cliente),
      video_url: texto(cr.video_url),
      que_hicimos: texto(cr.que_hicimos),
      resultado: texto(cr.resultado),
      permiso_publicacion: cr.permiso_publicacion === true,
    },
    cuerpo: content,
  };

  const motivos: string[] = [];
  if (!art.slug) motivos.push("Falta slug");
  if (!art.title) motivos.push("Falta title");
  else if (art.title.length > 60) motivos.push(`title de ${art.title.length} caracteres (máx. 60)`);
  const dl = art.description.length;
  if (dl < 150 || dl > 160) motivos.push(`description de ${dl} caracteres (debe ser 150–160)`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(art.date)) motivos.push("date inválida");
  if (!esPilar(art.pillar)) motivos.push(`pillar inválido: "${art.pillar}"`);
  const faltan = ["cliente", "video_url", "que_hicimos", "resultado", "permiso_publicacion"].filter(
    (k) => cr[k] === undefined || cr[k] === null || cr[k] === ""
  );
  if (faltan.length) motivos.push(`caso_real incompleto: falta ${faltan.join(", ")}`);
  if (art.caso_real.video_url.includes("[PLACEHOLDER")) motivos.push("caso_real.video_url es PLACEHOLDER");
  if (!art.caso_real.permiso_publicacion) motivos.push("caso_real.permiso_publicacion es false");
  if (esPlaceholder(art.caso_real.que_hicimos)) motivos.push("caso_real.que_hicimos es PLACEHOLDER");

  const lineas: { n: number; texto: string }[] = [];
  const offset = raw.slice(0, raw.indexOf(content)).split("\n").length - 1;
  content.split("\n").forEach((l, i) => {
    // La línea de resultado pendiente se elimina al renderizar; no bloquea.
    if (/^\s*\*\*Resultado:\*\*\s*\[RESULTADO/i.test(l)) return;
    if (l.match(CORCHETE)) lineas.push({ n: i + 1 + offset, texto: l.trim() });
  });
  if (lineas.length) motivos.push(`${lineas.length} línea(s) con texto entre corchetes en el cuerpo`);

  const links = Array.from(content.matchAll(/\]\(([^)\s]+)\)/g)).map((m) => m[1]);
  const internos = links.filter((h) => h.startsWith("/") || h.startsWith(SITE_URL)).length;
  const whatsapp = (content.match(/wa\.me\//g) || []).length;
  if (internos < 2) motivos.push(`${internos} enlace(s) interno(s) en el cuerpo (mín. 2)`);
  if (whatsapp < 1) motivos.push("Sin enlace a WhatsApp en el cuerpo");

  return {
    art,
    val: { archivo, slug: art.slug, publicado: motivos.length === 0, motivos, lineas },
  };
}

let cache: { art: Articulo; val: Validacion }[] | null = null;
function todos() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const archivos = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).sort() : [];
  cache = archivos.map(leer);
  return cache;
}

export function validaciones(): Validacion[] {
  return todos().map((x) => x.val);
}

export function publicados(pilar?: Pilar): Articulo[] {
  return todos()
    .filter((x) => x.val.publicado && (!pilar || x.art.pillar === pilar))
    .map((x) => x.art)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function porSlug(slug: string): Articulo | undefined {
  return publicados().find((a) => a.slug === slug);
}

export function relacionados(a: Articulo, n = 3): Articulo[] {
  return publicados(a.pillar).filter((x) => x.slug !== a.slug).slice(0, n);
}

/* ── Render ───────────────────────────────────────────────────── */

export type Faq = { pregunta: string; respuestaHtml: string; respuestaTexto: string };

function seccion(md: string, titulo: RegExp): { antes: string; seccion: string; despues: string } | null {
  const lineas = md.split("\n");
  const ini = lineas.findIndex((l) => /^##\s+/.test(l) && titulo.test(l.replace(/^##\s+/, "")));
  if (ini === -1) return null;
  let fin = lineas.findIndex((l, i) => i > ini && /^##\s+/.test(l));
  if (fin === -1) fin = lineas.length;
  return {
    antes: lineas.slice(0, ini).join("\n"),
    seccion: lineas.slice(ini + 1, fin).join("\n"),
    despues: lineas.slice(fin).join("\n"),
  };
}

const renderer = new marked.Renderer();
renderer.link = function ({ href, tokens }) {
  const contenido = this.parser.parseInline(tokens);
  const externo = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
  return `<a href="${href}"${externo ? ' target="_blank" rel="noopener noreferrer"' : ""}>${contenido}</a>`;
};
const html = (md: string) => marked.parse(md, { renderer, async: false }) as string;
const plano = (h: string) => h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function renderArticulo(a: Articulo) {
  // H1 = title: se quita el H1 del Markdown.
  let md = a.cuerpo.replace(/^\s*#\s+.+\n/, "");

  // El bloque "Caso real" se arma desde el frontmatter; del cuerpo solo se
  // conserva el texto de llamada a la acción.
  let cta = "";
  const caso = seccion(md, /^Caso real/i);
  if (caso) {
    md = `${caso.antes}\n${caso.despues}`;
    cta = caso.seccion
      .split(/\n\s*\n/)
      .filter((p) => p.trim() && !/^\s*\*\*(Qué hicimos|Resultado)/.test(p) && !/testimonios/i.test(p) && !/^\s*\[[^\]]+\]\s*$/.test(p))
      .join("\n\n");
  }

  // "Preguntas frecuentes": cada H3 + párrafo es una pregunta/respuesta.
  let faqs: Faq[] = [];
  const pf = seccion(md, /^Preguntas frecuentes$/i);
  if (pf) {
    md = `${pf.antes}\n${pf.despues}`;
    faqs = pf.seccion
      .split(/^###\s+/m)
      .slice(1)
      .map((bloque) => {
        const [q, ...resto] = bloque.split("\n");
        const r = html(resto.join("\n").trim());
        return { pregunta: q.trim(), respuestaHtml: r, respuestaTexto: plano(r) };
      });
  }

  const resultado = /\[RESULTADO/i.test(a.caso_real.resultado) ? "" : a.caso_real.resultado;

  return { cuerpoHtml: html(md), faqs, ctaHtml: cta ? html(cta) : "", resultado };
}

export const urlArticulo = (slug: string) => `${SITE_URL}/blog/${slug}`;
