import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DatosEstructurados from '@/components/listamedica/DatosEstructurados';
import FilaProfesional from '@/components/listamedica/FilaProfesional';
import Filtros from '@/components/listamedica/Filtros';
import {
  combinacionesConPerfiles,
  conteoPorEspecialidad,
  listar,
  obtenerEspecialidadPorSlug,
  opcionesDeFiltro,
} from '@/lib/listamedica/datos';
import { rutas, partirListado, urlAbsoluta } from '@/lib/listamedica/rutas';
import { ciudadesDisponibles, nombreCiudad } from '@/lib/listamedica/texto';
import type { Especialidad } from '@/lib/listamedica/tipos';

export const revalidate = 300;

type Params = { listado: string };
type Consulta = Record<string, string | string[] | undefined>;

export async function generateStaticParams(): Promise<Params[]> {
  const combinaciones = await combinacionesConPerfiles();
  return combinaciones.map(({ especialidad, ciudad }) => ({
    listado: `${especialidad.slug}-en-${ciudad}`,
  }));
}

async function resolver(
  segmento: string,
): Promise<{ especialidad: Especialidad; ciudadSlug: string } | null> {
  const partes = partirListado(segmento);
  if (!partes) return null;
  const ciudades = ciudadesDisponibles().map((c) => c.slug);
  if (!ciudades.includes(partes.ciudadSlug)) return null;
  const especialidad = await obtenerEspecialidadPorSlug(partes.especialidadSlug);
  if (!especialidad) return null;
  return { especialidad, ciudadSlug: partes.ciudadSlug };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resuelto = await resolver(params.listado);
  if (!resuelto) return { title: 'Listado no encontrado' };

  const { especialidad, ciudadSlug } = resuelto;
  const ciudad = nombreCiudad(ciudadSlug);
  const titulo = `${especialidad.nombre_plural} en ${ciudad}`;

  return {
    title: titulo,
    description: `${titulo} con cédula profesional verificada ante la SEP. Compara zona, precio de consulta y horarios, y escribe por WhatsApp desde Lista Médica.`,
    alternates: { canonical: urlAbsoluta(`/${params.listado}`) },
    openGraph: { title: titulo, url: urlAbsoluta(`/${params.listado}`) },
  };
}

export default async function ListadoPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Consulta;
}) {
  const resuelto = await resolver(params.listado);
  if (!resuelto) notFound();

  const { especialidad, ciudadSlug } = resuelto;
  const ciudad = nombreCiudad(ciudadSlug);
  const texto = (clave: string) =>
    typeof searchParams[clave] === 'string' ? (searchParams[clave] as string) : '';

  const valores = {
    colonia: texto('colonia'),
    precioMax: texto('precioMax'),
    genero: texto('genero'),
    idioma: texto('idioma'),
    aseguradora: texto('aseguradora'),
    finSemana: texto('finSemana') === '1',
  };

  const [todosDeLaCiudad, filtrados, especialidadesDeLaCiudad] = await Promise.all([
    listar({ especialidadSlug: especialidad.slug, ciudadSlug }),
    listar({
      especialidadSlug: especialidad.slug,
      ciudadSlug,
      filtros: {
        colonia: valores.colonia || undefined,
        precioMax: valores.precioMax ? Number(valores.precioMax) : undefined,
        genero: valores.genero || undefined,
        idioma: valores.idioma || undefined,
        aseguradora: valores.aseguradora || undefined,
        finSemana: valores.finSemana || undefined,
      },
    }),
    conteoPorEspecialidad(ciudadSlug),
  ]);

  const opciones = opcionesDeFiltro(todosDeLaCiudad);
  const enOtrasCiudades = await Promise.all(
    ciudadesDisponibles()
      .filter((c) => c.slug !== ciudadSlug)
      .map(async (c) => ({
        ...c,
        total: (await listar({ especialidadSlug: especialidad.slug, ciudadSlug: c.slug })).length,
      })),
  );

  const listaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${especialidad.nombre_plural} en ${ciudad}`,
    numberOfItems: filtrados.length,
    itemListElement: filtrados.slice(0, 25).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: urlAbsoluta(`/dr/${p.slug}`),
    })),
  };

  return (
    <div className="lm-marco" style={{ paddingBlock: '26px 60px' }}>
      <DatosEstructurados datos={listaJsonLd} />

      <nav className="lm-nota" style={{ marginBottom: 16 }} aria-label="Ruta de navegación">
        <Link href={rutas.home()}>Lista Médica</Link>
        {' / '}
        <span>
          {especialidad.nombre_plural} en {ciudad}
        </span>
      </nav>

      <header style={{ marginBottom: 22 }}>
        <h1>
          {especialidad.nombre_plural} en {ciudad}
        </h1>
        {especialidad.descripcion && (
          <p style={{ marginTop: 10 }} className="lm-gris">
            {especialidad.descripcion}
          </p>
        )}
        <p className="lm-nota" style={{ marginTop: 10 }}>
          Todos los perfiles publicados tienen su cédula profesional verificada ante el Registro
          Nacional de Profesionistas de la SEP.{' '}
          <Link href={rutas.comoVerificamos()}>Cómo verificamos</Link>
        </p>
      </header>

      <Filtros opciones={opciones} valores={valores} total={filtrados.length} />

      {filtrados.length > 0 ? (
        <div className="lm-lista">
          {filtrados.map((p) => (
            <FilaProfesional key={p.id} profesional={p} />
          ))}
        </div>
      ) : (
        <div className="lm-vacio">
          <p style={{ color: 'var(--tinta)' }}>
            {todosDeLaCiudad.length === 0
              ? `Todavía no hay ${especialidad.nombre_plural.toLowerCase()} publicados en ${ciudad}.`
              : 'Ningún perfil coincide con esos filtros.'}
          </p>
          <p style={{ marginTop: 8 }}>
            {todosDeLaCiudad.length === 0 ? (
              <Link href={rutas.home()}>Ver el índice completo de especialidades</Link>
            ) : (
              <Link href={`${rutas.listado(especialidad.slug, ciudadSlug)}`}>
                Quitar los filtros
              </Link>
            )}
          </p>
        </div>
      )}

      {/* ── Otras ciudades y otras especialidades ─────────── */}
      <section className="lm-seccion" style={{ paddingBlock: '34px 0' }}>
        <h2 style={{ fontSize: 22 }}>{especialidad.nombre_plural} en otras ciudades</h2>
        <div className="lm-chips" style={{ marginTop: 12 }}>
          {enOtrasCiudades.map((c) => (
            <Link key={c.slug} href={rutas.listado(especialidad.slug, c.slug)} className="lm-chip">
              {c.nombre}
              <span className="lm-gris lm-num">{c.total}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="lm-seccion" style={{ paddingBlock: '28px 0' }}>
        <h2 style={{ fontSize: 22 }}>Otras especialidades en {ciudad}</h2>
        <div className="lm-chips" style={{ marginTop: 12 }}>
          {especialidadesDeLaCiudad
            .filter((fila) => fila.especialidad.id !== especialidad.id)
            .slice(0, 12)
            .map((fila) => (
              <Link
                key={fila.especialidad.id}
                href={rutas.listado(fila.especialidad.slug, ciudadSlug)}
                className="lm-chip"
              >
                {fila.especialidad.nombre_plural}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
