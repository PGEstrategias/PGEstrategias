'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { precioMXN } from '@/lib/listamedica/texto';

export interface OpcionesFiltro {
  colonias: string[];
  idiomas: string[];
  aseguradoras: string[];
  hayFinSemana: boolean;
  precioMin: number | null;
  precioMax: number | null;
}

export interface ValoresFiltro {
  colonia: string;
  precioMax: string;
  genero: string;
  idioma: string;
  aseguradora: string;
  finSemana: boolean;
}

/**
 * Filtros del listado. Viven en la URL, no en el estado del cliente: así la
 * página se puede compartir, indexar y volver atrás sin perder nada.
 */
export default function Filtros({
  opciones,
  valores,
  total,
}: {
  opciones: OpcionesFiltro;
  valores: ValoresFiltro;
  total: number;
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  const hayFiltros =
    Boolean(valores.colonia || valores.precioMax || valores.genero || valores.idioma || valores.aseguradora) ||
    valores.finSemana;

  function aplicar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    const parametros = new URLSearchParams();
    datos.forEach((valor, clave) => {
      const texto = String(valor).trim();
      if (texto) parametros.set(clave, texto);
    });
    const cola = parametros.toString();
    router.push(cola ? `?${cola}` : '?', { scroll: false });
    setAbierto(false);
  }

  const escalones = escalonesDePrecio(opciones.precioMin, opciones.precioMax);

  return (
    <section
      style={{
        border: '1px solid var(--linea)',
        borderRadius: 'var(--r-contenedor)',
        background: '#fff',
        marginBottom: 22,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '12px 16px',
        }}
      >
        <p style={{ margin: 0, fontSize: 14.5 }}>
          <strong className="lm-num">{total}</strong> {total === 1 ? 'profesional' : 'profesionales'}
          {hayFiltros ? ' con los filtros aplicados' : ''}
        </p>
        <button
          type="button"
          className="lm-btn lm-btn--contorno lm-btn--chico"
          aria-expanded={abierto}
          aria-controls="lm-panel-filtros"
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? 'Cerrar filtros' : 'Filtrar'}
        </button>
      </div>

      <div
        id="lm-panel-filtros"
        hidden={!abierto}
        style={{ borderTop: '1px solid var(--linea)', padding: 16 }}
      >
        <form onSubmit={aplicar}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '0 16px',
            }}
          >
            {opciones.colonias.length > 1 && (
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Zona o colonia</span>
                <select name="colonia" className="lm-select" defaultValue={valores.colonia}>
                  <option value="">Todas</option>
                  {opciones.colonias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {escalones.length > 0 && (
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Precio de consulta</span>
                <select name="precioMax" className="lm-select" defaultValue={valores.precioMax}>
                  <option value="">Cualquiera</option>
                  {escalones.map((monto) => (
                    <option key={monto} value={monto}>
                      Hasta {precioMXN(monto)}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="lm-campo">
              <span className="lm-campo__etiqueta">Género del profesional</span>
              <select name="genero" className="lm-select" defaultValue={valores.genero}>
                <option value="">Indistinto</option>
                <option value="femenino">Mujer</option>
                <option value="masculino">Hombre</option>
              </select>
            </label>

            {opciones.idiomas.length > 1 && (
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Idioma</span>
                <select name="idioma" className="lm-select" defaultValue={valores.idioma}>
                  <option value="">Cualquiera</option>
                  {opciones.idiomas.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {opciones.aseguradoras.length > 0 && (
              <label className="lm-campo">
                <span className="lm-campo__etiqueta">Aseguradora</span>
                <select
                  name="aseguradora"
                  className="lm-select"
                  defaultValue={valores.aseguradora}
                >
                  <option value="">Cualquiera</option>
                  {opciones.aseguradoras.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {opciones.hayFinSemana && (
            <label className="lm-check">
              <input type="checkbox" name="finSemana" value="1" defaultChecked={valores.finSemana} />
              <span>Atiende en fin de semana</span>
            </label>
          )}

          <div className="lm-fila-flex" style={{ marginTop: 12 }}>
            <button type="submit" className="lm-btn lm-btn--primario lm-btn--chico">
              Aplicar filtros
            </button>
            {hayFiltros && (
              <button
                type="button"
                className="lm-btn lm-btn--texto"
                onClick={() => {
                  router.push('?', { scroll: false });
                  setAbierto(false);
                }}
              >
                Quitar filtros
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/** Escalones redondos a partir del rango real de precios del listado. */
function escalonesDePrecio(min: number | null, max: number | null): number[] {
  if (min === null || max === null || max <= min) return [];
  const paso = max - min <= 800 ? 200 : 500;
  const escalones: number[] = [];
  for (let v = Math.ceil((min + paso) / paso) * paso; v <= max; v += paso) {
    escalones.push(v);
  }
  return escalones;
}
