"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";

// Segmentos: cada keyword (highlight true) se pinta de verde al final del reveal.
const SEGMENTS: { text: string; highlight: boolean }[] = [
  { text: "Construimos ", highlight: false },
  { text: "sistemas", highlight: true },
  { text: " de crecimiento digital y ", highlight: false },
  { text: "producción de alto nivel", highlight: true },
  { text: " para negocios que quieren ", highlight: false },
  { text: "resultados reales", highlight: true },
  { text: ".", highlight: false },
];

export default function Acto2Propuesta({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#1E1E1E] overflow-hidden">
      {/* Visual de apoyo — clips a baja opacidad (placeholder). Reemplazar por <video> cuando se entregue el clip ambiental. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.15,
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(167,225,47,0.18), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      <motion.p
        className="relative z-10 max-w-5xl px-8 text-center font-title font-bold leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(34px, 5.5vw, 78px)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {SEGMENTS.map((seg, i) => (
          <motion.span
            key={i}
            initial={{ color: "#FFFFFF" }}
            animate={{ color: seg.highlight ? "#A7E12F" : "#FFFFFF" }}
            transition={{ duration: 0.6, delay: 1.0 + i * 0.05 }}
          >
            {seg.text}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
