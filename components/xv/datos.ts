/* Invitaciones digitales de XV años (clientes de PG Event Films).
   Cada quinceañera es un objeto ConfigXV; el componente InvitacionXV solo
   lo acomoda. Los valores vacíos ("" o listas vacías) son datos pendientes
   de la familia: la página los oculta o los muestra como "por confirmar" y
   no inventa nada. */

export type Lugar = {
  nombre: string;
  hora: string; // 24 h
  horaTexto: string;
  maps: string;
  direccion?: string;
};

/* `pos`: encuadre dentro del marco (object-position), si la persona no está al centro. */
export type Foto = { src: string; w: number; h: number; pie: string; pos?: string };

export type ConfigXV = {
  /* Identifica la hoja de Google donde caen las confirmaciones. */
  evento: "sack" | "fatima";
  /* Tema visual. Sin tema: negro y rosa (Sack). "bella": La Bella y la Bestia. */
  tema?: "bella";
  nombre: string;
  nombreCompleto?: string;
  fechaISO: string;
  fechaLarga: string;
  fechaCorta: string;

  /* Hora de inicio (24 h, para la cuenta regresiva) y como se lee. */
  hora: string;
  horaTexto: string;
  /* Fiesta. Si hay misa, va en `ceremonia` y se muestran las dos. */
  lugar: string;
  direccion: string;
  maps: string;
  ceremonia?: Lugar;
  recepcion?: Lugar;

  padres?: string[];
  padrinos?: string[];

  whatsappRsvp: string;
  fechaLimite: string;

  youtubeId: string;
  cancion: string;
  artista: string;
  spotifyPlaylist?: string;

  vestimenta: {
    titulo: string;
    acento: string;
    texto: string;
    colores: string[];
    /* Color reservado para la quinceañera, si lo hay. */
    reservado?: string;
  };
  avisos: { icono: string; titulo: string; texto: string }[];

  portada: string | null;
  fotos: Foto[];
  fotoConfirmar?: Foto & { alt: string };
  historia: string[];
  itinerario: { hora: string; titulo: string; icono: string }[];
  frase: string;
};

export const SACK: ConfigXV = {
  evento: "sack",
  nombre: "Sack",
  /* Viernes 27 de noviembre de 2026, hora del centro de México (UTC-6). */
  fechaISO: "2026-11-27",
  fechaLarga: "Viernes 27 de noviembre de 2026",
  fechaCorta: "27 · 11 · 2026",

  hora: "19:30",
  horaTexto: "7:30 p.m.",
  lugar: "Ex Hacienda San Bartolo",
  direccion: "",
  maps: "https://share.google/PuIJ5RsBaqF3p8DyO",

  /* WhatsApp donde la familia recibe las confirmaciones (222 306 0930).
     PENDIENTE opcional: fecha límite para confirmar. */
  whatsappRsvp: "522223060930",
  fechaLimite: "",

  /* "Neo Roneo" de Latin Mafia en YouTube (youtu.be/uEXDe_3WfUQ). */
  youtubeId: "uEXDe_3WfUQ",
  cancion: "Neo Roneo",
  artista: "Latin Mafia",

  vestimenta: {
    titulo: "All",
    acento: "black",
    texto: "Todos de negro, de pies a cabeza. El rosa pastel es el color de la quinceañera.",
    colores: ["#000", "#111", "#1c1c1c"],
    reservado: "#f6c9d6",
  },
  avisos: [
    { icono: "👶", titulo: "Si vienes con niños", texto: "Te pedimos estar al pendiente de ellos durante el vals." },
    {
      icono: "🎁",
      titulo: "Regalos",
      texto: "Cualquier detalle es bienvenido en la mesa de regalos; si lo prefieres, la lluvia de sobres es ideal.",
    },
  ],

  portada: "/xvsack/05-hoy.webp",
  fotos: [
    { src: "/xvsack/01-bebe.webp", w: 453, h: 604, pie: "Donde todo empezó" },
    { src: "/xvsack/02-nina.webp", w: 558, h: 540, pie: "Siempre con estilo" },
    { src: "/xvsack/03-guitarra.webp", w: 544, h: 741, pie: "La música llegó" },
    { src: "/xvsack/04-acustica.webp", w: 1038, h: 1100, pie: "Y se quedó" },
    { src: "/xvsack/05-hoy.webp", w: 999, h: 775, pie: "Hoy, XV" },
  ],
  fotoConfirmar: {
    src: "/xvsack/06-disfrutar.webp",
    w: 900,
    h: 845,
    pie: "¡Lista para la fiesta!",
    alt: "Sack de pequeña, lista para la fiesta",
  },

  /* Reseña que compartió la quinceañera, en versión corta. */
  historia: [
    "Soy una persona que disfruta descubrir cosas nuevas, compartir momentos especiales con las personas que quiero y crear recuerdos que permanezcan en mi corazón.",
    "Hoy comienzo una etapa llena de sueños, ilusiones y nuevas aventuras. Celebrar mis XV años es agradecer por lo vivido, valorar a quienes me acompañan y dar la bienvenida a todo lo bonito que está por venir.",
  ],

  itinerario: [
    { hora: "7:30 – 8:00 p.m.", titulo: "Recepción", icono: "🥂" },
    { hora: "8:00 – 10:30 p.m.", titulo: "Bienvenida y cena", icono: "🍽" },
    { hora: "10:30 p.m.", titulo: "El vals", icono: "💃" },
    { hora: "Después del vals", titulo: "Pastel", icono: "🎂" },
    { hora: "Después del pastel", titulo: "Disco y baile", icono: "🪩" },
  ],

  frase:
    "Porque hay momentos que se recuerdan, canciones que se sienten y noches que se quedan para siempre en el corazón.",
};

