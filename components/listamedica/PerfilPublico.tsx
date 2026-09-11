import Link from 'next/link';
import AccionesSecundarias from './AccionesSecundarias';
import BotonWhatsApp from './BotonWhatsApp';
import CalificacionGoogle from './CalificacionGoogle';
import DatosEstructurados from './DatosEstructurados';
import RegistroDeVista from './RegistroDeVista';
import Retrato from './Retrato';
import Sello from './Sello';
import {
  direccionLegible,
  urlMapa,
  urlMapaEmbebido,
  zonaLegible,
} from '@/lib/listamedica/consultorio';
import { jsonLdFaqs, jsonLdPerfil } from '@/lib/listamedica/jsonld';
import { AVISO_WHATSAPP, TEXTO_SELLO } from '@/lib/listamedica/marca';
import { rutas } from '@/lib/listamedica/rutas';
import { nombreCiudad, nombreCompleto, precioMXN } from '@/lib/listamedica/texto';
import type { ProfesionalCompleto } from '@/lib/listamedica/tipos';

/**
 * El perfil público, completo.
 *
 * Vive como componente y no dentro de la página porque el panel lo usa tal
 * cual para la vista previa: lo que Pablo revisa antes de publicar es esta
 * misma página, no una aproximación.
 */
export default function PerfilPublico({
  p,
  registrarVista = true,
}: {
  p: ProfesionalCompleto;
  registrarVista?: boolean;
}) {
  const consultorio = p.consultorios[0];
  const mapa = urlMapa(consultorio);
  const mapaEmbebido = urlMapaEmbebido(consultorio);
  const serviciosConPrecio = p.servicios.filter((s) => s.publicar_precio && s.precio_desde !== null);
  const serviciosSinPrecio = p.servicios.filter((s) => !s.publicar_precio || s.precio_desde === null);
  const faqs = jsonLdFaqs(p);

  return (
    <>
      <DatosEstructurados datos={jsonLdPerfil(p)} />
      {faqs && <DatosEstructurados datos={faqs} />}
      {registrarVista && <RegistroDeVista profesionalId={p.id} />}

      <div className="lm-marco" style={{ paddingBlock: '26px 60px' }}>
        <nav className="lm-nota" style={{ marginBottom: 20 }} aria-label="Ruta de navegación">
          <Link href={rutas.home()}>Lista Médica</Link>
          {' / '}
          {p.especialidad_principal && consultorio ? (
            <Link href={rutas.listado(p.especialidad_principal.slug, consultorio.ciudad)}>
              {p.especialidad_principal.nombre_plural} en {nombreCiudad(consultorio.ciudad)}
            </Link>
          ) : (
            <span>Perfil</span>
          )}
        </nav>

        <div className="lm-columnas">
          <div>
            {/* ── Identidad ───────────────────────────────── */}
            <header
              style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                paddingBottom: 20,
                borderBottom: '1px solid var(--linea)',
              }}
            >
              <Retrato profesional={p} grande />
              <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                <h1>{nombreCompleto(p)}</h1>
                <p style={{ marginTop: 6, fontSize: 17 }}>
                  {p.especialidades.map((e) => e.nombre).join(', ')}
                </p>
                {consultorio && <p className="lm-gris">{zonaLegible(consultorio)}</p>}
                <div className="lm-fila-flex" style={{ marginTop: 10 }}>
                  <CalificacionGoogle
                    rating={p.google_rating}
                    total={p.google_reviews_count}
                    placeId={p.google_place_id}
                  />
                  {p.es_fundador && (
                    <span className="lm-marbete lm-marbete--fundador">Perfil fundador</span>
                  )}
                </div>
              </div>
            </header>

            {/* ── Sello ───────────────────────────────────── */}
            {p.verificado_en && (
              <section className="lm-seccion" style={{ paddingBlock: 24 }}>
                <div className="lm-sello-bloque">
                  <Sello fecha={p.verificado_en} tamano="mediano" />
                  <div>
                    <p className="lm-nota" style={{ maxWidth: '52ch' }}>
                      {TEXTO_SELLO}
                    </p>
                    <p style={{ marginTop: 8, fontSize: 13.5 }}>
                      <Link href={rutas.comoVerificamos()}>Cómo verificamos cada cédula</Link>
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ── Biografía ───────────────────────────────── */}
            {p.bio && (
              <section className="lm-seccion" style={{ paddingBlock: 22 }}>
                <h2>Sobre {p.titulo ? `${p.titulo} ${p.apellidos}` : p.nombre}</h2>
                <p style={{ marginTop: 12 }}>{p.bio}</p>
              </section>
            )}

            {/* ── Formación ───────────────────────────────── */}
            <section className="lm-seccion" style={{ paddingBlock: 22 }}>
              <h2>Formación y credenciales</h2>
              <dl className="lm-datos" style={{ marginTop: 14 }}>
                {p.cedula && (
                  <div className="lm-datos__fila">
                    <dt>Cédula profesional</dt>
                    <dd className="lm-num">{p.cedula}</dd>
                  </div>
                )}
                {p.cedula_especialidad && (
                  <div className="lm-datos__fila">
                    <dt>Cédula de especialidad</dt>
                    <dd className="lm-num">{p.cedula_especialidad}</dd>
                  </div>
                )}
                {p.universidad && (
                  <div className="lm-datos__fila">
                    <dt>Licenciatura</dt>
                    <dd>{p.universidad}</dd>
                  </div>
                )}
                {p.universidad_especialidad && (
                  <div className="lm-datos__fila">
                    <dt>Especialidad</dt>
                    <dd>{p.universidad_especialidad}</dd>
                  </div>
                )}
                {p.certificacion_consejo && (
                  <div className="lm-datos__fila">
                    <dt>Certificación de consejo</dt>
                    <dd>
                      {p.certificacion_consejo}
                      {p.vigencia_certificacion && `, vigente a ${p.vigencia_certificacion}`}
                    </dd>
                  </div>
                )}
                {p.anios_experiencia !== null && (
                  <div className="lm-datos__fila">
                    <dt>Años de experiencia</dt>
                    <dd className="lm-num">{p.anios_experiencia}</dd>
                  </div>
                )}
                {p.idiomas.length > 0 && (
                  <div className="lm-datos__fila">
                    <dt>Idiomas</dt>
                    <dd>{p.idiomas.join(', ')}</dd>
                  </div>
                )}
                {p.aseguradoras.length > 0 && (
                  <div className="lm-datos__fila">
                    <dt>Aseguradoras</dt>
                    <dd>{p.aseguradoras.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </section>

            {/* ── Servicios ───────────────────────────────── */}
            {p.servicios.length > 0 && (
              <section className="lm-seccion" style={{ paddingBlock: 22 }}>
                <h2>Servicios</h2>
                <div className="lm-tabla-marco" style={{ marginTop: 14 }}>
                  <table className="lm-tabla">
                    <caption className="lm-oculto-visual">
                      Servicios y precio desde, publicados por el profesional
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Servicio</th>
                        <th scope="col" className="lm-num">
                          Desde
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviciosConPrecio.map((s) => (
                        <tr key={s.id}>
                          <td>{s.nombre}</td>
                          <td className="lm-num">{precioMXN(s.precio_desde as number)}</td>
                        </tr>
                      ))}
                      {serviciosSinPrecio.map((s) => (
                        <tr key={s.id}>
                          <td>{s.nombre}</td>
                          <td className="lm-num lm-gris">Sobre valoración</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="lm-nota" style={{ marginTop: 10 }}>
                  Precios publicados por el propio profesional. Confírmalos con él antes de tu
                  visita.
                </p>
              </section>
            )}

            {/* ── Consultorio ─────────────────────────────── */}
            {consultorio && (
              <section className="lm-seccion" style={{ paddingBlock: 22 }}>
                <h2>Consultorio</h2>
                <dl className="lm-datos" style={{ marginTop: 14 }}>
                  <div className="lm-datos__fila">
                    <dt>Dirección</dt>
                    <dd>
                      {direccionLegible(consultorio)}
                      <br />
                      {zonaLegible(consultorio)}
                      {consultorio.cp && `, C.P. ${consultorio.cp}`}
                    </dd>
                  </div>
                  {consultorio.referencias && (
                    <div className="lm-datos__fila">
                      <dt>Cómo llegar</dt>
                      <dd>{consultorio.referencias}</dd>
                    </div>
                  )}
                  {consultorio.estacionamiento && (
                    <div className="lm-datos__fila">
                      <dt>Estacionamiento</dt>
                      <dd>{consultorio.estacionamiento}</dd>
                    </div>
                  )}
                  {consultorio.horario_texto && (
                    <div className="lm-datos__fila">
                      <dt>Horario de atención</dt>
                      <dd>
                        {consultorio.horario_texto}
                        <span className="lm-nota" style={{ display: 'block', marginTop: 4 }}>
                          Horario informativo. Confirma disponibilidad directamente con el
                          profesional.
                        </span>
                      </dd>
                    </div>
                  )}
                  <div className="lm-datos__fila">
                    <dt>Fin de semana</dt>
                    <dd>{consultorio.atiende_fin_semana ? 'Sí atiende' : 'No atiende'}</dd>
                  </div>
                </dl>

                {mapaEmbebido && (
                  <div
                    style={{
                      marginTop: 16,
                      border: '1px solid var(--linea)',
                      borderRadius: 'var(--r-contenedor)',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      src={mapaEmbebido}
                      title={`Mapa del consultorio en ${zonaLegible(consultorio)}`}
                      loading="lazy"
                      style={{ width: '100%', height: 260, border: 0, display: 'block' }}
                    />
                  </div>
                )}

                <div style={{ marginTop: 14 }}>
                  <AccionesSecundarias
                    profesionalId={p.id}
                    telefono={p.telefono}
                    mapaUrl={mapa}
                  />
                </div>
              </section>
            )}

            {/* ── Preguntas frecuentes ────────────────────── */}
            {p.faqs.length > 0 && (
              <section className="lm-seccion" style={{ paddingBlock: 22 }}>
                <h2>Preguntas frecuentes</h2>
                <div className="lm-acordeon" style={{ marginTop: 14 }}>
                  {p.faqs.map((f) => (
                    <details key={f.id}>
                      <summary>{f.pregunta}</summary>
                      <div>{f.respuesta}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Columna de contacto (escritorio) ──────────── */}
          <aside className="lm-solo-escritorio" style={{ position: 'sticky', top: 82 }}>
            <div className="lm-tarjeta">
              <h3 style={{ fontSize: 18 }}>Contactar</h3>
              <p className="lm-gris" style={{ fontSize: 14, margin: '8px 0 14px' }}>
                La conversación es directa con {p.titulo ? `${p.titulo} ${p.apellidos}` : p.nombre}.
                Lista Médica no agenda citas.
              </p>
              <BotonWhatsApp profesionalId={p.id} />
              <p className="lm-nota" style={{ marginTop: 10 }}>
                {AVISO_WHATSAPP}{' '}
                <Link href={rutas.privacidad()}>Aviso de Privacidad</Link>
              </p>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--linea)' }}>
                <AccionesSecundarias profesionalId={p.id} telefono={p.telefono} mapaUrl={mapa} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Barra fija en móvil ─────────────────────────── */}
      <div className="lm-espaciador-barra" aria-hidden="true" />
      <div className="lm-barra-fija">
        <BotonWhatsApp profesionalId={p.id} />
        <p className="lm-barra-fija__nota">
          {AVISO_WHATSAPP} <Link href={rutas.privacidad()}>Aviso de Privacidad</Link>
        </p>
      </div>
    </>
  );
}
