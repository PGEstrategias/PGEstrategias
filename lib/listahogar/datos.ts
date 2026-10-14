/**
 * Lista Hogar — demo.
 *
 * Mismo concepto que Lista Médica, pero para oficios del hogar. Es una
 * maqueta para presentar la idea: todo vive en este archivo, sin base de
 * datos ni panel. Los perfiles son ficticios y el sitio lo dice en cada
 * página; los botones de WhatsApp llegan a PG Estrategias, nunca a un tercero.
 */

export const BASE = '/listahogar';

export const MARCA = {
  nombre: 'Lista Hogar',
  correo: 'contacto@pgestrategias.com',
  whatsappNumero: '522201758468',
  whatsappLegible: '220 175 8468',
  ciudad: 'Puebla, México',
  precioFundador: '$300 MXN al semestre',
  cupoFundador: 500,
} as const;

export const TEXTO_SELLO =
  'Lista Hogar revisó la identificación oficial de este profesional, confirmó su domicilio y habló por teléfono con al menos tres clientes a quienes les trabajó, en la fecha indicada. No es una garantía sobre el trabajo ni sobre el precio final: el acuerdo es directamente entre usted y el profesional.';

export type Ciudad = 'puebla' | 'cholula' | 'atlixco';

export interface Oficio {
  slug: string;
  nombre: string;
  plural: string;
  descripcion: string;
  sinonimos: string[];
}

export interface Servicio {
  nombre: string;
  desde: number | null;
}

export interface Profesional {
  slug: string;
  nombre: string;
  apellidos: string;
  negocio?: string;
  oficios: string[];
  ciudad: Ciudad;
  zonas: string[];
  anios: number;
  visita: number | null;
  urgencias: boolean;
  factura: boolean;
  garantiaDias: number;
  horario: string;
  pagos: string[];
  verificado: string;
  calificacion: number;
  resenas: number;
  trabajos: number;
  fundador: boolean;
  bio: string;
  servicios: Servicio[];
  preguntas: [string, string][];
}

export const CIUDADES: Record<Ciudad, string> = {
  puebla: 'Puebla',
  cholula: 'Cholula',
  atlixco: 'Atlixco',
};

