"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   PALETA — deportivo premium nocturno sobre la identidad PG.
   El acento es el lime de PG Estrategias, que funciona como el
   "verde césped eléctrico" del brief. Un solo acento, con disciplina.
   ──────────────────────────────────────────────────────────── */
const BASE = "#0A0E12";
const SURFACE = "#111820";
const TEXT = "#E8ECEF";
const MUTED = "#8A94A0";
const ACCENT = "#A6E22E";
const ACCENT_DIM = "rgba(166,226,46,0.12)";
const ACCENT_SOFT = "rgba(166,226,46,0.06)";
const BORDER = "rgba(232,236,239,0.10)";

const WA_LINK =
  "https://wa.me/522201758468?text=Hola%20Pablo,%20vi%20la%20propuesta%20para%20P%C3%A1del%20Lomas";

/* ── Videos ─────────────────────────────────────────────────── */
const VIDEO_A =
  "https://res.cloudinary.com/dxcr9utre/video/upload/v1785518826/AQOkcMRjen17JpeUiSzw4b-cKRuJJH58DFv4WwoemuxvsQiBr4lsVz5LjAI7PTiTmA6PGfnkmjgJ71sDeNMwv6FB_tygqnj.mp4";
const VIDEO_B =
  "https://res.cloudinary.com/dxcr9utre/video/upload/v1785518828/AQPay2iWyNALI-asvT__vKCI7MEFUQmi-D43AZoxTdFdNFwbcKy1W7Ba2VbVdxIqvvLtXTipuMYmZZs8j_8_of1FUP_AyC_9jVXe8OU_fsbus2.mp4";
const VIDEO_C =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377534/Video2_qslm4c.mp4";
// PENDIENTE: sustituir por la URL del 4to video. Mientras tanto reusa VIDEO_A.
const VIDEO_D = VIDEO_A;

// Cloudinary genera el poster con la misma URL cambiando .mp4 por .jpg
const posterOf = (url: string) => url.replace(/\.mp4$/, ".jpg");

/* ────────────────────────────────────────────────────────────
   Video vertical: marco de teléfono en desktop, fullwidth nativo
   en mobile. Lazy load real (el src se inyecta al acercarse al
   viewport) + play/pause por visibilidad.
   ──────────────────────────────────────────────────────────── */
