"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DASHBOARD } from "@/app/experiencia/assets";

type MetricaKey = "roas" | "inversion" | "ventas" | "contactos";

const DETALLES: Record<MetricaKey, string> = {
  roas:
    "Por cada peso invertido en pauta, el negocio facturó $70.35. Ventas atribuidas: $2.8M sobre $39,798.20 de inversión publicitaria.",
  inversion:
    "Presupuesto total repartido entre 4 campañas de mensajes y formularios en Meta Ads. La campaña líder — Mensajes de WA – Lunes 5 Enero — concentró el 63% del gasto.",
  ventas:
    "$2,800,000 MXN facturados por eventos cerrados en el Salón Jardín Ex Hacienda San Bartolo durante el periodo del reporte.",
  contactos:
    "4,041 personas iniciaron una conversación por WhatsApp con el salón. El costo promedio ponderado de esa conversación fue de ~$9.85.",
};

const LABELS: Record<MetricaKey, string> = {
  roas: "ROAS",
  inversion: "Inversión",
  ventas: "Ventas atribuidas",
  contactos: "Contactos WA",
};

function fmtMoney(n: number, opts: { compact?: boolean } = {}) {
  if (opts.compact && n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(1)}M`;
  }
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: n < 1000 ? 2 : 0 });
}

export default function MetaAdsDashboard() {
  const [activa, setActiva] = useState<MetricaKey | null>("roas");

  const valores: Record<MetricaKey, { valor: string; sub?: string }> = {
    roas: { valor: `${DASHBOARD.roas.toFixed(2)}x`, sub: `ROI ${DASHBOARD.roi.toLocaleString("es-MX")}%` },
    inversion: { valor: fmtMoney(DASHBOARD.inversion), sub: `${DASHBOARD.campanias.length} campañas` },
    ventas: { valor: fmtMoney(DASHBOARD.ventas, { compact: true }), sub: "eventos cerrados" },
    contactos: { valor: DASHBOARD.contactosMensajes.toLocaleString("es-MX"), sub: `${DASHBOARD.alcance.toLocaleString("es-MX")} alcance` },
  };

  return (
    <div
      data-interactive
      className="w-full max-w-[900px] mx-auto rounded-xl overflow-hidden"
      style={{
        background: "#1C2128",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Header tipo Meta */}
      <div
        className="flex items-center justify-between px-5 py-3 gap-3 flex-wrap"
        style={{ background: "#0E1116", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-6 h-6 rounded-md shrink-0" style={{ background: "linear-gradient(135deg,#0866FF,#A100FF)" }} />
          <span className="text-white text-sm font-medium truncate">Meta Ads Manager</span>
          <span className="text-white/40 text-xs truncate hidden md:inline">/ {DASHBOARD.cliente}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Pill color="#22C55E">En vivo</Pill>
          <span className="text-white/40 text-xs hidden md:inline">{DASHBOARD.rango}</span>
        </div>
      </div>

      {/* Grid de métricas destacadas — 4 KPIs clickeables */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5">
        {(Object.keys(LABELS) as MetricaKey[]).map((key) => {
          const isActive = activa === key;
          return (
            <button
              data-interactive
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                setActiva((a) => (a === key ? null : key));
              }}
              className="text-left px-5 py-5 transition-colors"
              style={{
                background: isActive ? "rgba(167,225,47,0.08)" : "#1C2128",
                borderTop: isActive ? "2px solid #A7E12F" : "2px solid transparent",
              }}
            >
              <div className="text-white/60 text-[11px] uppercase tracking-wider mb-2">
                {LABELS[key]}
              </div>
              <div
                className="text-2xl md:text-[26px] font-semibold"
                style={{ color: key === "roas" ? "#A7E12F" : "#FFFFFF" }}
              >
                {valores[key].valor}
              </div>
              {valores[key].sub && (
                <div className="text-[11px] mt-1 text-white/50">
                  {valores[key].sub}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detalle expandible */}
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
              <div className="w-1 self-stretch rounded" style={{ background: "#A7E12F" }} />
              <div className="flex-1">
                <div className="text-[#A7E12F] text-[10px] uppercase tracking-widest mb-1">
                  Qué significó este número
                </div>
                <p className="text-white/85 text-sm leading-relaxed">{DETALLES[activa]}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabla de campañas (reproducción de la captura) */}
      <div className="bg-[#1C2128]">
        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-white/85 text-xs font-medium tracking-wide">Campañas ({DASHBOARD.campanias.length})</span>
          <span className="text-white/40 text-[11px] hidden md:inline">
            Impresiones {DASHBOARD.impresiones.toLocaleString("es-MX")} · Alcance {DASHBOARD.alcance.toLocaleString("es-MX")}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-white/45 text-[11px] uppercase tracking-wider">
                <th className="text-left px-5 py-2 font-medium">Campaña</th>
                <th className="text-right px-3 py-2 font-medium">Resultados</th>
                <th className="text-right px-3 py-2 font-medium">Costo/res.</th>
                <th className="text-right px-3 py-2 font-medium">Gasto</th>
                <th className="text-right px-5 py-2 font-medium">Alcance</th>
              </tr>
            </thead>
            <tbody>
              {DASHBOARD.campanias.map((c, i) => (
                <tr
                  key={i}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-6 h-3.5 rounded-full flex items-center px-0.5 transition-colors shrink-0"
                        style={{
                          background: c.activa ? "#0866FF" : "rgba(255,255,255,0.15)",
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-white transition-transform"
                          style={{
                            transform: c.activa ? "translateX(10px)" : "translateX(0)",
                          }}
                        />
                      </span>
                      <span
                        className="text-[13px] truncate max-w-[280px]"
                        style={{ color: c.activa ? "#4EA1FF" : "rgba(255,255,255,0.55)" }}
                      >
                        {c.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="text-right px-3 py-3 tabular-nums text-white/90">
                    <div className="font-medium">{c.resultados}</div>
                    <div className="text-[10px] text-white/40">{c.resultadosLabel}</div>
                  </td>
                  <td className="text-right px-3 py-3 tabular-nums text-white/85">{c.costo}</td>
                  <td className="text-right px-3 py-3 tabular-nums text-white/85">{c.gasto}</td>
                  <td className="text-right px-5 py-3 tabular-nums text-white/85">{c.alcance}</td>
                </tr>
              ))}
              <tr className="border-t border-white/10 bg-[#161B21]">
                <td className="px-5 py-3 text-white/70 text-[11px] uppercase tracking-wider">
                  Total
                </td>
                <td className="text-right px-3 py-3 text-white/60 text-xs">—</td>
                <td className="text-right px-3 py-3 text-white/60 text-xs">—</td>
                <td className="text-right px-3 py-3 tabular-nums text-white font-semibold">
                  {fmtMoney(DASHBOARD.inversion)}
                </td>
                <td className="text-right px-5 py-3 tabular-nums text-white font-semibold">
                  {DASHBOARD.alcance.toLocaleString("es-MX")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
