"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PELICULAS, REEL_DRIVE_ID, cld, poster } from "./data";

function Play({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.4-6.86a.5.5 0 0 0 0-.84L8.77 4.72a.5.5 0 0 0-.77.42z" />
    </svg>
  );
}

/* Demo reel (Drive) con fachada: el iframe se carga solo al tocar play. Los
   reels verticales muestran poster y abren el video con sonido en modal. */
export default function Peliculas() {
  const [reel, setReel] = useState(false);
  const [abierto, setAbierto] = useState<number | null>(null);
  const activo = abierto === null ? null : PELICULAS[abierto];

  useEffect(() => {
    if (abierto === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <section id="peliculas" className="bodas-dark relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900, background: "radial-gradient(circle, rgba(210,174,109,0.12), transparent 65%)", filter: "blur(40px)" }}
      />
      <div className="bodas-container relative">
        <div className="text-center mb-14">
          <p className="bodas-label mb-5">Nuestras películas</p>
          <h2 className="bodas-title">
            Míralo con tus <span className="bodas-em">propios ojos</span>
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            Antes de hablar de paquetes, lo que importa: celebraciones reales que ya filmamos.
          </p>
        </div>

        <motion.div
          className="bodas-frame relative mx-auto max-w-5xl aspect-video bg-black"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {reel ? (
            <iframe
              src={`https://drive.google.com/file/d/${REEL_DRIVE_ID}/preview`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Demo reel de PG Event Films"
            />
          ) : (
            <button
              type="button"
              onClick={() => setReel(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-5"
              aria-label="Reproducir demo reel"
              style={{ background: "radial-gradient(circle at center, #2a231d 0%, #14110F 70%)" }}
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full pl-1 transition-transform duration-500 group-hover:scale-110" style={{ background: "#D2AE6D", color: "#14110F", boxShadow: "0 0 0 10px rgba(210,174,109,0.15), 0 0 60px rgba(210,174,109,0.35)" }}>
                <Play size={28} />
              </span>
              <span className="bodas-heading italic text-3xl md:text-4xl">Demo reel</span>
              <span className="bodas-label">Así se vive un evento con nosotros</span>
            </button>
          )}
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {PELICULAS.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <button
                type="button"
                onClick={() => setAbierto(i)}
                aria-label={`Reproducir ${p.titulo}`}
                className="group relative block w-full overflow-hidden rounded-[24px] bg-black aspect-[9/16] border border-white/10 hover:border-[#D2AE6D]/50 transition-colors duration-500"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={poster(p.src, "so_1,c_fill,ar_9:16,w_640,f_auto,q_auto")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full pl-1 text-white backdrop-blur-sm border border-white/40 bg-black/30 transition duration-500 group-hover:scale-110 group-hover:bg-[#D2AE6D] group-hover:text-[#14110F] group-hover:border-transparent">
                    <Play />
                  </span>
                </span>
                <span className="absolute left-5 bottom-5 right-5 text-left">
                  <span className="bodas-heading block text-2xl text-white">{p.titulo}</span>
                  <span className="font-body block text-[13px] mt-1" style={{ color: "rgba(247,242,234,0.7)" }}>{p.texto}</span>
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(10,8,7,0.94)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbierto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activo.titulo}
          >
            <button type="button" onClick={() => setAbierto(null)} aria-label="Cerrar video" className="absolute right-5 top-5 h-12 w-12 rounded-full border border-white/30 text-2xl text-white/80 hover:text-white">
              ×
            </button>
            <motion.video
              key={activo.src}
              controls
              autoPlay
              playsInline
              poster={poster(activo.src)}
              className="max-h-[88vh] w-auto max-w-full rounded-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <source src={cld(activo.src, "c_limit,w_1080,q_auto,vc_h264")} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
