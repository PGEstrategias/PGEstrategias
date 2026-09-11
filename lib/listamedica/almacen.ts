import fs from 'node:fs/promises';
import path from 'node:path';
import type { BaseListaMedica } from './tipos';

/**
 * Almacén de Lista Médica: una tabla por archivo JSON.
 *
 * Es deliberadamente pequeño y aislado detrás de `leerTabla` / `escribirTabla`.
 * El día que el directorio crezca lo suficiente para pedir Postgres, se
 * reemplazan esas dos funciones y nada más del código se entera: el esquema
 * SQL equivalente está en docs/listamedica-esquema.sql.
 *
 * Aviso operativo: en un entorno con sistema de archivos de solo lectura
 * (por ejemplo funciones serverless), las escrituras se quedan en memoria del
 * proceso y se pierden al reciclarse. Apunta LISTAMEDICA_DATA_DIR a un
 * volumen con permiso de escritura para que el panel /admin persista.
 */

export type Tabla = keyof BaseListaMedica;

const TABLAS: Tabla[] = [
  'profesionales',
  'especialidades',
  'prof_especialidad',
  'consultorios',
  'servicios',
  'faqs',
  'clics',
  'busquedas',
  'verificaciones',
  'resenas',
];

function directorio(): string {
  return process.env.LISTAMEDICA_DATA_DIR ?? path.join(process.cwd(), 'data', 'listamedica');
}

/** Raíz de datos. La usan también las evidencias de verificación. */
export function directorioDatos(): string {
  return directorio();
}

function archivo(tabla: Tabla): string {
  return path.join(directorio(), `${tabla}.json`);
}

/** El caché vive en globalThis para sobrevivir al recargado en caliente de dev. */
type Cache = { datos: Partial<Record<Tabla, unknown[]>>; soloMemoria: boolean };
const cache: Cache = ((globalThis as Record<string, unknown>).__listaMedicaCache as Cache) ?? {
  datos: {},
  soloMemoria: false,
};
(globalThis as Record<string, unknown>).__listaMedicaCache = cache;

export function escrituraEnMemoria(): boolean {
  return cache.soloMemoria;
}

export async function leerTabla<T extends Tabla>(tabla: T): Promise<BaseListaMedica[T]> {
  const enCache = cache.datos[tabla];
  if (enCache) return enCache as BaseListaMedica[T];

  let filas: unknown[] = [];
  try {
    const crudo = await fs.readFile(archivo(tabla), 'utf8');
    const parseado = JSON.parse(crudo);
    filas = Array.isArray(parseado) ? parseado : [];
  } catch {
    // Tabla todavía no creada: se comporta como vacía.
    filas = [];
  }
  cache.datos[tabla] = filas;
  return filas as BaseListaMedica[T];
}

export async function escribirTabla<T extends Tabla>(
  tabla: T,
  filas: BaseListaMedica[T],
): Promise<void> {
  cache.datos[tabla] = filas as unknown[];
  try {
    await fs.mkdir(directorio(), { recursive: true });
    await fs.writeFile(archivo(tabla), `${JSON.stringify(filas, null, 2)}\n`, 'utf8');
  } catch {
    // Sistema de archivos de solo lectura: el dato queda en memoria y lo
    // avisamos en el panel en lugar de tronar la petición.
    cache.soloMemoria = true;
  }
}

/**
 * Cola de escritura, una por tabla.
 *
 * Dos visitantes que oprimen el botón de WhatsApp al mismo tiempo hacen dos
 * leer-modificar-escribir sobre el mismo archivo, y sin turno uno de los dos
 * clics se pierde. Es justo la métrica de la que vive el producto, así que las
 * escrituras de cada tabla se encadenan.
 */
const colas = new Map<Tabla, Promise<unknown>>();

function enTurno<R>(tabla: Tabla, tarea: () => Promise<R>): Promise<R> {
  const anterior = colas.get(tabla) ?? Promise.resolve();
  const siguiente = anterior.then(tarea, tarea);
  colas.set(
    tabla,
    siguiente.catch(() => undefined),
  );
  return siguiente;
}

/** Agrega una fila sin reescribir el resto del código de cada tabla. */
export async function agregarFila<T extends Tabla>(
  tabla: T,
  fila: BaseListaMedica[T][number],
): Promise<void> {
  await enTurno(tabla, async () => {
    const filas = await leerTabla(tabla);
    await escribirTabla(tabla, [...filas, fila] as BaseListaMedica[T]);
  });
}

/** Vacía el caché. Se usa después de sembrar o importar por CSV. */
export function limpiarCache(): void {
  cache.datos = {};
}

export function tablas(): Tabla[] {
  return [...TABLAS];
}

/** Identificador corto, ordenable por tiempo y suficiente para este volumen. */
export function nuevoId(prefijo = ''): string {
  const tiempo = Date.now().toString(36);
  const azar = Math.random().toString(36).slice(2, 8);
  return `${prefijo}${tiempo}${azar}`;
}
