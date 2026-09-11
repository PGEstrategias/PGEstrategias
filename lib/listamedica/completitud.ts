import type { Consultorio, Faq, Profesional, Servicio } from './tipos';

/**
 * Completitud del perfil en porcentaje.
 *
 * No es cosmética: el panel usa este número para ordenar a quién hay que
 * perseguir por teléfono. Los campos pesan distinto porque un perfil sin
 * WhatsApp no sirve para nada y uno sin aseguradoras sirve casi igual.
 */

interface Entrada {
  profesional: Profesional;
  consultorios: Consultorio[];
  servicios: Servicio[];
  faqs: Faq[];
  especialidades: number;
}

interface Campo {
  clave: string;
  etiqueta: string;
  peso: number;
  lleno: (e: Entrada) => boolean;
}

const lleno = (v: string | null | undefined) => typeof v === 'string' && v.trim().length > 0;

export const CAMPOS_COMPLETITUD: Campo[] = [
  { clave: 'nombre', etiqueta: 'Nombre y apellidos', peso: 10, lleno: (e) => lleno(e.profesional.nombre) && lleno(e.profesional.apellidos) },
  { clave: 'cedula', etiqueta: 'Cédula profesional', peso: 10, lleno: (e) => lleno(e.profesional.cedula) },
  { clave: 'verificacion', etiqueta: 'Cédula verificada ante la SEP', peso: 12, lleno: (e) => lleno(e.profesional.verificado_en) },
  { clave: 'whatsapp', etiqueta: 'WhatsApp', peso: 12, lleno: (e) => lleno(e.profesional.whatsapp) },
  { clave: 'especialidad', etiqueta: 'Al menos una especialidad', peso: 8, lleno: (e) => e.especialidades > 0 },
  { clave: 'consultorio', etiqueta: 'Consultorio con dirección', peso: 10, lleno: (e) => e.consultorios.some((c) => lleno(c.calle) && lleno(c.colonia)) },
  { clave: 'mapa', etiqueta: 'Coordenadas en el mapa', peso: 5, lleno: (e) => e.consultorios.some((c) => c.lat !== null && c.lng !== null) },
  { clave: 'horario', etiqueta: 'Horario de atención', peso: 5, lleno: (e) => e.consultorios.some((c) => lleno(c.horario_texto)) },
  { clave: 'foto', etiqueta: 'Fotografía', peso: 8, lleno: (e) => lleno(e.profesional.foto_url) },
  { clave: 'bio', etiqueta: 'Biografía de al menos 120 caracteres', peso: 6, lleno: (e) => e.profesional.bio.trim().length >= 120 },
  { clave: 'formacion', etiqueta: 'Universidad', peso: 4, lleno: (e) => lleno(e.profesional.universidad) },
  { clave: 'servicios', etiqueta: 'Servicios con precio publicado', peso: 5, lleno: (e) => e.servicios.some((s) => s.publicar_precio && s.precio_desde !== null) },
  { clave: 'faqs', etiqueta: 'Al menos una pregunta frecuente', peso: 3, lleno: (e) => e.faqs.length > 0 },
  { clave: 'idiomas', etiqueta: 'Idiomas', peso: 2, lleno: (e) => e.profesional.idiomas.length > 0 },
];

const TOTAL = CAMPOS_COMPLETITUD.reduce((suma, c) => suma + c.peso, 0);

export function calcularCompletitud(entrada: Entrada): number {
  const logrado = CAMPOS_COMPLETITUD.reduce(
    (suma, campo) => suma + (campo.lleno(entrada) ? campo.peso : 0),
    0,
  );
  return Math.round((logrado / TOTAL) * 100);
}

/** Qué le falta al perfil, en orden de importancia. Alimenta el panel. */
export function faltantes(entrada: Entrada): string[] {
  return CAMPOS_COMPLETITUD.filter((c) => !c.lleno(entrada))
    .sort((a, b) => b.peso - a.peso)
    .map((c) => c.etiqueta);
}
