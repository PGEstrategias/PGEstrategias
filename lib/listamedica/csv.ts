import { ESPECIALIDADES_BASE } from './catalogo';
import { normalizar, slugify } from './texto';
import type { EntradaProfesional } from './datos';
import type { Ciudad, Especialidad, Genero } from './tipos';

/**
 * CSV de carga masiva y de exportación.
 *
 * Un archivo, una fila por profesional, un solo consultorio por fila: si
 * alguien tiene dos consultorios se completa después en el panel. La plantilla
 * está pensada para que se pueda llenar en Excel sin explicar nada.
 */

export const COLUMNAS_IMPORTACION = [
  'titulo',
  'nombre',
  'apellidos',
  'cedula',
  'cedula_especialidad',
  'especialidades',
  'genero',
  'whatsapp',
  'telefono',
  'bio',
  'anios_experiencia',
  'universidad',
  'universidad_especialidad',
  'certificacion_consejo',
  'vigencia_certificacion',
  'idiomas',
  'aseguradoras',
  'google_place_id',
  'calle',
  'numero',
  'torre',
  'piso',
  'consultorio',
  'colonia',
  'cp',
  'ciudad',
  'lat',
  'lng',
  'referencias',
  'estacionamiento',
  'horario_texto',
  'atiende_fin_semana',
  'servicio_1',
  'precio_1',
  'servicio_2',
  'precio_2',
  'servicio_3',
  'precio_3',
] as const;

/** Analizador de CSV con comillas dobles y saltos de línea dentro de campo. */
export function analizarCSV(texto: string): string[][] {
  const filas: string[][] = [];
  let fila: string[] = [];
  let campo = '';
  let entreComillas = false;
  const limpio = texto.replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < limpio.length; i += 1) {
    const c = limpio[i];

    if (entreComillas) {
      if (c === '"') {
        if (limpio[i + 1] === '"') {
          campo += '"';
          i += 1;
        } else {
          entreComillas = false;
        }
      } else {
        campo += c;
      }
      continue;
    }

    if (c === '"') entreComillas = true;
    else if (c === ',') {
      fila.push(campo);
      campo = '';
    } else if (c === '\n') {
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = '';
    } else campo += c;
  }

  if (campo !== '' || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }

  return filas.filter((f) => f.some((x) => x.trim() !== ''));
}

