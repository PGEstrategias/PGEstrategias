"use client";

import { useMemo, useState } from "react";
import VideoGrid from "@/components/site/VideoGrid";
import { CATEGORIAS, PORTAFOLIO, type Categoria } from "@/data/home";
import s from "./home.module.css";

const INICIAL = 6;

/* Galería del portafolio: filtros por industria y "ver más" para no
   cargar los 15 videos de golpe. */
export default function Portafolio() {
  const [filtro, setFiltro] = useState<Categoria | "Todos">("Todos");
  const [todos, setTodos] = useState(false);

  const lista = useMemo(
    () => (filtro === "Todos" ? PORTAFOLIO : PORTAFOLIO.filter((v) => v.categoria === filtro)),
    [filtro]
  );
  const visibles = todos ? lista : lista.slice(0, INICIAL);

  const elegir = (f: Categoria | "Todos") => {
    setFiltro(f);
    setTodos(false);
  };

  return (
    <>
      <div role="group" aria-label="Filtrar videos por industria">
        <ul className={s.chips} style={{ marginBottom: 28 }}>
          {(["Todos", ...CATEGORIAS] as const).map((c) => {
            const n = c === "Todos" ? PORTAFOLIO.length : PORTAFOLIO.filter((v) => v.categoria === c).length;
            return (
              <li key={c}>
                <button type="button" className={s.chip} aria-pressed={filtro === c} onClick={() => elegir(c)}>
                  {c} <span style={{ opacity: 0.6, marginLeft: 6 }}>{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <VideoGrid key={filtro} items={visibles} revelar={false} />
      {lista.length > INICIAL && (
        <p style={{ marginTop: 32, textAlign: "center" }}>
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setTodos((t) => !t)} aria-expanded={todos}>
            {todos ? "Ver menos" : `Ver los ${lista.length} videos`}
          </button>
        </p>
      )}
    </>
  );
}
