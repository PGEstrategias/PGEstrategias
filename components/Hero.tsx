"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useContactMenu } from "@/context/ContactMenuContext";

const MSG_HERO =
  "Hola, me interesa hacer crecer mi negocio con PG Estrategias. ¿Podemos hablar?";

const HERO_VIDEO =
  "https://res.cloudinary.com/dieszqcrn/video/upload/v1778401407/magnific_subtle-idle-animation-cha_2954420067_qmtsp2.mp4";

const HERO_VIDEO_MOBILE =
  "https://res.cloudinary.com/dieszqcrn/video/upload/v1778431633/magnific_subtle-idle-animation-cha_2955966083_cgb5uq.mp4";

const stats = [
  { num: "10+", label: "Negocios activos", sub: "activamente creciendo" },
  { num: "3.8×", label: "Retorno promedio", sub: "por cada peso invertido" },
  { num: "14 días", label: "Tiempo al aire", sub: "de firma a campaña activa" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const { open: openContact } = useContactMenu();
  const [scrollVisible, setScrollVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setScrollVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden"
      style={{ background: "#1C1C1A" }}
    >
      {/* Video móvil — fondo completo en pantallas < md */}
      <video
        className="md:hidden absolute inset-0 w-full h-full object-cover z-[1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={HERO_VIDEO_MOBILE} type="video/mp4" />
      </video>

      {/* Video desktop — pegado a la derecha en md+ */}
      <video
        className="hidden md:block absolute top-0 right-0 h-full object-cover z-[1]"
        style={{ width: "65%" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Degradado móvil — oscurece todo para legibilidad del texto */}
      <div
        className="md:hidden absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(28,28,26,0.72) 0%, rgba(28,28,26,0.45) 50%, rgba(28,28,26,0.85) 100%)",
        }}
      />

      {/* Degradado desktop — negro→transparente de izquierda a derecha */}
      <div
        className="hidden md:block absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, #1C1C1A 28%, rgba(28,28,26,0.92) 45%, rgba(28,28,26,0.4) 65%, transparent 100%)",
        }}
      />

      {/* Halo rojo suave detrás del texto */}
      <motion.div
        aria-hidden
        className="absolute z-[2] pointer-events-none"
        style={{
          left: "-10%",
          top: "10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(214,58,39,0.14) 0%, transparent 55%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, -12, 0],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Fade inferior para el stat strip */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{
          height: "140px",
          background:
            "linear-gradient(to top, #1C1C1A 55%, transparent 100%)",
        }}
      />

      {/* Contenido — izquierda */}
      <motion.div
        style={{ y: textY }}
        className="relative z-[3] h-full flex flex-col justify-center px-8 md:px-16 pt-16 pb-28"
      >
        <div className="w-full max-w-[620px]">
          {/* Eyebrow con línea */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="w-10 h-px block"
              style={{ background: "#D63A27" }}
            />
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase"
              style={{ color: "#D63A27" }}
            >
              Growth Partners · Ciudad de Puebla
            </p>
          </motion.div>

          {/* Título con animación por línea */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-title"
              style={{
                fontSize: "clamp(40px, 5.2vw, 84px)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              Convertimos tu
              <br />
              inversión en{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                clientes.
              </em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="font-body text-[11px] tracking-[0.16em] uppercase mb-10"
            style={{ color: "rgba(228,224,221,0.42)" }}
          >
            El primer mes lanzamos · el segundo optimizamos · el tercero
            triplicamos lo invertido
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => openContact(MSG_HERO)}
              className="relative overflow-hidden group font-title font-bold px-8 py-3.5 text-[13px] tracking-wide transition-transform duration-500 hover:-translate-y-0.5"
              style={{ background: "#D63A27", color: "#E4E0DD" }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: "#1C1C1A" }}
              />
              <span className="relative flex items-center gap-2">
                Quiero crecer
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path
                    d="M1 5H13M13 5L9 1M13 5L9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </button>
            <a
              href="#paquetes"
              className="relative overflow-hidden group font-body px-8 py-3.5 text-[13px] tracking-wide transition-colors duration-500"
              style={{
                border: "1px solid rgba(228,224,221,0.35)",
                color: "#E4E0DD",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: "rgba(228,224,221,0.08)" }}
              />
              <span className="relative">Ver paquetes</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollVisible ? 0.5 : 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-28 right-10 flex flex-col items-center gap-3 z-[3]"
      >
        <span
          className="font-body text-[10px] tracking-[0.24em] uppercase"
          style={{ color: "#E4E0DD", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 overflow-hidden relative"
          style={{ background: "rgba(228,224,221,0.2)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ background: "#D63A27" }}
            animate={{ height: ["0%", "100%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Stat strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 z-[4]"
        style={{
          borderTop: "1px solid rgba(228,224,221,0.08)",
          background: "#1C1C1A",
        }}
      >
        <div className="flex max-w-[1300px] mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex-1 px-6 md:px-10 py-5 group cursor-default"
              style={{
                borderRight:
                  i < 2 ? "1px solid rgba(228,224,221,0.08)" : "none",
              }}
            >
              <p
                className="font-body text-[10px] uppercase tracking-[0.14em] mb-1 transition-colors duration-500 group-hover:text-[color:#D63A27]"
                style={{ color: "rgba(228,224,221,0.4)" }}
              >
                {s.label}
              </p>
              <p
                className="font-title font-bold text-[22px] md:text-[28px] leading-none"
                style={{ color: "#D63A27" }}
              >
                {s.num}
              </p>
              <p
                className="font-body text-[11px] mt-1"
                style={{ color: "rgba(228,224,221,0.45)" }}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
