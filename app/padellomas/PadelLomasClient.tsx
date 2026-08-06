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
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  // Play / pausa manual — también es el respaldo cuando el navegador
  // bloquea el autoplay (iOS en modo de bajo consumo, p. ej.).
  const pausedByUser = useRef(false);

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      pausedByUser.current = false;
      setLoaded(true);
      el.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      el.pause();
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          // Si el usuario pausó a propósito, no lo reanudamos al volver.
          if (!reduce && !pausedByUser.current) el.play().catch(() => {});
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
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label={caption ?? "Video de muestra de contenido"}
            className="w-full h-full object-cover"
          />

          {/* Botón de play / pausa */}
          {!reduce && (
            <button
              type="button"
              onClick={togglePlay}
              className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 ${
                playing
                  ? "opacity-0 hover:opacity-100 focus-visible:opacity-100"
                  : "opacity-100"
              }`}
              style={{ outlineColor: ACCENT }}
              aria-label={playing ? "Pausar video" : "Reproducir video"}
            >
              {!playing && (
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "rgba(5,8,11,0.35)" }}
                />
              )}
              <span
                className="relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                style={{
                  width: 62,
                  height: 62,
                  background: "rgba(10,14,18,0.62)",
                  border: `1px solid rgba(166,226,46,0.55)`,
                  backdropFilter: "blur(6px)",
                  color: ACCENT,
                }}
              >
                {playing ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <rect x="6" y="4" width="4.5" height="16" rx="1" />
                    <rect x="13.5" y="4" width="4.5" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5.6c0-.9.9-1.4 1.6-1L18.4 11c.7.4.7 1.5 0 1.9L9.6 19.4c-.7.4-1.6-.1-1.6-1V5.6z" />
                  </svg>
                )}
              </span>
            </button>
          )}

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
              className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none font-body text-[11px] uppercase tracking-[0.14em]"
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
      className={`font-body text-[11px] tracking-[0.14em] uppercase mb-6 flex items-center gap-3 ${
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
  size = "clamp(30px, 4.6vw, 56px)",
}: {
  children: React.ReactNode;
  className?: string;
  size?: string;
}) {
  return (
    <h2
      className={`font-title ${className}`}
      style={{
        color: TEXT,
        fontSize: size,
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
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
      ? "px-9 py-4 text-[14px]"
      : size === "sm"
      ? "px-5 py-2.5 text-[12px]"
      : "px-8 py-3.5 text-[13px]";

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 font-title tracking-wide transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${pad} ${className}`}
      style={{
        background: ACCENT,
        color: "#07100A",
        fontWeight: 700,
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

const garantia = [
  {
    title: "Estudio y estrategia",
    desc: "Competencia de la zona, calendario de torneos y línea base de asistencia y ocupación.",
  },
  {
    title: "Producción",
    desc: "La cobertura y las piezas que van a sostener el periodo completo, no un anuncio suelto.",
  },
  {
    title: "Campaña en marcha",
    desc: "Pauta segmentada corriendo con tiempo suficiente para convocar antes del torneo.",
  },
];

/* Alcances del paquete Tracción (base del sitio, traducidos al
   contexto del club). CONFIRMAR EN REUNIÓN antes de firmar. */
const PRECIO = "$12,500";
const PAUTA = "$2,500";

/* Paquete a la medida para Pádel Lomas, construido sobre Ignición:
   10 videos al mes, bot de WhatsApp, mensajería masiva, lealtad y
   lead magnets. Confirmar el volumen de envíos antes de firmar. */
const alcances = [
  {
    title: "Publicidad en Meta o Google",
    desc: "Los " + PAUTA + " de pauta están incluidos en la mensualidad — no son un costo aparte. Campañas dirigidas a jugadores, familias y empresas de la zona Angelópolis.",
  },
  {
    title: "10 videos al mes",
    desc: "Piezas para anuncios y para redes: cobertura de torneos, ambiente de estadio, sports bar, clases y comunidad.",
  },
  {
    title: "3 diseños gráficos con texto persuasivo",
    desc: "Torneos, promociones de horario valle y campañas de membresía.",
  },
  {
    title: "3 carruseles para redes sociales",
    desc: "Formato para contar el club por partes: instalaciones, servicios y calendario.",
  },
  {
    title: "Bot de WhatsApp",
    desc: "Responde en automático a quien pregunta por canchas, clases, torneos o membresías, sin que nadie del club tenga que estar pendiente del teléfono.",
  },
  {
    title: "Mensajería masiva a clientes recurrentes",
    desc: "Promociones y convocatorias enviadas directo a quienes ya juegan en el club — 500 envíos mensuales por WhatsApp o correo.",
  },
  {
    title: "Programas de lealtad optimizados",
    desc: "Revisamos y ajustamos los beneficios de socios y frecuentes para que den motivo real de volver, y los conectamos con la mensajería.",
  },
  {
    title: "Base de datos gestionada",
    desc: "Construcción, limpieza y segmentación de la base: quién juega entre semana, quién viene en fin de semana, quién compite en torneos.",
  },
  {
    title: "Lead magnets para ampliar la base",
    desc: "Clases muestra, retos, guías y registros a torneo que capturan contactos nuevos y los suman a la base con permiso.",
  },
  {
    title: "Página de ventas diseñada e incluida",
    desc: "Un destino propio para membresías, torneos y eventos corporativos.",
  },
  {
    title: "Configuración técnica completa",
    desc: "Píxeles, eventos y rastreo para saber qué campaña llenó qué cancha.",
  },
  {
    title: "Perfil de Google optimizado + reseñas",
    desc: "Para ganar la búsqueda de «pádel Angelópolis» y las solicitudes de ruta de la zona.",
  },
  {
    title: "1 videollamada estratégica mensual",
    desc: "Revisión de resultados y calendario del siguiente mes, ligado a los torneos del club.",
  },
  {
    title: "Reporte mensual en lenguaje claro",
    desc: "Reservas, conversaciones, inscripciones y crecimiento. Sin métricas de vanidad.",
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
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
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
                className="font-body text-[11px] tracking-[0.14em] uppercase mb-7 flex items-center gap-3"
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
                className="font-title mb-7"
                style={{
                  fontSize: "clamp(34px, 4.8vw, 68px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
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
                className="font-body text-[15px] leading-[1.75] max-w-[560px] mb-10"
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
                      style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400, color: TEXT }}
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

        {/* ══ 2 · LA OPORTUNIDAD ════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-40">
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div {...rise}>
              <Eyebrow centered>La oportunidad</Eyebrow>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
              <Display size="clamp(30px, 4.6vw, 60px)" className="mb-10">
                Su torneo ya reúne al público correcto.{" "}
                <span style={{ color: ACCENT }}>
                  Fuera de la cancha, casi nadie se entera.
                </span>
              </Display>
            </motion.div>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.1 }}
              className="font-body text-[15px] leading-[1.8] max-w-[700px] mx-auto"
              style={{ color: MUTED }}
            >
              Estadio, sports bar, canchas de nivel nacional. Pero la conversación
              se queda entre quienes ya juegan: no llega al dueño de negocio, al
              patrocinador ni al socio que deberían estar en esas gradas. Ese
              público no se convoca con un flyer — se convoca mostrando el nivel
              del evento antes de que suceda.
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
                style={{ fontSize: "clamp(56px, 8vw, 104px)", fontWeight: 400, color: ACCENT, letterSpacing: "-0.03em" }}
              >
                #1
              </p>
              <p
                className="font-body text-[15px] leading-[1.6] max-w-[440px]"
                style={{ color: TEXT }}
              >
                Ese es el objetivo: el club de pádel más visto de Puebla. Con las
                instalaciones que ya tienen, es una meta alcanzable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══ 6 · PORTAFOLIO ════════════════════════════════════ */}
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
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: MUTED }}
              >
                Sin filtros de por medio. Esto es lo que entregamos.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 justify-items-center">
              <motion.div {...rise} className="w-full">
                <PhoneVideo src={VIDEO_B} sound caption="Producción PG Estrategias" />
              </motion.div>
              <motion.div
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="w-full"
              >
                <PhoneVideo src={VIDEO_C} sound caption="Producción PG Estrategias" />
              </motion.div>
            </div>

            {/* GRID_FOTOS_PENDIENTE — aquí entra la fila de fotografías
                cuando se definan las piezas a mostrar. */}
          </div>
        </section>

        {/* ══ 8 · PAQUETE TRACCIÓN ══════════════════════════════ */}
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
                <Display size="clamp(48px, 7.5vw, 104px)" className="mb-8">
                  <span style={{ color: ACCENT }}>Ignición.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8] max-w-[620px] mx-auto mb-12"
                style={{ color: MUTED }}
              >
                Ampliado para Pádel Lomas: el paquete para marcas que ya tienen el
                producto — y quieren que el mundo lo vea así de bien.
              </motion.p>

              {/* Inversión mensual */}
              <motion.div
                {...rise}
                transition={{ ...rise.transition, delay: 0.15 }}
                className="inline-flex flex-col items-center"
              >
                <p
                  className="font-body text-[10px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: MUTED }}
                >
                  Inversión mensual
                </p>
                <p
                  className="font-title leading-none mb-3"
                  style={{
                    fontSize: "clamp(44px, 6vw, 76px)",
                    fontWeight: 400,
                    color: TEXT,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {PRECIO}{" "}
                  <span style={{ fontSize: "0.32em", color: MUTED }}>MXN / mes</span>
                </p>
                <p
                  className="font-body text-[14px] px-4 py-1.5"
                  style={{ color: ACCENT, background: ACCENT_DIM }}
                >
                  {PAUTA} en publicidad incluidos
                </p>
              </motion.div>
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
                className="font-body text-[11px] uppercase tracking-[0.14em] mb-8 pb-6"
                style={{ color: ACCENT, borderBottom: `1px solid ${BORDER}` }}
              >
                Alcances del paquete
              </p>

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
                        className="font-title text-[16px] mb-1"
                        style={{ color: TEXT, fontWeight: 400 }}
                      >
                        {a.title}
                      </p>
                      <p
                        className="font-body text-[13px] leading-[1.65]"
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
                  className="font-body text-[13px] leading-[1.6] max-w-[440px]"
                  style={{ color: MUTED }}
                >
                  Precio en pesos mexicanos, sin IVA. El calendario de arranque se
                  ajusta al calendario de torneos del club.
                </p>
                <CTAButton>Agendar reunión</CTAButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 4 · LA GARANTÍA ═══════════════════════════════════ */}
        {/* La meta de asistencia y la línea base se confirman con el club
            antes de firmar, y conviene que un abogado revise la redacción
            contractual de la garantía. */}
        <section className="relative px-5 md:px-16 py-24 md:py-36">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <motion.div {...rise}>
                  <Eyebrow>Seamos claros</Eyebrow>
                </motion.div>
                <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                  <Display className="mb-8">
                    Si no cumplimos,{" "}
                    <span style={{ color: ACCENT }}>seguimos sin costo.</span>
                  </Display>
                </motion.div>
                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.1 }}
                  className="font-body text-[15px] leading-[1.8] max-w-[520px]"
                  style={{ color: MUTED }}
                >
                  Nosotros controlamos el alcance, la convocatoria y la calidad de
                  la producción. Ustedes controlan la cancha, el precio y la
                  experiencia de quien llega. Por eso nos comprometemos con lo que
                  sí está en nuestras manos: llevar gente a las gradas. Convertir
                  esa gente en negocio ya es cosa del club — y con ese público
                  adentro, es la parte fácil.
                </motion.p>
              </div>

              <div>
                <motion.div
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.15 }}
                  className="p-8 md:p-10"
                  style={{
                    border: `1px solid rgba(166,226,46,0.30)`,
                    background: `linear-gradient(150deg, ${ACCENT_SOFT} 0%, rgba(255,255,255,0.015) 60%)`,
                  }}
                >
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.14em] mb-5"
                    style={{ color: ACCENT }}
                  >
                    El compromiso
                  </p>
                  <p
                    className="font-title leading-none mb-5"
                    style={{
                      fontSize: "clamp(38px, 5vw, 62px)",
                      fontWeight: 400,
                      color: ACCENT,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    200–300
                  </p>
                  <p
                    className="font-body text-[15px] leading-[1.7] mb-6"
                    style={{ color: TEXT }}
                  >
                    asistentes al mes en sus torneos, partiendo de la asistencia
                    actual de alrededor de 100. Si al cierre del periodo no
                    llegamos, trabajamos 30 días más sin honorarios hasta
                    conseguirlo.
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.65] pt-6"
                    style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}
                  >
                    Aplica sobre honorarios, nunca sobre la inversión publicitaria.
                    La línea base de asistencia se fija juntos antes de arrancar.
                  </p>
                </motion.div>

                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.25 }}
                  className="font-body text-[14px] leading-[1.7] mt-8"
                  style={{ color: MUTED }}
                >
                  Es una garantía corta y clara. Preferimos eso a una promesa grande
                  que no podríamos sostener.
                </motion.p>
              </div>
            </div>

            <div className="mt-20 md:mt-24">
              <motion.p
                {...rise}
                className="font-body text-[11px] uppercase tracking-[0.14em] mb-8"
                style={{ color: ACCENT }}
              >
                Los primeros 45 días son de construcción
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {garantia.map((g, i) => (
                  <motion.div
                    key={g.title}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.07 }}
                    className="p-6"
                    style={{
                      border: `1px solid ${BORDER}`,
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <h3
                      className="font-title mb-2"
                      style={{ fontSize: "16px", fontWeight: 400, color: TEXT }}
                    >
                      {g.title}
                    </h3>
                    <p
                      className="font-body text-[13px] leading-[1.65]"
                      style={{ color: MUTED }}
                    >
                      {g.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.25 }}
                className="font-body text-[14px] leading-[1.7] mt-8 max-w-[720px]"
                style={{ color: MUTED }}
              >
                Ese es el tiempo que toma hacer bien el estudio, la estrategia y la
                producción. Los resultados empiezan a leerse a partir del día 45 —
                antes de eso hay trabajo, no cifras.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ══ 9 · CTA FINAL ═════════════════════════════════════ */}
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
              <Display size="clamp(32px, 5vw, 64px)" className="mb-12">
                Su próximo torneo puede ser{" "}
                <span style={{ color: ACCENT }}>
                  el evento que Puebla estaba esperando.
                </span>
              </Display>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
              <CTAButton size="lg">Agendemos</CTAButton>
            </motion.div>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.15 }}
              className="font-body text-[12px] uppercase tracking-[0.14em] mt-14"
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
