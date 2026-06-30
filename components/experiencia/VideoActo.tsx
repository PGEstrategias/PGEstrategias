"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  src?: string; // URL pública (mp4 o m3u8). Si no se pasa, muestra placeholder.
  poster?: string;
  label?: string; // etiqueta opcional para identificar (debug / accesibilidad)
  onEnded?: () => void;
};

export default function VideoActo({ src, poster, label, onEnded }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setEnded(false);
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (src) {
      v.play().catch(() => {});
    }
  }, [src, muted]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          playsInline
          muted={muted}
          onEnded={() => {
            setEnded(true);
            onEnded?.();
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Placeholder mientras no haya video real
        <div className="absolute inset-0 flex items-center justify-center text-white/40 font-title text-2xl tracking-widest uppercase">
          <div className="text-center">
            <div className="mb-3 text-xs opacity-60">{label ?? "VIDEO"}</div>
            <div>· Pendiente de carga ·</div>
          </div>
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

      {/* Indicador discreto de avance al terminar */}
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
