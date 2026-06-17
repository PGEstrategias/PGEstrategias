"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const LIME = "#A6E22E";
const LIME_DIM = "rgba(166,226,46,0.08)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_DIM = "rgba(245,245,245,0.55)";
const TEXT_MUTED = "rgba(245,245,245,0.38)";

function Divider() {
  return (
    <div
      className="max-w-[1300px] mx-auto h-px"
      style={{
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
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

const contrato = [
  { label: "Paquete contratado", value: "Tier 1 — Ignición 🔥" },
  { label: "Inversión mensual", value: "$5,000 MXN + IVA" },
  { label: "Vigencia mínima", value: "3 meses (trimestre)" },
  { label: "Renovación", value: "Automática mes a mes" },
];

const entregables = [
  {
    icon: "🎬",
    title: "Producción Audiovisual",
    items: [
      "1 video principal para landing page (60 seg)",
      "3 videos cortos para Meta Ads",
      "5 Reels educativos para redes sociales",
      "3 artes gráficas + 3 carruseles",
    ],
  },
  {
    icon: "🌐",
    title: "Ecosistema Digital",
    items: [
      "Landing page de conversión desde cero",
      "Optimización de Google Business Profile",
      "SEO local para mayor visibilidad",
      "Configuración de píxeles y tracking",
    ],
  },
];

const fases = [
  {
    num: "01",
    name: "Extracción y CRM",
    days: "Días 1–3",
    tareas: [
      { day: "Día 1", text: "Toma de control de activos digitales", sub: "Accesos, cuentas y activos asegurados", highlight: true },
      { day: "Día 1", text: "Página de bienvenida personalizada", sub: "Esta misma página que está leyendo", highlight: false },
      { day: "Día 1–2", text: "Regalo de bienvenida al cliente", sub: "", highlight: false },
    ],
  },
  {
    num: "02",
    name: "Construcción",
    days: "Días 4–13",
    tareas: [
      { day: "Día 4", text: "🎬 Sesión intensiva de grabación", sub: "Video landing (60s) · 3 videos para Meta · 5 Reels educativos", highlight: true },
      { day: "Día 5–8", text: "Creación de identidad de marca", sub: "Logo, paleta de colores y perfiles sociales unificados", highlight: false },
      { day: "Día 6–9", text: "Construcción de landing page", sub: "Página de conversión desde cero", highlight: false },
      { day: "Día 10–11", text: "Post-producción y saneamiento de contenido", sub: 'Carrusel "Sobre el Dr. Grageda" · Assets visuales', highlight: false },
      { day: "Día 12", text: "Configuración de Google Business Profile", sub: "Optimización SEO local", highlight: false },
      { day: "Día 13", text: "Configuración de píxeles y tracking", sub: "Meta Pixel · Google Analytics · Eventos de conversión", highlight: false },
    ],
  },
  {
    num: "03",
    name: "Lanzamiento",
    days: "Día 14",
    tareas: [
      { day: "Día 14", text: "🚀 GO LIVE — Activación completa del ecosistema", sub: "Landing en vivo · Meta Ads activo · Google Ads listo · Contenido orgánico programado", highlight: true },
    ],
  },
  {
    num: "04",
    name: "Optimización",
    days: "Días 15–27",
    tareas: [
      { day: "Día 15–16", text: "Primera revisión de métricas", sub: "", highlight: false },
      { day: "Día 16–17", text: "Mensaje de check-in post-lanzamiento", sub: "", highlight: false },
      { day: "Día 17–18", text: "Optimización inicial de campañas", sub: "", highlight: false },
      { day: "Día 19–21", text: "Soporte orgánico", sub: "", highlight: false },
      { day: "Día 22–25", text: "Escalado de campañas", sub: "", highlight: false },
      { day: "Día 26–27", text: "Segunda revisión de métricas y ajustes", sub: "", highlight: false },
    ],
  },
  {
    num: "05",
    name: "Renovación",
    days: "Días 28–30",
    tareas: [
      { day: "Día 28", text: "Reunión de resultados", sub: "Seguimiento humano y revisión del mes", highlight: false },
      { day: "Día 29", text: "Presentación de reporte de resultados", sub: "", highlight: false },
      { day: "Día 30", text: "🎯 Renovación de contrato", sub: "14 de junio 2026", highlight: true },
    ],
  },
];

const propiedades = [
  {
    icon: "🌐",
    title: "Dominio y Landing Page",
    desc: "Su sitio web y dominio son activos propios desde el primer día",
  },
  {
    icon: "📊",
    title: "Perfiles y Cuentas",
    desc: "Google Business, redes sociales y píxeles de tracking 100% suyos",
  },
  {
    icon: "🎬",
    title: "Piezas Creativas",
    desc: "Videos, reels y artes son suyos una vez liquidado el mes correspondiente",
  },
];

export default function DrGragedaClient() {
  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(13,13,13,0.85)",
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
            <span className="font-title text-white text-[13px] tracking-[0.1em] uppercase" style={{ fontWeight: 700 }}>
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Dr. Edgar Grageda
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{ color: LIME, background: LIME_DIM, fontWeight: 600 }}
            >
              ✦ Nuevo Cliente
            </span>
          </div>
        </div>
      </nav>

      <main className="bg-pg-black text-pg-white">

        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-16 pt-32 pb-24 md:pt-40 md:pb-32">
          <div
            className="pointer-events-none absolute"
            style={{
              top: "-30%", right: "-15%",
              width: 700, height: 700,
              background: "radial-gradient(circle, rgba(166,226,46,0.10) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%", left: "-10%",
              width: 500, height: 500,
              background: "radial-gradient(circle, rgba(110,184,212,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[0.15em] uppercase mb-8 flex items-center gap-2"
                style={{ color: LIME }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: LIME, animation: "pulse 2s ease-in-out infinite" }}
                />
                Bienvenida Oficial · Mayo 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-title text-pg-light mb-8"
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Dr. Grageda,
                <br />
                bienvenido a su
                <br />
                <em style={{ color: LIME, fontStyle: "italic" }}>ecosistema digital.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[540px]"
                style={{ color: TEXT_DIM }}
              >
                Estamos emocionados de arrancar esta alianza. En los próximos{" "}
                <span className="text-white font-medium">30 días</span> construiremos desde
                cero el sistema digital que llevará su consultorio al siguiente nivel.
              </motion.p>
            </div>

            {/* Dates panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
              style={{ border: `1px solid ${BORDER}` }}
            >
              {[
                {
                  label: "Inicio del proyecto",
                  value: "16 Mayo 2026",
                  sub: "Onboarding y toma de activos",
                  badge: { text: "📋 Día 1", color: "rgba(110,184,212,0.9)", bg: "rgba(110,184,212,0.10)" },
                },
                {
                  label: "Sesión de grabación",
                  value: "19 Mayo 2026",
                  sub: "Producción audiovisual intensiva",
                  badge: { text: "🎬 Día 4", color: "rgba(110,184,212,0.9)", bg: "rgba(110,184,212,0.10)" },
                },
                {
                  label: "Go Live",
                  value: "29 Mayo 2026",
                  sub: "Activación completa del ecosistema",
                  badge: { text: "🚀 Día 14", color: LIME, bg: LIME_DIM },
                },
                {
                  label: "Renovación",
                  value: "14 Junio 2026",
                  sub: "Presentación de resultados",
                  badge: { text: "🎯 Día 30", color: "#c97a6e", bg: "rgba(201,122,110,0.10)" },
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
                    style={{ color: "rgba(245,245,245,0.3)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-title leading-none mb-1"
                    style={{ color: LIME, fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 400 }}
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

        {/* ACUERDO */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Acuerdo</SectionLabel>
            <h2
              className="font-title text-pg-light mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              Lo que acordamos
              <br />
              <em style={{ color: LIME, fontStyle: "italic" }}>juntos.</em>
            </h2>
            <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
              Un resumen claro de los términos de nuestra alianza bajo el paquete Tier 1: Ignición.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ border: `1px solid ${BORDER}` }}
          >
            {contrato.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="px-8 py-8"
                style={{
                  borderRight: i % 2 === 0 ? `1px solid ${BORDER}` : "none",
                  borderBottom: i < 2 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <p
                  className="font-body text-[10px] uppercase tracking-[0.14em] mb-2"
                  style={{ color: "rgba(245,245,245,0.3)" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-body text-[16px] font-semibold text-white"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ENTREGABLES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Entregables Mensuales</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Todo lo que vamos a
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>construir.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Los entregables incluidos en su paquete, diseñados para establecer y profesionalizar su presencia digital.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {entregables.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative p-8 transition-colors duration-500 hover:bg-white/[0.03]"
                style={{
                  border: `1px solid ${BORDER}`,
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <span
                  className="absolute top-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
                  style={{ background: LIME }}
                />
                <p className="text-2xl mb-4">{e.icon}</p>
                <h3
                  className="font-title text-white mb-4"
                  style={{ fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {e.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-[13px] leading-[1.6]" style={{ color: TEXT_DIM }}>
                      <span className="mt-[3px] shrink-0" style={{ color: LIME }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PLAN 30 DÍAS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Plan de Trabajo</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Su proyecto en
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>30 días.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-16" style={{ color: TEXT_DIM }}>
            Un roadmap claro con cada tarea, fecha y responsable. Transparencia total en cada paso del proceso.
          </p>

          <div className="flex flex-col gap-10">
            {fases.map((fase, fi) => (
              <motion.div
                key={fase.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: fi * 0.06 }}
              >
                {/* Fase header */}
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="font-title italic leading-none shrink-0"
                    style={{ color: LIME, fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}
                  >
                    {fase.num}
                  </span>
                  <span
                    className="font-body text-[11px] uppercase tracking-[0.14em] font-semibold"
                    style={{ color: TEXT_DIM }}
                  >
                    {fase.name}
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: BORDER }}
                  />
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.1em] px-3 py-1 shrink-0"
                    style={{ color: TEXT_MUTED, border: `1px solid ${BORDER}` }}
                  >
                    {fase.days}
                  </span>
                </div>

                {/* Tareas */}
                <div className="flex flex-col gap-1.5">
                  {fase.tareas.map((tarea) => (
                    <div
                      key={tarea.day + tarea.text}
                      className="flex items-start gap-5 px-5 py-4 transition-colors duration-300 hover:bg-white/[0.03]"
                      style={{
                        border: tarea.highlight
                          ? "1px solid rgba(166,226,46,0.22)"
                          : `1px solid ${BORDER}`,
                        background: tarea.highlight
                          ? "rgba(166,226,46,0.03)"
                          : "rgba(255,255,255,0.012)",
                      }}
                    >
                      <span
                        className="font-body text-[10px] uppercase tracking-[0.12em] font-bold shrink-0 mt-0.5 min-w-[52px]"
                        style={{ color: LIME }}
                      >
                        {tarea.day}
                      </span>
                      <div className="flex-1">
                        <p className="font-body text-[13px] text-white leading-[1.5]">{tarea.text}</p>
                        {tarea.sub && (
                          <p className="font-body text-[12px] mt-0.5" style={{ color: TEXT_MUTED }}>
                            {tarea.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* GARANTÍA */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Compromiso</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Nuestra{" "}
            <em style={{ color: LIME, fontStyle: "italic" }}>garantía.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Trabajamos con una promesa clara de desempeño.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-start p-10 md:p-14"
            style={{
              border: "1px solid rgba(166,226,46,0.18)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <div
              className="pointer-events-none absolute"
              style={{
                top: "-60%", right: "-15%",
                width: 500, height: 500,
                background: "radial-gradient(circle, rgba(166,226,46,0.07) 0%, transparent 70%)",
              }}
            />
            <p className="text-[52px] leading-none">🛡️</p>
            <div className="relative">
              <p
                className="font-title italic mb-4"
                style={{ color: LIME, fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                Garantía de Desempeño
              </p>
              <p className="font-body text-[14px] leading-[1.8]" style={{ color: TEXT_DIM }}>
                Si al finalizar el primer trimestre las métricas clave no muestran una evolución
                positiva por causas atribuibles directamente a nuestra agencia, nos comprometemos
                a otorgar{" "}
                <span className="text-white font-medium">
                  un mes adicional de servicios sin costo de honorarios
                </span>{" "}
                para realizar todos los ajustes necesarios.
                <br /><br />
                Porque nuestro crecimiento depende del suyo.
              </p>
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* PROPIEDAD */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Sus Activos</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Todo es{" "}
            <em style={{ color: LIME, fontStyle: "italic" }}>suyo.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Desde el día 1, todos los activos digitales generados son propiedad exclusiva del Dr. Grageda.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: `1px solid ${BORDER}` }}
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
        <section className="px-6 md:px-16 py-24 md:py-28">
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
              style={{ fontSize: "clamp(20px, 2.4vw, 30px)", fontWeight: 400, lineHeight: 1.45, letterSpacing: "-0.01em" }}
            >
              En 30 días su consultorio tendrá la presencia digital que sus pacientes merecen encontrar.
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
              width: 600, height: 600,
              background: "radial-gradient(circle, rgba(166,226,46,0.09) 0%, transparent 65%)",
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
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              Listos para
              <br />
              <em style={{ color: LIME, fontStyle: "italic" }}>arrancar.</em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[520px] mx-auto mb-12"
              style={{ color: TEXT_DIM }}
            >
              Cualquier duda antes del lanzamiento, estamos disponibles. El 29 de mayo empieza el despegue.
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
                  style={{ color: "rgba(245,245,245,0.65)" }}
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center text-base"
                    style={{ background: LIME_DIM, color: LIME }}
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
