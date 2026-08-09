"use client";

/* ============================================================
   Progress — 10 puntos que indican avance entre escenas.
   También permiten saltar a una escena (accesible).
   ============================================================ */

import { SCENES, useScene } from "../store";

export default function Progress() {
  const { index, locked, go } = useScene();

  return (
    <nav aria-label="Progreso de la presentación" className="pointer-events-auto flex items-center gap-2">
      {SCENES.map((s, i) => {
        const active = i === index;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Ir a la escena ${i + 1}: ${s.titulo}`}
            aria-current={active ? "step" : undefined}
            disabled={locked}
            onClick={() => go(i)}
            className={`h-2 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/70 ${
              active ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        );
      })}
    </nav>
  );
}
