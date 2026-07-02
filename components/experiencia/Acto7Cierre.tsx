"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import LogoPG from "./LogoPG";

const CONTACTO = {
  whatsapp: "+52 222 000 0000",
  whatsappLink: "https://wa.me/5212220000000",
  email: "hola@pgestrategias.com",
};

export default function Acto7Cierre({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return (
    <div className="absolute inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center">
      {/* Logo + frase (mismo tratamiento que Acto 1) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <LogoPG height={64} className="md:h-[80px]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-10 text-white font-light tracking-tight text-center px-6"
        style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
      >
        Esto es PG Estrategias.
      </motion.p>

      {/* CTA + Contacto + QR — aparecen 1.5s después */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="mt-12 flex flex-col items-center gap-5"
      >
        <a
          data-interactive
          href={CONTACTO.whatsappLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm tracking-wide transition-colors"
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

        {/* QR placeholder — útil en presentación presencial */}
        <div
          className="mt-6 p-2 rounded bg-white/95"
          aria-label="QR de contacto"
          data-interactive
          onClick={(e) => e.stopPropagation()}
        >
          <QrSvg link={CONTACTO.whatsappLink} />
        </div>
      </motion.div>
    </div>
  );
}

/* QR ornamental — usa un servicio público (no externo) generando un patrón simple decorativo.
   Para QR real, conectar con una librería tipo qrcode.react. */
function QrSvg({ link }: { link: string }) {
  // Patrón pseudo-aleatorio derivado del link para que parezca QR; cambiar por QR real cuando se decida.
  const size = 12;
  const cells = [];
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
      {/* Esquinas tipo finder pattern */}
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
