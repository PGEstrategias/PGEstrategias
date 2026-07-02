"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import LogoPG from "./LogoPG";

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
      >
        <LogoPG height={72} className="md:h-[96px]" />
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
