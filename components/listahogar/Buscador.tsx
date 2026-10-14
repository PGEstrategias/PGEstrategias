'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { CIUDADES, OFICIOS, normalizar, rutas, type Oficio } from '@/lib/listahogar/datos';

/** Buscador del home: oficio con autocompletado (incluye el problema: "fuga") y ciudad. */
export default function Buscador() {
  const router = useRouter();
  const [termino, setTermino] = useState('');
  const [ciudad, setCiudad] = useState('puebla');
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState(-1);
  const campo = useRef<HTMLInputElement>(null);

  const sugerencias = useMemo(() => {
    const q = normalizar(termino);
    if (q.length < 2) return [];
    return OFICIOS.map((o) => {
      const nombre = normalizar(o.nombre);
      const plural = normalizar(o.plural);
      let puntos = 0;
      if (nombre.startsWith(q) || plural.startsWith(q)) puntos = 90;
      else if (o.sinonimos.some((s) => normalizar(s).startsWith(q))) puntos = 70;
      else if (nombre.includes(q) || plural.includes(q)) puntos = 50;
      else if (o.sinonimos.some((s) => normalizar(s).includes(q))) puntos = 30;
      return { o, puntos };
    })
      .filter((x) => x.puntos > 0)
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, 6)
      .map((x) => x.o);
  }, [termino]);

  function irA(o: Oficio) {
    router.push(rutas.listado(o.slug, ciudad));
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const elegido = sugerencias[resaltado >= 0 ? resaltado : 0];
    if (elegido) irA(elegido);
    else campo.current?.focus();
  }

  function teclas(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!sugerencias.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAbierto(true);
      setResaltado((v) => (v + 1) % sugerencias.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setResaltado((v) => (v <= 0 ? sugerencias.length - 1 : v - 1));
    } else if (e.key === 'Escape') {
      setAbierto(false);
      setResaltado(-1);
    }
  }

  const sinResultados = abierto && normalizar(termino).length >= 2 && sugerencias.length === 0;

  return (
    <form className="lh-buscador" onSubmit={enviar} role="search">
      <div className="lh-buscador__campo">
        <label className="lh-etiqueta" htmlFor="lh-q">
          ¿Qué necesitas arreglar?
        </label>
        <input
          id="lh-q"
          ref={campo}
          className="lh-input"
          type="text"
          autoComplete="off"
          placeholder="Plomero, fuga, cerrajero, minisplit…"
          value={termino}
          role="combobox"
          aria-expanded={abierto && sugerencias.length > 0}
          aria-controls="lh-sugerencias"
          aria-autocomplete="list"
          aria-activedescendant={resaltado >= 0 ? `lh-sug-${resaltado}` : undefined}
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
          <ul className="lh-sugerencias" id="lh-sugerencias" role="listbox">
            {sugerencias.map((o, i) => (
              <li key={o.slug} id={`lh-sug-${i}`} role="option" aria-selected={i === resaltado}>
                <button
                  type="button"
                  className={`lh-sugerencia${i === resaltado ? ' lh-sugerencia--activa' : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    irA(o);
                  }}
                  onMouseEnter={() => setResaltado(i)}
                >
                  <span>{o.plural}</span>
                  <span className="lh-gris">{o.nombre}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {sinResultados && (
          <div className="lh-sugerencias lh-sugerencias--vacio">
            Todavía no tenemos ese oficio. Prueba con “plomero”, “luz” o “chapa”.
          </div>
        )}
      </div>

      <div>
        <label className="lh-etiqueta" htmlFor="lh-ciudad">
          Ciudad
        </label>
        <select
          id="lh-ciudad"
          className="lh-input"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        >
          {Object.entries(CIUDADES).map(([slug, nombre]) => (
            <option key={slug} value={slug}>
              {nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit" className="lh-btn lh-btn--primario lh-btn--bloque">
          Buscar
        </button>
      </div>
    </form>
  );
}
