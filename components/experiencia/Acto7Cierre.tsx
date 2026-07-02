"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import LogoPG from "./LogoPG";
import { VIDEOS_ACTO_3, VIDEOS_ACTO_4, WHATSAPP, DASHBOARD } from "@/app/experiencia/assets";

const CONTACTO = {
  whatsapp: "+52 222 000 0000",
  whatsappLink: "https://wa.me/5212220000000",
  email: "hola@pgestrategias.com",
};

const TODOS_VIDEOS = [...VIDEOS_ACTO_3, ...VIDEOS_ACTO_4];

export default function Acto7Cierre({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return (
    <div
      data-interactive
      className="absolute inset-0 overflow-y-auto"
    >
      <div className="min-h-full flex flex-col px-4 md:px-8 py-6 md:py-10 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        {/* Header — logo + frase */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center gap-4 text-center pt-2"
        >
          <LogoPG height={48} className="md:!h-[64px]" />
          <h1
            className="font-title font-light tracking-tight text-white"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            Esto es PG Estrategias.
          </h1>
          <p className="text-white/50 text-sm max-w-xl">
            Todo lo que viste en un solo lugar. Producción, sistema y evidencia — un cierre completo.
          </p>
        </motion.div>

        {/* Bento — 5 videos + WhatsApp + Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="grid gap-2 md:gap-3"
          style={{
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          }}
        >
          {/* Fila 1 — 5 videos en tira vertical */}
          {TODOS_VIDEOS.slice(0, 5).map((src, i) => (
            <VideoTile key={src} src={src} index={i} className="col-span-3 md:col-span-2 lg:col-span-1 aspect-[9/16]" />
          ))}
          {/* Placeholder para capturas nuevas — al lado de los videos */}
          <PlaceholderTile
            className="col-span-3 md:col-span-2 lg:col-span-1 aspect-[9/16]"
            label="Captura"
          />

          {/* Fila 2 — mockups */}
          <div className="col-span-6 md:col-span-3 aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#0B141A] relative">
            <WhatsAppMini />
          </div>
          <div className="col-span-6 md:col-span-3 aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#1C2128] relative">
            <DashboardMini />
          </div>
        </motion.div>

        {/* CTA + contacto + QR */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col items-center gap-5 py-8"
        >
          <a
            data-interactive
            href={CONTACTO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-wide transition-all"
            style={{
              border: "1px solid #A7E12F",
              color: "#A7E12F",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#A7E12F";
              (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#A7E12F";
            }}
          >
            Hablemos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm">
            <a
              data-interactive
              href={CONTACTO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ color: "#A7E12F" }}
              className="hover:underline"
            >
              {CONTACTO.whatsapp}
            </a>
            <span className="hidden md:inline text-white/30">·</span>
            <a
              data-interactive
              href={`mailto:${CONTACTO.email}`}
              onClick={(e) => e.stopPropagation()}
              style={{ color: "#A7E12F" }}
              className="hover:underline"
            >
              {CONTACTO.email}
            </a>
          </div>

          <div
            className="mt-2 p-2 rounded bg-white/95"
            data-interactive
            onClick={(e) => e.stopPropagation()}
          >
            <QrSvg link={CONTACTO.whatsappLink} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Video tile ---------------- */

function VideoTile({
  src,
  index,
  className,
}: {
  src: string;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Escalonar el arranque para no explotar el ancho de banda al entrar al acto
    const t = setTimeout(() => v.play().catch(() => {}), 200 * index);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-black ${className ?? ""}`}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}

/* ---------------- Placeholder para capturas por venir ---------------- */

function PlaceholderTile({ className, label }: { className?: string; label: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-dashed border-white/15 flex items-center justify-center ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(167,225,47,0.04))",
      }}
    >
      <div className="text-center px-3">
        <div className="text-[10px] tracking-widest uppercase text-white/40 mb-1">
          {label}
        </div>
        <div className="text-white/25 text-xs">próximamente</div>
      </div>
    </div>
  );
}

/* ---------------- WhatsApp mini ---------------- */

function WhatsAppMini() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#202C33] border-b border-white/5">
        <div className="w-6 h-6 rounded-full bg-[#4A5860] flex items-center justify-center text-white text-[10px] font-semibold">
          {WHATSAPP.contacto.avatarIniciales}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[11px] font-medium truncate">
            {WHATSAPP.contacto.nombre}
          </div>
          <div className="text-[9px] text-[#8FA3AE]">en línea</div>
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col justify-end gap-1.5 overflow-hidden">
        <div className="self-end max-w-[75%] px-2.5 py-1.5 rounded-lg text-white text-[10px] leading-tight" style={{ background: "#005C4B" }}>
          Todo listo con los ajustes 🙌
        </div>
        <div className="self-start px-2.5 py-1.5 rounded-lg text-white text-[10px] flex items-center gap-2" style={{ background: "#202C33", minWidth: 130 }}>
          <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><polygon points="6 4 20 12 6 20 6 4" /></svg>
          </div>
          <div className="flex items-center gap-[1.5px] h-3">
            {[3, 6, 4, 8, 5, 9, 4, 7, 5, 6, 4, 8, 5, 6].map((h, i) => (
              <span key={i} style={{ width: 1.5, height: h, background: "rgba(255,255,255,0.55)", borderRadius: 1 }} />
            ))}
          </div>
          <span className="text-white/60 text-[9px] ml-auto">0:24</span>
        </div>
        <div className="self-start max-w-[80%] px-2.5 py-1.5 rounded-lg text-white text-[10px] leading-tight" style={{ background: "#202C33" }}>
          Los videos quedaron increíbles, mi agenda…
          <span className="ml-1" style={{ color: "#53BDEB" }}>ver más</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Dashboard mini ---------------- */

function DashboardMini() {
  return (
    <div className="absolute inset-0 flex flex-col p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/50 text-[10px] uppercase tracking-widest">Meta Ads · San Bartolo</span>
        <span className="inline-flex items-center gap-1 text-[10px]" style={{ color: "#22C55E" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E" }} />
          En vivo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg p-3" style={{ background: "rgba(167,225,47,0.08)", border: "1px solid rgba(167,225,47,0.25)" }}>
          <div className="text-[9px] uppercase tracking-wider text-white/60 mb-1">ROAS</div>
          <div className="text-xl md:text-2xl font-bold" style={{ color: "#A7E12F" }}>
            {DASHBOARD.roas.toFixed(2)}x
          </div>
          <div className="text-[9px] text-white/50 mt-0.5">ROI {DASHBOARD.roi.toLocaleString("es-MX")}%</div>
        </div>
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-[9px] uppercase tracking-wider text-white/60 mb-1">Ventas</div>
          <div className="text-xl md:text-2xl font-bold text-white">$2.8M</div>
          <div className="text-[9px] text-white/50 mt-0.5">sobre ${DASHBOARD.inversion.toLocaleString("es-MX")}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <MiniStat label="Impresiones" value={DASHBOARD.impresiones.toLocaleString("es-MX")} />
        <MiniStat label="Alcance" value={DASHBOARD.alcance.toLocaleString("es-MX")} />
        <MiniStat label="Contactos" value={DASHBOARD.contactosMensajes.toLocaleString("es-MX")} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg py-2 px-1" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="text-white/80 text-xs md:text-sm font-semibold tabular-nums">{value}</div>
      <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}

/* ---------------- QR ornamental ---------------- */

function QrSvg({ link }: { link: string }) {
  const size = 12;
  const cells: { x: number; y: number }[] = [];
  let seed = 0;
  for (let i = 0; i < link.length; i++) seed = (seed * 31 + link.charCodeAt(i)) >>> 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if ((seed & 7) > 3) cells.push({ x, y });
    }
  }
  return (
    <svg width="96" height="96" viewBox={`0 0 ${size} ${size}`} className="block">
      <rect width={size} height={size} fill="white" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="1" height="1" fill="#0A0A0A" />
      ))}
      {[
        [0, 0],
        [size - 3, 0],
        [0, size - 3],
      ].map(([fx, fy], i) => (
        <g key={`f${i}`}>
          <rect x={fx} y={fy} width="3" height="3" fill="#0A0A0A" />
          <rect x={fx + 0.5} y={fy + 0.5} width="2" height="2" fill="white" />
          <rect x={fx + 1} y={fy + 1} width="1" height="1" fill="#0A0A0A" />
        </g>
      ))}
    </svg>
  );
}
