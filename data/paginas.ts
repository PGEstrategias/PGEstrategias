/* Contenido de /servicios e /industrias. Copy propuesto por PG Estrategias,
   sin cifras ni resultados: validar antes de publicar. */
import { V } from "./home";
import type { VideoItem } from "@/components/site/VideoGrid";
import type { Pilar } from "@/lib/blog";

export const LINEAS_SERVICIO = [
  {
    id: "produccion-audiovisual",
    nombre: "Producción audiovisual",
    linea: "Videos y fotografía pensados para vender, no solo para verse bien.",
    puntos: [
      "Guion y calendario de contenido antes de grabar",
      "Reels verticales, videos de marca y testimoniales",
      "Fotografía de producto, unidades e instalaciones",
      "Edición con subtítulos para ver sin sonido",
    ],
  },
  {
    id: "meta-ads",
    nombre: "Meta Ads",
    linea: "Campañas en Facebook e Instagram con un objetivo y un presupuesto claros.",
    puntos: [
      "Objetivo de campaña según cómo cierras: mensajes, formulario o landing",
      "Segmentación por la zona que realmente atiendes",
      "Pruebas de varias creatividades por campaña",
      "Revisión periódica: se retira lo que no funciona y se escala lo que sí",
    ],
  },
  {
    id: "landing-pages",
    nombre: "Landing pages",
    linea: "Páginas rápidas con un solo objetivo y un botón directo a WhatsApp.",
    puntos: [
      "Una página por servicio, modelo o procedimiento",
      "Rastreo configurado para saber qué campaña trae cada contacto",
      "Diseño mobile primero",
      "Perfil de Google conectado y estrategia de reseñas",
    ],
  },
  {
    id: "automatizacion",
    nombre: "Automatización",
    linea: "Seguimiento a tus leads para que ninguno se enfríe esperando respuesta.",
    puntos: [
      "Respuesta inicial automática en WhatsApp",
      "Registro de leads en un CRM",
      "Recordatorios de seguimiento",
      "Reporte de lo que entra y lo que se cierra",
    ],
  },
];

export type Industria = {
  slug: "concesionarias" | "medicos" | "eventos-restaurantes";
  nombre: string;
  titulo: string;
  sub: string;
  pilar: Pilar;
  retos: string[];
  hacemos: { titulo: string; texto: string }[];
  trabajos: VideoItem[];
  mensaje: string;
};

export const INDUSTRIAS_DETALLE: Industria[] = [
  {
    slug: "concesionarias",
    nombre: "Concesionarias",
    titulo: "Marketing y video para concesionarias en Puebla",
    sub: "Conectamos tu inventario con video de cada unidad, campañas por zona y una respuesta rápida por WhatsApp.",
    pilar: "concesionarias",
    retos: [
      "Anuncios que solo muestran precio y no retienen la atención",
      "Inventario desactualizado en la web",
      "Leads que esperan horas una respuesta",
    ],
    hacemos: [
      { titulo: "Video de unidad y showroom", texto: "Piezas verticales y horizontales que muestran el estado real de cada unidad." },
      { titulo: "Meta Ads por inventario", texto: "Campañas separadas para nuevos y seminuevos, con audiencia local." },
      { titulo: "Landing de inventario", texto: "Páginas por categoría con botón directo a WhatsApp." },
      { titulo: "Perfil de Google", texto: "Fotos reales del showroom, horarios correctos y reseñas respondidas." },
    ],
    trabajos: [
      { etiqueta: "Concesionaria", titulo: "Mercedes-Benz Reyes Huerta", video: V.reyesHuerta },
      { etiqueta: "Concesionaria", titulo: "Zenith Motors", video: V.zenith },
      { etiqueta: "Concesionaria", titulo: "Land Rover Puebla", video: V.landRover },
    ],
    mensaje: "Hola, tengo una concesionaria y me interesa trabajar con PG Estrategias.",
  },
  {
    slug: "medicos",
    nombre: "Médicos y clínicas",
    titulo: "Marketing digital para médicos y clínicas en Puebla",
    sub: "Que te encuentren en Google, entiendan tus procedimientos y agenden contigo.",
    pilar: "medicos",
    retos: [
      "Perfil de Google incompleto o con la categoría equivocada",
      "Una sola página web para todos los procedimientos",
      "Pacientes que no conocen al médico antes de la consulta",
    ],
    hacemos: [
      { titulo: "Perfil de Empresa de Google", texto: "Categoría correcta, fotos reales, servicios listados y reseñas respondidas." },
      { titulo: "Web con landing por procedimiento", texto: "Cada tratamiento con su página, dudas resueltas y botón para agendar." },
      { titulo: "Video del médico", texto: "Testimoniales y contenido educativo que generan confianza antes de la cita." },
      { titulo: "Campañas locales", texto: "Anuncios hacia pacientes de la zona que atiende el consultorio." },
    ],
    trabajos: [
      { etiqueta: "Médicos", titulo: "Dr. Manuel", video: V.drManuel },
      { etiqueta: "Médicos", titulo: "Dr. Aarón Zarain", video: V.aaronZarain },
    ],
    mensaje: "Hola, soy médico y me interesa trabajar con PG Estrategias.",
  },
  {
    slug: "eventos-restaurantes",
    nombre: "Eventos y restaurantes",
    titulo: "Video y campañas para eventos y restaurantes en Puebla",
    sub: "Contenido que antoja, campañas que llenan fechas y mesas, y reservaciones por WhatsApp.",
    pilar: "industrias-locales",
    retos: [
      "Fotos que no transmiten la experiencia del lugar",
      "Fechas y mesas vacías entre temporadas",
      "Mensajes de reservación sin seguimiento",
    ],
    hacemos: [
      { titulo: "Video del lugar y de cada evento", texto: "Recorridos, recaps y piezas para redes que muestran la experiencia." },
      { titulo: "Meta Ads a mensajes", texto: "Campañas por temporada que terminan en una conversación por WhatsApp." },
      { titulo: "Landing de paquetes y reservaciones", texto: "Paquetes, menús y fechas en una página con botón directo." },
      { titulo: "Google y reseñas", texto: "Perfil al día con fotos recientes y una estrategia para pedir reseñas." },
    ],
    trabajos: [{ etiqueta: "Eventos", titulo: "Ex Hacienda San Bartolo", video: V.exHacienda }],
    mensaje: "Hola, tengo un negocio de eventos/restaurante y me interesa trabajar con PG Estrategias.",
  },
];

export const industriaPorSlug = (slug: string) => INDUSTRIAS_DETALLE.find((i) => i.slug === slug);
