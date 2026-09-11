import { escribirTabla, leerTabla } from './almacen';
import type { Profesional } from './tipos';

/**
 * Sincronización con Google Places.
 *
 * Traemos únicamente calificación, número de reseñas y la referencia a la
 * ficha. El texto de las reseñas no se copia ni se guarda: los términos de la
 * API de Google restringen almacenar su contenido, y no alojarlo nos deja
 * fuera de cualquier reclamo por lo que alguien escribió.
 */

export interface ResultadoSincronizacion {
  profesional_id: string;
  nombre: string;
  estado: 'actualizado' | 'sin_ficha' | 'error';
  detalle?: string;
}

interface RespuestaPlaces {
  rating?: number;
  userRatingCount?: number;
  error?: { message?: string };
}

async function consultarFicha(placeId: string, llave: string): Promise<RespuestaPlaces> {
  const respuesta = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
    {
      headers: {
        'X-Goog-Api-Key': llave,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
      cache: 'no-store',
    },
  );
  return (await respuesta.json()) as RespuestaPlaces;
}

/**
 * Refresca la reputación de todos los perfiles que tengan google_place_id.
 * Los que no tienen ficha se quedan en null y el perfil simplemente no
 * muestra ese bloque.
 */
export async function sincronizarGoogle(): Promise<ResultadoSincronizacion[]> {
  const llave = process.env.GOOGLE_PLACES_API_KEY ?? process.env.GOOGLE_MAPS_API_KEY;
  const profesionales = await leerTabla('profesionales');

  if (!llave) {
    return [
      {
        profesional_id: '',
        nombre: '',
        estado: 'error',
        detalle: 'Falta GOOGLE_PLACES_API_KEY en las variables de entorno.',
      },
    ];
  }

  const resultados: ResultadoSincronizacion[] = [];
  const actualizados: Profesional[] = [];

  for (const p of profesionales) {
    const nombre = `${p.nombre} ${p.apellidos}`.trim();

    if (!p.google_place_id) {
      actualizados.push(p);
      resultados.push({ profesional_id: p.id, nombre, estado: 'sin_ficha' });
      continue;
    }

    try {
      const ficha = await consultarFicha(p.google_place_id, llave);

      if (ficha.error || typeof ficha.rating !== 'number') {
        actualizados.push(p);
        resultados.push({
          profesional_id: p.id,
          nombre,
          estado: 'error',
          detalle: ficha.error?.message ?? 'La ficha no devolvió calificación.',
        });
        continue;
      }

      actualizados.push({
        ...p,
        google_rating: ficha.rating,
        google_reviews_count: ficha.userRatingCount ?? 0,
        google_sync_at: new Date().toISOString(),
      });
      resultados.push({ profesional_id: p.id, nombre, estado: 'actualizado' });
    } catch (e) {
      actualizados.push(p);
      resultados.push({
        profesional_id: p.id,
        nombre,
        estado: 'error',
        detalle: e instanceof Error ? e.message : 'Error desconocido.',
      });
    }
  }

  await escribirTabla('profesionales', actualizados);
  return resultados;
}
