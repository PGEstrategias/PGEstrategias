"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Metrica = {
  key: string;
  label: string;
  valor: string;
  delta?: string;
  detalle: string;
};

const METRICAS: Metrica[] = [
  {
    key: "cpl",
    label: "Costo por lead",
    valor: "$38.40 MXN",
    delta: "−42%",
    detalle:
      "Cada conversación calificada nos costó $38 pesos. Antes de optimizar la creatividad y el flujo, estaba en ~$66.",
  },
  {
    key: "roas",
    label: "ROAS",
    valor: "5.8x",
    delta: "+1.9x",
    detalle:
      "Por cada peso invertido en pauta, el negocio facturó $5.80. Sostenido durante 6 semanas de campaña.",
  },
  {
    key: "alcance",
    label: "Alcance",
    valor: "182,540",
    detalle:
      "Personas únicas alcanzadas en el radio de servicio del cliente. Frecuencia promedio: 2.3.",
  },
  {
    key: "ctr",
    label: "CTR",
    valor: "3.42%",
    detalle:
      "Creativos con ángulo de testimonio + B-roll cinematográfico. Benchmark del sector: 1.1%.",
  },
];

export default function MetaAdsDashboard() {
  const [activa, setActiva] = useState<Metrica | null>(null);

  return (
    <div
      data-interactive
      className="w-full max-w-[820px] mx-auto rounded-xl overflow-hidden"
      style={{
        background: "#1C2128",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Header tipo Meta */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ background: "#0E1116", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md" style={{ background: "linear-gradient(135deg,#0866FF,#A100FF)" }} />
          <span className="text-white text-sm font-medium">Meta Ads Manager</span>
          <span className="text-white/40 text-xs">/ Campañas activas</span>
        </div>
        <div className="flex items-center gap-2">
          <Pill color="#22C55E">En vivo</Pill>
          <span className="text-white/40 text-xs hidden md:inline">Últimos 30 días</span>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5">
        {METRICAS.map((m) => (
          <button
            data-interactive
            key={m.key}
            onClick={(e) => {
              e.stopPropagation();
              setActiva((a) => (a?.key === m.key ? null : m));
            }}
            className="text-left px-5 py-5 transition-colors"
            style={{
              background: activa?.key === m.key ? "rgba(167,225,47,0.08)" : "#1C2128",
              borderTop: activa?.key === m.key ? "2px solid #A7E12F" : "2px solid transparent",
            }}
          >
            <div className="text-white/60 text-[11px] uppercase tracking-wider mb-2">
              {m.label}
            </div>
            <div className="text-white text-2xl font-semibold">{m.valor}</div>
            {m.delta && (
              <div
                className="text-[11px] mt-1"
                style={{ color: m.delta.startsWith("−") ? "#A7E12F" : "#A7E12F" }}
              >
                {m.delta} vs período anterior
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Gráfica decorativa */}
      <div className="px-5 py-4 bg-[#1C2128]">
        <SparkChart />
      </div>

      {/* Detalle de la métrica activa */}
      <AnimatePresence>
        {activa && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
            style={{ borderTop: "1px solid rgba(167,225,47,0.2)", background: "#141A1F" }}
          >
            <div className="px-5 py-4 flex items-start gap-3">
              <div
                className="w-1 self-stretch rounded"
                style={{ background: "#A7E12F" }}
              />
              <div className="flex-1">
                <div className="text-[#A7E12F] text-xs uppercase tracking-widest mb-1">
                  Qué significó este número
                </div>
                <p className="text-white/85 text-sm leading-relaxed">
                  {activa.detalle}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full"
      style={{ background: "rgba(34,197,94,0.12)", color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

function SparkChart() {
  // Curva decorativa que sugiere tendencia ascendente
  const points = "0,40 30,38 60,32 90,30 120,22 150,24 180,16 210,12 240,18 270,8 300,4";
  return (
    <svg viewBox="0 0 300 50" className="w-full h-16">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#A7E12F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#A7E12F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,50 ${points} 300,50`}
        fill="url(#g)"
      />
      <polyline
        points={points}
        fill="none"
        stroke="#A7E12F"
        strokeWidth="1.5"
      />
    </svg>
  );
}
