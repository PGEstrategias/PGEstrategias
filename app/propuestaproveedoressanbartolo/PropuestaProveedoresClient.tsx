"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta general — Proveedores de Ex Hacienda San Bartolo.

   Misma estructura y mismos entregables que la propuesta para médicos;
   cambia el material y el argumento. Aquí la prueba pesa más que en
   ninguna otra propuesta: el testimonio principal es el del venue donde
   estos proveedores ya trabajan, así que abre la sección.

   La sección de trabajo mezcla video y fotografía, así que cada formato
   conserva su proporción en lugar de forzarse a una común.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Proveedores de eventos";
const PRECIO = "11,000";
const PAUTA = "$2,500";

/* ── Media ──────────────────────────────────────────────────── */

const MUESTRAS = [
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779377735/Reel_t5pucv.mp4",
    label: "Reel de marca",
  },
];

const FOTOS = [
  "https://res.cloudinary.com/djduba5fd/image/upload/v1788101366/WhatsApp_Image_2026-08-29_at_6.45.20_PM_gite1w.jpg",
  "https://res.cloudinary.com/djduba5fd/image/upload/v1788101366/WhatsApp_Image_2026-08-29_at_6.45.26_PM_o1mhuq.jpg",
];

/* Abre el de la hacienda: es la casa donde estos proveedores ya trabajan
   y el resultado más fuerte que podemos mostrarles. */
const TESTIMONIOS = [
  {
    video:
      "https://res.cloudinary.com/dieszqcrn/video/upload/v1778398752/ExHaciendaPGTestimonio_ut7ja4.mp4",
    poster:
      "https://res.cloudinary.com/dieszqcrn/image/upload/v1778400307/ChatGPT_Image_10_may_2026_02_04_57_a.m_gdkjn9.png",
    quote: "Hemos triplicado el número de contratos firmados.",
    nombre: "Ex Hacienda de San Bartolo",
    industria: "Eventos y bodas · Puebla",
  },
  {
    video:
      "https://res.cloudinary.com/dieszqcrn/video/upload/v1778399000/DrManuelPGTestimonio_ar6neh.mp4",
    poster:
      "https://res.cloudinary.com/dieszqcrn/image/upload/v1778400341/ChatGPT_Image_10_may_2026_02_05_25_a.m_tgohn3.png",
    quote:
      "Sé que ustedes son un negocio confiable, en el que les interesa que sus clientes crezcan para que ustedes también crezcan.",
    nombre: "Dr. Manuel",
    industria: "Proctología · Puebla",
  },
];

function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/* ── Contenido ──────────────────────────────────────────────── */

const DOLORES = [
  "Novios que piden precio y no vuelven a escribir.",
  "Depender de que la hacienda te recomiende ese mes.",
  "Fotos de tu trabajo que no le hacen justicia a tu trabajo.",
];

