/* Datos de contacto de PG Estrategias para la landing de bodas.
   Un solo lugar: si cambia el número, cambia aquí. */
export const WHATSAPP_NUMBER = "522201758468";
export const WHATSAPP_DISPLAY = "+52 220 175 8468";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "contacto@pgestrategias.com";

export function whatsappUrl(mensaje: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(mensaje)}`;
}
