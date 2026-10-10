/* Artículos del blog. La home muestra los 3 más recientes publicados.
   Cuando exista la sección /blog, esta lista debe salir de la misma fuente
   que use esa sección. Los textos son PLACEHOLDER hasta tener los artículos. */

export type Articulo = {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO yyyy-mm-dd
  publicado: boolean;
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "placeholder-articulo-1",
    titulo: "[PLACEHOLDER: título del artículo 1]",
    descripcion: "[PLACEHOLDER: descripción corta del artículo 1]",
    fecha: "2026-10-03",
    publicado: true,
  },
  {
    slug: "placeholder-articulo-2",
    titulo: "[PLACEHOLDER: título del artículo 2]",
    descripcion: "[PLACEHOLDER: descripción corta del artículo 2]",
    fecha: "2026-09-26",
    publicado: true,
  },
  {
    slug: "placeholder-articulo-3",
    titulo: "[PLACEHOLDER: título del artículo 3]",
    descripcion: "[PLACEHOLDER: descripción corta del artículo 3]",
    fecha: "2026-09-19",
    publicado: true,
  },
];

export function ultimosArticulos(n = 3): Articulo[] {
  return ARTICULOS.filter((a) => a.publicado)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, n);
}
