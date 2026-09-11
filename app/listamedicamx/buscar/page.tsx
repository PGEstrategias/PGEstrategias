import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  buscarEspecialidades,
  conteoPorEspecialidad,
  listar,
  registrarBusqueda,
} from '@/lib/listamedica/datos';
import { rutas } from '@/lib/listamedica/rutas';
import { ciudadesDisponibles, nombreCiudad } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resultados de búsqueda',
  robots: { index: false, follow: true },
};

/**
 * Puente entre el buscador y los listados.
 *
 * Existe por una razón de negocio: aquí es donde se registra qué buscó la
 * gente y cuántos resultados encontró. Las búsquedas que devuelven cero son
 * la lista de reclutamiento de la semana siguiente.
 */
export default async function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string; ciudad?: string };
}) {
  const termino = (searchParams.q ?? '').trim();
  const ciudades = ciudadesDisponibles();
  const ciudadSlug = ciudades.some((c) => c.slug === searchParams.ciudad)
    ? (searchParams.ciudad as string)
    : 'puebla';

  if (!termino) redirect(rutas.home());

  const coincidencias = await buscarEspecialidades(termino);

  const conConteo = await Promise.all(
    coincidencias.map(async (especialidad) => ({
      especialidad,
      total: (await listar({ especialidadSlug: especialidad.slug, ciudadSlug })).length,
    })),
  );

  const conPerfiles = conConteo.filter((x) => x.total > 0);
  const totalResultados = conPerfiles.reduce((suma, x) => suma + x.total, 0);

  await registrarBusqueda({ termino, ciudad: ciudadSlug, resultados_count: totalResultados });

  // Una sola especialidad con perfiles: no tiene caso mostrar una pantalla
  // intermedia, va directo al listado.
  if (conPerfiles.length === 1) {
    redirect(rutas.listado(conPerfiles[0].especialidad.slug, ciudadSlug));
  }

  const catalogo = await conteoPorEspecialidad(ciudadSlug);

  return (
    <div className="lm-marco lm-marco--angosto" style={{ paddingBlock: '34px 60px' }}>
      <h1>
        &ldquo;{termino}&rdquo; en {nombreCiudad(ciudadSlug)}
      </h1>

      {conPerfiles.length > 1 ? (
        <>
          <p style={{ marginTop: 12 }} className="lm-gris">
            Encontramos {conPerfiles.length} especialidades que coinciden.
          </p>
          <div className="lm-indice" style={{ marginTop: 20, columns: 1 }}>
            {conPerfiles.map(({ especialidad, total }) => (
              <Link
                key={especialidad.id}
                href={rutas.listado(especialidad.slug, ciudadSlug)}
                className="lm-indice__fila"
              >
                <span>{especialidad.nombre_plural}</span>
                <span className="lm-indice__guia" aria-hidden="true" />
                <span className="lm-indice__conteo">{total}</span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="lm-vacio" style={{ marginTop: 18 }}>
            <p style={{ color: 'var(--tinta)' }}>
              Todavía no hay profesionales publicados para esa búsqueda en{' '}
              {nombreCiudad(ciudadSlug)}.
            </p>
            <p style={{ marginTop: 8 }}>
              Quedó registrada: es así como decidimos a qué especialidad invitar primero.
            </p>
          </div>

          {coincidencias.length > 0 && (
            <p className="lm-nota" style={{ marginTop: 16 }}>
              Prueba en otra ciudad:{' '}
              {ciudades
                .filter((c) => c.slug !== ciudadSlug)
                .map((c, i) => (
                  <span key={c.slug}>
                    {i > 0 && ' · '}
                    <Link href={rutas.listado(coincidencias[0].slug, c.slug)}>{c.nombre}</Link>
                  </span>
                ))}
            </p>
          )}
        </>
      )}

      <section className="lm-seccion" style={{ paddingBlock: '34px 0' }}>
        <h2 style={{ fontSize: 22 }}>Especialidades con perfiles en {nombreCiudad(ciudadSlug)}</h2>
        <div className="lm-indice" style={{ marginTop: 14 }}>
          {catalogo.map(({ especialidad, total }) => (
            <Link
              key={especialidad.id}
              href={rutas.listado(especialidad.slug, ciudadSlug)}
              className="lm-indice__fila"
            >
              <span>{especialidad.nombre_plural}</span>
              <span className="lm-indice__guia" aria-hidden="true" />
              <span className="lm-indice__conteo">{total}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
