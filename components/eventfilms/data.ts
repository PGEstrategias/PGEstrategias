/* Contenido de PG Event Films (/bodas). Videos ya cargados en Cloudinary y
   el demo reel en Drive. */

export const REEL_DRIVE_ID = "1AtBE8gsV4VG2UIUVbKNvwzLniZIjwzvT";

export const VIDEO_HERO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377735/Reel_t5pucv.mp4";

export function cld(url: string, t: string) {
  return url.replace("/upload/", `/upload/${t}/`);
}
export function poster(url: string, t = "so_1,f_auto,q_auto,w_900") {
  return cld(url, t).replace(/\.mp4$/, ".jpg");
}

export const PELICULAS = [
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779377735/Reel_t5pucv.mp4",
    titulo: "Reel de bodas",
    texto: "Los momentos que no se repiten, contados como cine.",
  },
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1788934650/WhatsApp_Video_2026-09-08_at_11.50.52_PM_mcx1as.mp4",
    titulo: "Detrás de la emoción",
    texto: "Así se siente volver a ver tu día.",
  },
];

export const EVENTOS = [
  {
    id: "bodas",
    nombre: "Bodas",
    linea: "Del get ready al último baile, con cineminuto y película larga.",
    imagen:
      "https://res.cloudinary.com/dxcr9utre/image/upload/f_auto,q_auto,w_900/v1770334142/9837c6f78552d14f441722a0f80cafb0-xxlarge_x6grtm.jpg",
    mensaje: "Hola, quiero cotizar la cobertura de video y foto de mi boda.",
  },
  {
    id: "xv",
    nombre: "XV años",
    linea: "Sesión previa, vals, sorpresa y fiesta: su noche, contada como película.",
    imagen: null,
    mensaje: "Hola, quiero cotizar la cobertura de video y foto de unos XV años.",
  },
  {
    id: "brindis",
    nombre: "Brindis y aniversarios",
    linea: "Celebraciones íntimas con la misma calidad de cine.",
    imagen: null,
    mensaje: "Hola, quiero cotizar la cobertura de un brindis o aniversario.",
  },
  {
    id: "bautizos",
    nombre: "Bautizos y comuniones",
    linea: "Ceremonia y celebración familiar, para guardar y compartir.",
    imagen: null,
    mensaje: "Hola, quiero cotizar la cobertura de un bautizo o primera comunión.",
  },
];

export const TIPOS_HERO = ["bodas", "XV años", "brindis", "bautizos", "aniversarios"];

export const PROCESO = [
  { titulo: "Platicamos", texto: "Nos cuentas tu fecha, el lugar y cómo imaginas tu evento." },
  { titulo: "Planeamos", texto: "Armamos el guion del día: momentos clave, tomas y horarios." },
  { titulo: "Filmamos", texto: "Equipo de cine, discreto, para que tú solo disfrutes." },
  { titulo: "Entregamos", texto: "Tu película, cineminuto, fotos y piezas para redes." },
];
