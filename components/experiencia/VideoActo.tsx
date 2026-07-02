"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  sources: string[];
  label?: string;
};

// Los videos son verticales (9:16). Se muestran en su relación original,
// centrados, a tamaño intermedio — ni fullscreen ni miniatura.
// Los reels se rotan en secuencia dentro del mismo acto.

export default function VideoActo({ sources, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [idx, setIdx] = useState(0);
  const [ended, setEnded] = useState(false);

  const hasSources = sources.length > 0;
  const currentSrc = hasSources ? sources[idx % sources.length] : undefined;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !currentSrc) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [currentSrc, muted]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  const handleEnded = () => {
    if (sources.length > 1 && idx < sources.length - 1) {
      setIdx((i) => i + 1);
      setEnded(false);
    } else {
      setEnded(true);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Contenedor 9:16 — vertical, ocupa la altura útil del viewport */}
      <div
        className="relative"
        style={{
          height: "min(98vh, 1200px)",
          aspectRatio: "9 / 16",
          maxWidth: "96vw",
        }}
      >
        {hasSources ? (
          <video
            key={currentSrc}
            ref={videoRef}
            src={currentSrc}
            autoPlay
            playsInline
            muted={muted}
            onEnded={handleEnded}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 font-title text-lg tracking-widest uppercase rounded-lg border border-white/10">
            <div className="text-center">
              <div className="mb-2 text-xs opacity-60">{label ?? "VIDEO"}</div>
              <div>· Pendiente ·</div>
            </div>
          </div>
        )}

        {/* Contador dentro del contenedor del video */}
        {sources.length > 1 && (
          <div className="absolute top-3 left-3 text-white/85 text-[10px] tracking-widest font-medium bg-black/50 backdrop-blur px-2 py-0.5 rounded-full">
            {idx + 1} / {sources.length}
          </div>
        )}

        {/* Botón audio */}
        <button
          data-interactive
          onClick={toggleAudio}
          aria-label={muted ? "Activar audio" : "Silenciar"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 border border-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        >
          {muted ? <IconMuted /> : <IconAudio />}
        </button>

        {/* Indicador discreto de avance */}
        <AnimatePresence>
          {ended && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase"
            >
              Continuar →
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IconMuted() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconAudio() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
