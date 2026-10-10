/* Configuración compartida del sitio principal de PG Estrategias.
   Los valores marcados "A CONFIRMAR" se tomaron del sitio actual y esperan
   validación antes de publicar. */

export const SITE_URL = "https://pgestrategias.com";

/* A CONFIRMAR: número de WhatsApp de la home. Es el que usa hoy el sitio. */
export const WHATSAPP_NUMERO = "5212221215051";
export const WHATSAPP_VISIBLE = "222 121 5051";

/* A CONFIRMAR: correo de contacto. Es el que usa hoy el sitio. */
export const EMAIL = "contacto@pgestrategias.com";

/* Aviso de privacidad: la página ya existe en el sitio. */
export const AVISO_PRIVACIDAD = "/privacidad";

export const MSG_GENERAL =
  "Hola, me interesa saber más sobre los servicios de PG Estrategias.";

export function waLink(mensaje: string = MSG_GENERAL) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Industrias", href: "/industrias" },
  { label: "Testimonios", href: "/testimonios" },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_LINKS = [...NAV_LINKS, { label: "Contacto", href: "/contacto" }];
