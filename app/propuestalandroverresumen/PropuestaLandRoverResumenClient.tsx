"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta — Land Rover Puebla × PG Estrategias · VERSIÓN RESUMEN.

   Corte sintetizado de la propuesta completa: hero, entregables,
   adaptación al ciclo de aprobación + demo, muestras e inversión.
   Mismo sistema visual de PG.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Land Rover Puebla";
const PRECIO = "15,000";

const HERO_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785888616/WhatsApp_Video_2026-08-04_at_4.27.42_PM_vcpnm7.mp4";

const LANDROVER_DEMO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4";

const MUESTRAS = [
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082394/ZenithMustangBlackHorse_ld8o8z.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612470/Challenger_vur6pe.mp4",
];

/* Inserta transformaciones de Cloudinary (formato/calidad automáticos y un
   ancho máximo) para que los videos —que pesan decenas de MB en su versión
   original— se sirvan ligeros y reproduzcan en cualquier navegador. */
function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/* Entregables mensuales, en una línea cada uno. */
const incluye = [
  { title: "8 reels mensuales", desc: "Oferta comercial, recaps de eventos y promociones atemporales, con narrativa estilo cine que engancha." },
  { title: "100 fotografías", desc: "Para posts, carruseles y artes en redes sociales." },
  { title: "WhatsApp Bot optimizado", desc: "Respuesta inmediata y calificación de tus leads." },
  { title: "Perfil de Google optimizado", desc: "Con estrategia de reseñas para búsquedas locales." },
  { title: "Reunión presencial quincenal", desc: "En tu sucursal: calendario, prioridades y siguiente ola de contenido." },
  { title: "Consultoría mensual + reporte quincenal", desc: "Seguimiento claro y ajustes con datos." },
];

