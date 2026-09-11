import Link from 'next/link';
import BotonEliminar from '@/components/listamedica/admin/BotonEliminar';
import { todosCompletos } from '@/lib/listamedica/datos';
import { rutas } from '@/lib/listamedica/rutas';
import { fechaCorta, nombreCiudad, nombreCompleto } from '@/lib/listamedica/texto';

export const dynamic = 'force-dynamic';

const ORDEN: Record<string, number> = { borrador: 0, publicado: 1, demo: 2, pausado: 3 };

export default async function ProfesionalesPage() {
  const perfiles = (await todosCompletos()).sort(
    (a, b) => (ORDEN[a.estatus] ?? 9) - (ORDEN[b.estatus] ?? 9) || a.completitud_pct - b.completitud_pct,
  );

  return (
    <>
      <div className="lm-encabezado-seccion">
        <div>
          <h1>Profesionales</h1>
          <p>{perfiles.length} perfiles en la base, en cualquier estado.</p>
        </div>
        <div className="lm-fila-flex">
          <a
            className="lm-btn lm-btn--contorno lm-btn--chico"
            href="/api/listamedica/admin/exportar?tabla=profesionales"
          >
            Exportar CSV
          </a>
          <Link href={rutas.adminNuevo()} className="lm-btn lm-btn--primario lm-btn--chico">
            Dar de alta
          </Link>
        </div>
      </div>

      <div className="lm-tabla-marco">
        <table className="lm-tabla">
          <thead>
            <tr>
              <th scope="col">Profesional</th>
              <th scope="col">Especialidad</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Estado</th>
              <th scope="col" className="lm-num">
                Completitud
              </th>
              <th scope="col">Verificada</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {perfiles.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={rutas.adminEditar(p.id)}>{nombreCompleto(p)}</Link>
                  <div className="lm-gris" style={{ fontSize: 12.5 }}>
                    {p.whatsapp || 'sin WhatsApp'}
                  </div>
                </td>
                <td>{p.especialidad_principal?.nombre ?? '—'}</td>
                <td>{p.consultorios[0] ? nombreCiudad(p.consultorios[0].ciudad) : '—'}</td>
                <td>
                  <span className={`lm-estatus lm-estatus--${p.estatus}`}>{p.estatus}</span>
                </td>
                <td className="lm-num">
                  {p.completitud_pct}%
                  <div className="lm-barra" style={{ marginTop: 4, width: 70 }}>
                    <div
                      className={`lm-barra__relleno${p.completitud_pct < 70 ? ' lm-barra__relleno--bajo' : ''}`}
                      style={{ width: `${p.completitud_pct}%` }}
                    />
                  </div>
                </td>
                <td>{p.verificado_en ? fechaCorta(p.verificado_en) : '—'}</td>
                <td>
                  <div className="lm-fila-flex" style={{ gap: 8 }}>
                    <Link href={rutas.adminEditar(p.id)}>Editar</Link>
                    <Link href={`${rutas.admin()}/vista-previa/${p.id}`} target="_blank">
                      Ver
                    </Link>
                    <BotonEliminar id={p.id} nombre={nombreCompleto(p)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {perfiles.length === 0 && (
        <div className="lm-vacio" style={{ marginTop: 18 }}>
          Todavía no hay nadie en la base.{' '}
          <Link href={rutas.adminNuevo()}>Dar de alta al primero</Link>.
        </div>
      )}
    </>
  );
}
