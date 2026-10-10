import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { publicados } from "@/lib/blog";
import { INDUSTRIAS_DETALLE } from "@/data/paginas";

/* Sitemap del sitio principal. Los artículos bloqueados no aparecen. El
   directorio de Lista Médica publica su propio sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const pagina = (
    ruta: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({ url: `${SITE_URL}${ruta}`, lastModified: ahora, changeFrequency, priority });

  return [
    pagina("/", 1, "weekly"),
    pagina("/servicios", 0.9),
    pagina("/industrias", 0.8),
    ...INDUSTRIAS_DETALLE.map((i) => pagina(`/industrias/${i.slug}`, 0.8)),
    pagina("/testimonios", 0.7),
    pagina("/blog", 0.7, "weekly"),
    ...publicados().map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: new Date(`${a.date}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    pagina("/contacto", 0.6),
    pagina("/privacidad", 0.2, "yearly"),
    pagina("/terminos", 0.2, "yearly"),
  ];
}
