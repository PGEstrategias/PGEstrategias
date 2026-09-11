/**
 * Modelo de datos de Lista Médica.
 *
 * Regla dura del producto: aquí NO existe ninguna entidad que guarde datos
 * de pacientes ni información clínica. Si alguna vez hace falta agregar un
 * tipo nuevo, revisa primero la sección 4 del Aviso de Privacidad.
 */

export type Ciudad = 'puebla' | 'cholula' | 'atlixco';

export type EstatusProfesional = 'borrador' | 'publicado' | 'pausado' | 'demo';

export type TipoClic = 'whatsapp' | 'telefono' | 'mapa' | 'vista_perfil';

export type Genero = 'femenino' | 'masculino' | 'no_especificado';

export interface Especialidad {
  id: string;
  /** Nombre de la especialidad: "Dermatología". */
  nombre: string;
  /**
   * Cómo se le llama a quien la ejerce, en plural: "Dermatólogos".
   * Es lo que encabeza cada página de listado y lo que la gente escribe
   * en el buscador, por eso se guarda y no se deriva del slug (el slug
   * ya perdió los acentos).
   */
  nombre_plural: string;
  /** Mitad izquierda de la ruta /[especialidad]-en-[ciudad]. */
  slug: string;
  descripcion: string;
  sinonimos: string[];
}

export interface Consultorio {
  id: string;
  profesional_id: string;
  calle: string;
  numero: string;
  torre: string;
  piso: string;
  consultorio: string;
  colonia: string;
  cp: string;
  ciudad: Ciudad;
  lat: number | null;
  lng: number | null;
  referencias: string;
  estacionamiento: string;
  horario_texto: string;
  atiende_fin_semana: boolean;
}

export interface Servicio {
  id: string;
  profesional_id: string;
  nombre: string;
  precio_desde: number | null;
  publicar_precio: boolean;
}

export interface Faq {
  id: string;
  profesional_id: string;
  pregunta: string;
  respuesta: string;
  orden: number;
}

export interface Profesional {
  id: string;
  nombre: string;
  apellidos: string;
  titulo: string;
  cedula: string;
  cedula_especialidad: string;
  slug: string;
  bio: string;
  foto_url: string;
  telefono: string;
  whatsapp: string;
  genero: Genero;
  idiomas: string[];
  anios_experiencia: number | null;
  universidad: string;
  universidad_especialidad: string;
  certificacion_consejo: string;
  vigencia_certificacion: string;
  aseguradoras: string[];
  google_place_id: string;
  google_rating: number | null;
  google_reviews_count: number | null;
  google_sync_at: string | null;
  verificado_en: string | null;
  evidencia_verificacion_url: string;
  estatus: EstatusProfesional;
  completitud_pct: number;
  es_fundador: boolean;
  fecha_alta: string;
  orden: number;
}

export interface ProfEspecialidad {
  profesional_id: string;
  especialidad_id: string;
  es_principal: boolean;
}

export interface Clic {
  id: string;
  profesional_id: string;
  tipo: TipoClic;
  timestamp: string;
  utm_source: string;
  utm_campaign: string;
  referrer: string;
  dispositivo: 'movil' | 'escritorio';
}

export interface Busqueda {
  id: string;
  termino: string;
  ciudad: string;
  resultados_count: number;
  timestamp: string;
}

export interface Verificacion {
  id: string;
  profesional_id: string;
  fuente: string;
  numero_consultado: string;
  resultado: 'encontrado' | 'no_encontrado' | 'pendiente';
  evidencia_url: string;
  verificado_por: string;
  timestamp: string;
}

/** Fase 2. Se crea vacía y sin interfaz para no migrar después. */
export interface Resena {
  id: string;
  profesional_id: string;
  autor: string;
  calificacion: number;
  texto: string;
  publicada: boolean;
  timestamp: string;
}

/** Forma completa del almacén en disco. */
export interface BaseListaMedica {
  profesionales: Profesional[];
  especialidades: Especialidad[];
  prof_especialidad: ProfEspecialidad[];
  consultorios: Consultorio[];
  servicios: Servicio[];
  faqs: Faq[];
  clics: Clic[];
  busquedas: Busqueda[];
  verificaciones: Verificacion[];
  resenas: Resena[];
}

/** Profesional con todo lo que cuelga de él, ya resuelto. */
export interface ProfesionalCompleto extends Profesional {
  especialidades: Especialidad[];
  especialidad_principal: Especialidad | null;
  consultorios: Consultorio[];
  servicios: Servicio[];
  faqs: Faq[];
}