function PhoneVideo({
  src,
  caption,
  sound = false,
  eager = false,
}: {
  src: string;
  caption?: string;
  sound?: boolean;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(eager);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          if (!reduce) el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    // Mobile: fullwidth nativo. Desktop: marco de teléfono.
    <div className="relative w-full md:max-w-[320px] mx-auto">
      {/* Glow de acento detrás del teléfono */}
      <div
        aria-hidden
        className="hidden md:block absolute -inset-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(166,226,46,0.13) 0%, transparent 68%)",
          filter: "blur(24px)",
        }}
      />

      {/* Carcasa: solo se vuelve teléfono en desktop */}
      <div
        className="relative md:p-[10px] md:rounded-[46px]"
        style={{
          background: "linear-gradient(160deg, #1c242c 0%, #05080b 100%)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.95)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[18px] md:rounded-[38px] max-h-[62vh] md:max-h-none"
          style={{ aspectRatio: "9 / 16", background: "#05080b" }}
        >
          {/* Notch — solo desktop */}
          <span
            aria-hidden
            className="hidden md:block absolute top-[10px] left-1/2 -translate-x-1/2 z-20 rounded-full"
            style={{ width: 86, height: 22, background: "#05080b" }}
          />

          <video
            ref={ref}
            src={loaded ? src : undefined}
            poster={posterOf(src)}
            muted={muted}
            loop
            playsInline
            autoPlay={eager && !reduce}
            controls={!!reduce}
            preload="metadata"
            aria-label={caption ?? "Video de muestra de contenido"}
            className="w-full h-full object-cover"
          />

          {/* Viñeta inferior para que el caption respire */}
          {caption && (
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,8,11,0.85), transparent)",
              }}
            />
          )}

          {caption && (
            <p
              className="absolute bottom-4 left-4 right-4 font-body text-[11px] uppercase tracking-[0.14em]"
              style={{ color: "rgba(232,236,239,0.75)" }}
            >
              {caption}
            </p>
          )}

          {/* Tap para activar sonido (solo portafolio) */}
          {sound && !reduce && (
            <button
              type="button"
              onClick={() => {
                const el = ref.current;
                if (!el) return;
                const next = !muted;
                setMuted(next);
                el.muted = next;
                if (!next) el.play().catch(() => {});
              }}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-opacity duration-300 hover:opacity-80 focus-visible:outline focus-visible:outline-2"
              style={{
                background: "rgba(5,8,11,0.6)",
                border: `1px solid ${BORDER}`,
                color: muted ? "rgba(232,236,239,0.7)" : ACCENT,
                outlineColor: ACCENT,
              }}
              aria-label={muted ? "Activar sonido del video" : "Silenciar video"}
            >
              {muted ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  <path d="M22 9l-6 6M16 9l6 6" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Piezas de UI ───────────────────────────────────────────── */
function Eyebrow({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <p
      className={`font-body text-[11px] tracking-[0.2em] uppercase mb-6 flex items-center gap-3 ${
        centered ? "justify-center" : ""
      }`}
      style={{ color: ACCENT, fontWeight: 500 }}
    >
      <span className="inline-block w-8 h-px" style={{ background: ACCENT }} />
      {children}
      {centered && (
        <span className="inline-block w-8 h-px" style={{ background: ACCENT }} />
      )}
    </p>
  );
}

function Display({
  children,
  className = "",
  size = "clamp(34px, 5.4vw, 74px)",
}: {
  children: React.ReactNode;
  className?: string;
  size?: string;
}) {
  return (
    <h2
      className={`font-title uppercase ${className}`}
      style={{
        color: TEXT,
        fontSize: size,
        fontWeight: 800,
        lineHeight: 0.94,
        letterSpacing: "-0.025em",
      }}
    >
      {children}
    </h2>
  );
}

function CTAButton({
  children,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pad =
    size === "lg"
      ? "px-10 py-5 text-[15px]"
      : size === "sm"
      ? "px-5 py-2.5 text-[12px]"
      : "px-8 py-4 text-[14px]";

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 font-title uppercase tracking-[0.06em] transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${pad} ${className}`}
      style={{
        background: ACCENT,
        color: "#07100A",
        fontWeight: 800,
        outlineColor: ACCENT,
        boxShadow: "0 12px 40px -12px rgba(166,226,46,0.55)",
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.5-.4z" />
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
      {children}
    </a>
  );
}

/* ── Datos ──────────────────────────────────────────────────── */
const heroSpecs = [
  { num: "9", label: "Canchas" },
  { num: "150", label: "Butacas · estadio" },
  { num: "3,400", label: "m² techados" },
  { num: "360°", label: "Único en Puebla" },
];

const cambios = [
  "Cobertura de torneos con calidad broadcast",
  "Foto y video que venden la experiencia completa: cancha, bar, comunidad",
  "Campañas en Meta dirigidas a jugadores de la zona Angelópolis",
];

const metodo = [
  {
    n: "01",
    title: "Inmersión",
    desc: "Conocemos su club, su comunidad y su calendario de torneos.",
  },
  {
    n: "02",
    title: "Estrategia",
    desc: "Calendario de contenido ligado a ocupación de canchas y eventos.",
  },
  {
    n: "03",
    title: "Producción",
    desc: "Foto y video de nivel cinematográfico en sus instalaciones.",
  },
  {
    n: "04",
    title: "Amplificación",
    desc: "Meta Ads dirigidos a jugadores y familias de la zona.",
  },
  {
    n: "05",
    title: "Medición",
    desc: "Reservas, leads y crecimiento en un reporte que entiende cualquiera.",
  },
];

/* Alcances del paquete Tracción (base del sitio, traducidos al
   contexto del club). CONFIRMAR EN REUNIÓN antes de firmar. */
const alcances = [
  {
    title: "Publicidad en Meta y/o Google",
    desc: "Presupuesto de pauta incluido, dirigido a jugadores y familias de Lomas de Angelópolis, Sonata y zona sur de Puebla.",
  },
  {
    title: "1 video de 1 minuto al mes",
    desc: "La pieza ancla del club: estadio, canchas panorámicas, Quinto Set, The Courts y comunidad en una sola narrativa.",
  },
  {
    title: "7 reels mensuales",
    desc: "2 optimizados para anuncios, 5 para crecimiento orgánico: puntos del torneo, clases, ambiente de bar, novedades del padel shop.",
  },
  {
    title: "8 carruseles con imágenes propias",
    desc: "Torneos, membresías, promociones de horario valle y contenido educativo de pádel.",
  },
  {
    title: "Cobertura de torneos y eventos",
    desc: "Producción en sitio los días de competencia, con entrega ágil para publicar mientras el torneo sigue vivo.",
  },
  {
    title: "WhatsApp Bot para reservas y leads",
    desc: "Respuesta inmediata a quien pregunta por canchas, clases o membresías — sin que nadie del club esté pegado al teléfono.",
  },
  {
    title: "Página de ventas + CRM + hosting 6 meses",
    desc: "Un destino propio para membresías, torneos y eventos corporativos, con seguimiento de cada contacto.",
  },
  {
    title: "Configuración técnica completa",
    desc: "Píxel, eventos y rastreo de conversiones para saber qué campaña llenó qué cancha.",
  },
  {
    title: "Perfil de Google optimizado + reseñas",
    desc: "Que quien busque «pádel Angelópolis» encuentre el club antes que a cualquier otro.",
  },
  {
    title: "Videollamada quincenal + consultoría mensual",
    desc: "Revisión de resultados, calendario del siguiente periodo y decisiones tomadas con datos.",
  },
  {
    title: "Reporte quincenal en lenguaje claro",
    desc: "Alcance, leads, reservas y crecimiento. Sin jerga, sin métricas de vanidad.",
  },
];

/* ── Página ─────────────────────────────────────────────────── */
export default function PadelLomasClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const rise = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10,14,18,0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: ACCENT }}>
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
              className="hidden md:block font-body text-[11px] tracking-[0.16em] uppercase"
              style={{ color: MUTED }}
            >
              Propuesta · Pádel Lomas
            </span>
            <CTAButton size="sm">Agendar reunión</CTAButton>
          </div>
        </div>
      </nav>

      <main
        className="relative overflow-hidden"
        style={{ background: BASE, color: TEXT }}
      >
        {/* Luz de estadio */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[110vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 70% 0%, rgba(166,226,46,0.14) 0%, transparent 65%)",
          }}
        />
        {/* Rejilla de cancha */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,236,239,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,236,239,0.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center top, black 15%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center top, black 15%, transparent 65%)",
          }}
        />

        {/* ══ 1 · HERO ══════════════════════════════════════════ */}
        <section className="relative px-5 md:px-16 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-14 md:gap-16 items-center">
            {/* Texto */}
            <div className="order-2 md:order-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[0.22em] uppercase mb-7 flex items-center gap-3"
                style={{ color: ACCENT, fontWeight: 500 }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                PG Estrategias × Pádel Lomas
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-title uppercase mb-7"
                style={{
                  fontSize: "clamp(40px, 6.6vw, 92px)",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: "-0.035em",
                  color: TEXT,
                }}
              >
                Contenido a la altura del{" "}
                <span style={{ color: ACCENT }}>único club 360°</span> de Puebla.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[16px] leading-[1.75] max-w-[560px] mb-10"
                style={{ color: MUTED }}
              >
                Producción audiovisual y marketing digital para que Pádel Lomas se
                vea en Instagram como se ve en persona.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <CTAButton size="lg">Agendar reunión</CTAButton>
              </motion.div>

              {/* Specs del club */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 mt-14 pt-8"
                style={{ borderTop: `1px solid ${BORDER}` }}
              >
                {heroSpecs.map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-title leading-none mb-1.5"
                      style={{ fontSize: "clamp(24px, 2.4vw, 32px)", fontWeight: 800, color: TEXT }}
                    >
                      {s.num}
                    </p>
                    <p
                      className="font-body text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 md:order-2"
            >
              <PhoneVideo src={VIDEO_A} eager />
            </motion.div>
          </div>
        </section>

        {/* ══ 2 · EL PROBLEMA ═══════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-40">
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div {...rise}>
              <Eyebrow centered>El costo de oportunidad</Eyebrow>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
              <Display size="clamp(34px, 6vw, 82px)" className="mb-10">
                Construyeron el mejor club de pádel de Puebla.
                <br className="hidden sm:block" />{" "}
                <span style={{ color: MUTED }}>Casi nadie lo ha visto.</span>
              </Display>
            </motion.div>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.1 }}
              className="font-body text-[16px] md:text-[18px] leading-[1.8] max-w-[720px] mx-auto"
              style={{ color: MUTED }}
            >
              Un estadio. 9 canchas. 3,400 m² techados. El único club 360° de la
              ciudad. Pero en el teléfono de sus clientes —donde se decide cada
              reserva, cada torneo, cada membresía— nada de eso se ve. Cada semana,
              jugadores que deberían estar en sus canchas eligen otro club porque
              nunca vieron lo que ustedes construyeron.
            </motion.p>

            <motion.div
              {...rise}
              transition={{ ...rise.transition, delay: 0.15 }}
              className="mt-16 md:mt-20 inline-block px-8 py-10 md:px-14 md:py-12"
              style={{
                border: `1px solid ${BORDER}`,
                background: `linear-gradient(160deg, ${ACCENT_SOFT} 0%, rgba(255,255,255,0.015) 70%)`,
              }}
            >
              <p
                className="font-title leading-none mb-4"
                style={{ fontSize: "clamp(64px, 12vw, 140px)", fontWeight: 800, color: ACCENT, letterSpacing: "-0.04em" }}
              >
                76
              </p>
              <p
                className="font-body text-[14px] md:text-[16px] leading-[1.6] max-w-[420px]"
                style={{ color: TEXT }}
              >
                publicaciones no cuentan la historia de un club de este nivel.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══ 3 · LA TRANSFORMACIÓN ═════════════════════════════ */}
        <section
          className="relative px-5 md:px-16 py-24 md:py-36"
          style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20 items-center">
            <motion.div {...rise} className="order-1">
              <PhoneVideo src={VIDEO_B} />
            </motion.div>

            <div className="order-2">
              <motion.div {...rise}>
                <Eyebrow>Lo que cambia</Eyebrow>
              </motion.div>

              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display className="mb-8">
                  Del feed genérico al contenido que{" "}
                  <span style={{ color: ACCENT }}>llena canchas.</span>
                </Display>
              </motion.div>

              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[16px] leading-[1.8] max-w-[560px] mb-12"
                style={{ color: MUTED }}
              >
                Torneos que se ven como transmisión profesional. Un estadio que se
                siente desde Instagram. Contenido que convierte espectadores en
                reservas — y reservas en comunidad.
              </motion.p>

              <ul className="flex flex-col">
                {cambios.map((c, i) => (
                  <motion.li
                    key={c}
                    {...rise}
                    transition={{ ...rise.transition, delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-4 py-5"
                    style={{ borderTop: `1px solid ${BORDER}` }}
                  >
                    <span
                      className="mt-[7px] shrink-0"
                      style={{ width: 18, height: 2, background: ACCENT }}
                    />
                    <span
                      className="font-body text-[15px] md:text-[16px] leading-[1.6]"
                      style={{ color: TEXT }}
                    >
                      {c}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══ 4 · PORTAFOLIO ════════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-36">
          <div className="max-w-[1300px] mx-auto">
            <div className="max-w-[720px] mb-16 md:mb-20">
              <motion.div {...rise}>
                <Eyebrow>Nuestro trabajo</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display className="mb-6">
                  Así se ve lo que <span style={{ color: ACCENT }}>producimos.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[16px] leading-[1.8]"
                style={{ color: MUTED }}
              >
                Sin filtros de por medio. Esto es lo que entregamos.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 justify-items-center">
              <motion.div {...rise} className="w-full">
                <PhoneVideo src={VIDEO_C} sound caption="Producción PG Estrategias" />
              </motion.div>
              <motion.div
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="w-full"
              >
                <PhoneVideo src={VIDEO_D} sound caption="Producción PG Estrategias" />
              </motion.div>
            </div>

            {/* GRID_FOTOS_PENDIENTE — aquí entra la fila de fotografías
                cuando se definan las piezas a mostrar. */}
          </div>
        </section>

        {/* ══ 5 · CÓMO TRABAJAMOS ═══════════════════════════════ */}
        <section
          className="relative px-5 md:px-16 py-24 md:py-36"
          style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="max-w-[1300px] mx-auto">
            <div className="max-w-[720px] mb-16 md:mb-20">
              <motion.div {...rise}>
                <Eyebrow>El método</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display>
                  Un proceso, <span style={{ color: ACCENT }}>no ocurrencias.</span>
                </Display>
              </motion.div>
            </div>

            <div className="relative">
              {/* Línea conectora */}
              <span
                aria-hidden
                className="absolute left-[13px] md:left-[15px] top-3 bottom-3 w-px"
                style={{
                  background: `linear-gradient(to bottom, ${ACCENT}, rgba(166,226,46,0.15))`,
                }}
              />

              <ol className="flex flex-col gap-10 md:gap-12">
                {metodo.map((step, i) => (
                  <motion.li
                    key={step.n}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.07 }}
                    className="relative grid grid-cols-[28px_1fr] md:grid-cols-[32px_200px_1fr] gap-x-6 md:gap-x-10 gap-y-2 items-start"
                  >
                    <span
                      className="relative z-10 flex items-center justify-center rounded-full font-title text-[11px]"
                      style={{
                        width: 28,
                        height: 28,
                        background: BASE,
                        border: `1px solid ${ACCENT}`,
                        color: ACCENT,
                        fontWeight: 800,
                      }}
                    >
                      {i + 1}
                    </span>

                    <h3
                      className="font-title uppercase"
                      style={{
                        fontSize: "clamp(20px, 2.2vw, 28px)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        color: TEXT,
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="col-start-2 md:col-start-3 font-body text-[15px] leading-[1.7] max-w-[560px]"
                      style={{ color: MUTED }}
                    >
                      {step.desc}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ══ 6 · PAQUETE TRACCIÓN ══════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-36 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 65%)",
            }}
          />

          <div className="relative max-w-[1000px] mx-auto">
            <div className="text-center mb-14">
              <motion.div {...rise}>
                <Eyebrow centered>La propuesta</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display size="clamp(56px, 11vw, 150px)" className="mb-8">
                  <span style={{ color: ACCENT }}>Tracción.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[16px] md:text-[18px] leading-[1.8] max-w-[620px] mx-auto"
                style={{ color: MUTED }}
              >
                El paquete para marcas que ya tienen el producto — y necesitan que
                el mundo lo vea así de bien.
              </motion.p>
            </div>

            <motion.div
              {...rise}
              transition={{ ...rise.transition, delay: 0.15 }}
              className="p-7 md:p-14"
              style={{
                border: `1px solid rgba(166,226,46,0.30)`,
                background: `linear-gradient(150deg, rgba(166,226,46,0.07) 0%, ${SURFACE} 55%)`,
              }}
            >
              <p
                className="font-body text-[11px] uppercase tracking-[0.2em] mb-8 pb-6"
                style={{ color: ACCENT, borderBottom: `1px solid ${BORDER}` }}
              >
                Alcances del paquete
              </p>

              {/* CONFIRMAR ALCANCES EXACTOS EN REUNIÓN — base tomada del
                  paquete Tracción del sitio, adaptado al club. */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                {alcances.map((a) => (
                  <li key={a.title} className="flex items-start gap-3.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="shrink-0 mt-[5px]"
                      aria-hidden
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke={ACCENT}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p
                        className="font-title text-[15px] md:text-[16px] mb-1"
                        style={{ color: TEXT, fontWeight: 700 }}
                      >
                        {a.title}
                      </p>
                      <p
                        className="font-body text-[13.5px] leading-[1.65]"
                        style={{ color: MUTED }}
                      >
                        {a.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div
                className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                style={{ borderTop: `1px solid ${BORDER}` }}
              >
                <p
                  className="font-body text-[13px] leading-[1.6] max-w-[420px]"
                  style={{ color: MUTED }}
                >
                  Inversión y calendario de arranque se presentan en la reunión,
                  ajustados al calendario de torneos del club.
                </p>
                <CTAButton>Agendar reunión</CTAButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 7 · CTA FINAL ═════════════════════════════════════ */}
        <section
          className="relative flex items-center justify-center px-5 md:px-16 py-32 md:py-44 min-h-[85vh]"
          style={{
            backgroundImage: `linear-gradient(rgba(10,14,18,0.90), rgba(10,14,18,0.97)), url(${posterOf(
              VIDEO_A
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(166,226,46,0.16) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[900px] mx-auto text-center">
            <motion.div {...rise}>
              <Eyebrow centered>PG Estrategias × Pádel Lomas</Eyebrow>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
              <Display size="clamp(38px, 7vw, 96px)" className="mb-12">
                Su próximo torneo merece verse como{" "}
                <span style={{ color: ACCENT }}>final de Premier Padel.</span>
              </Display>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
              <CTAButton size="lg">Agendemos</CTAButton>
            </motion.div>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.15 }}
              className="font-body text-[12px] uppercase tracking-[0.16em] mt-14"
              style={{ color: MUTED }}
            >
              Propuesta confidencial · Puebla, {new Date().getFullYear()}
            </motion.p>
          </div>
        </section>

        {/* CTA fijo en mobile */}
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
          style={{
            background: "rgba(10,14,18,0.92)",
            backdropFilter: "blur(14px)",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <CTAButton className="w-full justify-center">Agendar reunión</CTAButton>
        </div>
      </main>

      <div className="md:pb-0 pb-[76px]">
        <Footer />
      </div>
    </>
  );
}
