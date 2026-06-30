"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ASSETS } from "@/app/experiencia/assets";

type Mensaje =
  | { type: "text"; from: "cliente" | "pg"; text: string; hora: string; truncate?: boolean }
  | { type: "audio"; from: "cliente" | "pg"; duracion: string; hora: string };

const DEFAULT_MENSAJES: Mensaje[] = [
  {
    type: "text",
    from: "pg",
    text: "Listo Pablo. Acabamos de lanzar la campaña 🚀",
    hora: "10:42",
  },
  {
    type: "text",
    from: "cliente",
    text: "Gracias chicos. Ya empezaron a entrar mensajes esta mañana.",
    hora: "11:05",
  },
  {
    type: "audio",
    from: "cliente",
    duracion: "0:24",
    hora: "11:06",
  },
  {
    type: "text",
    from: "cliente",
    text: "Nada más quería decirles que los videos quedaron increíbles, mi agenda está prácticamente llena para los próximos 15 días. Esto cambió completamente el ritmo del negocio y ya estamos viendo el impacto en facturación. De verdad muchas gracias por el trabajo y la paciencia con todos los detalles.",
    hora: "11:08",
    truncate: true,
  },
];

export default function WhatsAppMockup() {
  const contacto = ASSETS.whatsapp.contacto;
  const audioSrc = ASSETS.whatsapp.audioCliente.src;
  const audioDur = ASSETS.whatsapp.audioCliente.duracion;

  return (
    <div
      data-interactive
      className="mx-auto"
      style={{
        width: "min(360px, 92vw)",
        height: "min(640px, 80vh)",
        background: "#0B141A",
        borderRadius: 28,
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#202C33", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B0B7BB" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <div className="w-9 h-9 rounded-full bg-[#6B7C85] overflow-hidden flex items-center justify-center text-white font-semibold">
          {contacto.foto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={contacto.foto} alt={contacto.nombre} className="w-full h-full object-cover" />
          ) : (
            contacto.nombre[0]
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[15px] font-medium truncate">{contacto.nombre}</div>
          <div className="text-[11px] text-[#8FA3AE]">en línea</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B0B7BB" strokeWidth="2">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
      </div>

      {/* Chat */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-2"
        style={{
          background:
            "linear-gradient(180deg, #0B141A 0%, #0B141A 100%), url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\"><circle cx=\"30\" cy=\"30\" r=\"1\" fill=\"%23ffffff10\"/></svg>')",
        }}
      >
        {DEFAULT_MENSAJES.map((m, i) =>
          m.type === "text" ? (
            <Burbuja
              key={i}
              from={m.from}
              hora={m.hora}
              text={m.text}
              truncate={m.truncate}
            />
          ) : (
            <BurbujaAudio
              key={i}
              from={m.from}
              hora={m.hora}
              duracion={audioSrc ? audioDur : m.duracion}
              audioSrc={audioSrc}
            />
          )
        )}
      </div>

      {/* Footer barra (decorativa) */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "#202C33" }}
      >
        <div className="flex-1 h-9 rounded-full bg-[#2A3942]" />
        <div className="w-9 h-9 rounded-full bg-[#00A884] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Burbuja({
  from,
  hora,
  text,
  truncate,
}: {
  from: "cliente" | "pg";
  hora: string;
  text: string;
  truncate?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isMine = from === "pg";
  const showTruncated = truncate && !expanded;
  const lines = text.split("\n");
  const preview = lines.slice(0, 1).join(" ");
  const cut = showTruncated && preview.length > 90 ? preview.slice(0, 90) + "…" : showTruncated ? preview : text;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] px-3 py-1.5 rounded-lg relative"
        style={{
          background: isMine ? "#005C4B" : "#202C33",
          color: "white",
          borderBottomRightRadius: isMine ? 4 : 8,
          borderBottomLeftRadius: isMine ? 8 : 4,
        }}
      >
        <div className="text-[14.5px] leading-[1.35] whitespace-pre-wrap">
          {cut}
        </div>
        {showTruncated && (
          <button
            data-interactive
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
            className="block mt-1 text-[12px] font-medium"
            style={{ color: "#53BDEB" }}
          >
            ver más
          </button>
        )}
        <div className="text-[10px] text-white/60 text-right mt-0.5 leading-none">
          {hora}
        </div>
      </div>
    </div>
  );
}

function BurbujaAudio({
  from,
  hora,
  duracion,
  audioSrc,
}: {
  from: "cliente" | "pg";
  hora: string;
  duracion: string;
  audioSrc?: string;
}) {
  const isMine = from === "pg";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioSrc) return;
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className="px-3 py-2 rounded-lg flex items-center gap-3"
        style={{
          background: isMine ? "#005C4B" : "#202C33",
          color: "white",
          minWidth: 220,
          borderBottomLeftRadius: isMine ? 8 : 4,
          borderBottomRightRadius: isMine ? 4 : 8,
        }}
      >
        <button
          data-interactive
          onClick={toggle}
          className="w-9 h-9 rounded-full bg-white/12 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0"
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <Waveform playing={playing} progress={progress} />
        <span className="text-[11px] text-white/70 shrink-0">{duracion}</span>
        {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}
      </div>
    </div>
  );
}

function Waveform({ playing, progress }: { playing: boolean; progress: number }) {
  const BARS = 28;
  const HEIGHTS = [4, 9, 6, 14, 8, 12, 5, 16, 7, 11, 4, 13, 9, 6, 15, 8, 10, 5, 12, 7, 4, 14, 9, 11, 6, 8, 5, 13];
  return (
    <div className="flex items-center gap-[2px] h-5 flex-1">
      {Array.from({ length: BARS }).map((_, i) => {
        const h = HEIGHTS[i] ?? 6;
        const reached = i / BARS <= progress;
        return (
          <motion.div
            key={i}
            animate={
              playing
                ? { scaleY: [1, 1.25, 0.9, 1.1, 1] }
                : { scaleY: 1 }
            }
            transition={{
              duration: 0.7,
              repeat: playing ? Infinity : 0,
              delay: (i % 6) * 0.05,
              ease: "easeInOut",
            }}
            style={{
              width: 2,
              height: h,
              background: reached ? "#FFFFFF" : "rgba(255,255,255,0.35)",
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}

function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}
