"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonios = [
  {
    id: 1,
    video: "https://res.cloudinary.com/dieszqcrn/video/upload/v1778399000/DrManuelPGTestimonio_ar6neh.mp4",
    thumbnail: "https://res.cloudinary.com/dieszqcrn/image/upload/v1778399766/3e0ed3ac-bcb5-493c-80c9-f505a37a38e3_uqfo1h.png",
    thumbnailV: "https://res.cloudinary.com/dieszqcrn/image/upload/v1778400341/ChatGPT_Image_10_may_2026_02_05_25_a.m_tgohn3.png",
    quote: "Sé que ustedes son un negocio confiable, en el que les interesa que sus clientes crezcan para que ustedes también crezcan.",
    nombre: "Dr. Manuel",
    industria: "Proctología · Puebla",
  },
  {
    id: 2,
    video: "https://res.cloudinary.com/dieszqcrn/video/upload/v1778398752/ExHaciendaPGTestimonio_ut7ja4.mp4",
    thumbnail: "https://res.cloudinary.com/dieszqcrn/image/upload/v1778399817/ChatGPT_Image_10_may_2026_01_56_51_a.m_onxhrw.png",
    thumbnailV: "https://res.cloudinary.com/dieszqcrn/image/upload/v1778400307/ChatGPT_Image_10_may_2026_02_04_57_a.m_gdkjn9.png",
    quote: "Hemos triplicado el número de contratos firmados.",
    nombre: "Ex Hacienda de San Bartolo",
    industria: "Bienes Raíces · Puebla",
  },
  {
    id: 3,
    video: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779761319/Testimonio_Manuel_gm9pnz.mp4",
    thumbnail: "https://res.cloudinary.com/djduba5fd/image/upload/q_auto/f_auto/v1779761378/ChatGPT_Image_25_may_2026_08_09_30_p.m_d7citi.png",
    thumbnailV: "https://res.cloudinary.com/djduba5fd/image/upload/q_auto/f_auto/v1779761346/ChatGPT_Image_15_may_2026_01_28_48_p.m_1_n6ddjd.png",
    quote: "Una fotografía no puede enseñar lo que un sistema audiovisual estratégico sí…",
    nombre: "Cubiertas y Herrajes",
    industria: "Industria · Puebla",
  },
];

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.96)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-body text-[11px] tracking-[0.16em] uppercase transition-colors duration-500"
          style={{ color: "rgba(255,255,255,0.4)" }}
          aria-label="Cerrar video"
        >
          Cerrar ×
        </button>
        <video
          src={src}
          autoPlay
          controls
          playsInline
          className="w-full"
          style={{ maxHeight: "80vh", objectFit: "contain" }}
        />
      </motion.div>
    </motion.div>
  );
}

function TestimonioCard({ t, index }: { t: typeof testimonios[0]; index: number }) {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex flex-col"
      >
        {/* Thumbnail — no card bg, sits directly on section bg */}
        <div
          className="relative cursor-pointer group overflow-hidden"
          style={{ aspectRatio: "9/16", maxHeight: "520px" }}
          onClick={() => setShowModal(true)}
        >
          {/* Horizontal thumbnail — desktop */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden md:block"
            style={{ backgroundImage: `url(${t.thumbnail})`, backgroundColor: "#1a1a1a" }}
          />
          {/* Vertical thumbnail — móvil */}
          <div
            className="absolute inset-0 bg-cover bg-center block md:hidden"
            style={{ backgroundImage: `url(${t.thumbnailV})`, backgroundColor: "#1a1a1a" }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: "rgba(0,0,0,0.35)" }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0,0,0,0.12)" }} />

          {/* Play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-105"
              style={{ borderColor: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)" }}
              aria-label={`Reproducir testimonio de ${t.nombre}`}
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="pt-5 pb-2" style={{ borderTop: "1px solid rgba(13,13,13,0.1)" }}>
          <p
            className="font-body text-[16px] leading-relaxed mb-3 italic"
            style={{ color: "rgba(13,13,13,0.8)" }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="font-body text-[12px] tracking-wide" style={{ color: "rgba(13,13,13,0.38)" }}>
            {t.nombre} · {t.industria}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <VideoModal src={t.video} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Testimonios() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="py-40" style={{ background: "#F5F5F5" }}>
      <div className="max-w-[1300px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div ref={headRef} className="mb-20" style={{ borderTop: "1px solid rgba(13,13,13,0.12)" }}>
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={headInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="font-body text-[11px] uppercase tracking-[var(--ls-label)] mb-6"
                style={{ color: "rgba(13,13,13,0.4)" }}
              >
                Lo que dicen nuestros clientes
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-title text-pg-black"
                style={{
                  fontSize: "var(--t-h2)",
                  fontWeight: 400,
                  lineHeight: "var(--lh-h2)",
                  letterSpacing: "var(--ls-h2)",
                }}
              >
                Resultados reales,
                <br />
                en sus propias palabras.
              </motion.h2>
            </div>

          </div>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {testimonios.map((t, i) => (
            <TestimonioCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
