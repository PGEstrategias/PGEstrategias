import { slugify } from './texto';
import type {
  Ciudad,
  Consultorio,
  EstatusProfesional,
  Faq,
  Genero,
  Profesional,
  ProfesionalCompleto,
  Servicio,
} from './tipos';
import type { EntradaProfesional } from './datos';

/**
 * Forma que toman los datos mientras se capturan.
 *
 * Es distinta del modelo porque un formulario maneja cadenas y el modelo
 * maneja números y nulos. La conversión ocurre en un solo lugar (`aEntrada`)
 * para que no se escape nunca un "" donde debía ir null.
 */

export type ConsultorioForm = Omit<Consultorio, 'id' | 'profesional_id' | 'lat' | 'lng'> & {
  lat: string;
  lng: string;
};

export type ServicioForm = Omit<Servicio, 'id' | 'profesional_id' | 'precio_desde'> & {
  precio_desde: string;
};

export type FaqForm = Omit<Faq, 'id' | 'profesional_id'>;

export interface ValoresFormulario {
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
  idiomas: string;
  anios_experiencia: string;
  universidad: string;
  universidad_especialidad: string;
  certificacion_consejo: string;
  vigencia_certificacion: string;
  aseguradoras: string;
  google_place_id: string;
  verificado_en: string;
  evidencia_verificacion_url: string;
  estatus: EstatusProfesional;
  es_fundador: boolean;
  especialidad_ids: string[];
  especialidad_principal_id: string;
  consultorios: ConsultorioForm[];
  servicios: ServicioForm[];
  faqs: FaqForm[];
}

export function consultorioVacio(): ConsultorioForm {
  return {
    calle: '',
    numero: '',
    torre: '',
    piso: '',
    consultorio: '',
    colonia: '',
    cp: '',
    ciudad: 'puebla',
    lat: '',
    lng: '',
    referencias: '',
    estacionamiento: '',
    horario_texto: '',
    atiende_fin_semana: false,
  };
}

export function formularioVacio(): ValoresFormulario {
  return {
    id: '',
    nombre: '',
    apellidos: '',
    titulo: 'Dr.',
    cedula: '',
    cedula_especialidad: '',
    slug: '',
    bio: '',
    foto_url: '',
    telefono: '',
    whatsapp: '',
    genero: 'no_especificado',
    idiomas: 'Español',
    anios_experiencia: '',
    universidad: '',
    universidad_especialidad: '',
    certificacion_consejo: '',
    vigencia_certificacion: '',
    aseguradoras: '',
    google_place_id: '',
    verificado_en: '',
    evidencia_verificacion_url: '',
    estatus: 'borrador',
    es_fundador: true,
    especialidad_ids: [],
    especialidad_principal_id: '',
    consultorios: [consultorioVacio()],
    servicios: [{ nombre: 'Consulta', precio_desde: '', publicar_precio: true }],
    faqs: [],
  };
}

export function desdeProfesional(p: ProfesionalCompleto): ValoresFormulario {
  return {
    id: p.id,
    nombre: p.nombre,
    apellidos: p.apellidos,
    titulo: p.titulo,
    cedula: p.cedula,
    cedula_especialidad: p.cedula_especialidad,
    slug: p.slug,
    bio: p.bio,
    foto_url: p.foto_url,
    telefono: p.telefono,
    whatsapp: p.whatsapp,
    genero: p.genero,
    idiomas: p.idiomas.join(', '),
    anios_experiencia: p.anios_experiencia === null ? '' : String(p.anios_experiencia),
    universidad: p.universidad,
    universidad_especialidad: p.universidad_especialidad,
    certificacion_consejo: p.certificacion_consejo,
    vigencia_certificacion: p.vigencia_certificacion,
    aseguradoras: p.aseguradoras.join(', '),
    google_place_id: p.google_place_id,
    verificado_en: p.verificado_en ?? '',
    evidencia_verificacion_url: p.evidencia_verificacion_url,
    estatus: p.estatus,
    es_fundador: p.es_fundador,
    especialidad_ids: p.especialidades.map((e) => e.id),
    especialidad_principal_id: p.especialidad_principal?.id ?? '',
    consultorios: p.consultorios.length
      ? p.consultorios.map((c) => ({
          calle: c.calle,
          numero: c.numero,
          torre: c.torre,
          piso: c.piso,
          consultorio: c.consultorio,
          colonia: c.colonia,
          cp: c.cp,
          ciudad: c.ciudad,
          lat: c.lat === null ? '' : String(c.lat),
          lng: c.lng === null ? '' : String(c.lng),
          referencias: c.referencias,
          estacionamiento: c.estacionamiento,
          horario_texto: c.horario_texto,
          atiende_fin_semana: c.atiende_fin_semana,
        }))
      : [consultorioVacio()],
    servicios: p.servicios.map((s) => ({
      nombre: s.nombre,
      precio_desde: s.precio_desde === null ? '' : String(s.precio_desde),
      publicar_precio: s.publicar_precio,
    })),
    faqs: p.faqs.map((f) => ({ pregunta: f.pregunta, respuesta: f.respuesta, orden: f.orden })),
  };
}

