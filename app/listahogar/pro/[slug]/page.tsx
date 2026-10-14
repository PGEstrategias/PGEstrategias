import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Estrellas from '@/components/listahogar/Estrellas';
import Retrato from '@/components/listahogar/Retrato';
import Sello from '@/components/listahogar/Sello';
import {
  CIUDADES,
  PROFESIONALES,
  TEXTO_SELLO,
  nombreCompleto,
  oficio,
  precio,
  profesional,
  rutas,
  whatsappPerfil,
} from '@/lib/listahogar/datos';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROFESIONALES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = profesional(params.slug);
  if (!p) return { title: 'Perfil no encontrado' };
  const principal = oficio(p.oficios[0]);
  return {
    title: `${nombreCompleto(p)}, ${principal?.nombre.toLowerCase()} en ${CIUDADES[p.ciudad]}`,
    description: p.bio.slice(0, 155),
  };
}

const AVISO_WA =
  'Al escribir por WhatsApp, la conversación es directamente con el profesional. Lista Hogar no participa en ella ni guarda su contenido.';

export default function PerfilPage({ params }: { params: Params }) {
  const p = profesional(params.slug);
  if (!p) notFound();

  const oficios = p.oficios.map((s) => oficio(s)!).filter(Boolean);
  const principal = oficios[0];
  const enlaceWa = whatsappPerfil(p);

  return (
    <>
      <div className="lh-marco" style={{ paddingBlock: '26px 64px' }}>
        <nav className="lh-migas" aria-label="Ruta de navegación">
          <Link href={rutas.home()}>Lista Hogar</Link> /{' '}
          <Link href={rutas.listado(principal.slug, p.ciudad)}>
            {principal.plural} en {CIUDADES[p.ciudad]}
          </Link>
        </nav>

        <div className="lh-columnas">
          <div>
            <header
              style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                paddingBottom: 20,
                borderBottom: '1px solid var(--lh-linea)',
              }}
            >
              <Retrato nombre={p.nombre} apellidos={p.apellidos} grande />
              <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                <h1>{nombreCompleto(p)}</h1>
                <p style={{ marginTop: 6, fontSize: 17 }}>
                  {oficios.map((o) => o.nombre).join(' · ')}
                  {p.negocio && <span className="lh-gris"> — {p.negocio}</span>}
                </p>
                <div className="lh-fila-flex" style={{ marginTop: 8, fontSize: 14.5 }}>
                  <Estrellas valor={p.calificacion} total={p.resenas} />
                  <span className="lh-gris">
                    <strong className="lh-tinta lh-num">{p.trabajos}</strong> trabajos registrados
                  </span>
                </div>
                <div className="lh-marbetes">
                  {p.urgencias && <span className="lh-marbete lh-marbete--urgente">Urgencias 24 h</span>}
                  {p.factura && <span className="lh-marbete">Factura</span>}
                  <span className="lh-marbete">Garantía {p.garantiaDias} días</span>
                  {p.fundador && <span className="lh-marbete lh-marbete--fundador">Perfil fundador</span>}
                </div>
              </div>
            </header>

            <section style={{ paddingBlock: 24 }}>
              <div className="lh-sello-bloque">
                <Sello fecha={p.verificado} />
                <p className="lh-nota" style={{ maxWidth: '54ch' }}>
                  {TEXTO_SELLO}
                </p>
              </div>
            </section>

            <section style={{ paddingBlock: 12 }}>
              <h2>Sobre {p.nombre}</h2>
              <p style={{ marginTop: 12 }}>{p.bio}</p>
            </section>

            <section style={{ paddingBlock: 22 }}>
              <h2>Servicios y precios</h2>
              <div className="lh-tabla-marco" style={{ marginTop: 14 }}>
                <table className="lh-tabla">
                  <thead>
                    <tr>
                      <th scope="col">Servicio</th>
                      <th scope="col" className="lh-num">
                        Desde
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.servicios.map((s) => (
                      <tr key={s.nombre}>
                        <td>{s.nombre}</td>
                        <td className="lh-num">
                          {s.desde === null ? (
                            <span className="lh-gris">Sobre cotización</span>
                          ) : (
                            precio(s.desde)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="lh-nota" style={{ marginTop: 10 }}>
                Precios publicados por el profesional. El costo final depende del trabajo y del
                material; pídele el presupuesto por escrito.
              </p>
            </section>

            <section style={{ paddingBlock: 22 }}>
              <h2>Datos del servicio</h2>
              <dl className="lh-datos" style={{ marginTop: 14 }}>
                <div className="lh-datos__fila">
                  <dt>Zonas que atiende</dt>
                  <dd>
                    {CIUDADES[p.ciudad]}: {p.zonas.join(', ')}
                  </dd>
                </div>
                <div className="lh-datos__fila">
                  <dt>Horario</dt>
                  <dd>{p.horario}</dd>
                </div>
                <div className="lh-datos__fila">
                  <dt>Visita o diagnóstico</dt>
                  <dd>{p.visita === null ? 'Según el trabajo' : precio(p.visita)}</dd>
                </div>
                <div className="lh-datos__fila">
                  <dt>Garantía</dt>
                  <dd>{p.garantiaDias} días sobre mano de obra</dd>
                </div>
                <div className="lh-datos__fila">
                  <dt>Formas de pago</dt>
                  <dd>{p.pagos.join(', ')}</dd>
                </div>
                <div className="lh-datos__fila">
                  <dt>Factura</dt>
                  <dd>{p.factura ? 'Sí' : 'No'}</dd>
                </div>
                <div className="lh-datos__fila">
                  <dt>Años de oficio</dt>
                  <dd className="lh-num">{p.anios}</dd>
                </div>
              </dl>
            </section>

            {p.preguntas.length > 0 && (
              <section style={{ paddingBlock: 22 }}>
                <h2>Preguntas frecuentes</h2>
                <div className="lh-acordeon" style={{ marginTop: 14 }}>
                  {p.preguntas.map(([q, a]) => (
                    <details key={q}>
                      <summary>{q}</summary>
                      <div>{a}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lh-tarjeta lh-tarjeta--fija lh-solo-escritorio">
            <p className="lh-gris" style={{ fontSize: 14 }}>
              Visita o diagnóstico
            </p>
            <p className="lh-precio-grande" style={{ margin: '4px 0 14px' }}>
              {p.visita === null ? '—' : precio(p.visita)}
            </p>
            <a
              className="lh-btn lh-btn--wa lh-btn--bloque"
              href={enlaceWa}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir cotización por WhatsApp
            </a>
            <p className="lh-nota" style={{ marginTop: 10 }}>
              {AVISO_WA}
            </p>
          </aside>
        </div>
      </div>

      <div className="lh-espaciador-barra" />
      <div className="lh-barra-fija">
        <a
          className="lh-btn lh-btn--wa lh-btn--bloque"
          href={enlaceWa}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir cotización por WhatsApp
        </a>
      </div>
    </>
  );
}
