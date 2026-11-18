/* Contenido de la home (/). Los textos entre corchetes son PLACEHOLDER o
   copy por confirmar; ver la lista de pendientes en la entrega. */

import type { VideoItem } from "@/components/site/VideoGrid";

/* Cloudinary: inserta transformaciones en una URL de /upload/. */
export function cld(url: string, t: string) {
  return url.replace("/upload/", `/upload/${t}/`);
}

/* Cuadro de un video como imagen (poster). */
export function posterDe(video: string, t = "so_1,f_auto,q_auto,w_960") {
  return cld(video, t).replace(/\.mp4$/, ".jpg");
}

/* ── Hero ─────────────────────────────────────────────────────── */

/* Video de Mercedes-Benz, recortado a 15 s para el hero. */
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

/* Archivos en /public/assets/logos/ (WebP con respaldo PNG). */
export type Marca = { nombre: string; src: string; fallback?: string; w: number; h: number };

export const LOGOS: Marca[] = [
  { nombre: "Mercedes-Benz", src: "/assets/logos/mercedes-benz.webp", fallback: "/assets/logos/mercedes-benz.png", w: 175, h: 176 },
  { nombre: "Land Rover", src: "/assets/logos/land-rover.webp", fallback: "/assets/logos/land-rover.png", w: 317, h: 176 },
  { nombre: "Zenith Motors", src: "/assets/logos/zenith-motors.webp", fallback: "/assets/logos/zenith-motors.png", w: 436, h: 107 },
  { nombre: "BMW Grupo Vecsa", src: "/assets/logos/bmw-vecsa.webp", fallback: "/assets/logos/bmw-vecsa.png", w: 161, h: 176 },
  { nombre: "Kigo", src: "/assets/logos/kigo.webp", fallback: "/assets/logos/kigo.png", w: 157, h: 70 },
  { nombre: "Dr. José Manuel Fernández", src: "/assets/logos/dr-manuel-fernandez.webp", fallback: "/assets/logos/dr-manuel-fernandez.png", w: 518, h: 124 },
  { nombre: "Dr. Aarón Zarain", src: "/assets/logos/dr-aaron-zarain.webp", fallback: "/assets/logos/dr-aaron-zarain.png", w: 400, h: 113 },
  { nombre: "Softys", src: "/assets/logos/softys.webp", fallback: "/assets/logos/softys.png", w: 441, h: 217 },
  { nombre: "Genius Vending", src: "/assets/logos/genius-vending.webp", fallback: "/assets/logos/genius-vending.png", w: 386, h: 202 },
];

/* ── Videos de clientes ───────────────────────────────────────── */

export const V = {
  reyesHuerta: HERO_VIDEO,
  zenith: "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4",
  landRover: "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4",
  drManuel: "https://res.cloudinary.com/dieszqcrn/video/upload/v1778399000/DrManuelPGTestimonio_ar6neh.mp4",
  aaronZarain: "https://res.cloudinary.com/djduba5fd/video/upload/v1779377487/AronZarainLandingPage_femgcw.mp4",
  exHacienda: "https://res.cloudinary.com/dieszqcrn/video/upload/v1778398752/ExHaciendaPGTestimonio_ut7ja4.mp4",
};

/* ── Trabajos destacados ──────────────────────────────────────── */

/* A CONFIRMAR: los videos son los que ya usa el sitio para cada cliente. */
export const TRABAJOS: VideoItem[] = [
  {
    etiqueta: "Concesionarias",
    titulo: "Mercedes-Benz",
    texto: "Video de sucursal con tomas de detrás de cámara.",
    video: V.reyesHuerta,
    href: "/industrias/concesionarias",
    hrefLabel: "Ver concesionarias",
  },
  {
    etiqueta: "Médicos",
    titulo: "Dr. José Manuel Fernández",
    texto: "Testimonio en video del doctor sobre su trabajo con nosotros.",
    video: V.drManuel,
    href: "/industrias/medicos",
    hrefLabel: "Ver médicos",
  },
  {
    etiqueta: "Eventos",
    titulo: "Ex Hacienda San Bartolo",
    texto: "Producción de espacios y servicios del venue para sus campañas.",
    video: V.exHacienda,
    href: "/industrias/eventos-restaurantes",
    hrefLabel: "Ver eventos y restaurantes",
  },
];

/* ── Portafolio (galería con filtros en la home) ──────────────── */

export const CATEGORIAS = ["Concesionarias", "Eventos y espacios", "Marcas y negocios", "Médicos", "Dron"] as const;
export type Categoria = (typeof CATEGORIAS)[number];
export type VideoPortafolio = VideoItem & { categoria: Categoria };

