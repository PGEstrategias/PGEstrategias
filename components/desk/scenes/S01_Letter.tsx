"use client";

/* ============================================================
   ESCENA 1 — "El gancho": la carta sellada (escena heroica).
   ------------------------------------------------------------
   Flujo de interacción:
   1. Sobre el vacío negro aparece una carta cerrada con un
      sello de cera (monograma PG).
   2. Clic en el sello → se QUIEBRA en fragmentos (stagger GSAP)
      y la carta se abre.
   3. El texto del gancho se revela palabra por palabra (SplitText).
   4. Aparece "continuar" → clic avanza a la escena 2.

   Sin arte externo: la carta y el sello son SVG/CSS. El sello
   se compone de 6 cuñas que parten del centro para "romperse".
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { gsap } from "../gsap";
import { SplitText } from "gsap/SplitText";
import type { SceneProps } from "./types";

gsap.registerPlugin(SplitText);

/* Geometría de una cuña de pastel (un fragmento del sello). */
function wedgePath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`;
}

const SEAL_R = 46;
const SHARDS = 6;
const wedges = Array.from({ length: SHARDS }, (_, i) => {
  const a0 = (i / SHARDS) * Math.PI * 2 - Math.PI / 2;
  const a1 = ((i + 1) / SHARDS) * Math.PI * 2 - Math.PI / 2;
  const mid = (a0 + a1) / 2;
  return { d: wedgePath(60, 60, SEAL_R, a0, a1), mid };
});

export default function S01_Letter({ active, onAdvance }: SceneProps) {
  const [opened, setOpened] = useState(false);

  const paperRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<SVGSVGElement>(null);
  const monoRef = useRef<SVGTextElement>(null);
  const shardRefs = useRef<SVGPathElement[]>([]);
  const textRef = useRef<HTMLParagraphElement>(null);
  const continueRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Intro: la carta y el sello entran al activarse la escena. */
  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(paperRef.current, { autoAlpha: 0, y: 40, scale: 0.94, duration: 0.9, ease: "power3.out" });
      gsap.from(sealRef.current, { scale: 0, rotate: -40, transformOrigin: "50% 50%", duration: 0.8, ease: "back.out(1.7)", delay: 0.35 });
    });
    return () => ctx.revert();
  }, [active, reduce]);

  /* Romper el sello → abrir carta → revelar texto. */
  const breakSeal = () => {
    if (opened) return;
    setOpened(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Fragmentos del sello salen disparados.
      tl.to(shardRefs.current, {
        x: (i) => Math.cos(wedges[i].mid) * 90,
        y: (i) => Math.sin(wedges[i].mid) * 90,
        rotate: (i) => (i % 2 ? 120 : -120),
        scale: 0.4,
        opacity: 0,
        transformOrigin: "50% 50%",
        duration: reduce ? 0 : 0.7,
        ease: "power2.out",
        stagger: reduce ? 0 : 0.04,
      });
      tl.to(monoRef.current, { opacity: 0, duration: reduce ? 0 : 0.3 }, 0);

      // 2. La carta "respira" al abrirse.
      tl.to(paperRef.current, { scale: 1.02, duration: reduce ? 0 : 0.4, ease: "power2.out" }, reduce ? 0 : "-=0.3");

      // 3. Reveal del gancho palabra por palabra.
      if (textRef.current) {
        gsap.set(textRef.current, { autoAlpha: 1 });
        splitRef.current = new SplitText(textRef.current, { type: "words" });
        tl.from(
          splitRef.current.words,
          {
            autoAlpha: 0,
            y: 14,
            duration: reduce ? 0 : 0.5,
            ease: "power2.out",
            stagger: reduce ? 0 : 0.05,
          },
          reduce ? 0 : "-=0.1"
        );
      }

      // 4. Pista de continuar.
      tl.to(continueRef.current, { autoAlpha: 1, y: 0, duration: reduce ? 0 : 0.5 }, reduce ? 0 : "-=0.2");
    });
    // El contexto se limpia al desmontar la escena (efecto de abajo).
    cleanupRef.current = () => ctx.revert();
  };

  const cleanupRef = useRef<() => void>();
  useEffect(() => () => {
    splitRef.current?.revert();
    cleanupRef.current?.();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6">
      {/* La carta */}
      <div
        ref={paperRef}
        className="relative w-full max-w-md rounded-sm bg-[#f3ead3] px-8 py-12 text-[#2b2419] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        style={{ rotate: "-1.2deg" }}
      >
        {/* Textura/borde de papel */}
        <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-black/10" />

        <p className="text-center font-title text-[11px] uppercase tracking-[0.35em] text-[#9a7b34]">
          Una carta para ti
        </p>

        {/* Texto del gancho — oculto hasta romper el sello */}
        <p
          ref={textRef}
          className="invisible mt-6 text-center font-title text-2xl leading-snug sm:text-3xl"
        >
          Ya tienes producto. Ya tienes clientes. Lo que falta no es trabajar
          más — es un sistema que convierta tu esfuerzo en crecimiento.
        </p>

        {/* Sello de cera centrado sobre la carta */}
        {!opened && (
          <p className="mt-6 text-center font-body text-sm text-[#7a6a4a]">
            Está sellada. Ábrela.
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-label="Romper el sello de cera y abrir la carta"
            onClick={breakSeal}
            disabled={opened}
            className="relative outline-none transition focus-visible:ring-2 focus-visible:ring-[#9a7b34] disabled:cursor-default"
          >
            <svg ref={sealRef} width="92" height="92" viewBox="0 0 120 120" className={opened ? "" : "drop-shadow-md"}>
              {wedges.map((w, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    if (el) shardRefs.current[i] = el;
                  }}
                  d={w.d}
                  fill={i % 2 ? "#8e1f24" : "#a3262c"}
                  stroke="#6f1418"
                  strokeWidth="0.5"
                />
              ))}
              <circle cx="60" cy="60" r="34" fill="none" stroke="#6f1418" strokeWidth="2" opacity="0.5" />
              <text
                ref={monoRef}
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Syne, sans-serif"
                fontSize="30"
                fontWeight="700"
                fill="#f3ead3"
              >
                PG
              </text>
            </svg>
            {!opened && (
              <span className="mt-3 block text-center font-body text-xs uppercase tracking-widest text-[#9a7b34]">
                Rompe el sello
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Continuar */}
      <div ref={continueRef} className="invisible mt-10 translate-y-3">
        <button
          type="button"
          onClick={onAdvance}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white/80 outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
