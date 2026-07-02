"use client";

import { motion } from "framer-motion";
import LogoPG from "./LogoPG";

// Logo desvanecido en el fondo con respiración lenta.
// Aparece detrás del contenido de la mayoría de los actos, muy sutil, para dar
// una capa de "sistema vivo" sin robar atención.

type Props = {
  intensity?: "soft" | "medium" | "strong"; // soft = casi imperceptible
};

export default function BackgroundLogo({ intensity = "soft" }: Props) {
  const range =
    intensity === "strong"
      ? [0.08, 0.16, 0.08]
      : intensity === "medium"
        ? [0.05, 0.09, 0.05]
        : [0.025, 0.05, 0.025];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: range, scale: [1, 1.015, 1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: "blur(0.4px)",
        }}
        className="text-white/80"
      >
        {/* Escalado al ~60% del alto de viewport, sin exceder ancho */}
        <div style={{ height: "min(38vh, 220px)" }} className="md:!h-[min(46vh,300px)]">
          <LogoScaledFullWidth />
        </div>
      </motion.div>
    </div>
  );
}

function LogoScaledFullWidth() {
  // Usamos LogoPG monochrome con un height grande — hereda color de texto vía currentColor.
  return <LogoPG height={220} monochrome className="!text-white/40" />;
}