export const OFICIOS: Oficio[] = [
  {
    slug: 'plomeros',
    nombre: 'Plomería',
    plural: 'Plomeros',
    descripcion:
      'Fugas, tinacos, calentadores, drenaje tapado, cambio de llaves y tuberías de agua y gas.',
    sinonimos: ['plomero', 'fuga', 'fontanero', 'drenaje', 'tinaco', 'calentador', 'boiler'],
  },
  {
    slug: 'electricistas',
    nombre: 'Electricidad',
    plural: 'Electricistas',
    descripcion:
      'Cortos, centros de carga, contactos, apagadores, instalación de lámparas y cableado nuevo.',
    sinonimos: ['electricista', 'luz', 'corto', 'cableado', 'contactos', 'apagador'],
  },
  {
    slug: 'cerrajeros',
    nombre: 'Cerrajería',
    plural: 'Cerrajeros',
    descripcion: 'Aperturas de casa y auto, cambio de chapas, duplicado de llaves y cerraduras digitales.',
    sinonimos: ['cerrajero', 'chapa', 'llave', 'cerradura', 'me quedé afuera'],
  },
  {
    slug: 'carpinteros',
    nombre: 'Carpintería',
    plural: 'Carpinteros',
    descripcion: 'Closets, cocinas integrales, puertas, reparación de muebles y barnizado.',
    sinonimos: ['carpintero', 'closet', 'cocina integral', 'muebles', 'puertas'],
  },
  {
    slug: 'pintores',
    nombre: 'Pintura',
    plural: 'Pintores',
    descripcion: 'Interiores, fachadas, resanes, impermeabilizante y acabados especiales.',
    sinonimos: ['pintor', 'pintar', 'fachada', 'resane'],
  },
  {
    slug: 'albaniles',
    nombre: 'Albañilería',
    plural: 'Albañiles',
    descripcion: 'Remodelaciones, bardas, pisos, azulejo, firmes y ampliaciones.',
    sinonimos: ['albañil', 'albanil', 'remodelación', 'piso', 'azulejo', 'barda', 'obra'],
  },
  {
    slug: 'impermeabilizadores',
    nombre: 'Impermeabilización',
    plural: 'Impermeabilizadores',
    descripcion: 'Azoteas, losas y filtraciones, con prefabricado o acrílico y garantía por escrito.',
    sinonimos: ['impermeabilizar', 'goteras', 'filtración', 'azotea', 'humedad'],
  },
  {
    slug: 'herreros',
    nombre: 'Herrería',
    plural: 'Herreros',
    descripcion: 'Zaguanes, protecciones, barandales, escaleras y soldadura en sitio.',
    sinonimos: ['herrero', 'soldador', 'protecciones', 'zaguán', 'portón', 'barandal'],
  },
  {
    slug: 'tecnicos-linea-blanca',
    nombre: 'Línea blanca',
    plural: 'Técnicos en línea blanca',
    descripcion: 'Reparación de lavadoras, secadoras, refrigeradores, estufas y hornos.',
    sinonimos: ['lavadora', 'refrigerador', 'refri', 'estufa', 'secadora', 'técnico'],
  },
  {
    slug: 'tecnicos-minisplit',
    nombre: 'Aire acondicionado',
    plural: 'Técnicos en minisplit',
    descripcion: 'Instalación, mantenimiento y recarga de gas de minisplits y aire acondicionado.',
    sinonimos: ['minisplit', 'aire acondicionado', 'clima', 'aire'],
  },
  {
    slug: 'jardineros',
    nombre: 'Jardinería',
    plural: 'Jardineros',
    descripcion: 'Poda, pasto, diseño de jardín, riego automático y mantenimiento mensual.',
    sinonimos: ['jardinero', 'poda', 'pasto', 'jardín', 'riego'],
  },
  {
    slug: 'fumigadores',
    nombre: 'Fumigación',
    plural: 'Fumigadores',
    descripcion: 'Cucarachas, termitas, roedores y chinches, con productos con registro sanitario.',
    sinonimos: ['fumigar', 'plagas', 'cucarachas', 'termitas', 'ratas', 'chinches'],
  },
];

const PAGOS_TODOS = ['Efectivo', 'Transferencia', 'Tarjeta'];
const PAGOS_BASICOS = ['Efectivo', 'Transferencia'];

