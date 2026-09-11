import type { MetadataRoute } from 'next';
import { ruta, urlAbsoluta } from '@/lib/listamedica/rutas';

/**
 * robots.txt del sitio.
 *
 * Lo importante aquí es el panel de Lista Médica, que no debe indexarse, y el
 * sitemap del directorio, que sí queremos que los buscadores encuentren solo.
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
    sitemap: urlAbsoluta('/sitemap.xml'),
  };
}
