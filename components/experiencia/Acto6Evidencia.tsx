"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import WhatsAppMockup from "./whatsapp/WhatsAppMockup";
import MetaAdsDashboard from "./dashboard/MetaAdsDashboard";
import { ASSETS } from "@/app/experiencia/assets";

const TITULOS = [
  "Una conversación real.",
  "Los números detrás.",
  "Las palabras del cliente.",
];

export default function Acto6Evidencia({ registerHandle }: ActProps) {
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    registerHandle({
      forward: () => {
        if (stepRef.current < 2) {
          setStep((s) => s + 1);
          return true;
        }
        return false;
      },
      back: () => {
        if (stepRef.current > 0) {
          setStep((s) => s - 1);
          return true;
        }
        return false;
      },
    });
    return () => registerHandle(null);
  }, [registerHandle]);

  return (
    <div className="absolute inset-0 bg-[#141414] overflow-hidden flex flex-col">
      {/* Header con título del momento */}
      <div className="pt-8 pb-2 text-center">
        <div className="text-white/40 text-[11px] tracking-[0.3em] uppercase mb-2">
          Acto 6 · Evidencia
        </div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-title text-white"
            style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}
          >
            {TITULOS[step]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="w-full flex items-center justify-center"
          >
            {step === 0 && <WhatsAppMockup />}
            {step === 1 && <MetaAdsDashboard />}
            {step === 2 && <TestimoniosGrid />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Micro-navegación interna */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {[0, 1, 2].map((i) => (
          <button
            data-interactive
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setStep(i);
            }}
            aria-label={`Momento ${i + 1}`}
            className="block rounded-full transition-all"
            style={{
              width: step === i ? 18 : 6,
              height: 6,
              background: step === i ? "#A7E12F" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TestimoniosGrid() {
  const items = ASSETS.testimonios;

  if (!items || items.length === 0) {
    return (
      <div className="text-white/40 text-center max-w-md">
        <div className="border border-white/15 rounded-2xl p-10">
          <div className="text-xs tracking-widest uppercase mb-3 opacity-60">
            Testimonios en video
          </div>
          <div>· Pendientes de carga ·</div>
        </div>
      </div>
    );
  }

  const cols = items.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";
  return (
    <div className={`grid grid-cols-1 ${cols} gap-4 max-w-4xl w-full`}>
      {items.map((t, i) => (
        <div
          key={i}
          className="aspect-video rounded-xl overflow-hidden bg-black"
          data-interactive
        >
          <video
            src={t.src}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="px-3 py-2 text-white/80 text-xs">{t.nombre}</div>
        </div>
      ))}
    </div>
  );
}
