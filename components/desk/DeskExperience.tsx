"use client";

/* ============================================================
   DeskExperience — orquestador de escenas (PASO 1: andamiaje).
   ------------------------------------------------------------
   Monta la escena activa, corre la transición de entrada con
   GSAP (liberando el candado al terminar), y expone la
   mecánica click-driven + teclado + puntos de progreso.

   En este paso las 10 escenas son STUBS de color plano con su
   título/objeto/hint. La cámara, el parallax y el arte 2.5D
   entran en pasos posteriores. Lo que validamos aquí es la
   MÁQUINA DE ESCENAS y el "feel" de avanzar haciendo clic.
   ============================================================ */

import { useEffect, useRef } from "react";
import { ArrowLeft, MousePointerClick } from "lucide-react";
import { gsap } from "./gsap";
import { SCENES, LAST, useScene } from "./store";
import Hotspot from "./ui/Hotspot";
import Progress from "./ui/Progress";

/* ---------- Arco de paleta: frío (caos) → cálido (orden) ----------
   Interpola entre el azul frío del inicio y el ámbar cálido del
   cierre según el índice. Es "el caos→orden" contado con color. */
const COLD = { r: 0x74, g: 0x87, b: 0x9e }; // #74879E
const WARM = { r: 0xec, g: 0xb4, b: 0x4a }; // #ECB44A

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function arcColor(t: number, alpha = 1) {
  const r = lerp(COLD.r, WARM.r, t);
  const g = lerp(COLD.g, WARM.g, t);
  const b = lerp(COLD.b, WARM.b, t);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function DeskExperience() {
  const { index, dir, locked, next, prev } = useScene();
  const stageRef = useRef<HTMLDivElement>(null);

  /* Transición de entrada al cambiar de escena. Al completar,
     se libera el candado (set locked:false) — patrón del esbozo. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      onComplete: () => useScene.setState({ locked: false }),
    });

    tl.fromTo(
      el,
      { autoAlpha: 0, xPercent: reduce ? 0 : 6 * dir, scale: reduce ? 1 : 0.98 },
      { autoAlpha: 1, xPercent: 0, scale: 1, duration: reduce ? 0 : 0.7, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, [index, dir]);

  /* Navegación por teclado (accesibilidad + fallback al clic). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const t = index / LAST; // 0..1 a lo largo del arco
  const scene = SCENES[index];
  const isLast = index === LAST;

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden font-body text-white transition-colors duration-700"
      style={{
        background: `radial-gradient(120% 120% at 50% 30%, ${arcColor(t, 0.25)} 0%, #0D0D0D 70%)`,
      }}
    >
      {/* Encabezado: índice + título de sección */}
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-5 sm:p-8">
        <span className="font-title text-sm tracking-widest text-white/60">
          SISTEMA PG · {String(index + 1).padStart(2, "0")}/{String(LAST + 1).padStart(2, "0")}
        </span>
        <span className="font-title text-sm tracking-widest text-white/60">{scene.titulo}</span>
      </header>

      {/* Escena activa (STUB del paso 1) */}
      <div ref={stageRef} className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <Hotspot
          label={`${scene.objeto}. ${isLast ? "Abrir WhatsApp" : scene.hint}`}
          onActivate={next}
          disabled={locked || isLast}
          className="flex aspect-[4/3] w-full max-w-2xl flex-col items-center justify-center gap-4 border border-white/15 p-10 text-center shadow-2xl"
        >
          <div
            className="absolute inset-0 -z-10 rounded-2xl transition-colors duration-700"
            style={{ background: arcColor(t, 0.14) }}
          />
          <span className="font-title text-xs uppercase tracking-[0.3em] text-white/50">
            {scene.id}
          </span>
          <h2 className="font-title text-3xl sm:text-4xl">{scene.objeto}</h2>
          <p className="max-w-sm text-balance text-white/70">{scene.titulo}</p>

          {!isLast && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition group-hover:bg-white/20">
              <MousePointerClick className="h-4 w-4" />
              {scene.hint}
            </span>
          )}
          {isLast && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-pg-lime px-5 py-2 text-sm font-semibold text-pg-black">
              {scene.hint}
            </span>
          )}
        </Hotspot>
      </div>

      {/* Pie: retroceder + progreso */}
      <footer className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-4 p-5 sm:p-8">
        <button
          type="button"
          aria-label="Escena anterior"
          onClick={prev}
          disabled={locked || index === 0}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Atrás
        </button>

        <Progress />
      </footer>
    </main>
  );
}
