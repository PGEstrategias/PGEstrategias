/* Datos de contacto de PG Estrategias para el vertical de bodas.
   Un solo lugar: si cambia el número, cambia aquí. */
export const WHATSAPP_NUMBER = "522201758468";
export const WHATSAPP_DISPLAY = "+52 220 175 8468";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "contacto@pgestrategias.com";

/* PG Event Films: marca colateral de PG Estrategias para eventos sociales
   (bodas, XV años, brindis y más). Mismo isotipo, otra palabra. */
export const MARCA = "PG Event Films";
export const MARCA_LABEL = "Event Films";

/* Champaña de la paleta de eventos — para el triángulo del logo de PG. */
export const GOLD = "#D2AE6D";

export function whatsappUrl(mensaje: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(mensaje)}`;
}

export type NavLink = { label: string; href: string };
