import { calcularCompletitud, faltantes } from './completitud';
import { agregarFila, escribirTabla, leerTabla, nuevoId } from './almacen';
import { normalizar, slugify } from './texto';
import type {
  Busqueda,
  Ciudad,
  Clic,
  Consultorio,
  Especialidad,
  Faq,
  ProfEspecialidad,
  Profesional,
  ProfesionalCompleto,
  Servicio,
  TipoClic,
  Verificacion,
} from './tipos';

/** Estatus que el público alcanza a ver. Los perfiles demo cuentan como vivos. */
const VISIBLES = new Set(['publicado', 'demo']);

export function esVisible(p: Profesional): boolean {
  return VISIBLES.has(p.estatus);
}

/* ────────────────────────── Lecturas ───────────────────────── */

export async function obtenerEspecialidades(): Promise<Especialidad[]> {
  const filas = await leerTabla('especialidades');
  return [...filas].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

export async function obtenerEspecialidadPorSlug(slug: string): Promise<Especialidad | null> {
  const filas = await leerTabla('especialidades');
  return filas.find((e) => e.slug === slug) ?? null;
}

async function completar(
  profesional: Profesional,
  contexto?: {
    especialidades: Especialidad[];
    relaciones: ProfEspecialidad[];
    consultorios: Consultorio[];
    servicios: Servicio[];
    faqs: Faq[];
  },
): Promise<ProfesionalCompleto> {
  const ctx = contexto ?? {
    especialidades: await leerTabla('especialidades'),
    relaciones: await leerTabla('prof_especialidad'),
    consultorios: await leerTabla('consultorios'),
    servicios: await leerTabla('servicios'),
    faqs: await leerTabla('faqs'),
  };

  const relaciones = ctx.relaciones.filter((r) => r.profesional_id === profesional.id);
  const especialidades = relaciones
    .map((r) => ctx.especialidades.find((e) => e.id === r.especialidad_id))
    .filter((e): e is Especialidad => Boolean(e));
  const principalId = relaciones.find((r) => r.es_principal)?.especialidad_id;

  return {
    ...profesional,
    especialidades,
    especialidad_principal:
      ctx.especialidades.find((e) => e.id === principalId) ?? especialidades[0] ?? null,
    consultorios: ctx.consultorios.filter((c) => c.profesional_id === profesional.id),
    servicios: ctx.servicios.filter((s) => s.profesional_id === profesional.id),
    faqs: ctx.faqs
      .filter((f) => f.profesional_id === profesional.id)
      .sort((a, b) => a.orden - b.orden),
  };
}

/** Carga todo de una vez y arma los perfiles completos, sin N+1. */
export async function todosCompletos(): Promise<ProfesionalCompleto[]> {
  const [profesionales, especialidades, relaciones, consultorios, servicios, faqs] =
    await Promise.all([
      leerTabla('profesionales'),
      leerTabla('especialidades'),
      leerTabla('prof_especialidad'),
      leerTabla('consultorios'),
      leerTabla('servicios'),
      leerTabla('faqs'),
    ]);
  const ctx = { especialidades, relaciones, consultorios, servicios, faqs };
  return Promise.all(profesionales.map((p) => completar(p, ctx)));
}

export async function obtenerPorSlug(slug: string): Promise<ProfesionalCompleto | null> {
  const profesionales = await leerTabla('profesionales');
  const encontrado = profesionales.find((p) => p.slug === slug);
  if (!encontrado) return null;
  return completar(encontrado);
}

export async function obtenerPorId(id: string): Promise<ProfesionalCompleto | null> {
  const profesionales = await leerTabla('profesionales');
  const encontrado = profesionales.find((p) => p.id === id);
  if (!encontrado) return null;
  return completar(encontrado);
}

/* ────────────────────────── Listado y filtros ───────────────────────── */

export interface Filtros {
  colonia?: string;
  precioMax?: number;
  genero?: string;
  idioma?: string;
  aseguradora?: string;
  finSemana?: boolean;
}

/** Precio más bajo publicado. null si el profesional no publicó ninguno. */
export function precioDesde(p: ProfesionalCompleto): number | null {
  const precios = p.servicios
    .filter((s) => s.publicar_precio && typeof s.precio_desde === 'number')
    .map((s) => s.precio_desde as number);
  return precios.length ? Math.min(...precios) : null;
}

export function ciudadDe(p: ProfesionalCompleto): Ciudad | null {
  return p.consultorios[0]?.ciudad ?? null;
}

export function coloniaDe(p: ProfesionalCompleto): string {
  return p.consultorios[0]?.colonia ?? '';
}

export async function listar(opciones: {
  especialidadSlug?: string;
  ciudadSlug?: string;
  filtros?: Filtros;
}): Promise<ProfesionalCompleto[]> {
  const { especialidadSlug, ciudadSlug, filtros = {} } = opciones;
  const todos = (await todosCompletos()).filter(esVisible);

  const resultado = todos.filter((p) => {
    if (especialidadSlug && !p.especialidades.some((e) => e.slug === especialidadSlug)) return false;
    if (ciudadSlug && !p.consultorios.some((c) => c.ciudad === ciudadSlug)) return false;
    if (filtros.colonia && !p.consultorios.some((c) => c.colonia === filtros.colonia)) return false;
    if (filtros.genero && p.genero !== filtros.genero) return false;
    if (filtros.idioma && !p.idiomas.includes(filtros.idioma)) return false;
    if (filtros.aseguradora && !p.aseguradoras.includes(filtros.aseguradora)) return false;
    if (filtros.finSemana && !p.consultorios.some((c) => c.atiende_fin_semana)) return false;
    if (typeof filtros.precioMax === 'number') {
      const desde = precioDesde(p);
      if (desde === null || desde > filtros.precioMax) return false;
    }
    return true;
  });

  return resultado.sort((a, b) => {
    if (a.orden !== b.orden) return a.orden - b.orden;
    return a.apellidos.localeCompare(b.apellidos, 'es');
  });
}

/** Opciones reales de filtro para un listado dado: solo lo que existe. */
export function opcionesDeFiltro(perfiles: ProfesionalCompleto[]) {
  const colonias = new Set<string>();
  const idiomas = new Set<string>();
  const aseguradoras = new Set<string>();
  let hayFinSemana = false;
  const precios: number[] = [];

  perfiles.forEach((p) => {
    p.consultorios.forEach((c) => {
      if (c.colonia) colonias.add(c.colonia);
      if (c.atiende_fin_semana) hayFinSemana = true;
    });
    p.idiomas.forEach((i) => idiomas.add(i));
    p.aseguradoras.forEach((a) => aseguradoras.add(a));
    const desde = precioDesde(p);
    if (desde !== null) precios.push(desde);
  });

  return {
    colonias: Array.from(colonias).sort((a, b) => a.localeCompare(b, 'es')),
    idiomas: Array.from(idiomas).sort((a, b) => a.localeCompare(b, 'es')),
    aseguradoras: Array.from(aseguradoras).sort((a, b) => a.localeCompare(b, 'es')),
    hayFinSemana,
    precioMin: precios.length ? Math.min(...precios) : null,
    precioMax: precios.length ? Math.max(...precios) : null,
  };
}

/** Conteo de perfiles visibles por especialidad, para el índice del home. */
export async function conteoPorEspecialidad(
  ciudadSlug?: string,
): Promise<{ especialidad: Especialidad; total: number }[]> {
  const [especialidades, perfiles] = await Promise.all([
    obtenerEspecialidades(),
    todosCompletos(),
  ]);
  const visibles = perfiles.filter(esVisible);

  return especialidades
    .map((especialidad) => ({
      especialidad,
      total: visibles.filter(
        (p) =>
          p.especialidades.some((e) => e.id === especialidad.id) &&
          (!ciudadSlug || p.consultorios.some((c) => c.ciudad === ciudadSlug)),
      ).length,
    }))
    .filter((fila) => fila.total > 0);
}

/** Combinaciones especialidad × ciudad con al menos un perfil. Para el sitemap. */
export async function combinacionesConPerfiles(): Promise<
  { especialidad: Especialidad; ciudad: Ciudad; total: number }[]
> {
  const [especialidades, perfiles] = await Promise.all([
    obtenerEspecialidades(),
    todosCompletos(),
  ]);
  const visibles = perfiles.filter(esVisible);
  const ciudades: Ciudad[] = ['puebla', 'cholula', 'atlixco'];
  const salida: { especialidad: Especialidad; ciudad: Ciudad; total: number }[] = [];

  especialidades.forEach((especialidad) => {
    ciudades.forEach((ciudad) => {
      const total = visibles.filter(
        (p) =>
          p.especialidades.some((e) => e.id === especialidad.id) &&
          p.consultorios.some((c) => c.ciudad === ciudad),
      ).length;
      if (total > 0) salida.push({ especialidad, ciudad, total });
    });
  });

  return salida;
}

/** Perfiles para la franja de destacados del home: completos primero. */
export async function destacados(cantidad = 6): Promise<ProfesionalCompleto[]> {
  const perfiles = (await todosCompletos()).filter(esVisible);
  return perfiles
    .slice()
    .sort((a, b) => {
      const conFoto = Number(Boolean(b.foto_url)) - Number(Boolean(a.foto_url));
      if (conFoto !== 0) return conFoto;
      const verificado = Number(Boolean(b.verificado_en)) - Number(Boolean(a.verificado_en));
      if (verificado !== 0) return verificado;
      return (b.google_rating ?? 0) - (a.google_rating ?? 0);
    })
    .slice(0, cantidad);
}

export async function totalPublicados(): Promise<number> {
  const profesionales = await leerTabla('profesionales');
  return profesionales.filter(esVisible).length;
}

/** Cupo de fundador: 1,000 perfiles, contados de la base, no inventados. */
export const CUPO_FUNDADOR = 1000;

export async function lugaresFundadorRestantes(): Promise<number> {
  const profesionales = await leerTabla('profesionales');
  const ocupados = profesionales.filter((p) => p.es_fundador && p.estatus !== 'borrador').length;
  return Math.max(CUPO_FUNDADOR - ocupados, 0);
}

/* ────────────────────────── Búsqueda ───────────────────────── */

/** Busca especialidad por nombre o sinónimo. Devuelve coincidencias ordenadas. */
export async function buscarEspecialidades(termino: string): Promise<Especialidad[]> {
  const q = normalizar(termino);
  if (!q) return [];
  const especialidades = await obtenerEspecialidades();

  const puntuar = (e: Especialidad): number => {
    const nombre = normalizar(e.nombre);
    const plural = normalizar(e.nombre_plural);
    if (nombre === q || plural === q) return 100;
    if (nombre.startsWith(q) || plural.startsWith(q)) return 80;
    if (e.sinonimos.some((s) => normalizar(s) === q)) return 70;
    if (e.sinonimos.some((s) => normalizar(s).includes(q))) return 50;
    if (nombre.includes(q) || plural.includes(q)) return 40;
    return 0;
  };

  return especialidades
    .map((e) => ({ e, puntos: puntuar(e) }))
    .filter((x) => x.puntos > 0)
    .sort((a, b) => b.puntos - a.puntos)
    .map((x) => x.e);
}

/* ────────────────────────── Escrituras de analítica ───────────────────────── */

export async function registrarClic(datos: {
  profesional_id: string;
  tipo: TipoClic;
  utm_source?: string;
  utm_campaign?: string;
  referrer?: string;
  dispositivo: 'movil' | 'escritorio';
}): Promise<void> {
  const clic: Clic = {
    id: nuevoId('clic-'),
    profesional_id: datos.profesional_id,
    tipo: datos.tipo,
    timestamp: new Date().toISOString(),
    utm_source: datos.utm_source ?? '',
    utm_campaign: datos.utm_campaign ?? '',
    referrer: datos.referrer ?? '',
    dispositivo: datos.dispositivo,
  };
  await agregarFila('clics', clic);
}

export async function registrarBusqueda(datos: {
  termino: string;
  ciudad: string;
  resultados_count: number;
}): Promise<void> {
  const termino = datos.termino.trim();
  if (!termino) return;
  const busqueda: Busqueda = {
    id: nuevoId('bus-'),
    termino,
    ciudad: datos.ciudad,
    resultados_count: datos.resultados_count,
    timestamp: new Date().toISOString(),
  };
  await agregarFila('busquedas', busqueda);
}

export async function registrarVerificacion(datos: {
  profesional_id: string;
  numero_consultado: string;
  resultado: Verificacion['resultado'];
  evidencia_url: string;
  verificado_por: string;
}): Promise<void> {
  const verificacion: Verificacion = {
    id: nuevoId('ver-'),
    profesional_id: datos.profesional_id,
    fuente: 'Registro Nacional de Profesionistas (SEP)',
    numero_consultado: datos.numero_consultado,
    resultado: datos.resultado,
    evidencia_url: datos.evidencia_url,
    verificado_por: datos.verificado_por,
    timestamp: new Date().toISOString(),
  };
  await agregarFila('verificaciones', verificacion);
}

/* ────────────────────────── Escrituras del panel ───────────────────────── */

export interface EntradaProfesional {
  profesional: Omit<Profesional, 'completitud_pct' | 'fecha_alta' | 'orden'> &
    Partial<Pick<Profesional, 'completitud_pct' | 'fecha_alta' | 'orden'>>;
  especialidad_ids: string[];
  especialidad_principal_id: string;
  consultorios: Omit<Consultorio, 'id' | 'profesional_id'>[];
  servicios: Omit<Servicio, 'id' | 'profesional_id'>[];
  faqs: Omit<Faq, 'id' | 'profesional_id'>[];
}

/** Genera un slug libre a partir del nombre; agrega sufijo si ya existe. */
export async function slugDisponible(base: string, idPropio?: string): Promise<string> {
  const profesionales = await leerTabla('profesionales');
  const raiz = slugify(base) || 'profesional';
  let candidato = raiz;
  let n = 2;
  while (profesionales.some((p) => p.slug === candidato && p.id !== idPropio)) {
    candidato = `${raiz}-${n}`;
    n += 1;
  }
  return candidato;
}

/** Alta o edición. Reescribe en bloque las filas hijas del profesional. */
export async function guardarProfesional(entrada: EntradaProfesional): Promise<Profesional> {
  const [profesionales, relaciones, consultorios, servicios, faqs] = await Promise.all([
    leerTabla('profesionales'),
    leerTabla('prof_especialidad'),
    leerTabla('consultorios'),
    leerTabla('servicios'),
    leerTabla('faqs'),
  ]);

  const id = entrada.profesional.id || nuevoId('prof-');
  const previo = profesionales.find((p) => p.id === id);

  const nuevosConsultorios: Consultorio[] = entrada.consultorios.map((c, i) => ({
    ...c,
    id: `${id}-cons-${i + 1}`,
    profesional_id: id,
  }));
  const nuevosServicios: Servicio[] = entrada.servicios.map((s, i) => ({
    ...s,
    id: `${id}-serv-${i + 1}`,
    profesional_id: id,
  }));
  const nuevasFaqs: Faq[] = entrada.faqs.map((f, i) => ({
    ...f,
    id: `${id}-faq-${i + 1}`,
    profesional_id: id,
    orden: f.orden || i + 1,
  }));

  const base: Profesional = {
    ...(entrada.profesional as Profesional),
    id,
    slug: entrada.profesional.slug || (await slugDisponible(
      `${entrada.profesional.nombre} ${entrada.profesional.apellidos}`,
      id,
    )),
    fecha_alta: previo?.fecha_alta ?? new Date().toISOString(),
    orden: previo?.orden ?? profesionales.length + 1,
    completitud_pct: 0,
  };

  base.completitud_pct = calcularCompletitud({
    profesional: base,
    consultorios: nuevosConsultorios,
    servicios: nuevosServicios,
    faqs: nuevasFaqs,
    especialidades: entrada.especialidad_ids.length,
  });

  const nuevasRelaciones: ProfEspecialidad[] = entrada.especialidad_ids.map((especialidad_id) => ({
    profesional_id: id,
    especialidad_id,
    es_principal: especialidad_id === entrada.especialidad_principal_id,
  }));

  await Promise.all([
    escribirTabla('profesionales', [
      ...profesionales.filter((p) => p.id !== id),
      base,
    ]),
    escribirTabla('prof_especialidad', [
      ...relaciones.filter((r) => r.profesional_id !== id),
      ...nuevasRelaciones,
    ]),
    escribirTabla('consultorios', [
      ...consultorios.filter((c) => c.profesional_id !== id),
      ...nuevosConsultorios,
    ]),
    escribirTabla('servicios', [
      ...servicios.filter((s) => s.profesional_id !== id),
      ...nuevosServicios,
    ]),
    escribirTabla('faqs', [...faqs.filter((f) => f.profesional_id !== id), ...nuevasFaqs]),
  ]);

  return base;
}

export async function eliminarProfesional(id: string): Promise<void> {
  const [profesionales, relaciones, consultorios, servicios, faqs] = await Promise.all([
    leerTabla('profesionales'),
    leerTabla('prof_especialidad'),
    leerTabla('consultorios'),
    leerTabla('servicios'),
    leerTabla('faqs'),
  ]);
  await Promise.all([
    escribirTabla('profesionales', profesionales.filter((p) => p.id !== id)),
    escribirTabla('prof_especialidad', relaciones.filter((r) => r.profesional_id !== id)),
    escribirTabla('consultorios', consultorios.filter((c) => c.profesional_id !== id)),
    escribirTabla('servicios', servicios.filter((s) => s.profesional_id !== id)),
    escribirTabla('faqs', faqs.filter((f) => f.profesional_id !== id)),
  ]);
}

export async function agregarEspecialidad(nombre: string, plural: string): Promise<Especialidad> {
  const especialidades = await leerTabla('especialidades');
  const slug = await (async () => {
    const raiz = slugify(plural || nombre);
    let candidato = raiz;
    let n = 2;
    while (especialidades.some((e) => e.slug === candidato)) {
      candidato = `${raiz}-${n}`;
      n += 1;
    }
    return candidato;
  })();

  const nueva: Especialidad = {
    id: nuevoId('esp-'),
    nombre: nombre.trim(),
    nombre_plural: (plural || nombre).trim(),
    slug,
    descripcion: '',
    sinonimos: [],
  };
  await escribirTabla('especialidades', [...especialidades, nueva]);
  return nueva;
}

/** Qué le falta a un perfil, para la lista accionable del panel. */
export function pendientesDe(p: ProfesionalCompleto): string[] {
  return faltantes({
    profesional: p,
    consultorios: p.consultorios,
    servicios: p.servicios,
    faqs: p.faqs,
    especialidades: p.especialidades.length,
  });
}
