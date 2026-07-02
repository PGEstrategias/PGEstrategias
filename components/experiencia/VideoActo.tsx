"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  sources: string[]; // 1 o más URLs — se reproducen en secuencia
  label?: string;
};

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
      // Rotar al siguiente video sin salir del acto
      setIdx((i) => i + 1);
      setEnded(false);
    } else {
      setEnded(true);
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      {hasSources ? (
        <video
          key={currentSrc}
          ref={videoRef}
          src={currentSrc}
          autoPlay
          playsInline
          muted={muted}
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 font-title text-2xl tracking-widest uppercase">
          <div className="text-center">
            <div className="mb-3 text-xs opacity-60">{label ?? "VIDEO"}</div>
            <div>· Pendiente de carga ·</div>
          </div>
        </div>
      )}

      {/* Contador discreto arriba a la izquierda cuando hay varios */}
      {sources.length > 1 && (
        <div className="absolute top-6 left-6 z-20 text-white/60 text-xs tracking-widest font-medium bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
          {idx + 1} / {sources.length}
        </div>
      )}

      {/* Botón audio */}
      <button
        data-interactive
        onClick={toggleAudio}
        aria-label={muted ? "Activar audio" : "Silenciar"}
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-black/55 border border-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-colors"
      >
        {muted ? <IconMuted /> : <IconAudio />}
      </button>

      {/* Indicador discreto de avance al terminar el último video */}
      <AnimatePresence>
        {ended && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70 text-sm tracking-widest uppercase"
          >
            Continuar →
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconMuted() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconAudio() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
