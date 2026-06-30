"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";

type Nodo = {
  label: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

const NODOS: Nodo[] = [
  { label: "Ads", icon: <IconAds /> },
  { label: "Landing", icon: <IconLanding /> },
  { label: "WhatsApp", icon: <IconWhats /> },
  { label: "Asistente AI", icon: <IconAI />, highlight: true },
  { label: "CRM", icon: <IconCRM /> },
  { label: "Resultados", icon: <IconStar /> },
];

const STEP = 0.4; // 0.4s entre nodos

export default function Acto5Sistema({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  const total = NODOS.length;
  const flowDuration = (total - 1) * STEP + 0.4;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#141414] overflow-hidden"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.08'/></svg>\")",
      }}
    >
      {/* Flujo horizontal */}
      <div className="relative flex items-center justify-center gap-4 md:gap-7 px-6 max-w-6xl flex-wrap">
        {NODOS.map((n, i) => {
          const delay = i * STEP;
          return (
            <div key={n.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay, ease: "easeOut" }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border"
                  style={{
                    backgroundColor: n.highlight
                      ? "rgba(167,225,47,0.14)"
                      : "rgba(255,255,255,0.04)",
                    borderColor: n.highlight
                      ? "#A7E12F"
                      : "rgba(255,255,255,0.12)",
                    color: n.highlight ? "#A7E12F" : "#FFFFFF",
                    boxShadow: n.highlight
                      ? "0 0 24px rgba(167,225,47,0.25)"
                      : "none",
                  }}
                >
                  {n.icon}
                </div>
                <span
                  className="text-xs md:text-sm tracking-wide"
                  style={{ color: n.highlight ? "#A7E12F" : "#FFFFFF" }}
                >
                  {n.label}
                </span>
              </motion.div>
              {i < total - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: STEP,
                    delay: delay + 0.2,
                    ease: "easeInOut",
                  }}
                  className="origin-left h-px w-6 md:w-10 mx-1 md:mx-2"
                  style={{ backgroundColor: "#A7E12F" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Frase de cierre */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: flowDuration + 0.2 }}
        className="mt-16 text-center px-8 max-w-3xl"
      >
        <p
          className="font-title leading-tight tracking-tight"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          <span className="text-white/55">
            La producción sin sistema es arte.
          </span>{" "}
          <span className="font-bold text-white">
            Con sistema es negocio.
          </span>
        </p>
      </motion.div>
    </div>
  );
}

/* —— Iconos —— */
function IconAds() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11l18-7-4 16-6-5-3 4z" />
    </svg>
  );
}
function IconLanding() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  );
}
function IconWhats() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 21l1.3-5A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}
function IconAI() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}
function IconCRM() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
}
