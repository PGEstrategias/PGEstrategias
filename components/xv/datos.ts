/* Invitación digital — XV años de Sack (cliente de PG Event Films).
   Los valores vacíos ("") son datos pendientes de la familia: la página
   los muestra como "por confirmar" y no inventa nada. */

export const XV = {
  nombre: "Sack",
  /* Viernes 27 de noviembre de 2026, hora del centro de México (UTC-6). */
  fechaISO: "2026-11-27",
  fechaLarga: "Viernes 27 de noviembre de 2026",
  fechaCorta: "27 · 11 · 2026",

  /* PENDIENTE: hora de inicio, formato 24 h, p. ej. "20:00". */
  hora: "",
  /* PENDIENTE: salón o lugar de la recepción y su dirección. */
  lugar: "",
  direccion: "",
  /* PENDIENTE: enlace de Google Maps del lugar. */
  maps: "",

  /* PENDIENTE: WhatsApp donde la familia recibe las confirmaciones
     (52 + 10 dígitos) y fecha límite para confirmar. */
  whatsappRsvp: "",
  fechaLimite: "",

  /* PENDIENTE: ID del video de YouTube de "Neo Roneo" de Latin Mafia
     (lo que va después de v= en el enlace). */
  youtubeId: "",
  cancion: "Neo Roneo",
  artista: "Latin Mafia",
};

export const FOTOS = [
  { src: "/xvsack/01-bebe.webp", w: 522, h: 740, pie: "Donde todo empezó" },
  { src: "/xvsack/02-nina.webp", w: 528, h: 960, pie: "Siempre con estilo" },
  { src: "/xvsack/03-guitarra.webp", w: 825, h: 1100, pie: "La música llegó" },
  { src: "/xvsack/04-acustica.webp", w: 960, h: 720, pie: "Y se quedó" },
  { src: "/xvsack/05-hoy.webp", w: 999, h: 775, pie: "Hoy, XV" },
];

/* Reseña que compartió la quinceañera, en versión corta. */
export const HISTORIA = [
  "Soy una persona que disfruta descubrir cosas nuevas, compartir momentos especiales con las personas que quiero y crear recuerdos que permanezcan en mi corazón.",
  "Hoy comienzo una etapa llena de sueños, ilusiones y nuevas aventuras. Celebrar mis XV años es agradecer por lo vivido, valorar a quienes me acompañan y dar la bienvenida a todo lo bonito que está por venir.",
];

export const FRASE =
  "Porque hay momentos que se recuerdan, canciones que se sienten y noches que se quedan para siempre en el corazón.";
