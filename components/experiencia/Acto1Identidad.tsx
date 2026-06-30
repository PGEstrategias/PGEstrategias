"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";

export default function Acto1Identidad({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center gap-10"
      >
        {/* Logo placeholder — reemplazar con asset real */}
        <div className="flex items-center gap-3 text-white">
          <svg
            viewBox="0 0 64 64"
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="32" cy="32" r="28" />
            <path d="M20 40 L32 20 L44 40 Z" />
          </svg>
          <span className="font-title text-3xl md:text-4xl font-bold tracking-tight">
            PG ESTRATEGIAS
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-[18%] text-2xl md:text-4xl text-white font-light tracking-tight"
      >
        Somos PG Estrategias.
      </motion.p>
    </div>
  );
}
