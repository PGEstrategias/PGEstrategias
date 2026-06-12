"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const LIME = "#A6E22E";
const LIME_DIM = "rgba(166,226,46,0.10)";
const LIME_SOFT = "rgba(166,226,46,0.06)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_DIM = "rgba(245,245,245,0.62)";
const TEXT_MUTED = "rgba(245,245,245,0.42)";

function Divider() {
  return (
    <div
      className="max-w-[1300px] mx-auto h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[11px] tracking-[0.14em] uppercase mb-6 flex items-center gap-3"
      style={{ color: LIME }}
    >
      <span className="inline-block w-8 h-px" style={{ background: LIME }} />
      {children}
    </p>
  );
}

function Logo3D() {
  return (
    <div
      aria-hidden
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
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        style={{
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 30px 60px rgba(166,226,46,0.18))",
        }}
      >
        <svg
          width="640"
          height="640"
          viewBox="0 0 28 28"
          fill="none"
          className="opacity-[0.07] md:opacity-[0.09]"
        >
          <defs>
            <linearGradient id="dbar1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D3FF6C" />
              <stop offset="100%" stopColor="#7AB81E" />
            </linearGradient>
            <linearGradient id="dbar2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C3F558" />
              <stop offset="100%" stopColor="#6FA51A" />
            </linearGradient>
            <linearGradient id="dbar3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B6EF45" />
              <stop offset="100%" stopColor="#638F15" />
            </linearGradient>
          </defs>
          <rect x="2" y="18" width="5" height="8" fill="url(#dbar1)" />
          <rect x="9" y="12" width="5" height="14" fill="url(#dbar2)" />
          <rect x="16" y="6" width="5" height="20" fill="url(#dbar3)" />
          <rect x="23" y="2" width="3" height="24" fill="#A6E22E" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}

const entregables = [
  {
    icon: "🪪",
    title: "Folletos y Tarjetas de Presentación",
    items: [
      "Diseño de tarjetas de presentación profesionales",
      "Folletos para propiedades y vehículos en venta",
      "Identidad visual coherente y lista para imprimir",
    ],
  },
  {
    icon: "🌐",
    title: "Página Web",
    items: [
      "Sitio web profesional para mostrar inventario",
      "Diseño optimizado para conversión",
      "Adaptado a celular y escritorio",
    ],
  },
  {
    icon: "🎬",
    title: "Contenido de Casas y Coches",
    items: [
      "Producción de contenido con el material proporcionado",
      "Edición y formato listo para redes y anuncios",
      "Piezas pensadas para destacar cada propiedad/vehículo",
    ],
  },
  {
    icon: "📱",
    title: "Redes Sociales y Web Optimizada",
    items: [
      "Gestión y optimización de perfiles sociales",
      "Web optimizada para velocidad y SEO local",
      "Presencia digital lista para recibir tráfico",
    ],
  },
];

const entregableFull = {
  icon: "📢",
  title: "Campañas de Google Ads y Meta Ads",
  items: [
    "Configuración y lanzamiento de campañas en ambas plataformas",
    "Segmentación enfocada en compradores de casas y autos",
    "Monitoreo y optimización durante los 30 días",
  ],
};

const timeline = [
  {
    icon: "📋",
    date: "Semana 1 — A partir del 12 de Junio",
    title: "Arranque y Recolección de Material",
    desc: "Iniciamos el proyecto, recibimos el material de casas y coches que proporcione Daniel, y comenzamos el diseño de identidad visual: folletos y tarjetas de presentación.",
  },
  {
    icon: "🌐",
    date: "Semana 2",
    title: "Construcción de la Página Web",
    desc: "Desarrollo de la página web optimizada, estructurada para mostrar el inventario de propiedades y vehículos de forma atractiva y funcional.",
  },
  {
    icon: "🎬",
    date: "Semana 3",
    title: "Producción de Contenido y Redes Sociales",
    desc: "Edición del material de casas y coches en piezas listas para redes y anuncios. Optimización de perfiles sociales para reflejar la nueva identidad.",
  },
  {
    icon: "🚀",
    date: "Semana 4 — Cierre 12 de Julio",
    title: "Lanzamiento de Campañas",
    desc: "Activación de campañas en Google Ads y Meta Ads, con seguimiento y primeros ajustes para maximizar resultados desde el día 1 de pauta activa.",
  },
];

const propiedades = [
  {
    icon: "🌐",
    title: "Página Web y Dominio",
    desc: "Su sitio y dominio son activos propios desde el primer día",
  },
  {
    icon: "📊",
    title: "Cuentas Publicitarias",
    desc: "Google Ads y Meta Ads configuradas a su nombre",
  },
  {
    icon: "🎨",
    title: "Material y Diseños",
    desc: "Folletos, tarjetas y piezas digitales son suyos una vez liquidado el mes",
  },
];