export const PORTAFOLIO: VideoPortafolio[] = [
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "Ford Rivera", texto: "Video promocional de la agencia.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1790084706/Demo_egdhe3.mp4" },
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "Zenith Motors · Lamborghini Huracán", texto: "Video de un superdeportivo para redes.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4" },
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "Zenith Motors · Dodge Challenger", texto: "Video de inventario con estilo de cine.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1787612470/Challenger_vur6pe.mp4" },
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "Zenith Motors · BMW ASMR", texto: "Detalles del auto contados con sonido.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1785887879/AQNuVhBmkwGTX4OC78O3d0NwH_wfPRlmgNF7AvKO9OeAWifsY0eQEZ9IC9s0raBPg-wJjnxrnTZXKaXkwiHNIpMRWV-x3VRjiy1V4-k_om1cmn.mp4" },
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "Zenith Motors · Video con IA", texto: "Pieza horizontal hecha con inteligencia artificial.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1785888616/WhatsApp_Video_2026-08-04_at_4.27.42_PM_vcpnm7.mp4" },
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "BMW Grupo Vecsa", texto: "Cobertura de evento de la marca.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4" },
  { categoria: "Concesionarias", etiqueta: "Concesionarias", titulo: "Autonación", texto: "Video de contenido con un vehículo de alto valor.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1788186349/AutonacionDEMO_ute4wy.mp4" },
  { categoria: "Eventos y espacios", etiqueta: "Eventos", titulo: "Ex Hacienda San Bartolo", texto: "El salón jardín, listo para su próxima celebración.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1788934650/WhatsApp_Video_2026-09-08_at_11.50.52_PM_mcx1as.mp4" },
  { categoria: "Eventos y espacios", etiqueta: "Deporte", titulo: "Club de pádel", texto: "Video del club y su ambiente.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1788371985/videopadel_v0vauq.mp4" },
  { categoria: "Eventos y espacios", etiqueta: "Restaurantes", titulo: "Estancia Argentina Querétaro", texto: "Video de la experiencia del restaurante.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1794967765/Estancia_Queretaro_V2_g77u3k.mp4" },
  { categoria: "Marcas y negocios", etiqueta: "Marcas", titulo: "Kigo", texto: "Campaña de verano en formato vertical.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379246/VeranoKigo_Vertical_btspoo.mp4" },
  { categoria: "Marcas y negocios", etiqueta: "Marcas", titulo: "Kiddies", texto: "Video con animación 3D.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1794967522/3D_kiddies_SCSH_d5jq8k.mp4" },
  { categoria: "Marcas y negocios", etiqueta: "Anuncios", titulo: "Gurú", texto: "Anuncio para campañas en redes.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379727/ad_5_vecrital_2_b2fksl.mp4" },
  { categoria: "Médicos", etiqueta: "Médicos", titulo: "Proctólogo", texto: "Webinar informativo para pacientes.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379265/Webinar_yvswzj.mp4" },
  { categoria: "Dron", etiqueta: "Dron", titulo: "Puebla desde el aire", texto: "Reel de tomas aéreas con dron.", video: "https://res.cloudinary.com/djduba5fd/video/upload/v1794967827/REEL_DRON_rjwm8q.mp4" },
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
      "4 reels al mes",
      "6 posts al mes (3 diseños + 3 carruseles)",
      "1 video de 1 minuto para tu web",
      "1 página de ventas",
      "Anuncios en Meta o Google",
      "1 sesión estratégica al mes",
    ],
    destacado: false,
  },
  {
    nombre: "Tracción",
    linea: "Campañas constantes, landing y automatización de seguimiento.",
    incluye: [
      "7 reels al mes",
      "8 carruseles al mes",
      "1 video de 1 minuto para tu web",
      "1 página de ventas + CRM",
      "Anuncios en Meta y Google + bot de WhatsApp",
      "2 sesiones estratégicas al mes",
    ],
    destacado: true,
  },
  {
    nombre: "Dominio",
    linea: "Producción de alto nivel y estrategia completa de marca.",
    incluye: [
      "10 reels al mes",
      "1 video de 1 minuto para tu web",
      "2 páginas de ventas + CRM + dominio",
      "Anuncios en Meta y Google + bot de WhatsApp",
      "4 sesiones estratégicas al mes",
      "Tablero de métricas en vivo",
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
    linea: "Video de inventario, Meta Ads y landing pages que llevan al cliente al piso.",
    href: "/industrias/concesionarias",
  },
  {
    nombre: "Médicos y clínicas",
    linea: "Perfil de Google, web por procedimiento y video que genera confianza.",
    href: "/industrias/medicos",
  },
  {
    nombre: "Eventos y restaurantes",
    linea: "Contenido que antoja y campañas que llenan fechas y mesas.",
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
