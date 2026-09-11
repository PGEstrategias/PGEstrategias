/** Datos de contacto y textos legales fijos de Lista Médica. */

export const MARCA = {
  nombre: 'Lista Médica',
  responsable: 'Pablo Guillermo Grageda Jiménez',
  operaComo: 'PG Estrategias',
  correo: 'contacto@pgestrategias.com',
  whatsappNumero: '522201758468',
  whatsappLegible: '220 175 8468',
  ciudad: 'Puebla, México',
  precioFundador: '$500 MXN al semestre',
  cupoFundador: 1000,
} as const;

/**
 * Domicilio fiscal del responsable. Se llena por variable de entorno porque
 * no es un dato que deba inventarse: si falta, el aviso lo dice en lugar de
 * poner una dirección falsa.
 */
export function domicilioFiscal(): string {
  const valor = process.env.LISTAMEDICA_DOMICILIO_FISCAL?.trim();
  return valor || '[domicilio fiscal pendiente de configurar]';
}

export function domicilioConfigurado(): boolean {
  return Boolean(process.env.LISTAMEDICA_DOMICILIO_FISCAL?.trim());
}

/** WhatsApp de PG Estrategias, para la landing de captación. */
export function whatsappPG(mensaje: string): string {
  return `https://wa.me/${MARCA.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

/** Texto de alcance del sello. Va íntegro junto al sello en cada perfil. */
export const TEXTO_SELLO =
  'Lista Médica verificó que el número de cédula profesional declarado por este profesional existe y corresponde a su nombre en el Registro Nacional de Profesionistas de la Secretaría de Educación Pública, en la fecha indicada. Esta verificación no constituye certificación de competencia clínica, recomendación, ni garantía sobre la calidad de la atención. Lista Médica no presta servicios de salud.';

/** Aviso corto que acompaña al botón de WhatsApp. */
export const AVISO_WHATSAPP =
  'Al escribir por WhatsApp, la conversación es directamente con el profesional. Lista Médica no participa en ella ni guarda su contenido.';

/** Redacción cerrada sobre la gratuidad. No se le cambia una coma. */
export const TEXTO_GRATUIDAD =
  'Gratis durante la etapa de lanzamiento. Cuando la plataforma empiece a cobrar, avisaremos con 30 días de anticipación. Los primeros 1,000 perfiles conservan el precio de fundador: $500 MXN al semestre, IVA incluido y con factura, sin aumentos.';

/**
 * Fecha de publicación del Aviso de Privacidad vigente.
 * Se actualiza a mano cada vez que cambia el texto del aviso.
 */
export const FECHA_AVISO = '2026-09-11';
export const VERSION_AVISO = '1.0';

/** Buscador público de la SEP, para verificar en otra pestaña. */
export const URL_SEP = 'https://cedulaprofesional.sep.gob.mx/cedula/indexAvanzada.action';
