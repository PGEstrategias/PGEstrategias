/** Utilidades de texto: slugs sin acentos, formatos y normalización de búsqueda. */

const CIUDADES: Record<string, string> = {
  puebla: 'Puebla',
  cholula: 'Cholula',
  atlixco: 'Atlixco',
};

/** Quita acentos y deja solo a-z0-9 con guiones. */
export function slugify(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Normaliza para comparar búsquedas: minúsculas, sin acentos, sin dobles espacios. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function nombreCiudad(slug: string): string {
  return CIUDADES[slug] ?? slug;
}

export function ciudadesDisponibles(): { slug: string; nombre: string }[] {
  return Object.entries(CIUDADES).map(([slug, nombre]) => ({ slug, nombre }));
}

/** "Dr." / "Dra." + nombre y apellidos, sin espacios dobles. */
export function nombreCompleto(p: {
  titulo?: string;
  nombre: string;
  apellidos: string;
}): string {
  return [p.titulo, p.nombre, p.apellidos].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

/** Sin título profesional — para el mensaje de WhatsApp. */
export function nombreSinTitulo(p: { nombre: string; apellidos: string }): string {
  return `${p.nombre} ${p.apellidos}`.replace(/\s+/g, ' ').trim();
}

export function precioMXN(valor: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(valor);
}

export function fechaLarga(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Mexico_City',
  }).format(d);
}

export function fechaCorta(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City',
  }).format(d);
}

/**
 * Formato de cédula profesional de la SEP: 7 u 8 dígitos.
 * Devuelve null si es válida, o el motivo si no.
 */
export function validarCedula(valor: string): string | null {
  const limpio = valor.trim();
  if (!limpio) return 'Escribe el número de cédula.';
  if (!/^\d+$/.test(limpio)) return 'La cédula solo lleva dígitos, sin letras ni guiones.';
  if (limpio.length < 7 || limpio.length > 8) {
    return 'La cédula de la SEP tiene 7 u 8 dígitos.';
  }
  return null;
}

/** Deja un teléfono mexicano en formato E.164 sin "+", listo para wa.me. */
export function telefonoParaWhatsApp(valor: string): string {
  const digitos = valor.replace(/\D/g, '');
  if (digitos.length === 10) return `52${digitos}`;
  if (digitos.length === 12 && digitos.startsWith('52')) return digitos;
  if (digitos.length === 13 && digitos.startsWith('521')) return `52${digitos.slice(3)}`;
  return digitos;
}

/** 2221215051 -> "222 121 5051" */
export function telefonoLegible(valor: string): string {
  const d = valor.replace(/\D/g, '').replace(/^52/, '');
  if (d.length !== 10) return valor;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}
