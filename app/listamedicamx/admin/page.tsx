import Link from 'next/link';
import BotonGoogle from '@/components/listamedica/admin/BotonGoogle';
import { resumen } from '@/lib/listamedica/metricas';
import { lugaresFundadorRestantes } from '@/lib/listamedica/datos';
import { rutas } from '@/lib/listamedica/rutas';
import { nombreCompleto } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

export default async function PanelPage() {
  const [m, lugares] = await Promise.all([resumen(), lugaresFundadorRestantes()]);
  const maximoSemana = Math.max(...m.altasPorSemana.map((s) => s.total), 1);
  const conversion = m.vistas > 0 ? Math.round((m.clicsWhatsApp / m.vistas) * 100) : 0;

  return (
    <>
      <div className="lm-encabezado-seccion">
        <div>
          <h1>Métricas</h1>
          <p>Lo que hay que saber para operar el directorio esta semana.</p>
        </div>
        <div className="lm-fila-flex">
          <BotonGoogle />
          <a className="lm-btn lm-btn--contorno lm-btn--chico" href="/api/listamedica/admin/exportar?tabla=desempeno">
            Exportar desempeño
          </a>
          <a className="lm-btn lm-btn--contorno lm-btn--chico" href="/api/listamedica/admin/exportar?tabla=clics">
            Exportar clics
          </a>
          <a className="lm-btn lm-btn--contorno lm-btn--chico" href="/api/listamedica/admin/exportar?tabla=busquedas">
            Exportar búsquedas
          </a>
        </div>
      </div>

      <div className="lm-metricas">
        <Metrica valor={m.publicados} etiqueta="Perfiles publicados" />
        <Metrica valor={m.borradores} etiqueta="Borradores sin publicar" />
        <Metrica valor={m.vistas} etiqueta="Vistas de perfil" />
        <Metrica valor={m.clicsWhatsApp} etiqueta="Clics a WhatsApp" />
        <Metrica valor={`${conversion}%`} etiqueta="De vista a contacto" />
        <Metrica valor={lugares.toLocaleString('es-MX')} etiqueta="Lugares de fundador libres" />
      </div>

      {/* ── Altas por semana ───────────────────────────── */}
      <section className="lm-grupo" style={{ marginTop: 22 }}>
        <h2>Altas por semana</h2>
        <p className="lm-grupo__intro">Últimas {m.altasPorSemana.length} semanas.</p>
        <div className="lm-columnas-grafica">
          {m.altasPorSemana.map((s) => (
            <div
              key={s.semana}
              className="lm-columnas-grafica__barra"
              style={{ height: `${Math.max((s.total / maximoSemana) * 100, 2)}%` }}
              title={`Semana del ${s.semana}: ${s.total}`}
            >
              {s.total > 0 && <span>{s.total}</span>}
            </div>
          ))}
        </div>
        <div className="lm-ejes" aria-hidden="true">
          {m.altasPorSemana.map((s) => (
            <span key={s.semana}>{s.semana.slice(5).replace('-', '/')}</span>
          ))}
        </div>
      </section>

      {/* ── A quién perseguir ──────────────────────────── */}
      <section className="lm-grupo">
        <div className="lm-encabezado-seccion" style={{ marginBottom: 8 }}>
          <div>
            <h2>Perfiles por debajo del 70%</h2>
            <p>A estos hay que marcarles para que manden lo que falta.</p>
          </div>
          <a
            className="lm-btn lm-btn--contorno lm-btn--chico"
            href="/api/listamedica/admin/exportar?tabla=incompletos"
          >
            Exportar lista
          </a>
        </div>

        {m.incompletos.length === 0 ? (
          <p className="lm-gris">Ninguno. Todos los perfiles pasan del 70%.</p>
        ) : (
          <div className="lm-tabla-marco">
            <table className="lm-tabla">
              <thead>
                <tr>
                  <th scope="col">Profesional</th>
                  <th scope="col">WhatsApp</th>
                  <th scope="col" className="lm-num">
                    Completitud
                  </th>
                  <th scope="col">Le falta</th>
                </tr>
              </thead>
              <tbody>
                {m.incompletos.map(({ perfil, pendientes }) => (
                  <tr key={perfil.id}>
                    <td>
                      <Link href={rutas.adminEditar(perfil.id)}>{nombreCompleto(perfil)}</Link>
                    </td>
                    <td>{perfil.whatsapp || '—'}</td>
                    <td className="lm-num">{perfil.completitud_pct}%</td>
                    <td className="lm-gris" style={{ fontSize: 13.5 }}>
                      {pendientes.slice(0, 4).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Desempeño por profesional ──────────────────── */}
      <section className="lm-grupo">
        <h2>Contactos por profesional</h2>
        <p className="lm-grupo__intro">
          Ordenado por clics a WhatsApp. Los de hasta abajo son los que todavía no reciben nada y a
          los que conviene explicarles qué falta en su perfil.
        </p>
        <div className="lm-tabla-marco">
          <table className="lm-tabla">
            <thead>
              <tr>
                <th scope="col">Profesional</th>
                <th scope="col" className="lm-num">
                  Vistas
                </th>
                <th scope="col" className="lm-num">
                  WhatsApp
                </th>
                <th scope="col" className="lm-num">
                  Conversión
                </th>
              </tr>
            </thead>
            <tbody>
              {m.porProfesional.map((x) => (
                <tr key={x.perfil.id}>
                  <td>
                    <Link href={rutas.adminEditar(x.perfil.id)}>{nombreCompleto(x.perfil)}</Link>
                  </td>
                  <td className="lm-num">{x.vistas}</td>
                  <td className="lm-num">{x.whatsapp}</td>
                  <td className="lm-num">{x.vistas ? `${x.conversion}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {m.sinContactos.length > 0 && (
          <p className="lm-nota" style={{ marginTop: 10 }}>
            {m.sinContactos.length} de {m.porProfesional.length} perfiles no han recibido ni un solo
            mensaje.
          </p>
        )}
      </section>

      {/* ── Búsquedas ──────────────────────────────────── */}
      <div className="lm-rejilla lm-rejilla--dos">
        <section className="lm-grupo">
          <h2>Lo que más buscan</h2>
          {m.busquedasTop.length === 0 ? (
            <p className="lm-gris">Sin búsquedas registradas todavía.</p>
          ) : (
            <div className="lm-tabla-marco">
              <table className="lm-tabla">
                <thead>
                  <tr>
                    <th scope="col">Término</th>
                    <th scope="col" className="lm-num">
                      Veces
                    </th>
                    <th scope="col" className="lm-num">
                      Resultados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {m.busquedasTop.map((b) => (
                    <tr key={b.termino}>
                      <td>{b.termino}</td>
                      <td className="lm-num">{b.veces}</td>
                      <td className="lm-num">{b.resultadosPromedio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="lm-grupo">
          <h2>Búsquedas sin resultados</h2>
          <p className="lm-grupo__intro">
            La lista de reclutamiento: esto es lo que la gente buscó y no encontró.
          </p>
          {m.busquedasSinResultados.length === 0 ? (
            <p className="lm-gris">Ninguna búsqueda quedó vacía.</p>
          ) : (
            <div className="lm-tabla-marco">
              <table className="lm-tabla">
                <thead>
                  <tr>
                    <th scope="col">Término</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col" className="lm-num">
                      Veces
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {m.busquedasSinResultados.map((b) => (
                    <tr key={`${b.termino}-${b.ciudad}`}>
                      <td>{b.termino}</td>
                      <td>{b.ciudad}</td>
                      <td className="lm-num">{b.veces}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* ── Distribución ───────────────────────────────── */}
      <div className="lm-rejilla lm-rejilla--dos">
        <section className="lm-grupo">
          <h2>Por especialidad</h2>
          <Distribucion filas={m.porEspecialidad} />
        </section>
        <section className="lm-grupo">
          <h2>Por ciudad</h2>
          <Distribucion filas={m.porCiudad} />
          <h2 style={{ marginTop: 18 }}>Por dispositivo</h2>
          <Distribucion
            filas={[
              { nombre: 'Móvil', total: m.clicsPorDispositivo.movil },
              { nombre: 'Escritorio', total: m.clicsPorDispositivo.escritorio },
            ]}
          />
        </section>
      </div>
    </>
  );
}

function Metrica({ valor, etiqueta }: { valor: string | number; etiqueta: string }) {
  return (
    <div className="lm-metrica">
      <div className="lm-metrica__valor">{valor}</div>
      <div className="lm-metrica__etiqueta">{etiqueta}</div>
    </div>
  );
}

function Distribucion({ filas }: { filas: { nombre: string; total: number }[] }) {
  if (!filas.length) return <p className="lm-gris">Sin datos.</p>;
  const maximo = Math.max(...filas.map((f) => f.total), 1);

  return (
    <div className="lm-indice" style={{ columns: 1 }}>
      {filas.map((f) => (
        <div key={f.nombre} className="lm-indice__fila" style={{ cursor: 'default' }}>
          <span>{f.nombre}</span>
          <span className="lm-indice__guia" aria-hidden="true" />
          <span style={{ width: 70 }}>
            <span className="lm-barra">
              <span
                className="lm-barra__relleno"
                style={{ width: `${(f.total / maximo) * 100}%`, display: 'block' }}
              />
            </span>
          </span>
          <span className="lm-indice__conteo">{f.total}</span>
        </div>
      ))}
    </div>
  );
}