export const PROFESIONALES: Profesional[] = [
  {
    slug: 'raul-mendoza-plomero-puebla',
    nombre: 'Raúl',
    apellidos: 'Mendoza Torres',
    negocio: 'Plomería Mendoza',
    oficios: ['plomeros'],
    ciudad: 'puebla',
    zonas: ['La Paz', 'Huexotitla', 'Centro', 'Anzures', 'Ladrillera de Benítez'],
    anios: 18,
    visita: 250,
    urgencias: true,
    factura: true,
    garantiaDias: 90,
    horario: 'Lunes a sábado de 8:00 a 19:00. Urgencias 24 horas.',
    pagos: PAGOS_TODOS,
    verificado: '2026-09-22',
    calificacion: 4.9,
    resenas: 87,
    trabajos: 140,
    fundador: true,
    bio: 'Plomero desde hace 18 años, primero con mi papá y luego por mi cuenta. Atiendo sobre todo casas y departamentos de la zona de La Paz y el Centro. Llego con material básico en la camioneta, así que la mayoría de las fugas quedan en la primera visita.',
    servicios: [
      { nombre: 'Visita y diagnóstico', desde: 250 },
      { nombre: 'Reparación de fuga en llave o mezcladora', desde: 450 },
      { nombre: 'Destape de drenaje con guía', desde: 700 },
      { nombre: 'Instalación de calentador de paso', desde: 1200 },
      { nombre: 'Lavado y desinfección de tinaco', desde: 900 },
      { nombre: 'Cambio de tubería de cobre por tramo', desde: null },
    ],
    preguntas: [
      ['¿La visita se cobra si contrato el trabajo?', 'No. Si me quedo a hacer la reparación, la visita se descuenta del total.'],
      ['¿Trae el material?', 'Llevo lo básico: cinta, conexiones, empaques y llaves comunes. Si la pieza es especial le digo exactamente cuál comprar o voy por ella con su nota.'],
    ],
  },
  {
    slug: 'hugo-sanchez-plomero-puebla',
    nombre: 'Hugo',
    apellidos: 'Sánchez Lara',
    oficios: ['plomeros', 'impermeabilizadores'],
    ciudad: 'puebla',
    zonas: ['Angelópolis', 'Lomas de Angelópolis', 'Concepción La Cruz', 'Zavaleta'],
    anios: 11,
    visita: 300,
    urgencias: false,
    factura: false,
    garantiaDias: 60,
    horario: 'Lunes a viernes de 9:00 a 18:00. Sábados con cita.',
    pagos: PAGOS_BASICOS,
    verificado: '2026-09-29',
    calificacion: 4.7,
    resenas: 41,
    trabajos: 62,
    fundador: true,
    bio: 'Me especializo en fraccionamientos de la zona Angelópolis: hidroneumáticos, cisternas y sistemas presurizados. También impermeabilizo azoteas, porque casi siempre la gotera y la fuga vienen juntas.',
    servicios: [
      { nombre: 'Visita y diagnóstico', desde: 300 },
      { nombre: 'Mantenimiento de hidroneumático', desde: 950 },
      { nombre: 'Lavado de cisterna', desde: 1400 },
      { nombre: 'Impermeabilización por m²', desde: 140 },
    ],
    preguntas: [
      ['¿Entra a privadas con control de acceso?', 'Sí. Mándeme por WhatsApp el nombre con el que hay que registrarme en caseta.'],
    ],
  },
  {
    slug: 'martha-ruiz-plomera-cholula',
    nombre: 'Martha',
    apellidos: 'Ruiz Coyotl',
    oficios: ['plomeros'],
    ciudad: 'cholula',
    zonas: ['San Andrés Cholula', 'San Pedro Cholula', 'Tlaxcalancingo', 'Momoxpan'],
    anios: 9,
    visita: 200,
    urgencias: true,
    factura: false,
    garantiaDias: 60,
    horario: 'Todos los días de 8:00 a 20:00.',
    pagos: PAGOS_BASICOS,
    verificado: '2026-10-02',
    calificacion: 4.8,
    resenas: 53,
    trabajos: 71,
    fundador: true,
    bio: 'Muchas clientas me buscan porque prefieren que entre a su casa una mujer. Trabajo con mi hijo como ayudante. Calentadores, fugas, baños completos y conexiones de gas.',
    servicios: [
      { nombre: 'Visita y diagnóstico', desde: 200 },
      { nombre: 'Cambio de WC con accesorios', desde: 650 },
      { nombre: 'Instalación de calentador solar', desde: 1800 },
      { nombre: 'Revisión de fuga de gas', desde: 400 },
    ],
    preguntas: [],
  },
  {
    slug: 'jorge-castillo-electricista-puebla',
    nombre: 'Jorge',
    apellidos: 'Castillo Ramírez',
    negocio: 'Instalaciones Castillo',
    oficios: ['electricistas'],
    ciudad: 'puebla',
    zonas: ['Centro', 'El Carmen', 'Santiago', 'Chulavista', 'Gabriel Pastor'],
    anios: 22,
    visita: 300,
    urgencias: true,
    factura: true,
    garantiaDias: 180,
    horario: 'Lunes a sábado de 8:00 a 19:00. Cortos y apagones 24 horas.',
    pagos: PAGOS_TODOS,
    verificado: '2026-09-18',
    calificacion: 4.9,
    resenas: 112,
    trabajos: 205,
    fundador: true,
    bio: 'Electricista con certificación de competencia laboral. Me toca mucho trabajo en casas antiguas del Centro, donde el cableado original ya no aguanta. Le explico qué está mal antes de cobrarle un peso.',
    servicios: [
      { nombre: 'Visita y diagnóstico', desde: 300 },
      { nombre: 'Cambio de contacto o apagador', desde: 180 },
      { nombre: 'Instalación de lámpara o ventilador de techo', desde: 400 },
      { nombre: 'Cambio de centro de carga', desde: 2200 },
      { nombre: 'Recableado de casa', desde: null },
    ],
    preguntas: [
      ['¿Hace trámites con CFE?', 'Le preparo la instalación para el cambio de tarifa o de medidor y le digo qué documentos llevar. El trámite lo hace el titular del contrato.'],
    ],
  },
  {
    slug: 'diana-flores-electricista-puebla',
    nombre: 'Diana',
    apellidos: 'Flores Ortega',
    oficios: ['electricistas', 'tecnicos-minisplit'],
    ciudad: 'puebla',
    zonas: ['Angelópolis', 'La Vista', 'Lomas de Angelópolis', 'Atlixcáyotl'],
    anios: 7,
    visita: 350,
    urgencias: false,
    factura: true,
    garantiaDias: 90,
    horario: 'Lunes a viernes de 9:00 a 18:00.',
    pagos: PAGOS_TODOS,
    verificado: '2026-10-06',
    calificacion: 4.8,
    resenas: 38,
    trabajos: 49,
    fundador: false,
    bio: 'Ingeniera electricista. Hago instalaciones para minisplit, cargadores de auto eléctrico y automatización del hogar. Entrego diagrama de lo que se instaló.',
    servicios: [
      { nombre: 'Visita y diagnóstico', desde: 350 },
      { nombre: 'Línea dedicada para minisplit', desde: 1500 },
      { nombre: 'Instalación de cargador para auto eléctrico', desde: 3800 },
      { nombre: 'Instalación de minisplit 1 tonelada', desde: 2500 },
    ],
    preguntas: [],
  },
  {
    slug: 'efrain-lopez-electricista-atlixco',
    nombre: 'Efraín',
    apellidos: 'López Domínguez',
    oficios: ['electricistas'],
    ciudad: 'atlixco',
    zonas: ['Centro', 'Cabrera', 'Solares', 'Metepec'],
    anios: 14,
    visita: 200,
    urgencias: true,
    factura: false,
    garantiaDias: 60,
    horario: 'Lunes a domingo de 7:00 a 21:00.',
    pagos: PAGOS_BASICOS,
    verificado: '2026-09-25',
    calificacion: 4.6,
    resenas: 29,
    trabajos: 40,
    fundador: true,
    bio: 'Electricista en Atlixco y alrededores. Trabajo también en huertas y viveros: bombas de agua, iluminación exterior y tableros.',
    servicios: [
      { nombre: 'Visita y diagnóstico', desde: 200 },
      { nombre: 'Instalación de bomba de agua', desde: 900 },
      { nombre: 'Iluminación exterior por punto', desde: 350 },
    ],
    preguntas: [],
  },
  {
    slug: 'arturo-perez-cerrajero-puebla',
    nombre: 'Arturo',
    apellidos: 'Pérez Galicia',
    negocio: 'Cerrajería El Ángel',
    oficios: ['cerrajeros'],
    ciudad: 'puebla',
    zonas: ['Toda la ciudad'],
    anios: 16,
    visita: 350,
    urgencias: true,
    factura: true,
    garantiaDias: 30,
    horario: 'Servicio 24 horas, los 365 días.',
    pagos: PAGOS_TODOS,
    verificado: '2026-09-20',
    calificacion: 4.8,
    resenas: 96,
    trabajos: 180,
    fundador: true,
    bio: 'Aperturas sin daño en casa y auto. Por seguridad, antes de abrir le pido una identificación con domicilio o un documento que acredite que la propiedad es suya.',
    servicios: [
      { nombre: 'Apertura de puerta de casa', desde: 450 },
      { nombre: 'Apertura de auto', desde: 550 },
      { nombre: 'Cambio de chapa (pieza incluida)', desde: 650 },
      { nombre: 'Instalación de cerradura digital', desde: 900 },
    ],
    preguntas: [
      ['¿En cuánto tiempo llega?', 'En la zona metropolitana, normalmente entre 25 y 45 minutos.'],
    ],
  },
  {
    slug: 'ivan-hernandez-carpintero-puebla',
    nombre: 'Iván',
    apellidos: 'Hernández Juárez',
    negocio: 'Taller Hernández',
    oficios: ['carpinteros'],
    ciudad: 'puebla',
    zonas: ['San Manuel', 'Jardines de San Manuel', 'Bugambilias', 'Prados Agua Azul'],
    anios: 20,
    visita: null,
    urgencias: false,
    factura: true,
    garantiaDias: 365,
    horario: 'Lunes a viernes de 9:00 a 18:00. Sábados de 9:00 a 14:00.',
    pagos: PAGOS_TODOS,
    verificado: '2026-09-15',
    calificacion: 4.9,
    resenas: 64,
    trabajos: 95,
    fundador: true,
    bio: 'Tengo taller propio en San Manuel. Hago closets y cocinas integrales a la medida en MDF, melamina y madera de pino o cedro. La cotización con medidas es gratuita.',
    servicios: [
      { nombre: 'Visita para tomar medidas', desde: 0 },
      { nombre: 'Closet de melamina por metro lineal', desde: 4800 },
      { nombre: 'Cocina integral por metro lineal', desde: 7500 },
      { nombre: 'Ajuste y reparación de puertas', desde: 350 },
    ],
    preguntas: [],
  },
  {
    slug: 'lucia-vazquez-pintora-cholula',
    nombre: 'Lucía',
    apellidos: 'Vázquez Morales',
    oficios: ['pintores'],
    ciudad: 'cholula',
    zonas: ['San Andrés Cholula', 'Cholula Centro', 'Zerezotla', 'La Carcaña'],
    anios: 12,
    visita: null,
    urgencias: false,
    factura: false,
    garantiaDias: 180,
    horario: 'Lunes a sábado de 8:00 a 17:00.',
    pagos: PAGOS_BASICOS,
    verificado: '2026-10-01',
    calificacion: 4.9,
    resenas: 47,
    trabajos: 58,
    fundador: true,
    bio: 'Trabajo con una cuadrilla de tres personas. Cubrimos muebles y pisos antes de empezar y dejamos la casa barrida. Cotizo por metro cuadrado con mano de obra y material por separado.',
    servicios: [
      { nombre: 'Cotización en sitio', desde: 0 },
      { nombre: 'Pintura interior por m² (mano de obra)', desde: 38 },
      { nombre: 'Fachada por m² (mano de obra)', desde: 55 },
      { nombre: 'Resane de grietas por m²', desde: 70 },
    ],
    preguntas: [],
  },
  {
    slug: 'fernando-garcia-albanil-puebla',
    nombre: 'Fernando',
    apellidos: 'García Cuautle',
    oficios: ['albaniles', 'impermeabilizadores'],
    ciudad: 'puebla',
    zonas: ['Bosques de San Sebastián', 'Mayorazgo', 'Infonavit', 'Agua Santa'],
    anios: 25,
    visita: 0,
    urgencias: false,
    factura: false,
    garantiaDias: 365,
    horario: 'Lunes a sábado de 8:00 a 17:00.',
    pagos: PAGOS_BASICOS,
    verificado: '2026-09-12',
    calificacion: 4.7,
    resenas: 33,
    trabajos: 44,
    fundador: false,
    bio: 'Maestro albañil. Remodelaciones de baño y cocina, pisos, bardas y segundas plantas. Doy presupuesto por escrito con avance semanal.',
    servicios: [
      { nombre: 'Presupuesto en sitio', desde: 0 },
      { nombre: 'Colocación de piso por m²', desde: 180 },
      { nombre: 'Remodelación de baño completo', desde: 28000 },
      { nombre: 'Barda por m²', desde: 650 },
    ],
    preguntas: [],
  },
  {
    slug: 'pedro-tlatelpa-herrero-puebla',
    nombre: 'Pedro',
    apellidos: 'Tlatelpa Ríos',
    negocio: 'Herrería Tlatelpa',
    oficios: ['herreros'],
    ciudad: 'puebla',
    zonas: ['Amalucan', 'Xonaca', 'Bosques de Amalucan', 'Loma Linda'],
    anios: 19,
    visita: 0,
    urgencias: false,
    factura: true,
    garantiaDias: 365,
    horario: 'Lunes a sábado de 8:00 a 18:00.',
    pagos: PAGOS_TODOS,
    verificado: '2026-09-27',
    calificacion: 4.6,
    resenas: 26,
    trabajos: 37,
    fundador: false,
    bio: 'Zaguanes, protecciones y barandales a la medida, con pintura electrostática. También automatizamos portones.',
    servicios: [
      { nombre: 'Protección de ventana por m²', desde: 1100 },
      { nombre: 'Zaguán de dos hojas', desde: 14000 },
      { nombre: 'Motor para portón corredizo', desde: 9500 },
    ],
    preguntas: [],
  },
  {
    slug: 'sergio-ramos-tecnico-linea-blanca-puebla',
    nombre: 'Sergio',
    apellidos: 'Ramos Aguilar',
    oficios: ['tecnicos-linea-blanca'],
    ciudad: 'puebla',
    zonas: ['Toda la ciudad', 'Cholula'],
    anios: 13,
    visita: 280,
    urgencias: false,
    factura: true,
    garantiaDias: 90,
    horario: 'Lunes a sábado de 9:00 a 19:00.',
    pagos: PAGOS_TODOS,
    verificado: '2026-10-04',
    calificacion: 4.8,
    resenas: 71,
    trabajos: 120,
    fundador: true,
    bio: 'Reparo lavadoras, secadoras y refrigeradores de todas las marcas. Uso refacciones originales y le doy la pieza vieja para que vea que se cambió.',
    servicios: [
      { nombre: 'Diagnóstico a domicilio', desde: 280 },
      { nombre: 'Cambio de bomba de lavadora', desde: 750 },
      { nombre: 'Recarga de gas de refrigerador', desde: 1100 },
      { nombre: 'Cambio de tarjeta electrónica', desde: null },
    ],
    preguntas: [],
  },
  {
    slug: 'alejandro-cruz-minisplit-puebla',
    nombre: 'Alejandro',
    apellidos: 'Cruz Bautista',
    negocio: 'Climas Cruz',
    oficios: ['tecnicos-minisplit'],
    ciudad: 'puebla',
    zonas: ['Toda la ciudad'],
    anios: 10,
    visita: 300,
    urgencias: false,
    factura: true,
    garantiaDias: 180,
    horario: 'Lunes a sábado de 8:00 a 18:00.',
    pagos: PAGOS_TODOS,
    verificado: '2026-09-30',
    calificacion: 4.7,
    resenas: 44,
    trabajos: 66,
    fundador: false,
    bio: 'Instalación y mantenimiento de minisplit inverter y convencional. Hacemos vacío al sistema en cada instalación, que es lo que más se brincan.',
    servicios: [
      { nombre: 'Mantenimiento preventivo', desde: 650 },
      { nombre: 'Instalación de minisplit 1 tonelada', desde: 2800 },
      { nombre: 'Recarga de gas', desde: 900 },
    ],
    preguntas: [],
  },
  {
    slug: 'rosa-tepox-jardinera-atlixco',
    nombre: 'Rosa',
    apellidos: 'Tepox Méndez',
    oficios: ['jardineros'],
    ciudad: 'atlixco',
    zonas: ['Atlixco', 'Metepec', 'San Jerónimo Coyula'],
    anios: 15,
    visita: 0,
    urgencias: false,
    factura: false,
    garantiaDias: 30,
    horario: 'Lunes a sábado de 7:00 a 15:00.',
    pagos: PAGOS_BASICOS,
    verificado: '2026-09-21',
    calificacion: 5,
    resenas: 22,
    trabajos: 30,
    fundador: true,
    bio: 'Vengo de familia de viveristas de Atlixco. Diseño jardines con plantas que aguantan el clima de la zona y doy mantenimiento mensual.',
    servicios: [
      { nombre: 'Visita y propuesta', desde: 0 },
      { nombre: 'Mantenimiento mensual', desde: 1200 },
      { nombre: 'Poda de árbol mediano', desde: 800 },
      { nombre: 'Instalación de riego automático', desde: null },
    ],
    preguntas: [],
  },
  {
    slug: 'oscar-medina-fumigador-cholula',
    nombre: 'Óscar',
    apellidos: 'Medina Paredes',
    negocio: 'Control de Plagas Medina',
    oficios: ['fumigadores'],
    ciudad: 'cholula',
    zonas: ['Cholula', 'Puebla', 'Atlixco'],
    anios: 12,
    visita: 0,
    urgencias: true,
    factura: true,
    garantiaDias: 90,
    horario: 'Lunes a sábado de 8:00 a 19:00.',
    pagos: PAGOS_TODOS,
    verificado: '2026-10-07',
    calificacion: 4.7,
    resenas: 39,
    trabajos: 75,
    fundador: false,
    bio: 'Empresa con licencia sanitaria. Usamos productos con registro de COFEPRIS y le entregamos constancia del servicio, útil para negocios con inspección.',
    servicios: [
      { nombre: 'Fumigación de casa hasta 120 m²', desde: 950 },
      { nombre: 'Tratamiento contra termitas', desde: 2400 },
      { nombre: 'Control de roedores', desde: 1100 },
    ],
    preguntas: [],
  },
];

