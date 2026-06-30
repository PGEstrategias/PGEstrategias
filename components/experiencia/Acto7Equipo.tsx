"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import { ASSETS } from "@/app/experiencia/assets";

type Miembro = { nombre: string; foto?: string; tagline: string; destacado?: boolean };

// Placeholders editables — Pablo define las frases finales con el desarrollador.
const FALLBACK: Miembro[] = [
  { nombre: "Pablo", tagline: "Pablo. La cabeza y el ojo del equipo.", destacado: true },
  { nombre: "Markus", tagline: "Markus. Campañas que no malgastan." },
  { nombre: "Carpi", tagline: "Carpi. Si lo imaginas, lo produce." },
  { nombre: "Daniel", tagline: "Daniel. Sistemas que cierran solos." },
  { nombre: "Mariana", tagline: "Mariana. La conversación que convierte." },
  { nombre: "Sofía", tagline: "Sofía. Diseño con criterio." },
  { nombre: "Andrés", tagline: "Andrés. El que arma todo por dentro." },
];

export default function Acto7Equipo({ registerHandle }: ActProps) {
  const equipo = ASSETS.equipo.length === 7 ? ASSETS.equipo : FALLBACK;
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return (
    <div className="absolute inset-0 bg-[#141414] flex flex-col items-center justify-center px-6 py-10">
      <div className="text-white/40 text-[11px] tracking-[0.3em] uppercase mb-8">
        Acto 7 · El equipo
      </div>

      <div
        className="grid gap-3 md:gap-4 w-full max-w-5xl"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 40vw), 1fr))",
        }}
      >
        {equipo.map((m, i) => (
          <motion.div
            data-interactive
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
            style={{
              gridColumn: m.destacado ? "span 1" : undefined,
              transform: m.destacado ? "scale(1.04)" : undefined,
              zIndex: m.destacado ? 2 : 1,
              outline: m.destacado
                ? "1px solid rgba(167,225,47,0.35)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {m.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.foto}
                alt={m.nombre}
                className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white/30 text-3xl font-title"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                }}
              >
                {m.nombre[0]}
              </div>
            )}

            {/* Overlay oscuro permanente */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity"
              style={{
                background: hover === i
                  ? "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)"
                  : "rgba(0,0,0,0.45)",
              }}
            />

            {/* Nombre + tagline en hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 transition-all">
              <div
                className="text-sm font-medium transition-colors"
                style={{ color: hover === i ? "#A7E12F" : "#FFFFFF" }}
              >
                {m.nombre}
              </div>
              <motion.div
                initial={false}
                animate={{
                  opacity: hover === i ? 1 : 0,
                  y: hover === i ? 0 : 6,
                }}
                transition={{ duration: 0.25 }}
                className="text-white/85 text-xs mt-1"
              >
                {m.tagline}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-10 text-center font-title text-white"
        style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
      >
        <span style={{ color: "#A7E12F" }} className="font-bold">7</span>{" "}
        personas. Un solo objetivo.
      </motion.p>
    </div>
  );
}
