/* Testimonios en video que ya se publicaban en la home anterior del sitio.
   Citas literales del cliente; no editar sin su visto bueno. */

export type Testimonio = {
  nombre: string;
  industria: string;
  cita: string;
  video: string;
  poster: string;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: "Dr. Manuel",
    industria: "Proctología · Puebla",
    cita: "Sé que ustedes son un negocio confiable, en el que les interesa que sus clientes crezcan para que ustedes también crezcan.",
    video: "https://res.cloudinary.com/dieszqcrn/video/upload/v1778399000/DrManuelPGTestimonio_ar6neh.mp4",
    poster: "https://res.cloudinary.com/dieszqcrn/image/upload/f_auto,q_auto,w_540/v1778400341/ChatGPT_Image_10_may_2026_02_05_25_a.m_tgohn3.png",
  },
  {
    nombre: "Ex Hacienda de San Bartolo",
    industria: "Eventos y bodas · Puebla",
    cita: "Hemos triplicado el número de contratos firmados.",
    video: "https://res.cloudinary.com/dieszqcrn/video/upload/v1778398752/ExHaciendaPGTestimonio_ut7ja4.mp4",
    poster: "https://res.cloudinary.com/dieszqcrn/image/upload/f_auto,q_auto,w_540/v1778400307/ChatGPT_Image_10_may_2026_02_04_57_a.m_gdkjn9.png",
  },
  {
    nombre: "Cubiertas y Herrajes",
    industria: "Industria · Puebla",
    cita: "Una fotografía no puede enseñar lo que un sistema audiovisual estratégico sí…",
    video: "https://res.cloudinary.com/djduba5fd/video/upload/v1779761319/Testimonio_Manuel_gm9pnz.mp4",
    poster: "https://res.cloudinary.com/djduba5fd/image/upload/f_auto,q_auto,w_540/v1779761346/ChatGPT_Image_15_may_2026_01_28_48_p.m_1_n6ddjd.png",
  },
];
