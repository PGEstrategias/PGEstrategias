"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   PALETA — japonés contemporáneo: negro cálido y rojo lacado.
   ACCENT se usa en rellenos y reglas; ACCENT_TEXT es la versión
   aclarada para texto, que sí cumple contraste AA sobre el fondo.
   ──────────────────────────────────────────────────────────── */
const BASE = "#0C0B0A";
const SURFACE = "#161412";
const TEXT = "#F2EDE6";
const MUTED = "#9B9186";
const ACCENT = "#C4302B";
const ACCENT_TEXT = "#E4564F";
const ACCENT_SOFT = "rgba(196,48,43,0.07)";
const BORDER = "rgba(242,237,230,0.10)";

const WA_LINK =
  "https://wa.me/522201758468?text=Hola%20Pablo,%20vi%20la%20propuesta%20para%20Wasabi";

/* ── Recursos ───────────────────────────────────────────────── */
// PENDIENTE: pegar la URL del demo reel (Cloudinary .mp4).
// Al llenarla, el hero y el fondo del CTA final la toman automáticamente.
const REEL_DEMO: string | null = null;

// GRID_FOTOS_PENDIENTE: 4–6 imágenes de producción gastronómica.
// Mientras el arreglo esté vacío, la sección de portafolio no se
// renderiza y su argumento queda cubierto por "La mecánica".
const FOTOS: { src: string; alt: string }[] = [];

/* CONFIRMAR EN REUNIÓN: ¿Wasabi cuenta con reparto propio?
   Si es así, poner en true: la sección de margen por comisiones entra
   automáticamente antes del canal de WhatsApp, que es donde pega más. */
const TIENE_REPARTO_PROPIO = false;

// Cloudinary genera el poster con la misma URL cambiando .mp4 por .jpg
const posterOf = (url: string) => url.replace(/\.mp4$/, ".jpg");

/* ────────────────────────────────────────────────────────────
   Elemento firma: la regla que corta la página, una por sección.
   ──────────────────────────────────────────────────────────── */
function KnifeRule({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`h-px w-full origin-left mb-14 md:mb-20 ${className}`}
      style={{
        background: `linear-gradient(to right, ${ACCENT} 0%, rgba(196,48,43,0.35) 45%, transparent 100%)`,
      }}
    />
  );
}

/* ────────────────────────────────────────────────────────────
   Video vertical en marco de teléfono (desktop) / fullwidth (mobile).
   Tolera que aún no haya reel: muestra el espacio reservado.
   ──────────────────────────────────────────────────────────── */
