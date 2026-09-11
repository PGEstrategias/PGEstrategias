import { leerTabla } from './almacen';
import { esVisible, pendientesDe, todosCompletos } from './datos';
import { nombreCiudad, normalizar } from './texto';
import type { Ciudad, ProfesionalCompleto } from './tipos';

/**
 * Métricas del panel.
 *
 * Están pensadas para contestar preguntas de operación, no para adornar:
 * a quién hay que perseguir para que complete su perfil, quién no ha recibido
 * un solo mensaje, y a qué especialidad salir a reclutar mañana.
 */

export interface ResumenMetricas {
  publicados: number;
  borradores: number;
  pausados: number;
  porEspecialidad: { nombre: string; total: number }[];
  porCiudad: { nombre: string; total: number }[];
  altasPorSemana: { semana: string; total: number }[];
  incompletos: { perfil: ProfesionalCompleto; pendientes: string[] }[];
  vistas: number;
  clicsWhatsApp: number;
  clicsTelefono: number;
  clicsMapa: number;
  porProfesional: {
    perfil: ProfesionalCompleto;
    vistas: number;
    whatsapp: number;
    conversion: number;
  }[];
  sinContactos: ProfesionalCompleto[];
  busquedasTop: { termino: string; veces: number; resultadosPromedio: number }[];
  busquedasSinResultados: { termino: string; ciudad: string; veces: number }[];
  clicsPorDispositivo: { movil: number; escritorio: number };
}

/** Lunes de la semana de una fecha, en formato AAAA-MM-DD. */
function inicioDeSemana(iso: string): string {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return '';
  const dia = (fecha.getUTCDay() + 6) % 7;
  fecha.setUTCDate(fecha.getUTCDate() - dia);
  return fecha.toISOString().slice(0, 10);
}

export async function resumen(semanas = 12): Promise<ResumenMetricas> {
  const [perfiles, clics, busquedas] = await Promise.all([
    todosCompletos(),
    leerTabla('clics'),
    leerTabla('busquedas'),
  ]);

  const visibles = perfiles.filter(esVisible);

  /* Distribución */
  const porEspecialidad = new Map<string, number>();
  const porCiudad = new Map<string, number>();
  visibles.forEach((p) => {
    p.especialidades.forEach((e) =>
      porEspecialidad.set(e.nombre, (porEspecialidad.get(e.nombre) ?? 0) + 1),
    );
    const ciudad = p.consultorios[0]?.ciudad as Ciudad | undefined;
    if (ciudad) porCiudad.set(nombreCiudad(ciudad), (porCiudad.get(ciudad) ?? 0) + 1);
  });

  /* Altas por semana */
  const conteoSemanas = new Map<string, number>();
  const hoy = new Date();
  for (let i = semanas - 1; i >= 0; i -= 1) {
    const fecha = new Date(hoy);
    fecha.setUTCDate(fecha.getUTCDate() - i * 7);
    conteoSemanas.set(inicioDeSemana(fecha.toISOString()), 0);
  }
  perfiles.forEach((p) => {
    const semana = inicioDeSemana(p.fecha_alta);
    if (conteoSemanas.has(semana)) {
      conteoSemanas.set(semana, (conteoSemanas.get(semana) ?? 0) + 1);
    }
  });

  /* Clics */
  const cuenta = (tipo: string) => clics.filter((c) => c.tipo === tipo).length;
  const porProfesional = perfiles
    .map((perfil) => {
      const suyos = clics.filter((c) => c.profesional_id === perfil.id);
      const vistas = suyos.filter((c) => c.tipo === 'vista_perfil').length;
      const whatsapp = suyos.filter((c) => c.tipo === 'whatsapp').length;
      return {
        perfil,
        vistas,
        whatsapp,
        conversion: vistas > 0 ? Math.round((whatsapp / vistas) * 100) : 0,
      };
    })
    .sort((a, b) => b.whatsapp - a.whatsapp || b.vistas - a.vistas);

  /* Búsquedas */
  const agrupadas = new Map<string, { termino: string; veces: number; resultados: number[] }>();
  busquedas.forEach((b) => {
    const clave = normalizar(b.termino);
    const previo = agrupadas.get(clave) ?? { termino: b.termino, veces: 0, resultados: [] };
    previo.veces += 1;
    previo.resultados.push(b.resultados_count);
    agrupadas.set(clave, previo);
  });

  const busquedasTop = Array.from(agrupadas.values())
    .map((x) => ({
      termino: x.termino,
      veces: x.veces,
      resultadosPromedio: Math.round(
        x.resultados.reduce((s, n) => s + n, 0) / Math.max(x.resultados.length, 1),
      ),
    }))
    .sort((a, b) => b.veces - a.veces)
    .slice(0, 20);

  const vacias = new Map<string, { termino: string; ciudad: string; veces: number }>();
  busquedas
    .filter((b) => b.resultados_count === 0)
    .forEach((b) => {
      const clave = `${normalizar(b.termino)}|${b.ciudad}`;
      const previo = vacias.get(clave) ?? { termino: b.termino, ciudad: b.ciudad, veces: 0 };
      previo.veces += 1;
      vacias.set(clave, previo);
    });

  return {
    publicados: perfiles.filter((p) => p.estatus === 'publicado' || p.estatus === 'demo').length,
    borradores: perfiles.filter((p) => p.estatus === 'borrador').length,
    pausados: perfiles.filter((p) => p.estatus === 'pausado').length,
    porEspecialidad: Array.from(porEspecialidad.entries())
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total),
    porCiudad: Array.from(porCiudad.entries())
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total),
    altasPorSemana: Array.from(conteoSemanas.entries()).map(([semana, total]) => ({ semana, total })),
    incompletos: perfiles
      .filter((p) => p.completitud_pct < 70)
      .sort((a, b) => a.completitud_pct - b.completitud_pct)
      .map((perfil) => ({ perfil, pendientes: pendientesDe(perfil) })),
    vistas: cuenta('vista_perfil'),
    clicsWhatsApp: cuenta('whatsapp'),
    clicsTelefono: cuenta('telefono'),
    clicsMapa: cuenta('mapa'),
    porProfesional,
    sinContactos: porProfesional.filter((x) => x.whatsapp === 0).map((x) => x.perfil),
    busquedasTop,
    busquedasSinResultados: Array.from(vacias.values()).sort((a, b) => b.veces - a.veces),
    clicsPorDispositivo: {
      movil: clics.filter((c) => c.dispositivo === 'movil').length,
      escritorio: clics.filter((c) => c.dispositivo === 'escritorio').length,
    },
  };
}
