/**
 * Todas las URLs de Lista Médica se construyen aquí.
 *
 * El sitio vive hoy en pgestrategias.com/listamedicamx y mañana en
 * listamedica.mx. Nada en el código debe llevar la ruta quemada: al migrar
 * se cambia NEXT_PUBLIC_LISTAMEDICA_BASE_PATH a "" y todo sigue funcionando.
 */

const BASE_PATH = (process.env.NEXT_PUBLIC_LISTAMEDICA_BASE_PATH ?? '/listamedicamx').replace(
  /\/+$/,
  '',
);

export const basePath = BASE_PATH;

/** Une el base path con una ruta interna. ruta('/registro') -> '/listamedicamx/registro' */
export function ruta(camino = '/'): string {
  const limpio = camino === '/' ? '' : `/${camino.replace(/^\/+/, '')}`;
  return `${BASE_PATH}${limpio}` || '/';
}

export const rutas = {
  home: () => ruta('/'),
  perfil: (slug: string) => ruta(`/dr/${slug}`),
  listado: (especialidadSlug: string, ciudadSlug: string) =>
    ruta(`/${especialidadSlug}-en-${ciudadSlug}`),
  contacto: (profesionalId: string) => ruta(`/w/${profesionalId}`),
  buscar: (termino: string, ciudad: string) =>
    `${ruta('/buscar')}?q=${encodeURIComponent(termino)}&ciudad=${encodeURIComponent(ciudad)}`,
  registro: () => ruta('/registro'),
  comoVerificamos: () => ruta('/como-verificamos'),
  privacidad: () => ruta('/aviso-de-privacidad'),
  terminos: () => ruta('/terminos'),
  precios: () => ruta('/precios'),
  admin: () => ruta('/admin'),
  adminProfesionales: () => ruta('/admin/profesionales'),
  adminNuevo: () => ruta('/admin/profesionales/nuevo'),
  adminEditar: (id: string) => ruta(`/admin/profesionales/${id}`),
  adminImportar: () => ruta('/admin/importar'),
  sitemap: () => ruta('/sitemap.xml'),
};

/** URL absoluta, para JSON-LD, canonical y sitemap. */
export function urlAbsoluta(camino = '/'): string {
  const origen = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pgestrategias.com').replace(
    /\/+$/,
    '',
  );
  return `${origen}${ruta(camino)}`;
}

/** Separa "dermatologos-en-puebla" en sus dos mitades. */
export function partirListado(
  segmento: string,
): { especialidadSlug: string; ciudadSlug: string } | null {
  const corte = segmento.lastIndexOf('-en-');
  if (corte <= 0) return null;
  const especialidadSlug = segmento.slice(0, corte);
  const ciudadSlug = segmento.slice(corte + 4);
  if (!especialidadSlug || !ciudadSlug) return null;
  return { especialidadSlug, ciudadSlug };
}