const ENTREGABLES = [
  "Publicidad en Meta o Google — $2,500 incluidos",
  "1 video de 1 minuto para tu página de ventas",
  "4 reels mensuales (1 para anuncios, 3 para redes)",
  "3 diseños gráficos con texto persuasivo",
  "3 carruseles para redes sociales",
  "Página de ventas diseñada e incluida",
  "Configuración técnica completa (rastreo, píxeles)",
  "Perfil de Google optimizado + estrategia de reseñas",
  "1 videollamada estratégica mensual",
  "Reporte mensual en lenguaje claro",
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-title mb-7"
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

function VideoSlot({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{
        aspectRatio: "9/16",
        background: "#0e0e0d",
        border: "1px solid rgba(228,224,221,0.1)",
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={`Muestra de producción de PG Estrategias — ${label}`}
      >
        <source src={cld(src, "f_auto,q_auto,w_640")} type="video/mp4" />
      </video>
    </div>
  );
}

/* La fotografía va en 4:5: recortarla al 9:16 del video le quitaría
   demasiado encuadre. */
function FotoSlot({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{
        aspectRatio: "4/5",
        background: "#0e0e0d",
        border: "1px solid rgba(228,224,221,0.1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cld(src, "f_auto,q_auto,w_800")}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}

/* El testimonio no se reproduce solo: lleva audio y es quien habla. */
function TestimonioCard({ t }: { t: (typeof TESTIMONIOS)[number] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
      <div
        className="w-full sm:w-[190px] shrink-0 overflow-hidden"
        style={{
          aspectRatio: "9/16",
          background: "#0e0e0d",
          border: "1px solid rgba(228,224,221,0.12)",
        }}
      >
        <video
          className="w-full h-full object-cover"
          controls
          playsInline
          preload="none"
          poster={cld(t.poster, "f_auto,q_auto,w_480")}
          aria-label={`Testimonio de ${t.nombre}`}
        >
          <source src={cld(t.video, "f_auto,q_auto,w_720")} type="video/mp4" />
        </video>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-title text-[19px] md:text-[23px] leading-[1.35] mb-5"
          style={{ color: "#E4E0DD", fontWeight: 700, letterSpacing: "-0.015em" }}
        >
          “{t.quote}”
        </p>
        <p
          className="font-body text-[14px]"
          style={{ color: "#D63A27", fontWeight: 600 }}
        >
          {t.nombre}
        </p>
        <p
          className="font-body text-[12px] tracking-[0.14em] uppercase mt-1"
          style={{ color: "rgba(228,224,221,0.5)" }}
        >
          {t.industria}
        </p>
      </div>
    </div>
  );
}

export default function PropuestaProveedoresClient() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
          <span
            className="font-body text-[11px] tracking-[0.16em] uppercase"
            style={{ color: "rgba(228,224,221,0.45)" }}
          >
            {CLIENTE}
          </span>
        </div>
      </nav>

      <main style={{ background: "#1C1C1A", color: "#E4E0DD" }}>
        {/* ============================================================
            1 · HERO
           ============================================================ */}
        <section
          className="relative w-full min-h-[78vh] flex items-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #0e0e0d 0%, #1C1C1A 60%, #1C1C1A 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "8%",
              right: "-10%",
              width: "70vw",
              height: "70vw",
              maxWidth: 780,
              maxHeight: 780,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.16) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-14 pt-28 pb-14 md:pb-16 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-px block" style={{ background: "#D63A27" }} />
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "#E4E0DD", fontWeight: 500 }}
              >
                Para proveedores de Ex Hacienda San Bartolo
              </p>
            </motion.div>
            <div className="overflow-hidden max-w-[1100px]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-title"
                style={{
                  fontSize: "clamp(42px, 7vw, 108px)",
                  fontWeight: 700,
                  lineHeight: 0.96,
                  letterSpacing: "-0.035em",
                  color: "#E4E0DD",
                }}
              >
                Ya trabajas en el mejor lugar. Falta que se note afuera.
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-[15px] md:text-[18px] leading-[1.7] mt-8 max-w-[580px]"
              style={{ color: "rgba(228,224,221,0.75)" }}
            >
              Anuncios, video y una página que cotiza, operados por un solo
              equipo en Puebla. Campaña al aire en 14 días.
            </motion.p>
          </div>
        </section>

        {/* ============================================================
            2 · EL PROBLEMA
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-24 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-10 max-w-[820px]">
            <Eyebrow>Lo que vemos en el gremio</Eyebrow>
            <SectionTitle>
              Los novios te buscan en Instagram y encuentran a otro.
            </SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
            {DOLORES.map((d, i) => (
              <motion.p
                key={d}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="font-title text-[18px] md:text-[21px] leading-[1.35] pt-6 pr-6"
                style={{
                  borderTop: "1px solid rgba(228,224,221,0.16)",
                  color: "#E4E0DD",
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                }}
              >
                {d}
              </motion.p>
            ))}
          </div>
        </section>

        {/* ============================================================
            3 · LO QUE HACEMOS POR TI — PAQUETE IGNICIÓN
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
            >
              <div className="lg:col-span-5">
                <Eyebrow>Lo que hacemos por ti</Eyebrow>
                <SectionTitle>Paquete Ignición</SectionTitle>
                <p
                  className="font-body text-[15px] leading-[1.75] mb-8"
                  style={{ color: "rgba(228,224,221,0.7)" }}
                >
                  Todo lo que necesita un proveedor de eventos para llenar
                  temporada, bajo un solo cargo mensual y un solo equipo.
                </p>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-title"
                    style={{ fontSize: 22, color: "rgba(228,224,221,0.55)", fontWeight: 400 }}
                  >
                    $
                  </span>
                  <span
                    className="font-title"
                    style={{
                      fontSize: "clamp(56px, 8vw, 96px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: "#D63A27",
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
                  className="mt-7 inline-flex items-baseline gap-3 px-5 py-4"
                  style={{
                    background: "rgba(214,58,39,0.07)",
                    border: "1px solid rgba(214,58,39,0.3)",
                  }}
                >
                  <span
                    className="font-title text-[20px]"
                    style={{ fontWeight: 700, color: "#E4E0DD" }}
                  >
                    {PAUTA}
                  </span>
                  <span
                    className="font-body text-[13px]"
                    style={{ color: "rgba(228,224,221,0.7)" }}
                  >
                    de pauta publicitaria incluidos
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div
                  className="p-7 md:p-10"
                  style={{
                    background: "rgba(228,224,221,0.03)",
                    border: "1px solid rgba(228,224,221,0.14)",
                  }}
                >
                  <p
                    className="font-body text-[11px] tracking-[0.22em] uppercase mb-6"
                    style={{ color: "rgba(228,224,221,0.5)" }}
                  >
                    Entregables mensuales
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {ENTREGABLES.map((x) => (
                      <div key={x} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="shrink-0 mt-[7px] block"
                          style={{ width: 5, height: 5, background: "#D63A27" }}
                        />
                        <span
                          className="font-body text-[13px] md:text-[14px] leading-[1.6]"
                          style={{ color: "rgba(228,224,221,0.72)" }}
                        >
                          {x}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            4 · LO QUE HEMOS PRODUCIDO
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-10 md:mb-14 max-w-[820px]">
            <Eyebrow>Lo que hemos producido</Eyebrow>
            <SectionTitle>El mismo estándar, en cualquier giro.</SectionTitle>
            <p
              className="font-body text-[15px] md:text-[17px] leading-[1.8] max-w-[680px]"
              style={{ color: "rgba(228,224,221,0.72)" }}
            >
              Video y fotografía con el mismo cuidado con el que tú montas un
              evento. Cambia el giro; no cambia el nivel de producción.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 items-start">
            {MUESTRAS.map((m, i) => (
              <motion.div
                key={m.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <VideoSlot src={m.src} label={m.label} />
              </motion.div>
            ))}
            {FOTOS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i + 1) * 0.08 }}
              >
                <FotoSlot src={src} alt="Fotografía de evento producida por PG Estrategias" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            5 · TESTIMONIOS Y PRUEBA SOCIAL
           ============================================================ */}
        <section className="relative py-20 md:py-28" style={{ background: "#151513" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[820px]">
              <Eyebrow>Prueba social</Eyebrow>
              <SectionTitle>Quién lo dice, además de nosotros.</SectionTitle>
            </motion.div>

            <div className="flex flex-col gap-12 md:gap-16 max-w-[1000px]">
              {TESTIMONIOS.map((t, i) => (
                <motion.div
                  key={t.nombre}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                >
                  <TestimonioCard t={t} />
                </motion.div>
              ))}
            </div>

            <motion.div
              {...reveal}
              className="mt-14 md:mt-16 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-7 max-w-[1000px]"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderLeft: "2px solid #D63A27",
              }}
            >
              <span
                className="font-body text-[11px] tracking-[0.2em] uppercase shrink-0"
                style={{ color: "#D63A27", fontWeight: 600 }}
              >
                Garantía
              </span>
              <p
                className="font-body text-[14px] leading-[1.7]"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                30 días de honorarios sin costo si no alcanzamos la meta que
                definimos juntos al arrancar. La pauta publicitaria se
                administra por separado y se reporta cada mes.
              </p>
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
              PG Estrategias · Puebla
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
              20 minutos para saber si podemos llenarte la temporada.
            </motion.h2>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-body text-[15px] md:text-[17px] leading-[1.7]"
              style={{ color: "rgba(228,224,221,0.7)" }}
            >
              Sin costo. Si no somos la opción correcta para tu negocio, te lo
              decimos en la llamada.
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
