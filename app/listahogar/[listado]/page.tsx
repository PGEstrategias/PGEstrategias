import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FilaProfesional from '@/components/listahogar/FilaProfesional';
import {
  CIUDADES,
  OFICIOS,
  conteos,
  listar,
  partirListado,
  rutas,
  type Ciudad,
} from '@/lib/listahogar/datos';

type Params = { listado: string };
type Consulta = Record<string, string | string[] | undefined>;

export function generateStaticParams(): Params[] {
  return OFICIOS.flatMap((o) =>
    Object.keys(CIUDADES).map((c) => ({ listado: `${o.slug}-en-${c}` })),
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const r = partirListado(params.listado);
  if (!r) return { title: 'Listado no encontrado' };
  return {
    title: `${r.oficio.plural} en ${CIUDADES[r.ciudad]}`,
    description: `${r.oficio.plural} en ${CIUDADES[r.ciudad]} con identidad, domicilio y referencias verificadas. Compara precio de visita, garantía y zona, y escribe por WhatsApp.`,
  };
}

const FILTROS: { clave: string; etiqueta: string }[] = [
  { clave: 'urgencias', etiqueta: 'Urgencias 24 h' },
  { clave: 'factura', etiqueta: 'Da factura' },
  { clave: 'tarjeta', etiqueta: 'Acepta tarjeta' },
];

export default function ListadoPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Consulta;
}) {
  const r = partirListado(params.listado);
  if (!r) notFound();
  const { oficio, ciudad } = r;

  const activos = new Set(FILTROS.map((f) => f.clave).filter((c) => searchParams[c] === '1'));
  const todos = listar(oficio.slug, ciudad);
  const filtrados = todos.filter(
    (p) =>
      (!activos.has('urgencias') || p.urgencias) &&
      (!activos.has('factura') || p.factura) &&
      (!activos.has('tarjeta') || p.pagos.includes('Tarjeta')),
  );

  /** Enlace que prende o apaga un filtro dejando los demás como están. */
  function alternar(clave: string): string {
    const siguiente = new Set(activos);
    if (siguiente.has(clave)) siguiente.delete(clave);
    else siguiente.add(clave);
    const qs = Array.from(siguiente).map((c) => `${c}=1`).join('&');
    return `${rutas.listado(oficio.slug, ciudad)}${qs ? `?${qs}` : ''}`;
  }

  const otrasCiudades = (Object.keys(CIUDADES) as Ciudad[])
    .filter((c) => c !== ciudad)
    .map((c) => ({ slug: c, nombre: CIUDADES[c], total: listar(oficio.slug, c).length }));

  const otrosOficios = conteos(ciudad).filter((c) => c.oficio.slug !== oficio.slug && c.total > 0);

  return (
    <div className="lh-marco" style={{ paddingBlock: '26px 64px' }}>
      <nav className="lh-migas" aria-label="Ruta de navegación">
        <Link href={rutas.home()}>Lista Hogar</Link> / {oficio.plural} en {CIUDADES[ciudad]}
      </nav>

      <header style={{ marginBottom: 22 }}>
        <h1>
          {oficio.plural} en {CIUDADES[ciudad]}
        </h1>
        <p className="lh-gris" style={{ marginTop: 10 }}>
          {oficio.descripcion}
        </p>
      </header>

      <div className="lh-fila-flex" style={{ marginBottom: 16, justifyContent: 'space-between' }}>
        <div className="lh-chips" role="group" aria-label="Filtros">
          {FILTROS.map((f) => (
            <Link
              key={f.clave}
              href={alternar(f.clave)}
              className={`lh-chip${activos.has(f.clave) ? ' lh-chip--activo' : ''}`}
              aria-pressed={activos.has(f.clave)}
              scroll={false}
            >
              {f.etiqueta}
            </Link>
          ))}
        </div>
        <span className="lh-gris lh-num" style={{ fontSize: 14 }}>
          {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      {filtrados.length > 0 ? (
        <div className="lh-lista">
          {filtrados.map((p) => (
            <FilaProfesional key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <div className="lh-vacio">
          <p style={{ color: 'var(--lh-tinta)' }}>
            {todos.length === 0
              ? `Todavía no hay ${oficio.plural.toLowerCase()} publicados en ${CIUDADES[ciudad]}.`
              : 'Nadie coincide con esos filtros.'}
          </p>
          <p style={{ marginTop: 8 }}>
            {todos.length === 0 ? (
              <Link href={`${rutas.home()}#oficios`}>Ver todos los oficios</Link>
            ) : (
              <Link href={rutas.listado(oficio.slug, ciudad)}>Quitar los filtros</Link>
            )}
          </p>
        </div>
      )}

      <section style={{ paddingTop: 36 }}>
        <h2 style={{ fontSize: 22 }}>{oficio.plural} en otras ciudades</h2>
        <div className="lh-chips" style={{ marginTop: 12 }}>
          {otrasCiudades.map((c) => (
            <Link key={c.slug} href={rutas.listado(oficio.slug, c.slug)} className="lh-chip">
              {c.nombre}
              <span className="lh-gris lh-num">{c.total}</span>
            </Link>
          ))}
        </div>
      </section>

      {otrosOficios.length > 0 && (
        <section style={{ paddingTop: 28 }}>
          <h2 style={{ fontSize: 22 }}>Otros oficios en {CIUDADES[ciudad]}</h2>
          <div className="lh-chips" style={{ marginTop: 12 }}>
            {otrosOficios.map(({ oficio: o, total }) => (
              <Link key={o.slug} href={rutas.listado(o.slug, ciudad)} className="lh-chip">
                {o.plural}
                <span className="lh-gris lh-num">{total}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