/* Fátima Ximena Cernas Espinosa — datos del cuestionario de diseño.
   PENDIENTES de la familia: padrinos, regalos y fecha límite. */
export const FATIMA: ConfigXV = {
  evento: "fatima",
  tema: "bella",
  /* La familia pidió el nombre sin acento. */
  nombre: "Fatima Ximena",
  nombreCompleto: "Fatima Ximena Cernas Espinosa",
  /* Fecha confirmada por la familia: sábado 24 de julio de 2027. */
  fechaISO: "2027-07-24",
  fechaLarga: "Sábado 24 de julio de 2027",
  fechaCorta: "24 · 07 · 2027",

  hora: "17:00",
  horaTexto: "5:00 p.m.",
  lugar: "Ex Hacienda San Bartolo",
  direccion: "",
  maps: "https://maps.app.goo.gl/B4BQjYLwHK3W7c3n9",
  ceremonia: {
    nombre: "Parroquia de Nuestra Señora del Líbano",
    hora: "17:00",
    horaTexto: "5:00 p.m.",
    maps: "https://maps.app.goo.gl/7rYSTLQhJDGZEeQF7",
  },
  recepcion: {
    nombre: "Ex Hacienda San Bartolo",
    hora: "19:00",
    horaTexto: "7:00 p.m.",
    maps: "https://maps.app.goo.gl/B4BQjYLwHK3W7c3n9",
  },

  padres: ["Angel Cernas Morales", "Laura Edith Espinosa Muñoz"],
  padrinos: [],

  /* Confirmaciones: 222 805 5746 (respaldo por WhatsApp). La familia dio
     también el 221 265 5974. */
  whatsappRsvp: "522228055746",
  fechaLimite: "",

  /* "Days in the Sun" (La Bella y la Bestia, 2017). PENDIENTE: enlace de
     YouTube; mientras no esté, la sección de la canción no se muestra. */
  youtubeId: "",
  cancion: "Days in the Sun",
  artista: "La Bella y la Bestia",
  spotifyPlaylist:
    "https://open.spotify.com/playlist/3RNlu8KHE7i8U2gffE7Xra?si=iOxl-stFRXGhWUCJaL7OpA&pi=CIAEzJdoSOC7n",

  vestimenta: {
    titulo: "",
    acento: "Formal",
    texto: "Te pedimos asistir con vestimenta formal.",
    colores: [],
  },
  avisos: [],

  /* Portada con la escena temática de La Bella y la Bestia (sin foto). */
  portada: null,
  /* Quince años en fotos: de nacimiento a los 14, con sus momentos
     especiales en el año que les toca. */
  fotos: [
    { src: "/xvfatima/00-nacimiento.webp", w: 1100, h: 627, pie: "Nacimiento", pos: "72% 50%" },
    { src: "/xvfatima/01-ano.webp", w: 1100, h: 825, pie: "1 año" },
    { src: "/xvfatima/02-anos.webp", w: 1100, h: 825, pie: "2 años" },
    { src: "/xvfatima/03-anos.webp", w: 300, h: 400, pie: "3 años" },
    { src: "/xvfatima/04-anos.webp", w: 825, h: 1100, pie: "4 años", pos: "28% 45%" },
    { src: "/xvfatima/05-anos.webp", w: 619, h: 1100, pie: "5 años", pos: "62% 42%" },
    { src: "/xvfatima/princesa-primavera.webp", w: 825, h: 1100, pie: "Princesa de la primavera" },
    { src: "/xvfatima/06-anos.webp", w: 1100, h: 733, pie: "6 años", pos: "66% 50%" },
    { src: "/xvfatima/07-anos.webp", w: 1100, h: 733, pie: "7 años", pos: "46% 62%" },
    { src: "/xvfatima/pandemia-2020.webp", w: 535, h: 1100, pie: "Festejando en pandemia" },
    { src: "/xvfatima/08-anos.webp", w: 619, h: 1100, pie: "8 años", pos: "44% 66%" },
    { src: "/xvfatima/comunion.webp", w: 535, h: 1100, pie: "Mi primera comunión" },
    { src: "/xvfatima/confirmacion.webp", w: 535, h: 1100, pie: "Mi confirmación" },
    { src: "/xvfatima/09-anos.webp", w: 825, h: 1100, pie: "9 años" },
    { src: "/xvfatima/10-anos.webp", w: 1100, h: 618, pie: "10 años" },
    { src: "/xvfatima/11-anos.webp", w: 619, h: 1100, pie: "11 años" },
    { src: "/xvfatima/12-anos.webp", w: 1100, h: 825, pie: "12 años" },
    { src: "/xvfatima/13-anos.webp", w: 825, h: 1100, pie: "13 años" },
    { src: "/xvfatima/14-anos.webp", w: 1195, h: 896, pie: "14 años" },
  ],
  /* Mensaje de bienvenida, en el tono de la invitación de Sack. */
  historia: [
    "Hay momentos que se esperan toda la vida, y este es uno de ellos. Hoy comienzo una nueva etapa llena de sueños, ilusiones y aventuras, y quiero vivirla rodeada de las personas que más quiero.",
    "Celebrar mis XV años es agradecer por todo lo vivido y por quienes me han acompañado en el camino. Tu presencia hará que esta noche sea todavía más especial.",
  ],
  itinerario: [
    { hora: "5:00 p.m.", titulo: "Misa", icono: "⛪" },
    { hora: "7:00 p.m.", titulo: "Recepción", icono: "🥂" },
  ],
  frase: "Porque hay momentos que se viven una sola vez y noches que se quedan para siempre en el corazón.",
};
