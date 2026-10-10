import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Sitemap del sitio principal. Agregar aquí /servicios, /industrias,
   /testimonios, /blog y /contacto cuando esas páginas existan. El directorio
   de Lista Médica publica su propio sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terminos`, lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
  ];
}
