'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { normalizar } from '@/lib/listamedica/texto';
import { rutas } from '@/lib/listamedica/rutas';

export interface OpcionEspecialidad {
  slug: string;
  nombre: string;
  nombre_plural: string;
  sinonimos: string[];
}

/**
 * Buscador del home: especialidad con autocompletado y selector de ciudad.
 *
 * Si el término coincide con una especialidad, va directo a su listado. Si no,
 * pasa por /buscar, que deja registro de la búsqueda sin resultados —esa tabla
 * es la que le dice a Pablo a qué especialidad salir a reclutar mañana.
 */
export default function Buscador({
  especialidades,
  ciudades,
  ciudadInicial = 'puebla',
}: {
  especialidades: OpcionEspecialidad[];
  ciudades: { slug: string; nombre: string }[];
  ciudadInicial?: string;
}) {
  const router = useRouter();
  const [termino, setTermino] = useState('');
  const [ciudad, setCiudad] = useState(ciudadInicial);
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState(-1);
  const campo = useRef<HTMLInputElement>(null);

  const sugerencias = useMemo(() => {
    const q = normalizar(termino);
    if (q.length < 2) return [];
    return especialidades
      .map((e) => {
        const nombre = normalizar(e.nombre);
        const plural = normalizar(e.nombre_plural);
        let puntos = 0;
        if (nombre.startsWith(q) || plural.startsWith(q)) puntos = 90;
        else if (e.sinonimos.some((s) => normalizar(s).startsWith(q))) puntos = 70;
        else if (nombre.includes(q) || plural.includes(q)) puntos = 50;
        else if (e.sinonimos.some((s) => normalizar(s).includes(q))) puntos = 30;
        return { e, puntos };
      })
      .filter((x) => x.puntos > 0)
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, 6)
      .map((x) => x.e);
  }, [especialidades, termino]);

  function irA(especialidad: OpcionEspecialidad) {
    router.push(rutas.listado(especialidad.slug, ciudad));
  }

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    if (resaltado >= 0 && sugerencias[resaltado]) {
      irA(sugerencias[resaltado]);
      return;
    }
    if (sugerencias.length === 1) {
      irA(sugerencias[0]);
      return;
    }
    const q = termino.trim();
    if (!q) {
      campo.current?.focus();
      return;
    }
    router.push(rutas.buscar(q, ciudad));
  }

  function teclas(evento: React.KeyboardEvent<HTMLInputElement>) {
    if (!sugerencias.length) return;
    if (evento.key === 'ArrowDown') {
      evento.preventDefault();
      setAbierto(true);
      setResaltado((v) => (v + 1) % sugerencias.length);
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault();
      setResaltado((v) => (v <= 0 ? sugerencias.length - 1 : v - 1));
    } else if (evento.key === 'Escape') {
      setAbierto(false);
      setResaltado(-1);
    }
  }

  return (
    <form className="lm-buscador" onSubmit={enviar} role="search">
      <div className="lm-buscador__campo">
        <label className="lm-campo__etiqueta" htmlFor="lm-q">
          ¿Qué especialidad buscas?
        </label>
        <input
          id="lm-q"
          ref={campo}
          className="lm-input"
          type="text"
          name="q"
          autoComplete="off"
          placeholder="Dermatólogo, dentista, psicólogo…"
          value={termino}
          role="combobox"
          aria-expanded={abierto && sugerencias.length > 0}
          aria-controls="lm-sugerencias"
          aria-autocomplete="list"
          aria-activedescendant={resaltado >= 0 ? `lm-sug-${resaltado}` : undefined}
          onChange={(e) => {
            setTermino(e.target.value);
            setAbierto(true);
            setResaltado(-1);
          }}
          onKeyDown={teclas}
          onBlur={() => window.setTimeout(() => setAbierto(false), 120)}
          onFocus={() => setAbierto(true)}
        />

        {abierto && sugerencias.length > 0 && (
          <ul className="lm-sugerencias" id="lm-sugerencias" role="listbox">
            {sugerencias.map((e, i) => (
              <li key={e.slug} id={`lm-sug-${i}`} role="option" aria-selected={i === resaltado}>
                <button
                  type="button"
                  className={i === resaltado ? 'lm-sugerencia lm-sugerencia--activa' : 'lm-sugerencia'}
                  onMouseDown={(evento) => {
                    evento.preventDefault();
                    irA(e);
                  }}
                  onMouseEnter={() => setResaltado(i)}
                >
                  <span>{e.nombre_plural}</span>
                  <span className="lm-gris">{e.nombre}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lm-buscador__ciudad">
        <label className="lm-campo__etiqueta" htmlFor="lm-ciudad">
          Ciudad
        </label>
        <select
          id="lm-ciudad"
          name="ciudad"
          className="lm-select"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        >
          {ciudades.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="lm-buscador__accion">
        <button type="submit" className="lm-btn lm-btn--primario lm-btn--bloque">
          Buscar
        </button>
      </div>
    </form>
  );
}