export function aCSV(filas: (string | number | null)[][]): string {
  const escapar = (valor: string | number | null): string => {
    const texto = valor === null ? '' : String(valor);
    return /[",\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
  };
  // El BOM hace que Excel en Windows abra los acentos correctamente.
  return `﻿${filas.map((f) => f.map(escapar).join(',')).join('\n')}\n`;
}

export function plantillaCSV(): string {
  const ejemplo = [
    'Dra.',
    'Nombre',
    'Apellido Apellido',
    '1234567',
    '',
    'Dermatología',
    'femenino',
    '2221234567',
    '2221234567',
    'Breve descripción profesional de al menos 120 caracteres.',
    '10',
    'Universidad',
    '',
    '',
    '',
    'Español',
    'GNP, AXA',
    '',
    'Calle',
    '100',
    '',
    '',
    '',
    'Angelópolis',
    '72197',
    'puebla',
    '',
    '',
    'Referencias de cómo llegar',
    '',
    'Lunes a viernes de 10:00 a 19:00',
    'no',
    'Consulta',
    '900',
    '',
    '',
    '',
    '',
  ];
  return aCSV([COLUMNAS_IMPORTACION as unknown as string[], ejemplo]);
}

const CIUDADES: Ciudad[] = ['puebla', 'cholula', 'atlixco'];

export interface FilaImportada {
  linea: number;
  entrada: EntradaProfesional | null;
  nombre: string;
  problemas: string[];
}

const si = (valor: string) => /^(s[ií]|si|true|1|x)$/i.test(valor.trim());

const numeroONulo = (valor: string): number | null => {
  const limpio = valor.replace(/[^0-9.-]/g, '');
  if (!limpio) return null;
  const n = Number(limpio);
  return Number.isFinite(n) ? n : null;
};

/**
 * Convierte las filas del CSV en entradas listas para guardar.
 * Nunca lanza: devuelve los problemas por fila para mostrarlos antes de
 * escribir nada en la base.
 */
export function interpretarCSV(
  texto: string,
  catalogo: Especialidad[] = ESPECIALIDADES_BASE,
): FilaImportada[] {
  const filas = analizarCSV(texto);
  if (filas.length < 2) return [];

  const encabezados = filas[0].map((h) => normalizar(h).replace(/\s+/g, '_'));
  const indice = (columna: string) => encabezados.indexOf(columna);

  return filas.slice(1).map((fila, i) => {
    const dato = (columna: string): string => {
      const j = indice(columna);
      return j >= 0 ? (fila[j] ?? '').trim() : '';
    };

    const problemas: string[] = [];
    const nombre = dato('nombre');
    const apellidos = dato('apellidos');
    const nombreCompleto = `${nombre} ${apellidos}`.trim();

    if (!nombre || !apellidos) problemas.push('Falta el nombre o los apellidos.');
    if (!dato('whatsapp') && !dato('telefono')) problemas.push('Falta el WhatsApp.');

    const nombresEspecialidad = dato('especialidades')
      .split(/[,;|]/)
      .map((x) => x.trim())
      .filter(Boolean);

    const encontradas = nombresEspecialidad
      .map((buscado) =>
        catalogo.find(
          (e) =>
            normalizar(e.nombre) === normalizar(buscado) ||
            normalizar(e.nombre_plural) === normalizar(buscado) ||
            e.sinonimos.some((s) => normalizar(s) === normalizar(buscado)),
        ),
      )
      .filter((e): e is Especialidad => Boolean(e));

    if (nombresEspecialidad.length && encontradas.length !== nombresEspecialidad.length) {
      problemas.push('Alguna especialidad no está en el catálogo; se ignora.');
    }
    if (!encontradas.length) problemas.push('Sin especialidad reconocida.');

    const ciudadCruda = normalizar(dato('ciudad')) as Ciudad;
    const ciudad = CIUDADES.includes(ciudadCruda) ? ciudadCruda : 'puebla';
    if (dato('ciudad') && !CIUDADES.includes(ciudadCruda)) {
      problemas.push(`Ciudad "${dato('ciudad')}" no reconocida; se usa Puebla.`);
    }

    const generoCrudo = normalizar(dato('genero'));
    const genero: Genero =
      generoCrudo.startsWith('f') || generoCrudo === 'mujer'
        ? 'femenino'
        : generoCrudo.startsWith('m') && generoCrudo !== 'mujer'
          ? 'masculino'
          : 'no_especificado';

    const servicios = [1, 2, 3]
      .map((n) => ({
        nombre: dato(`servicio_${n}`),
        precio_desde: numeroONulo(dato(`precio_${n}`)),
      }))
      .filter((s) => s.nombre)
      .map((s) => ({ ...s, publicar_precio: s.precio_desde !== null }));

    if (problemas.some((p) => p.startsWith('Falta') || p.startsWith('Sin especialidad'))) {
      return { linea: i + 2, entrada: null, nombre: nombreCompleto, problemas };
    }

    const entrada: EntradaProfesional = {
      profesional: {
        id: '',
        nombre,
        apellidos,
        titulo: dato('titulo'),
        cedula: dato('cedula').replace(/\D/g, ''),
        cedula_especialidad: dato('cedula_especialidad').replace(/\D/g, ''),
        slug: slugify(`${nombreCompleto} ${encontradas[0]?.nombre ?? ''} ${ciudad}`),
        bio: dato('bio'),
        foto_url: '',
        telefono: dato('telefono'),
        whatsapp: dato('whatsapp') || dato('telefono'),
        genero,
        idiomas: dato('idiomas').split(/[,;]/).map((x) => x.trim()).filter(Boolean),
        anios_experiencia: numeroONulo(dato('anios_experiencia')),
        universidad: dato('universidad'),
        universidad_especialidad: dato('universidad_especialidad'),
        certificacion_consejo: dato('certificacion_consejo'),
        vigencia_certificacion: dato('vigencia_certificacion'),
        aseguradoras: dato('aseguradoras').split(/[,;]/).map((x) => x.trim()).filter(Boolean),
        google_place_id: dato('google_place_id'),
        google_rating: null,
        google_reviews_count: null,
        google_sync_at: null,
        // La importación nunca marca cédulas como verificadas: eso se hace a
        // mano, con la captura de la SEP enfrente.
        verificado_en: null,
        evidencia_verificacion_url: '',
        estatus: 'borrador',
        es_fundador: true,
      },
      especialidad_ids: encontradas.map((e) => e.id),
      especialidad_principal_id: encontradas[0]?.id ?? '',
      consultorios: [
        {
          calle: dato('calle'),
          numero: dato('numero'),
          torre: dato('torre'),
          piso: dato('piso'),
          consultorio: dato('consultorio'),
          colonia: dato('colonia'),
          cp: dato('cp'),
          ciudad,
          lat: numeroONulo(dato('lat')),
          lng: numeroONulo(dato('lng')),
          referencias: dato('referencias'),
          estacionamiento: dato('estacionamiento'),
          horario_texto: dato('horario_texto'),
          atiende_fin_semana: si(dato('atiende_fin_semana')),
        },
      ],
      servicios,
      faqs: [],
    };

    return { linea: i + 2, entrada, nombre: nombreCompleto, problemas };
  });
}