/* ── Rutas ─────────────────────────────────────────────────── */

export const rutas = {
  home: () => BASE,
  listado: (oficio: string, ciudad: string) => `${BASE}/${oficio}-en-${ciudad}`,
  perfil: (slug: string) => `${BASE}/pro/${slug}`,
  profesionales: () => `${BASE}/soy-profesional`,
};

export function partirListado(segmento: string): { oficio: Oficio; ciudad: Ciudad } | null {
  const corte = segmento.lastIndexOf('-en-');
  if (corte <= 0) return null;
  const oficio = OFICIOS.find((o) => o.slug === segmento.slice(0, corte));
  const ciudad = segmento.slice(corte + 4) as Ciudad;
  if (!oficio || !(ciudad in CIUDADES)) return null;
  return { oficio, ciudad };
}

/* ── Consultas ─────────────────────────────────────────────── */

export function oficio(slug: string): Oficio | undefined {
  return OFICIOS.find((o) => o.slug === slug);
}

export function profesional(slug: string): Profesional | undefined {
  return PROFESIONALES.find((p) => p.slug === slug);
}

export function listar(oficioSlug: string, ciudad?: Ciudad): Profesional[] {
  return PROFESIONALES.filter(
    (p) => p.oficios.includes(oficioSlug) && (!ciudad || p.ciudad === ciudad),
  ).sort((a, b) => b.calificacion - a.calificacion || b.resenas - a.resenas);
}

export function conteos(ciudad?: Ciudad): { oficio: Oficio; total: number }[] {
  return OFICIOS.map((o) => ({ oficio: o, total: listar(o.slug, ciudad).length }));
}

/* ── Texto ─────────────────────────────────────────────────── */

export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function nombreCompleto(p: Pick<Profesional, 'nombre' | 'apellidos'>): string {
  return `${p.nombre} ${p.apellidos}`;
}

export function precio(valor: number): string {
  if (valor === 0) return 'Sin costo';
  return `$${valor.toLocaleString('es-MX')}`;
}

export function fechaLarga(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** WhatsApp del demo: siempre a PG Estrategias, con el perfil en el mensaje. */
export function whatsapp(mensaje: string): string {
  return `https://wa.me/${MARCA.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

export function whatsappPerfil(p: Profesional): string {
  return whatsapp(
    `Hola ${p.nombre}, te encontré en Lista Hogar. Quisiera una cotización. (Mensaje de demo)`,
  );
}
