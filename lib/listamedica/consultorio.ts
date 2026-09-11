import { nombreCiudad } from './texto';
import type { Consultorio } from './tipos';

/** "Boulevard del Niño Poblano 2901, Torre Médica II, piso 5, consultorio 507" */
export function direccionLegible(c: Consultorio): string {
  const partes = [
    [c.calle, c.numero].filter(Boolean).join(' '),
    c.torre,
    c.piso ? `piso ${c.piso}` : '',
    c.consultorio ? `consultorio ${c.consultorio}` : '',
  ].filter(Boolean);
  return partes.join(', ');
}

/** "Angelópolis, Puebla" */
export function zonaLegible(c: Consultorio): string {
  return [c.colonia, nombreCiudad(c.ciudad)].filter(Boolean).join(', ');
}

/** Dirección completa en una línea, para JSON-LD y para el mapa. */
export function direccionCompleta(c: Consultorio): string {
  return [direccionLegible(c), c.colonia, c.cp, nombreCiudad(c.ciudad), 'México']
    .filter(Boolean)
    .join(', ');
}

/**
 * Enlace a Google Maps. Si hay coordenadas se usan, porque llevan al punto
 * exacto del consultorio y no a la mitad de la calle.
 */
export function urlMapa(c: Consultorio | undefined): string | null {
  if (!c) return null;
  if (c.lat !== null && c.lng !== null) {
    return `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;
  }
  const direccion = direccionCompleta(c);
  if (!direccion) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
}

/** Mapa embebido sin API key: suficiente para ubicar, sin costo por carga. */
export function urlMapaEmbebido(c: Consultorio | undefined): string | null {
  if (!c) return null;
  if (c.lat === null || c.lng === null) return null;
  const d = 0.004;
  const caja = `${c.lng - d}%2C${c.lat - d}%2C${c.lng + d}%2C${c.lat + d}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${caja}&layer=mapnik&marker=${c.lat}%2C${c.lng}`;
}