const lista = (texto: string): string[] =>
  texto
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

const numero = (texto: string): number | null => {
  const limpio = texto.replace(/[^0-9.-]/g, '');
  if (!limpio) return null;
  const valor = Number(limpio);
  return Number.isFinite(valor) ? valor : null;
};

/** Traduce lo capturado al modelo, ya con números y nulos donde toca. */
export function aEntrada(v: ValoresFormulario): EntradaProfesional {
  const profesional: Omit<Profesional, 'completitud_pct' | 'fecha_alta' | 'orden'> = {
    id: v.id,
    nombre: v.nombre.trim(),
    apellidos: v.apellidos.trim(),
    titulo: v.titulo.trim(),
    cedula: v.cedula.trim(),
    cedula_especialidad: v.cedula_especialidad.trim(),
    slug: v.slug.trim(),
    bio: v.bio.trim(),
    foto_url: v.foto_url.trim(),
    telefono: v.telefono.trim(),
    whatsapp: (v.whatsapp || v.telefono).trim(),
    genero: v.genero,
    idiomas: lista(v.idiomas),
    anios_experiencia: numero(v.anios_experiencia),
    universidad: v.universidad.trim(),
    universidad_especialidad: v.universidad_especialidad.trim(),
    certificacion_consejo: v.certificacion_consejo.trim(),
    vigencia_certificacion: v.vigencia_certificacion.trim(),
    aseguradoras: lista(v.aseguradoras),
    google_place_id: v.google_place_id.trim(),
    google_rating: null,
    google_reviews_count: null,
    google_sync_at: null,
    verificado_en: v.verificado_en || null,
    evidencia_verificacion_url: v.evidencia_verificacion_url,
    estatus: v.estatus,
    es_fundador: v.es_fundador,
  };

  return {
    profesional,
    especialidad_ids: v.especialidad_ids,
    especialidad_principal_id: v.especialidad_principal_id || v.especialidad_ids[0] || '',
    consultorios: v.consultorios
      .filter((c) => c.calle.trim() || c.colonia.trim())
      .map((c) => ({
        calle: c.calle.trim(),
        numero: c.numero.trim(),
        torre: c.torre.trim(),
        piso: c.piso.trim(),
        consultorio: c.consultorio.trim(),
        colonia: c.colonia.trim(),
        cp: c.cp.trim(),
        ciudad: c.ciudad as Ciudad,
        lat: numero(c.lat),
        lng: numero(c.lng),
        referencias: c.referencias.trim(),
        estacionamiento: c.estacionamiento.trim(),
        horario_texto: c.horario_texto.trim(),
        atiende_fin_semana: c.atiende_fin_semana,
      })),
    servicios: v.servicios
      .filter((s) => s.nombre.trim())
      .map((s) => ({
        nombre: s.nombre.trim(),
        precio_desde: numero(s.precio_desde),
        publicar_precio: s.publicar_precio && numero(s.precio_desde) !== null,
      })),
    faqs: v.faqs
      .filter((f) => f.pregunta.trim() && f.respuesta.trim())
      .map((f, i) => ({ pregunta: f.pregunta.trim(), respuesta: f.respuesta.trim(), orden: i + 1 })),
  };
}

/** Slug sugerido: nombre, especialidad y ciudad. Se puede editar a mano. */
export function slugSugerido(
  v: ValoresFormulario,
  nombreEspecialidad: string,
): string {
  const ciudad = v.consultorios[0]?.ciudad ?? '';
  return slugify(`${v.nombre} ${v.apellidos} ${nombreEspecialidad} ${ciudad}`);
}

/**
 * La calificación de Google no se captura a mano: la trae el sincronizador.
 * Al guardar se conservan los valores que ya tenía el perfil.
 */
export function conservarGoogle(
  entrada: EntradaProfesional,
  previo: Pick<Profesional, 'google_rating' | 'google_reviews_count' | 'google_sync_at'> | null,
): EntradaProfesional {
  if (!previo) return entrada;
  return {
    ...entrada,
    profesional: {
      ...entrada.profesional,
      google_rating: previo.google_rating,
      google_reviews_count: previo.google_reviews_count,
      google_sync_at: previo.google_sync_at,
    },
  };
}