function PhoneVideo({ src }: { src: string | null }) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
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

  return (
    <div className="relative w-full md:max-w-[320px] mx-auto">
      <div
        aria-hidden
        className="hidden md:block absolute -inset-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,48,43,0.16) 0%, transparent 68%)",
          filter: "blur(26px)",
        }}
      />

      <div
        className="relative md:p-[10px] md:rounded-[46px]"
        style={{
          background: "linear-gradient(160deg, #2a2422 0%, #060505 100%)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.95)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[18px] md:rounded-[38px] max-h-[62vh] md:max-h-none"
          style={{ aspectRatio: "9 / 16", background: "#060505" }}
        >
          <span
            aria-hidden
            className="hidden md:block absolute top-[10px] left-1/2 -translate-x-1/2 z-20 rounded-full"
            style={{ width: 86, height: 22, background: "#060505" }}
          />

          {src ? (
            <>
              <video
                ref={ref}
                src={loaded ? src : undefined}
                poster={posterOf(src)}
                muted
                loop
                playsInline
                controls={!!reduce}
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                aria-label="Demo reel de PG Estrategias"
                className="w-full h-full object-cover"
              />

              {!reduce && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 ${
                    playing
                      ? "opacity-0 hover:opacity-100 focus-visible:opacity-100"
                      : "opacity-100"
                  }`}
                  style={{ outlineColor: ACCENT_TEXT }}
                  aria-label={playing ? "Pausar video" : "Reproducir video"}
                >
                  {!playing && (
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{ background: "rgba(6,5,5,0.35)" }}
                    />
                  )}
                  <span
                    className="relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                    style={{
                      width: 62,
                      height: 62,
                      background: "rgba(12,11,10,0.62)",
                      border: `1px solid rgba(196,48,43,0.7)`,
                      backdropFilter: "blur(6px)",
                      color: ACCENT_TEXT,
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
            </>
          ) : (
            /* Espacio reservado mientras no hay demo reel */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <span
                className="block h-px w-12"
                style={{ background: ACCENT }}
                aria-hidden
              />
              <p
                className="font-body text-[11px] uppercase tracking-[0.14em]"
                style={{ color: MUTED }}
              >
                Espacio reservado
                <br />
                demo reel
              </p>
            </div>
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
      style={{ color: ACCENT_TEXT, fontWeight: 500 }}
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
      className={`inline-flex items-center gap-2.5 font-title tracking-wide transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${pad} ${className}`}
      style={{
        background: ACCENT,
        color: TEXT,
        fontWeight: 700,
        outlineColor: ACCENT_TEXT,
        boxShadow: "0 12px 40px -14px rgba(196,48,43,0.75)",
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

/* ── Contenido ──────────────────────────────────────────────── */
const mecanica = [
  {
    n: "01",
    title: "El algoritmo cobra por atención.",
    desc: "Meta distribuye según retención. Un video que retiene más se entrega más barato: mismo presupuesto, más gente alcanzada. La calidad de producción no es un gasto adicional — es lo que reduce el costo por resultado.",
  },
  {
    n: "02",
    title: "En comida, ver es confiar.",
    desc: "Nadie puede probar el sushi antes de decidir. La única evidencia disponible de frescura y calidad es la imagen. Una foto mediocre no comunica «ahorro»: comunica duda.",
  },
  {
    n: "03",
    title: "La calidad visual sostiene el precio.",
    desc: "Un ticket alto necesita evidencia visual que lo justifique. Cuando el contenido se ve por debajo del producto, el cliente compara por precio en lugar de comparar por experiencia.",
  },
  {
    n: "04",
    title: "La decisión de comer fuera es grupal y visual.",
    desc: "Cuando cuatro personas eligen dónde cenar, la decisión se toma pasando un teléfono. Gana el que se ve mejor en esa pantalla, no el que tiene mejor cocina.",
  },
];

const metodo = [
  {
    title: "Línea base",
    desc: "Medimos 3 semanas de venta y tráfico antes de tocar nada. Sin punto de partida no hay resultado demostrable.",
  },
  {
    title: "Estrategia",
    desc: "Calendario de contenido ligado a horarios valle, temporada y platillos de mayor margen.",
  },
  {
    title: "Producción",
    desc: "Foto y video de nivel editorial en su cocina y su salón.",
  },
  {
    title: "Amplificación",
    desc: "Campañas Click-to-WhatsApp segmentadas a 5 km, más posicionamiento en Google Maps.",
  },
  {
    title: "Medición",
    desc: "Reporte mensual con conversaciones, canjes y venta atribuible. Números, no impresiones.",
  },
];

const instrumentos = [
  {
    title: "Click-to-WhatsApp",
    desc: "Cada conversación queda atribuida a la campaña que la generó.",
  },
  {
    title: "Códigos canjeables en punto de venta",
    desc: "Un código por campaña. El POS entrega la cifra exacta.",
  },
  {
    title: "Google Business Profile",
    desc: "Llamadas, solicitudes de ruta y clics medidos de forma nativa.",
  },
  {
    title: "Comparativo contra línea base",
    desc: "Venta del mismo periodo del año anterior y de las semanas previas al arranque.",
  },
];

const canal = [
  "Captación en punto de venta: QR en mesa y en cuenta, con un incentivo claro para suscribirse.",
  "Segmentación por comportamiento: quién pide para llevar, quién viene en fin de semana, quién consume ticket alto.",
  "Calendario de promociones dirigido a horarios valle y días bajos — donde cada mesa adicional es margen neto.",
  "Producción del contenido del canal: no texto plano, sino piezas que se ven como el producto.",
];

/* CONFIRMAR ALCANCES EXACTOS DE TRACCIÓN — base tomada del paquete
   publicado en el sitio, traducido al contexto del restaurante. */
const alcances = [
  {
    title: "Publicidad en Meta y/o Google",
    desc: "Presupuesto de pauta incluido, con campañas Click-to-WhatsApp segmentadas al radio de Atlixcáyotl y Angelópolis.",
  },
  {
    title: "1 video de 1 minuto al mes",
    desc: "La pieza ancla: cocina, barra y salón contados como una sola experiencia.",
  },
  {
    title: "7 reels mensuales",
    desc: "2 optimizados para anuncios y 5 para crecimiento orgánico, priorizando los platillos de mayor margen.",
  },
  {
    title: "8 carruseles con imágenes propias",
    desc: "Carta, temporadas, promociones de horario valle y contenido de marca.",
  },
  {
    title: "WhatsApp Bot para pedidos y reservas",
    desc: "Respuesta inmediata a quien escribe por la campaña, sin depender de que alguien esté libre en el turno.",
  },
  {
    title: "Canal de difusión de WhatsApp",
    desc: "Montaje del canal, captación en punto de venta y calendario de envíos a la base de clientes.",
  },
  {
    title: "Página de ventas + CRM + hosting 6 meses",
    desc: "Un destino propio para pedidos directos, reservas y eventos privados.",
  },
  {
    title: "Configuración técnica completa",
    desc: "Píxel, eventos, códigos canjeables y atribución de conversaciones desde el día uno.",
  },
  {
    title: "Perfil de Google optimizado + reseñas",
    desc: "Para ganar la búsqueda de «sushi Atlixcáyotl» y las solicitudes de ruta de la zona.",
  },
  {
    title: "Videollamada quincenal + consultoría mensual",
    desc: "Revisión de números, calendario del siguiente periodo y ajustes con evidencia.",
  },
  {
    title: "Reporte quincenal en lenguaje claro",
    desc: "Conversaciones, canjes y venta atribuible. Sin métricas de vanidad.",
  },
];

const garantia = [
  "Definimos juntos la meta del periodo en una métrica verificable, antes de arrancar.",
  "Si al cierre del periodo no se alcanza, seguimos trabajando 30 días adicionales sin honorarios.",
  "La garantía aplica sobre honorarios, nunca sobre inversión publicitaria, y está sujeta a los tiempos de respuesta y entrega de material acordados.",
];

/* ── Página ─────────────────────────────────────────────────── */
export default function WasabiClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const rise = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  };

  /* Sección opcional: solo entra si Wasabi tiene reparto propio.
     Cuando entra, va antes del canal de WhatsApp. */
  const SeccionReparto = () => (
    <section
      className="relative px-5 md:px-16 py-24 md:py-32"
      style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
    >
      <div className="max-w-[1300px] mx-auto">
        <KnifeRule />
        <div className="max-w-[760px]">
          <motion.div {...rise}>
            <Eyebrow>Margen que ya está saliendo</Eyebrow>
          </motion.div>
          <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
            <Display className="mb-8">
              Cada pedido por app paga una comisión que{" "}
              <span style={{ color: ACCENT_TEXT }}>puede quedarse en casa.</span>
            </Display>
          </motion.div>
          <motion.p
            {...rise}
            transition={{ ...rise.transition, delay: 0.1 }}
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: MUTED }}
          >
            Las plataformas de reparto cobran una comisión que ronda entre el 25% y
            el 30% de cada orden. Migrar una parte de esas órdenes a pedido directo
            por WhatsApp no requiere conseguir un cliente nuevo: recupera margen
            sobre venta que Wasabi ya está generando. Es el retorno más rápido y más
            fácil de demostrar que existe en un restaurante.
          </motion.p>
          {/* El rango de comisión se presenta como rango y se verifica con el
              cliente en la reunión — nunca como dato cerrado. */}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(12,11,10,0.84)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: ACCENT_TEXT }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span
              className="font-title text-[13px] tracking-[0.1em] uppercase"
              style={{ fontWeight: 700, color: TEXT }}
            >
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
              style={{ color: MUTED }}
            >
              Propuesta · Wasabi
            </span>
            <CTAButton size="sm">Agendar reunión</CTAButton>
          </div>
        </div>
      </nav>

      <main className="relative overflow-hidden" style={{ background: BASE, color: TEXT }}>
        {/* Luz cálida superior */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[100vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 72% 0%, rgba(196,48,43,0.16) 0%, transparent 66%)",
          }}
        />

        {/* ══ 1 · HERO ══════════════════════════════════════════ */}
        <section className="relative px-5 md:px-16 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-14 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[0.14em] uppercase mb-7 flex items-center gap-3"
                style={{ color: ACCENT_TEXT, fontWeight: 500 }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                PG Estrategias × Wasabi
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
                El sushi ya está a la altura.{" "}
                <span style={{ color: ACCENT_TEXT }}>
                  El contenido tiene que venderlo igual.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.75] max-w-[520px] mb-10"
                style={{ color: MUTED }}
              >
                Producción audiovisual y campañas con retorno medible para Wasabi
                Puebla.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <CTAButton size="lg">Agendar reunión</CTAButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 md:order-2"
            >
              <PhoneVideo src={REEL_DEMO} />
            </motion.div>
          </div>
        </section>

        {/* ══ 2 · EL DIAGNÓSTICO ════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-32">
          <div className="max-w-[1300px] mx-auto">
            <KnifeRule />
            <div className="max-w-[820px]">
              <motion.div {...rise}>
                <Eyebrow>El diagnóstico</Eyebrow>
              </motion.div>

              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display className="mb-8">
                  686 publicaciones.{" "}
                  <span style={{ color: ACCENT_TEXT }}>
                    El crecimiento no corresponde.
                  </span>
                </Display>
              </motion.div>

              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8] max-w-[680px]"
                style={{ color: MUTED }}
              >
                No es un problema de cantidad. Es un problema de sistema. Publicar
                sin estrategia de retención hace que cada campaña cueste más
                alcanzar a la misma gente — y ese sobrecosto sale del mismo
                presupuesto que podría estar llenando mesas. Wasabi no necesita
                publicar más. Necesita que cada pieza trabaje.
              </motion.p>

              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.15 }}
                className="font-title mt-14 pl-6"
                style={{
                  fontSize: "clamp(20px, 2.6vw, 32px)",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  letterSpacing: "-0.02em",
                  color: TEXT,
                  borderLeft: `2px solid ${ACCENT}`,
                }}
              >
                El costo de un mal contenido no es estético.{" "}
                <span style={{ color: ACCENT_TEXT }}>Es el CPM.</span>
              </motion.p>
            </div>
          </div>
        </section>

        {/* ══ 3 · LA MECÁNICA ═══════════════════════════════════ */}
        <section
          className="relative px-5 md:px-16 py-24 md:py-32"
          style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="max-w-[1300px] mx-auto">
            <KnifeRule />
            <div className="max-w-[760px] mb-16 md:mb-20">
              <motion.div {...rise}>
                <Eyebrow>La mecánica</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display>
                  Calidad no es un lujo. Es lo que{" "}
                  <span style={{ color: ACCENT_TEXT }}>
                    baja su costo por cliente.
                  </span>
                </Display>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
              {mecanica.map((m, i) => (
                <motion.div
                  key={m.n}
                  {...rise}
                  transition={{ ...rise.transition, delay: i * 0.07 }}
                >
                  <p
                    className="font-body text-[11px] tracking-[0.14em] mb-4"
                    style={{ color: ACCENT_TEXT }}
                  >
                    {m.n}
                  </p>
                  <h3
                    className="font-title mb-3"
                    style={{
                      fontSize: "clamp(18px, 1.7vw, 23px)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: TEXT,
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.75] max-w-[480px]"
                    style={{ color: MUTED }}
                  >
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FOTO_PENDIENTE: aquí puede entrar una fotografía de producto
                a ancho completo si se suma material más adelante. */}
          </div>
        </section>

        {/* ══ 4 · PORTAFOLIO ════════════════════════════════════ */}
        {/* Solo se renderiza cuando haya fotografías. Sin material, el
            argumento queda cubierto por la sección anterior. */}
        {FOTOS.length > 0 && (
          <section className="relative px-5 md:px-16 py-24 md:py-32">
            <div className="max-w-[1300px] mx-auto">
              <KnifeRule />
              <div className="max-w-[760px] mb-16">
                <motion.div {...rise}>
                  <Eyebrow>Nuestro trabajo</Eyebrow>
                </motion.div>
                <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                  <Display>
                    Esto es lo que{" "}
                    <span style={{ color: ACCENT_TEXT }}>producimos.</span>
                  </Display>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FOTOS.map((f, i) => (
                  <motion.div
                    key={f.src}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.05 }}
                    className="overflow-hidden"
                    style={{ aspectRatio: "4 / 5", background: SURFACE }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ 5 · EL MÉTODO ═════════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-32">
          <div className="max-w-[1300px] mx-auto">
            <KnifeRule />
            <div className="max-w-[760px] mb-16 md:mb-20">
              <motion.div {...rise}>
                <Eyebrow>El método</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display>
                  Un proceso,{" "}
                  <span style={{ color: ACCENT_TEXT }}>no ocurrencias.</span>
                </Display>
              </motion.div>
            </div>

            <div className="relative">
              <span
                aria-hidden
                className="absolute left-[13px] md:left-[15px] top-3 bottom-3 w-px"
                style={{
                  background: `linear-gradient(to bottom, ${ACCENT}, rgba(196,48,43,0.12))`,
                }}
              />

              <ol className="flex flex-col gap-10 md:gap-12">
                {metodo.map((step, i) => (
                  <motion.li
                    key={step.title}
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
                        color: ACCENT_TEXT,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>

                    <h3
                      className="font-title"
                      style={{
                        fontSize: "clamp(18px, 1.7vw, 23px)",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
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

        {/* ══ 6 · LOS NÚMEROS ═══════════════════════════════════ */}
        <section
          className="relative px-5 md:px-16 py-24 md:py-32"
          style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="max-w-[1300px] mx-auto">
            <KnifeRule />
            <div className="max-w-[760px] mb-14">
              <motion.div {...rise}>
                <Eyebrow>Los números</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display className="mb-8">
                  Si no se puede medir,{" "}
                  <span style={{ color: ACCENT_TEXT }}>no lo proponemos.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: MUTED }}
              >
                Un restaurante no se mide en likes. Estos son los cuatro
                instrumentos que instalamos desde el día uno:
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {instrumentos.map((ins, i) => (
                <motion.div
                  key={ins.title}
                  {...rise}
                  transition={{ ...rise.transition, delay: i * 0.06 }}
                  className="p-7 md:p-8"
                  style={{
                    border: `1px solid ${BORDER}`,
                    background: "rgba(242,237,230,0.02)",
                  }}
                >
                  <span
                    aria-hidden
                    className="block h-px w-8 mb-5"
                    style={{ background: ACCENT }}
                  />
                  <h3
                    className="font-title mb-2"
                    style={{ fontSize: "18px", fontWeight: 400, color: TEXT }}
                  >
                    {ins.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.7]"
                    style={{ color: MUTED }}
                  >
                    {ins.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.2 }}
              className="font-title mt-12 max-w-[720px]"
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 400,
                lineHeight: 1.45,
                color: TEXT,
              }}
            >
              Con estos cuatro instrumentos, al final del primer mes no hay
              opinión: <span style={{ color: ACCENT_TEXT }}>hay un número.</span>
            </motion.p>
          </div>
        </section>

        {/* ══ (opcional) MARGEN POR COMISIONES ══════════════════ */}
        {TIENE_REPARTO_PROPIO && <SeccionReparto />}

        {/* ══ 7 · CANAL DE WHATSAPP ═════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-32">
          <div className="max-w-[1300px] mx-auto">
            <KnifeRule />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20">
              <div>
                <motion.div {...rise}>
                  <Eyebrow>El activo que ya tienen</Eyebrow>
                </motion.div>
                <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                  <Display className="mb-8">
                    Sus mejores clientes ya son suyos.{" "}
                    <span style={{ color: ACCENT_TEXT }}>Falta poder hablarles.</span>
                  </Display>
                </motion.div>
                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.1 }}
                  className="font-body text-[15px] leading-[1.8] max-w-[520px]"
                  style={{ color: MUTED }}
                >
                  Cada persona que ya comió en Wasabi vale más que un desconocido:
                  conoce el producto, confía en el precio y no necesita ser
                  convencida. Un canal de difusión de WhatsApp convierte esa base en
                  un medio propio — sin comisiones, sin algoritmo de por medio, sin
                  pagar por alcanzar a quien ya los eligió una vez.
                </motion.p>
              </div>

              <div>
                <ul className="flex flex-col">
                  {canal.map((c, i) => (
                    <motion.li
                      key={c}
                      {...rise}
                      transition={{ ...rise.transition, delay: 0.1 + i * 0.07 }}
                      className="flex items-start gap-4 py-5"
                      style={{ borderTop: `1px solid ${BORDER}` }}
                    >
                      <span
                        className="mt-[9px] shrink-0"
                        style={{ width: 16, height: 2, background: ACCENT }}
                      />
                      <span
                        className="font-body text-[14px] leading-[1.7]"
                        style={{ color: TEXT }}
                      >
                        {c}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.4 }}
                  className="font-title mt-10 pl-6"
                  style={{
                    fontSize: "clamp(20px, 2.4vw, 30px)",
                    fontWeight: 400,
                    lineHeight: 1.35,
                    letterSpacing: "-0.02em",
                    color: ACCENT_TEXT,
                    borderLeft: `2px solid ${ACCENT}`,
                  }}
                >
                  Un canal propio no cobra CPM.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 9 · PAQUETE TRACCIÓN ══════════════════════════════ */}
        <section
          className="relative px-5 md:px-16 py-24 md:py-32 overflow-hidden"
          style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(196,48,43,0.13) 0%, transparent 65%)",
            }}
          />

          <div className="relative max-w-[1000px] mx-auto">
            <KnifeRule />
            <div className="text-center mb-14">
              <motion.div {...rise}>
                <Eyebrow centered>La propuesta</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display size="clamp(48px, 7.5vw, 104px)" className="mb-8">
                  <span style={{ color: ACCENT_TEXT }}>Tracción.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8] max-w-[620px] mx-auto"
                style={{ color: MUTED }}
              >
                El paquete para negocios que ya tienen el producto resuelto y
                necesitan que el mercado lo vea así de bien.
              </motion.p>
            </div>

            <motion.div
              {...rise}
              transition={{ ...rise.transition, delay: 0.15 }}
              className="p-7 md:p-14"
              style={{
                border: `1px solid rgba(196,48,43,0.35)`,
                background: `linear-gradient(150deg, ${ACCENT_SOFT} 0%, rgba(242,237,230,0.02) 55%)`,
              }}
            >
              <p
                className="font-body text-[11px] uppercase tracking-[0.14em] mb-8 pb-6"
                style={{ color: ACCENT_TEXT, borderBottom: `1px solid ${BORDER}` }}
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
                        stroke={ACCENT_TEXT}
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
                  className="font-body text-[13px] leading-[1.6] max-w-[420px]"
                  style={{ color: MUTED }}
                >
                  Inversión y calendario de arranque se presentan en la reunión,
                  junto con la meta del primer periodo.
                </p>
                <CTAButton>Agendar reunión</CTAButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 10 · LA GARANTÍA ══════════════════════════════════ */}
        {/* IMPORTANTE: definir la métrica y el número de la meta antes de
            presentar, y que un abogado revise la redacción contractual. */}
        <section className="relative px-5 md:px-16 py-24 md:py-32">
          <div className="max-w-[1300px] mx-auto">
            <KnifeRule />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20">
              <div>
                <motion.div {...rise}>
                  <Eyebrow>Cómo compartimos el riesgo</Eyebrow>
                </motion.div>
                <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                  <Display className="mb-8">
                    No garantizamos su operación.{" "}
                    <span style={{ color: ACCENT_TEXT }}>Garantizamos la nuestra.</span>
                  </Display>
                </motion.div>
                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.1 }}
                  className="font-body text-[15px] leading-[1.8] max-w-[520px]"
                  style={{ color: MUTED }}
                >
                  Nosotros controlamos el alcance, el costo por conversación y la
                  calidad de la producción. Ustedes controlan el precio, la cocina y
                  la velocidad con la que se responde un mensaje. Garantizar el
                  retorno completo sería garantizar algo que no está en nuestras
                  manos — y quien lo promete, no piensa cumplirlo.
                </motion.p>
              </div>

              <div>
                <ol className="flex flex-col gap-3">
                  {garantia.map((g, i) => (
                    <motion.li
                      key={g}
                      {...rise}
                      transition={{ ...rise.transition, delay: 0.1 + i * 0.07 }}
                      className="flex items-start gap-4 p-6"
                      style={{
                        border: `1px solid ${BORDER}`,
                        background: "rgba(242,237,230,0.02)",
                      }}
                    >
                      <span
                        className="font-title text-[13px] shrink-0"
                        style={{ color: ACCENT_TEXT, fontWeight: 700 }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="font-body text-[14px] leading-[1.7]"
                        style={{ color: TEXT }}
                      >
                        {g}
                      </span>
                    </motion.li>
                  ))}
                </ol>

                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.35 }}
                  className="font-body text-[14px] leading-[1.7] mt-8"
                  style={{ color: MUTED }}
                >
                  Es una garantía corta y clara. Preferimos eso a una promesa grande
                  que no podríamos sostener.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 11 · CTA FINAL ════════════════════════════════════ */}
        <section
          className="relative flex items-center justify-center px-5 md:px-16 py-32 md:py-44 min-h-[85vh] overflow-hidden"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          {REEL_DEMO ? (
            <video
              aria-hidden
              src={REEL_DEMO}
              poster={posterOf(REEL_DEMO)}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "blur(6px)", transform: "scale(1.06)" }}
            />
          ) : null}

          {/* Overlay: el reel se lee como textura, no como repetición */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: REEL_DEMO
                ? "linear-gradient(rgba(12,11,10,0.88), rgba(12,11,10,0.94))"
                : "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(196,48,43,0.18) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[900px] mx-auto text-center">
            <motion.div {...rise}>
              <Eyebrow centered>PG Estrategias × Wasabi</Eyebrow>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
              <Display size="clamp(32px, 5vw, 64px)" className="mb-12">
                Empecemos midiendo.{" "}
                <span style={{ color: ACCENT_TEXT }}>
                  El resto se decide con números.
                </span>
              </Display>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
              <CTAButton size="lg">Agendar reunión</CTAButton>
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
            background: "rgba(12,11,10,0.93)",
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
