// Centraliza los paths de los assets que Pablo va a entregar.
// Cuando se suban los archivos a /public/experiencia, basta con descomentar y apuntar.

export const ASSETS = {
  // Videos de Actos 3 y 4 — pueden ser archivos locales o URLs externas (Vimeo/Bunny/CDN).
  video1: undefined as string | undefined, // p.ej. "/experiencia/videos/video1.mp4"
  video2: undefined as string | undefined,

  // Testimonios del Acto 6 (Momento 3)
  testimonios: [] as { src: string; nombre: string }[],

  // Acto 6 — Momento 1 (WhatsApp)
  whatsapp: {
    contacto: {
      nombre: "Cliente PG",
      foto: undefined as string | undefined, // "/experiencia/whatsapp/avatar.jpg"
    },
    audioCliente: {
      src: undefined as string | undefined, // "/experiencia/audio/cliente.mp3"
      duracion: "0:24", // duración mostrada en la burbuja
    },
  },

  // Acto 7 — fotos del equipo
  equipo: [] as { nombre: string; foto?: string; tagline: string; destacado?: boolean }[],
};
