import fs from 'node:fs';
import path from 'node:path';
import { origenSitio } from './rutas';

/**
 * Archivos de marca que viven en public/listamedica/.
 *
 * Se resuelven una sola vez por proceso y solo si el archivo existe: así el
 * sitio nunca apunta a una imagen que no está, y meter la marca definitiva es
 * soltar el archivo sin tocar código.
 *
 * Es un módulo de servidor —usa node:fs—, así que no se importa desde
 * componentes de cliente.
 */

const CARPETA = path.join(process.cwd(), 'public', 'listamedica');

export function archivoDeMarca(nombres: string[]): string | null {
  for (const nombre of nombres) {
    try {
      if (fs.existsSync(path.join(CARPETA, nombre))) return `/listamedica/${nombre}`;
    } catch {
      // Sistema de archivos inaccesible: se cae en la alternativa tipográfica.
    }
  }
  return null;
}

const COMPARTIR = archivoDeMarca(['compartir.png', 'compartir.jpg', 'compartir.webp']);

/**
 * Imagen que se ve al compartir un enlace en WhatsApp o redes.
 *
 * Se declara a mano en cada página que define su propio bloque openGraph:
 * cuando una página lo declara, Next deja de heredar el del layout y la
 * convención de archivo no alcanza a rellenarlo. Devuelve undefined si el
 * archivo todavía no existe, que es mejor que una vista previa rota.
 */
export function imagenCompartir(propia?: string): string[] | undefined {
  // Ojo: lo que vive en public/ se sirve desde la raíz del dominio, no bajo
  // el base path. De ahí que se pegue al origen y no a urlAbsoluta.
  const elegida = propia || COMPARTIR;
  if (!elegida) return undefined;
  return [elegida.startsWith('http') ? elegida : `${origenSitio()}${elegida}`];
}
