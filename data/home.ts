/* Contenido de la home (/). Los textos entre corchetes son PLACEHOLDER o
   copy por confirmar; ver la lista de pendientes en la entrega. */

/* Cloudinary: inserta transformaciones en una URL de /upload/. */
export function cld(url: string, t: string) {
  return url.replace("/upload/", `/upload/${t}/`);
}

/* Cuadro de un video como imagen (poster). */
export function posterDe(video: string, t = "so_1,f_auto,q_auto,w_960") {
  return cld(video, t).replace(/\.mp4$/, ".jpg");
}

/* ── Hero ─────────────────────────────────────────────────────── */

/* Mercedes-Benz Reyes Huerta. A CONFIRMAR: que sea el corte de 10–15 s final. */
export const HERO_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1788051909/DemoMercedes_csof2x.mp4";

/* Versiones optimizadas: se recorta a 15 s, sin audio, y se encuadra según
   el dispositivo. Pesos objetivo: ≤3 MB mobile, ≤6 MB desktop. */
const HERO_MOBILE = "du_15,ac_none,c_fill,ar_9:16,w_720,q_auto:eco";
const HERO_DESKTOP = "du_15,ac_none,c_fill,ar_16:9,g_auto,w_1920,q_auto:good";

export const HERO_SOURCES = {
  mobile: {
    webm: cld(HERO_VIDEO, `${HERO_MOBILE},vc_vp9`).replace(/\.mp4$/, ".webm"),
    mp4: cld(HERO_VIDEO, `${HERO_MOBILE},vc_h264`),
  },
  desktop: {
    webm: cld(HERO_VIDEO, `${HERO_DESKTOP},vc_vp9`).replace(/\.mp4$/, ".webm"),
    mp4: cld(HERO_VIDEO, `${HERO_DESKTOP},vc_h264`),
  },
};

/* PLACEHOLDER: poster definitivo. Mientras tanto se usa el primer segundo
   del mismo video, encuadrado por dispositivo. */
export const HERO_POSTER = {
  mobile: (w: number) => posterDe(HERO_VIDEO, `so_1,c_fill,ar_9:16,w_${w},f_auto,q_auto`),
  desktop: (w: number) => posterDe(HERO_VIDEO, `so_1,c_fill,ar_16:9,g_auto,w_${w},f_auto,q_auto`),
};

/* ── Marcas ───────────────────────────────────────────────────── */

/* Archivos en /public/assets/logos/. Los actuales son PLACEHOLDER de texto:
   reemplazar cada archivo por el logo oficial con el mismo nombre. */
export const LOGOS = [
  { nombre: "Mercedes-Benz", src: "/assets/logos/mercedes-benz.svg" },
  { nombre: "Land Rover", src: "/assets/logos/land-rover.svg" },
  { nombre: "Zenith Motors", src: "/assets/logos/zenith-motors.svg" },
  { nombre: "BMW Vecsa", src: "/assets/logos/bmw-vecsa.svg" },
  { nombre: "Kigo", src: "/assets/logos/kigo.svg" },
  { nombre: "Dr. Manuel Fernández", src: "/assets/logos/dr-manuel-fernandez.svg" },
  { nombre: "Dr. Aarón Zarain", src: "/assets/logos/dr-aaron-zarain.svg" },
];

/* ── Trabajos destacados ──────────────────────────────────────── */

export type Trabajo = {
  industria: string;
  cliente: string;
  linea: string;
  video: string;
  href: string;
};

/* A CONFIRMAR: los videos son los que ya usa el sitio para cada cliente. */
export const TRABAJOS: Trabajo[] = [
  {
    industria: "Concesionarias",
    cliente: "Mercedes-Benz Reyes Huerta",
    linea: "[PLACEHOLDER: una línea]",
    video: HERO_VIDEO,
    href: "/industrias/concesionarias",
  },
  {
    industria: "Médicos",
    cliente: "Dr. Manuel Fernández",
    linea: "[PLACEHOLDER: una línea]",
    video:
      "https://res.cloudinary.com/dieszqcrn/video/upload/v1778399000/DrManuelPGTestimonio_ar6neh.mp4",
    href: "/industrias/medicos",
  },
  {
    industria: "Eventos",
    cliente: "Ex Hacienda San Bartolo",
    linea: "[PLACEHOLDER: una línea]",
    video:
      "https://res.cloudinary.com/dieszqcrn/video/upload/v1778398752/ExHaciendaPGTestimonio_ut7ja4.mp4",
    href: "/industrias/eventos-restaurantes",
  },
];

/* ── Testimonio destacado ─────────────────────────────────────── */

/* La sección solo se muestra cuando el cliente confirma el permiso de
   publicación. Cambiar a true al tenerlo por escrito. */
export const TESTIMONIO = {
  permisoConfirmado: false,
  cita: "[PLACEHOLDER: frase validada por el cliente]",
  autor: "[PLACEHOLDER: nombre, cargo, empresa]",
};

/* ── Servicios ────────────────────────────────────────────────── */

/* Copy propuesto, por validar. Los bullets salen de los planes que hoy
   muestra el sitio, sin precios. */
export const PAQUETES = [
  {
    nombre: "Ignición",
    linea: "Arranca con contenido y tus primeras campañas.",
    incluye: [
      "Producción de contenido mensual",
      "Campañas en Meta o Google",
      "Página de ventas con rastreo configurado",
      "Perfil de Google + estrategia de reseñas",
    ],
    destacado: false,
  },
  {
    nombre: "Tracción",
    linea: "Campañas constantes, landing y automatización de seguimiento.",
    incluye: [
      "Campañas constantes en Meta y Google",
      "Landing page + CRM",
      "Bot de WhatsApp para dar seguimiento a tus leads",
      "Videollamada estratégica quincenal",
    ],
    destacado: true, // A CONFIRMAR: "Más elegido"
  },
  {
    nombre: "Dominio",
    linea: "Producción de alto nivel y estrategia completa de marca.",
    incluye: [
      "Producción audiovisual de alto nivel",
      "Operación completa de campañas",
      "Tablero de métricas en vivo",
      "Videollamada estratégica semanal",
    ],
    destacado: false,
  },
];

/* ── Cómo trabajamos ──────────────────────────────────────────── */

export const PASOS = [
  {
    titulo: "Diagnóstico",
    texto: "Analizamos tu mercado, tu competencia y tus objetivos antes de producir.",
  },
  {
    titulo: "Producción",
    texto: "Grabamos, editamos y montamos campañas con un guion y un calendario claros.",
  },
  {
    titulo: "Resultados",
    texto: "Medimos lo que importa: leads, visitas y ventas, no solo vistas.",
  },
];

/* ── Industrias ───────────────────────────────────────────────── */

export const INDUSTRIAS = [
  {
    nombre: "Concesionarias",
    linea: "[COPY — confirmar: una línea]",
    href: "/industrias/concesionarias",
  },
  {
    nombre: "Médicos y clínicas",
    linea: "[COPY — confirmar: una línea]",
    href: "/industrias/medicos",
  },
  {
    nombre: "Eventos y restaurantes",
    linea: "[COPY — confirmar: una línea]",
    href: "/industrias/eventos-restaurantes",
  },
];

export const NECESIDADES = [
  "Producción audiovisual",
  "Meta Ads",
  "Landing page",
  "Automatización",
  "Otro",
];
