import { NextResponse } from 'next/server';
import { combinacionesConPerfiles, esVisible, todosCompletos } from '@/lib/listamedica/datos';
import { urlAbsoluta } from '@/lib/listamedica/rutas';

export const revalidate = 3600;

/**
 * Sitemap propio de Lista Médica: cada perfil y cada combinación de
 * especialidad × ciudad que tenga al menos un profesional.
 *
 * Vive bajo el base path porque el directorio se va a mudar a su propio
 * dominio y entonces este archivo se convierte en el sitemap raíz sin tocar
 * una línea.
 */
export async function GET() {
  const [perfiles, combinaciones] = await Promise.all([
    todosCompletos(),
    combinacionesConPerfiles(),
  ]);

  const entradas: { url: string; prioridad: string; frecuencia: string }[] = [
    { url: urlAbsoluta('/'), prioridad: '1.0', frecuencia: 'daily' },
    { url: urlAbsoluta('/registro'), prioridad: '0.8', frecuencia: 'monthly' },
    { url: urlAbsoluta('/como-verificamos'), prioridad: '0.7', frecuencia: 'monthly' },
    { url: urlAbsoluta('/precios'), prioridad: '0.6', frecuencia: 'monthly' },
    { url: urlAbsoluta('/aviso-de-privacidad'), prioridad: '0.3', frecuencia: 'yearly' },
    { url: urlAbsoluta('/terminos'), prioridad: '0.3', frecuencia: 'yearly' },
  ];

  combinaciones.forEach(({ especialidad, ciudad }) => {
    entradas.push({
      url: urlAbsoluta(`/${especialidad.slug}-en-${ciudad}`),
      prioridad: '0.9',
      frecuencia: 'weekly',
    });
  });

  perfiles.filter(esVisible).forEach((p) => {
    entradas.push({ url: urlAbsoluta(`/dr/${p.slug}`), prioridad: '0.8', frecuencia: 'weekly' });
  });

  const hoy = new Date().toISOString().slice(0, 10);
  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entradas
  .map(
    (e) =>
      `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${hoy}</lastmod>\n    <changefreq>${e.frecuencia}</changefreq>\n    <priority>${e.prioridad}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new NextResponse(cuerpo, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
