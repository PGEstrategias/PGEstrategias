"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WHATSAPP_MSG = "Hola, vengo desde su Linktree y me interesa saber más sobre PG Estrategias.";

const links = [
  {
    label: "YouTube",
    sub: "Casos de éxito y contenido",
    href: "https://www.youtube.com/@PGEstrategias-z2t",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8Z"
          fill="currentColor"
        />
        <path d="M9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" fill="#0D0D0D" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    sub: "@pg.estrategias",
    href: "https://www.instagram.com/pg.estrategias/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Nuestro trabajo",
    sub: "Mira nuestros proyectos",
    href: "https://www.pgestrategias.com/nuestrotrabajo",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="18" width="3.5" height="4" fill="currentColor" />
        <rect x="8" y="13" width="3.5" height="9" fill="currentColor" />
        <rect x="13.5" y="8" width="3.5" height="14" fill="currentColor" />
        <rect x="19" y="3" width="2.5" height="19" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    sub: "222 121 5051",
    href: `https://wa.me/522221215051?text=${encodeURIComponent(WHATSAPP_MSG)}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.5 3.5A11.8 11.8 0 0 0 2.1 17.7L.5 23.5l5.9-1.6a11.8 11.8 0 0 0 17.3-10.3 11.7 11.7 0 0 0-3.2-8.1Zm-8.6 18.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.5 1 .9-3.4-.2-.4a9.8 9.8 0 1 1 8.2 4.4Zm5.4-7.3c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5a.5.5 0 0 0 0-.5l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.6 14.6 0 0 0 5.6 4.9c.8.3 1.4.5 1.9.6a4.6 4.6 0 0 0 2.1.2 3.4 3.4 0 0 0 2.3-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.2-.3-.3-.6-.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

function Logo3D() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        initial={{ rotateY: -18, rotateX: 8 }}
        animate={{
          rotateY: [-18, -12, -18],
          rotateX: [8, 4, 8],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 30px 60px rgba(166,226,46,0.18))",
        }}
      >
        <svg
          width="560"
          height="560"
          viewBox="0 0 28 28"
          fill="none"
          className="opacity-[0.07] md:opacity-[0.09]"
        >
          <defs>
            <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D3FF6C" />
              <stop offset="100%" stopColor="#7AB81E" />
            </linearGradient>
            <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C3F558" />
              <stop offset="100%" stopColor="#6FA51A" />
            </linearGradient>
            <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B6EF45" />
              <stop offset="100%" stopColor="#638F15" />
            </linearGradient>
          </defs>
          <rect x="2" y="18" width="5" height="8" fill="url(#bar1)" />
          <rect x="9" y="12" width="5" height="14" fill="url(#bar2)" />
          <rect x="16" y="6" width="5" height="20" fill="url(#bar3)" />
          <rect x="23" y="2" width="3" height="24" fill="#A6E22E" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function LinktreeClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-16"
      style={{
        background:
          "radial-gradient(ellipse at top, #1a1f12 0%, #0D0D0D 45%, #050505 100%)",
      }}
    >
      {/* Capa de glow lime difuso */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(166,226,46,0.18) 0%, transparent 55%)",
        }}
      />

      {/* Rejilla sutil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Logo 3D animado de fondo */}
      <Logo3D />

      {/* Orbes flotantes */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(166,226,46,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(166,226,46,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo y nombre */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-10"
        >
          <div
            className="flex items-center gap-3 mb-3"
            style={{ perspective: "600px" }}
          >
            <motion.div
              animate={{ rotateY: [0, 8, 0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg width="36" height="36" viewBox="0 0 28 28" fill="none" className="text-pg-lime">
                <rect x="2" y="18" width="5" height="8" fill="currentColor" />
                <rect x="9" y="12" width="5" height="14" fill="currentColor" />
                <rect x="16" y="6" width="5" height="20" fill="currentColor" />
                <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
              </svg>
            </motion.div>
            <span
              className="font-title text-white text-[15px] tracking-[0.1em] uppercase leading-none"
              style={{ fontWeight: 700 }}
            >
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-[11px] tracking-[0.22em] uppercase text-white/50 text-center"
          >
            Growth Partners · CDMX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-title text-white text-center mt-4 px-4"
            style={{
              fontSize: "clamp(22px, 5vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}
          >
            Convertimos tu inversión
            <br />
            en <span className="text-pg-lime">clientes</span>.
          </motion.h1>
        </motion.div>

        {/* Lista de enlaces */}
        <div className="w-full flex flex-col gap-3.5">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.45 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
              className="group relative flex items-center gap-4 px-5 py-4 rounded-xl backdrop-blur-md border transition-all duration-500 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              {/* Hover sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(166,226,46,0.12), transparent)",
                }}
              />
              {/* Borde lime al hover */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(166,226,46,0.5), 0 10px 30px -10px rgba(166,226,46,0.35)",
                }}
              />

              <span
                className="relative flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 text-pg-lime transition-colors duration-500"
                style={{ background: "rgba(166,226,46,0.1)" }}
              >
                {link.icon}
              </span>

              <span className="relative flex flex-col flex-1 min-w-0">
                <span
                  className="font-title text-white text-[14px] tracking-[0.04em] leading-none"
                  style={{ fontWeight: 700 }}
                >
                  {link.label}
                </span>
                <span className="font-body text-[11px] text-white/45 mt-1 truncate">
                  {link.sub}
                </span>
              </span>

              <span className="relative text-white/30 group-hover:text-pg-lime group-hover:translate-x-1 transition-all duration-500 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <a
            href="https://www.pgestrategias.com"
            className="font-body text-[11px] tracking-[0.18em] uppercase text-white/40 hover:text-pg-lime transition-colors duration-500"
          >
            pgestrategias.com
          </a>
          <span className="font-body text-[10px] tracking-[0.14em] uppercase text-white/25">
            © {new Date().getFullYear()} PG Estrategias
          </span>
        </motion.div>
      </div>
    </main>
  );
}