export default function BienvenidaDanielClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Gris metálico oscuro inspirado en la placa del logo,
  // con un halo verde sutil de PG Estrategias.
  const BG =
    "radial-gradient(ellipse at top, #2a2d2a 0%, #1a1c1a 35%, #111311 65%, #0a0b0a 100%)";

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(20,22,20,0.78)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: LIME }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span
              className="font-title text-white text-[13px] tracking-[0.1em] uppercase"
              style={{ fontWeight: 700 }}
            >
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Propuesta · Daniel
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{ color: LIME, background: LIME_DIM, fontWeight: 600 }}
            >
              ✦ Bienvenida
            </span>
          </div>
        </div>
      </nav>

      <main
        className="relative text-pg-white overflow-hidden"
        style={{ background: BG }}
      >
        {/* Logo 3D animado de fondo, visible a lo largo del hero */}
        <div className="absolute inset-x-0 top-0 h-[100vh] pointer-events-none">
          <Logo3D />
        </div>

        {/* Rejilla sutil */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center top, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center top, black 20%, transparent 70%)",
          }}
        />

        {/* Orbes verdes flotantes */}
        <motion.div
          aria-hidden
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(166,226,46,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-[20vh] -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(166,226,46,0.10) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-16 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[0.15em] uppercase mb-8 flex items-center gap-2"
                style={{ color: LIME }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: LIME, animation: "pulse 2s ease-in-out infinite" }}
                />
                Propuesta de Crecimiento Digital
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-title text-pg-light mb-8"
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Daniel, así
                <br />
                construiremos su
                <br />
                <em style={{ color: LIME, fontStyle: "italic" }}>
                  presencia digital.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[560px]"
                style={{ color: TEXT_DIM }}
              >
                Una propuesta a la medida para impulsar la venta de{" "}
                <span className="text-white font-medium">casas y autos</span> con
                una identidad visual sólida, presencia digital optimizada y
                campañas que generan resultados desde el primer mes.
              </motion.p>
            </div>

            {/* Dates panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
              style={{
                border: `1px solid ${BORDER}`,
                background: "rgba(20,22,20,0.55)",
                backdropFilter: "blur(10px)",
              }}
            >
              {[
                {
                  label: "Inicio del proyecto",
                  value: "12 Junio 2026",
                  sub: "Arranque de operaciones",
                  badge: { text: "📋 Día 1", color: "#a8c4d6", bg: "rgba(110,184,212,0.10)" },
                },
                {
                  label: "Duración del plan",
                  value: "30 Días",
                  sub: "Primer ciclo de implementación",
                  badge: { text: "🚀 Plan inicial", color: LIME, bg: LIME_DIM },
                },
                {
                  label: "Entrega de resultados",
                  value: "12 Julio 2026",
                  sub: "Revisión y siguientes pasos",
                  badge: null,
                },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="px-8 py-7 relative"
                  style={{
                    borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.14em] mb-1"
                    style={{ color: "rgba(245,245,245,0.32)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-title leading-none mb-1"
                    style={{ color: LIME, fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 400 }}
                  >
                    {item.value}
                  </p>
                  <p className="font-body text-[12px]" style={{ color: TEXT_MUTED }}>
                    {item.sub}
                  </p>
                  {item.badge && (
                    <span
                      className="absolute top-6 right-6 font-body text-[9px] uppercase tracking-[0.1em] px-2.5 py-1"
                      style={{ color: item.badge.color, background: item.badge.bg, fontWeight: 700 }}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ENTREGABLES */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Lo que Incluye</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Todo lo que vamos a
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>
              construir para usted.
            </em>
          </motion.h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: TEXT_DIM }}
          >
            Una propuesta integral que cubre desde lo físico hasta lo digital,
            pensada para potenciar la venta de casas y autos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {entregables.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative p-8 transition-colors duration-500 hover:bg-white/[0.04]"
                style={{
                  border: `1px solid ${BORDER}`,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  className="absolute top-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
                  style={{ background: LIME }}
                />
                <p className="text-2xl mb-4">{e.icon}</p>
                <h3
                  className="font-title text-white mb-4"
                  style={{
                    fontSize: "clamp(18px, 1.6vw, 22px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {e.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {e.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-[13px] leading-[1.6]"
                      style={{ color: TEXT_DIM }}
                    >
                      <span className="mt-[3px] shrink-0" style={{ color: LIME }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Tarjeta destacada ancho completo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: entregables.length * 0.07 }}
              className="group relative p-8 md:col-span-2 transition-colors duration-500 hover:bg-white/[0.04]"
              style={{
                border: `1px solid rgba(166,226,46,0.22)`,
                background:
                  "linear-gradient(120deg, rgba(166,226,46,0.05) 0%, rgba(255,255,255,0.02) 60%)",
              }}
            >
              <span
                className="absolute top-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
                style={{ background: LIME }}
              />
              <p className="text-2xl mb-4">{entregableFull.icon}</p>
              <h3
                className="font-title text-white mb-4"
                style={{
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {entregableFull.title}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
                {entregableFull.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-[13px] leading-[1.6]"
                    style={{ color: TEXT_DIM }}
                  >
                    <span className="mt-[3px] shrink-0" style={{ color: LIME }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* TIMELINE */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Plan de Trabajo</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Su proyecto en
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>30 días.</em>
          </motion.h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-16"
            style={{ color: TEXT_DIM }}
          >
            Un proceso claro y ordenado para llevar todo de cero a estar en marcha.
          </p>

          <div className="relative flex flex-col gap-0">
            <span
              className="absolute hidden md:block"
              style={{ left: 27, top: 0, bottom: 0, width: 1, background: BORDER }}
            />
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-8 pb-10 last:pb-0"
              >
                <div
                  className="relative z-10 shrink-0 w-14 h-14 flex items-center justify-center text-xl transition-colors duration-300"
                  style={{
                    border: `1px solid ${BORDER}`,
                    background: "rgba(20,22,20,0.85)",
                  }}
                >
                  {item.icon}
                </div>
                <div className="pt-3">
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.14em] font-semibold mb-2"
                    style={{ color: LIME }}
                  >
                    {item.date}
                  </p>
                  <h3
                    className="font-title text-white mb-2"
                    style={{
                      fontSize: "clamp(17px, 1.5vw, 21px)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body text-[13px] leading-[1.65]" style={{ color: TEXT_DIM }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PROPIEDAD */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Sus Activos</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Todo es <em style={{ color: LIME, fontStyle: "italic" }}>suyo.</em>
          </motion.h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: TEXT_DIM }}
          >
            Desde el primer día, todos los activos digitales generados son
            propiedad exclusiva de Daniel.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}
          >
            {propiedades.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="px-8 py-12 text-center"
                style={{
                  borderRight: i < propiedades.length - 1 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <p className="text-[28px] mb-5">{p.icon}</p>
                <p className="font-body text-[14px] font-semibold text-white mb-2">{p.title}</p>
                <p className="font-body text-[12px] leading-[1.6]" style={{ color: TEXT_MUTED }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* QUOTE */}
        <section className="relative px-6 md:px-16 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[820px] mx-auto text-center"
          >
            <p
              className="font-title leading-none mb-6"
              style={{ color: LIME, opacity: 0.22, fontSize: 72, fontWeight: 400 }}
            >
              &ldquo;
            </p>
            <p
              className="font-title italic text-pg-light mb-6"
              style={{
                fontSize: "clamp(20px, 2.4vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
              }}
            >
              Una presencia digital sólida convierte cada propiedad y cada auto
              en una oportunidad de venta.
            </p>
            <p
              className="font-body text-[12px] uppercase tracking-[0.14em]"
              style={{ color: "rgba(245,245,245,0.4)" }}
            >
              <span className="text-white font-semibold">PG Estrategias</span>{" "}
              &middot; Growth Partners
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[0.14em] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: LIME }}
            >
              <span className="inline-block w-8 h-px" style={{ background: LIME }} />
              PG Estrategias
              <span className="inline-block w-8 h-px" style={{ background: LIME }} />
            </p>
            <h2
              className="font-title text-pg-light mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Listos para{" "}
              <em style={{ color: LIME, fontStyle: "italic" }}>arrancar.</em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[520px] mx-auto mb-12"
              style={{ color: TEXT_DIM }}
            >
              Cualquier duda sobre la propuesta, estamos disponibles. El 12 de
              junio comienza el proyecto.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {[
                { icon: "📱", label: "+52 222 121 5051", href: "https://wa.me/5212221215051" },
                { icon: "✉️", label: "contacto@pgestrategias.com", href: "mailto:contacto@pgestrategias.com" },
                { icon: "🌐", label: "pgestrategias.com", href: "/" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                  style={{ color: "rgba(245,245,245,0.7)" }}
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center text-base"
                    style={{ background: LIME_SOFT, color: LIME }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
