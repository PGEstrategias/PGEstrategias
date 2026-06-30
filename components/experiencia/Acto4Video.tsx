"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import VideoActo from "./VideoActo";
import { ASSETS } from "@/app/experiencia/assets";

export default function Acto4Video({ registerHandle }: ActProps) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  useEffect(() => {
    // Texto exactamente 1s, luego entra el video
    const t = window.setTimeout(() => setShowIntro(false), 1000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 bg-black">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-10"
          >
            <p
              className="text-white font-title font-bold text-center px-8 tracking-tight"
              style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
            >
              Y esto también lo hicimos nosotros.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <VideoActo src={ASSETS.video2} label="VIDEO 2 — ACTO 4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