/* ── UI ─────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
      <p
        className="font-body text-[11px] tracking-[0.22em] uppercase"
        style={{ color: "#D63A27", fontWeight: 500 }}
      >
        {children}
      </p>
    </div>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-title mb-7 ${className}`}
      style={{
        fontSize: "clamp(30px, 3.8vw, 52px)",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "#E4E0DD",
      }}
    >
      {children}
    </h2>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PropuestaLandRoverResumenClient() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(28,28,26,0.88)" : "rgba(28,28,26,0.3)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(228,224,221,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-14 h-16 max-w-[1400px] mx-auto">
          <Logo size={24} tone="cream" />
          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.16em] uppercase"
              style={{ color: "rgba(228,224,221,0.45)" }}
            >
              Propuesta · {CLIENTE}
            </span>
            <span
              className="font-body text-[10px] tracking-[0.16em] uppercase px-3 py-1.5"
              style={{
                color: "#D63A27",
                background: "rgba(214,58,39,0.1)",
                border: "1px solid rgba(214,58,39,0.25)",
                fontWeight: 600,
              }}
            >
              Confidencial
            </span>
          </div>
        </div>
      </nav>

      <main style={{ background: "#1C1C1A", color: "#E4E0DD" }}>
        {/* ============================================================
            1 · HERO
           ============================================================ */}
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src={cld(HERO_VIDEO, "f_auto,q_auto,w_1280")} type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,28,26,0.5) 0%, rgba(28,28,26,0.3) 45%, rgba(28,28,26,0.94) 100%)",
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-16 md:pb-20 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-px block" style={{ background: "#D63A27" }} />
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "#E4E0DD", fontWeight: 500 }}
              >
                {CLIENTE} × PG Estrategias
              </p>
            </motion.div>
            <div className="overflow-hidden max-w-[1000px]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-title"
                style={{
                  fontSize: "clamp(38px, 6vw, 92px)",
                  fontWeight: 700,
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  color: "#E4E0DD",
                }}
              >
                Todo tu contenido, en un solo equipo —{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  a tu ritmo.
                </em>
              </motion.h1>
            </div>
          </div>
        </section>

        {/* ============================================================
            2 · QUÉ INCLUYE CADA MES
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[820px]">
            <Eyebrow>Qué incluye cada mes</Eyebrow>
            <SectionTitle>
              Un sistema completo,{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                medible por entregables.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
            {incluye.map((item, i) => (
              <motion.div
                key={item.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 2) * 0.06 }}
                className="p-6 md:p-8 relative group"
                style={{
                  borderTop: "1px solid rgba(228,224,221,0.12)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[2px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
                  style={{ background: "#D63A27" }}
                />
                <h3
                  className="font-title text-[19px] mb-2"
                  style={{ fontWeight: 700, color: "#E4E0DD", letterSpacing: "-0.01em" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-body text-[14px] leading-[1.6]"
                  style={{ color: "rgba(228,224,221,0.62)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...reveal}
            className="font-body text-[13px] leading-[1.7] mt-8 max-w-[760px]"
            style={{ color: "rgba(228,224,221,0.5)" }}
          >
            Incluye recaps de la comunidad y eventos filmados fuera de piso, más
            la línea de accesorios originales. Piezas full-AI disponibles bajo
            autorización previa.
          </motion.p>
        </section>

        {/* ============================================================
            3 · NOS ADAPTAMOS A TUS TIEMPOS + DEMO
           ============================================================ */}
        <section
          className="relative py-20 md:py-28"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div {...reveal} className="lg:col-span-7 order-2 lg:order-1">
                <Eyebrow>Ofertas comerciales que sí se ven</Eyebrow>
                <SectionTitle>
                  Contenido que posiciona,{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    con o sin pauta.
                  </em>
                </SectionTitle>
                <p
                  className="font-body text-[15px] md:text-[17px] leading-[1.8] mb-8"
                  style={{ color: "rgba(228,224,221,0.72)" }}
                >
                  Muchas ofertas comerciales tienen una vida corta en el mes y
                  poco margen para pautarse. Por eso les damos un enfoque
                  creativo para redes —narrativas con estilo cinematográfico que
                  enganchan al espectador— y una estrategia digital que las
                  posiciona de forma orgánica. Cuando una pieza sí requiere pauta
                  adicional, nos anticipamos a su proceso de aprobación.
                </p>
                <div className="flex flex-col gap-px">
                  {[
                    { k: "Orgánico", v: "Estrategia para posicionar sin depender de pauta" },
                    { k: "Estilo cine", v: "Narrativas que enganchan desde el primer segundo" },
                    { k: "Con anticipación", v: "Si requiere pauta (~28 días), la entregamos a tiempo" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="py-4 flex items-start gap-5"
                      style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
                    >
                      <span
                        className="font-body text-[11px] uppercase tracking-[0.16em] shrink-0 pt-1"
                        style={{ color: "#D63A27", fontWeight: 600, width: 118 }}
                      >
                        {row.k}
                      </span>
                      <span
                        className="font-title text-[16px] md:text-[18px]"
                        style={{ fontWeight: 700, color: "#E4E0DD" }}
                      >
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.12 }}
                className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
              >
                <div
                  className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden"
                  style={{
                    background: "#0e0e0d",
                    border: "1px solid rgba(228,224,221,0.14)",
                  }}
                >
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-label="Demo de producción de PG Estrategias para Land Rover"
                  >
                    <source src={cld(LANDROVER_DEMO, "f_auto,q_auto,w_720")} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4 · MUESTRAS
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-10 md:mb-14 max-w-[820px]">
            <Eyebrow>Muestras de producción</Eyebrow>
            <SectionTitle>
              Algunas piezas recientes{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                de nuestro trabajo.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {MUESTRAS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative aspect-[9/16] overflow-hidden group"
                style={{ background: "#0e0e0d" }}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Muestra de producción de PG Estrategias"
                >
                  <source src={cld(src, "f_auto,q_auto,w_640")} type="video/mp4" />
                </video>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            5 · INVERSIÓN
           ============================================================ */}
        <section
          className="relative px-6 md:px-14 py-20 md:py-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #1C1C1A 0%, #201F1C 55%, #1C1C1A 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70vw",
              height: "70vw",
              maxWidth: 700,
              maxHeight: 700,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.10) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div className="relative max-w-[1200px] mx-auto">
            <motion.div
              {...reveal}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              <div className="lg:col-span-6">
                <Eyebrow>Inversión</Eyebrow>
                <SectionTitle>
                  Todo el sistema,{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    un solo cargo mensual.
                  </em>
                </SectionTitle>
              </div>

              <div className="lg:col-span-6">
                <div
                  className="relative p-8 md:p-11"
                  style={{
                    background: "rgba(228,224,221,0.03)",
                    border: "1px solid rgba(228,224,221,0.14)",
                  }}
                >
                  <p
                    className="font-body text-[11px] tracking-[0.22em] uppercase mb-4"
                    style={{ color: "rgba(228,224,221,0.5)" }}
                  >
                    Iguala mensual
                  </p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span
                      className="font-title"
                      style={{ fontSize: 22, color: "rgba(228,224,221,0.55)", fontWeight: 400 }}
                    >
                      $
                    </span>
                    <span
                      className="font-title"
                      style={{
                        fontSize: "clamp(60px, 8vw, 92px)",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "#E4E0DD",
                      }}
                    >
                      {PRECIO}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className="font-body text-[13px] tracking-[0.14em] uppercase"
                        style={{ color: "rgba(228,224,221,0.7)" }}
                      >
                        MXN
                      </span>
                      <span
                        className="font-body text-[12px]"
                        style={{ color: "rgba(228,224,221,0.5)" }}
                      >
                        / mes
                      </span>
                    </div>
                  </div>
                  <div
                    className="pt-5"
                    style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
                  >
                    <p
                      className="font-body text-[13px] leading-[1.7]"
                      style={{ color: "rgba(228,224,221,0.6)" }}
                    >
                      Más IVA en caso de requerir factura. Todos los entregables
                      del mes están incluidos en este cargo; los eventos foráneos
                      no incluyen viáticos.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            6 · CIERRE
           ============================================================ */}
        <section
          className="relative overflow-hidden flex items-center justify-center px-6 md:px-14 py-28 md:py-40"
          style={{ background: "#0e0e0d" }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              height: "80vw",
              maxWidth: 800,
              maxHeight: 800,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.13) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div className="relative z-10 max-w-[900px] mx-auto text-center">
            <motion.p
              {...reveal}
              className="font-body text-[12px] tracking-[0.3em] uppercase mb-10"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              {CLIENTE} × PG Estrategias
            </motion.p>
            <motion.h2
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="font-title mb-8"
              style={{
                fontSize: "clamp(32px, 4.6vw, 66px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              Un equipo. Un ritmo.
            </motion.h2>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-title"
              style={{
                fontSize: "clamp(22px, 3vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#D63A27",
                fontStyle: "italic",
              }}
            >
              Empecemos por la oferta comercial de este mes.
            </motion.p>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.32 }}
              className="mt-12 flex justify-center"
            >
              <Logo size={28} tone="cream" />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
