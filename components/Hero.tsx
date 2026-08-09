"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useContactMenu } from "@/context/ContactMenuContext";

const MSG_HERO =
  "Hola, me interesa hacer crecer mi negocio con PG Estrategias. ¿Podemos hablar?";

const stats = [
  { num: "10+", label: "Negocios activos", sub: "activamente creciendo" },
  { num: "3.8×", label: "Retorno promedio", sub: "por cada peso invertido" },
  { num: "14 días", label: "Tiempo al aire", sub: "de firma a campaña activa" },
];

const marqueeTerms = [
  "Growth Partners",
  "Pauta Digital",
  "Producción Audiovisual",
  "Landing Pages",
  "WhatsApp Business",
  "Marca Personal",
  "Meta Ads",
  "Google Ads",
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
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#E4E0DD" }}
    >
      {/* Textura sutil y halos de color */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "-10%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(214,58,39,0.16) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "5%",
          left: "-8%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(circle, rgba(167,159,153,0.28) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Rejilla suave */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,28,26,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(28,28,26,0.9) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Contenido — flex grow */}
      <motion.div
        style={{ y: textY }}
        className="relative z-[3] flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 px-8 md:px-14 pt-32 pb-16"
      >
        {/* Left column: text */}
        <div className="lg:col-span-7 w-full">
          {/* Eyebrow con línea */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="w-12 h-px block"
              style={{ background: "#D63A27" }}
            />
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              Growth Partners · Ciudad de Puebla
            </p>
          </motion.div>

          {/* Título con animación por línea */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-title"
              style={{
                fontSize: "clamp(46px, 7vw, 112px)",
                fontWeight: 700,
                lineHeight: 0.94,
                letterSpacing: "-0.035em",
                color: "#1C1C1A",
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
            className="font-body text-[11px] tracking-[0.18em] uppercase mb-10 max-w-[520px]"
            style={{ color: "rgba(28,28,26,0.55)" }}
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
              className="relative overflow-hidden group font-title font-bold px-8 py-4 text-[13px] tracking-wide transition-transform duration-500 hover:-translate-y-0.5"
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
              className="relative overflow-hidden group font-body px-8 py-4 text-[13px] tracking-wide transition-colors duration-500"
              style={{
                border: "1px solid rgba(28,28,26,0.3)",
                color: "#1C1C1A",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: "rgba(28,28,26,0.06)" }}
              />
              <span className="relative">Ver paquetes</span>
            </a>
          </motion.div>
        </div>

        {/* Right column: growth-bars decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="hidden lg:flex lg:col-span-5 items-end justify-center pr-4"
          aria-hidden
        >
          <div className="relative w-full max-w-[420px] h-[420px]">
            {/* Sello 30 días flotante */}
            <motion.div
              className="absolute top-4 right-4 flex flex-col items-center justify-center rounded-full"
              style={{
                width: 128,
                height: 128,
                border: "1px solid rgba(214,58,39,0.5)",
                background:
                  "radial-gradient(circle, rgba(214,58,39,0.12) 0%, transparent 70%)",
                zIndex: 4,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            >
              <p
                className="font-body text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "#D63A27" }}
              >
                Garantía
              </p>
              <p
                className="font-title leading-none my-1"
                style={{
                  fontSize: 46,
                  fontWeight: 800,
                  color: "#1C1C1A",
                  letterSpacing: "-0.04em",
                }}
              >
                30
              </p>
              <p
                className="font-body text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "rgba(28,28,26,0.55)" }}
              >
                Días
              </p>
            </motion.div>

            {/* Barras de crecimiento */}
            <div className="absolute inset-0 flex items-end justify-start gap-4 pl-2">
              {[
                { h: 34, delay: 0.1 },
                { h: 55, delay: 0.2 },
                { h: 72, delay: 0.3 },
                { h: 92, delay: 0.4, accent: true },
              ].map((bar, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.7 + bar.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex-1 origin-bottom"
                  style={{
                    height: `${bar.h}%`,
                    background: bar.accent
                      ? "#D63A27"
                      : "rgba(28,28,26,0.85)",
                  }}
                >
                  {/* Etiqueta del último bar */}
                  {bar.accent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <span
                        className="font-body text-[10px] tracking-[0.16em] uppercase"
                        style={{ color: "#D63A27" }}
                      >
                        +3.8×
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Línea horizontal base */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: "rgba(28,28,26,0.25)" }}
            />
            <div
              className="absolute bottom-0 left-0 h-px"
              style={{
                width: "100%",
                background:
                  "linear-gradient(to right, transparent, #D63A27, transparent)",
                opacity: 0.5,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollVisible ? 0.65 : 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-40 right-8 md:right-14 hidden md:flex flex-col items-center gap-3 z-[3]"
      >
        <span
          className="font-body text-[10px] tracking-[0.28em] uppercase"
          style={{ color: "rgba(28,28,26,0.6)", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 overflow-hidden relative"
          style={{ background: "rgba(28,28,26,0.15)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ background: "#D63A27" }}
            animate={{ height: ["0%", "100%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Marquee de servicios (banda oscura entre hero y stat strip) */}
      <div
        className="relative z-[4] overflow-hidden py-4"
        style={{
          background: "#1C1C1A",
          borderTop: "1px solid rgba(228,224,221,0.08)",
        }}
      >
        <div className="marquee-track flex whitespace-nowrap gap-14 will-change-transform">
          {[...marqueeTerms, ...marqueeTerms, ...marqueeTerms].map((term, i) => (
            <span
              key={i}
              className="flex items-center gap-14 font-title text-[16px] md:text-[18px] tracking-tight"
              style={{ color: "rgba(228,224,221,0.75)", fontWeight: 400 }}
            >
              {term}
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#D63A27" }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Stat strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-[4]"
        style={{
          background: "#1C1C1A",
        }}
      >
        <div className="flex max-w-[1300px] mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex-1 px-6 md:px-10 py-6 group cursor-default"
              style={{
                borderRight:
                  i < 2 ? "1px solid rgba(228,224,221,0.1)" : "none",
              }}
            >
              <p
                className="font-body text-[10px] uppercase tracking-[0.14em] mb-1.5 transition-colors duration-500 group-hover:text-[color:#D63A27]"
                style={{ color: "rgba(228,224,221,0.45)" }}
              >
                {s.label}
              </p>
              <p
                className="font-title font-bold text-[26px] md:text-[32px] leading-none"
                style={{ color: "#D63A27" }}
              >
                {s.num}
              </p>
              <p
                className="font-body text-[11px] mt-1.5"
                style={{ color: "rgba(228,224,221,0.5)" }}
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
