"use client";

/* ============================================================
   ESCENA 2 — "Mundo sin sistema": pull-back del escritorio.
   ------------------------------------------------------------
   La cámara se ALEJA (escala 1.6 → 1) y revela el escritorio
   completo, partido en dos:
     · Izquierda (frío/caos): papeles a la deriva, teléfono que
       vibra sin respuesta, notas regadas.
     · Derecha (cálido/orden): un dashboard limpio que crece.

   Interacción: clic en el lado limpio → avanza.
   Profundidad falsa: parallax suave que sigue el puntero.
   Sin arte externo: todo es SVG/CSS.
   ============================================================ */

import { useEffect, useRef } from "react";
import { Phone, FileText, BarChart3, CheckCircle2 } from "lucide-react";
import { gsap } from "../gsap";
import type { SceneProps } from "./types";

/* Papeles regados del lado del caos (posición/rotación fijas). */
const PAPERS = [
  { top: "18%", left: "12%", rot: -14 },
  { top: "34%", left: "30%", rot: 9 },
  { top: "58%", left: "16%", rot: -6 },
  { top: "66%", left: "34%", rot: 18 },
  { top: "44%", left: "6%", rot: 4 },
];

export default function S02_Desk({ active, onAdvance }: SceneProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const caosRef = useRef<HTMLDivElement>(null);
  const ordenRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Pull-back + animaciones en bucle (caos vivo / orden que crece). */
  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Cámara que se aleja para revelar todo el escritorio.
      gsap.from(stageRef.current, {
        scale: 1.6,
        autoAlpha: 0,
        transformOrigin: "50% 40%",
        duration: 1.1,
        ease: "power3.inOut",
      });

      // Papeles del caos: deriva continua.
      gsap.to(".caos-paper", {
        y: "+=10",
        rotate: "+=3",
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.25, from: "random" },
      });

      // Teléfono que vibra sin respuesta.
      gsap.to(phoneRef.current, {
        keyframes: { x: [0, -3, 3, -2, 2, 0], rotate: [0, -4, 4, -2, 2, 0] },
        duration: 0.5,
        repeat: -1,
        repeatDelay: 1.4,
        ease: "none",
      });

      // Barras del dashboard que suben (orden que progresa).
      gsap.from(barsRef.current?.children || [], {
        scaleY: 0,
        transformOrigin: "50% 100%",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.9,
      });
    });
    return () => ctx.revert();
  }, [active, reduce]);

  /* Parallax: las capas siguen al puntero a distintas profundidades. */
  useEffect(() => {
    if (!active || reduce) return;
    const xCaos = gsap.quickTo(caosRef.current, "x", { duration: 0.7, ease: "power3" });
    const yCaos = gsap.quickTo(caosRef.current, "y", { duration: 0.7, ease: "power3" });
    const xOrden = gsap.quickTo(ordenRef.current, "x", { duration: 0.7, ease: "power3" });
    const yOrden = gsap.quickTo(ordenRef.current, "y", { duration: 0.7, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      xCaos(cx * 22);
      yCaos(cy * 14);
      xOrden(cx * -14);
      yOrden(cy * -9);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, reduce]);

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden">
      {/* Superficie del escritorio */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13161b] to-[#0a0b0e]" />

      {/* ---------- Lado FRÍO / CAOS (izquierda) ---------- */}
      <div
        ref={caosRef}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{ background: "radial-gradient(120% 90% at 30% 40%, rgba(116,135,158,0.18), transparent 70%)" }}
      >
        {PAPERS.map((p, i) => (
          <div
            key={i}
            className="caos-paper absolute flex h-20 w-16 items-center justify-center rounded-sm bg-[#cdd3da] shadow-lg"
            style={{ top: p.top, left: p.left, rotate: `${p.rot}deg` }}
          >
            <FileText className="h-6 w-6 text-[#74879e]" />
          </div>
        ))}

        {/* Teléfono que vibra */}
        <div
          ref={phoneRef}
          className="absolute bottom-[20%] right-[18%] flex h-28 w-16 flex-col items-center justify-center rounded-xl border border-[#74879e]/40 bg-[#1b2027] shadow-xl"
        >
          <Phone className="h-6 w-6 text-[#74879e]" />
          <span className="mt-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">12</span>
          <span className="mt-1 text-[8px] uppercase tracking-widest text-white/40">sin leer</span>
        </div>

        <span className="absolute left-6 top-6 font-title text-xs uppercase tracking-[0.3em] text-[#74879e]/70">
          Sin sistema
        </span>
      </div>

      {/* ---------- Lado CÁLIDO / ORDEN (derecha) — clic para avanzar ---------- */}
      <button
        type="button"
        aria-label="El lado ordenado del escritorio. Avanzar."
        onClick={onAdvance}
        className="group absolute inset-y-0 right-0 w-1/2 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[#ECB44A]/70"
      >
        <div
          ref={ordenRef}
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 70% 45%, rgba(236,180,74,0.18), transparent 70%)" }}
        >
          {/* Dashboard limpio */}
          <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#ECB44A]/30 bg-[#15140f] p-5 shadow-2xl transition group-hover:border-[#ECB44A]/60">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#ECB44A]" />
              <span className="font-title text-xs uppercase tracking-widest text-[#ECB44A]">Crecimiento</span>
            </div>
            <div ref={barsRef} className="flex h-24 items-end gap-2">
              {[40, 60, 52, 78, 96].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[#ECB44A]/40 to-[#ECB44A]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/60">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#ECB44A]" /> Todo bajo control
            </div>
          </div>

          <span className="absolute right-6 top-6 font-title text-xs uppercase tracking-[0.3em] text-[#ECB44A]/80">
            Con sistema
          </span>

          {/* Pista de clic */}
          <span className="absolute bottom-10 right-1/2 translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition group-hover:bg-white/20">
            Toca el lado limpio →
          </span>
        </div>
      </button>

      {/* Costura central */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  );
}
