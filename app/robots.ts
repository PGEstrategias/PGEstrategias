import type { MetadataRoute } from 'next';
import { ruta, urlAbsoluta } from '@/lib/listamedica/rutas';
import { SITE_URL } from '@/lib/site';

/**
 * robots.txt del sitio.
 *
 * Lo importante aquí es el panel de Lista Médica, que no debe indexarse, y los
 * sitemaps del sitio principal y del directorio.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [`${ruta('/admin')}`, '/enviar', '/login', '/api/'],
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, urlAbsoluta('/sitemap.xml')],
  };
}
