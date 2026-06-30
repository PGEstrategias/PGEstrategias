"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";

export default function FrasePuente({ onAdvance, registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  useEffect(() => {
    // Fade in (~0.6s) + respira 2.5s + avanza sola
    const t = window.setTimeout(() => onAdvance(), 3100);
    return () => window.clearTimeout(t);
  }, [onAdvance]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-white font-title font-bold text-center px-8 tracking-tight max-w-4xl"
        style={{ fontSize: "clamp(32px, 5vw, 72px)", lineHeight: 1.1 }}
      >
        Detrás de cada video hay un sistema.
      </motion.p>
    </div>
  );
}
