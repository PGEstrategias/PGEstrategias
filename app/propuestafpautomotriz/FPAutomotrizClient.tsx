"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   PALETA — taller: grafito, acero y el rojo de PG como único
   acento. El rojo hace el trabajo de la caja de herramientas.
   ──────────────────────────────────────────────────────────── */
const BASE = "#0D0E0F";
const SURFACE = "#16181A";
const TEXT = "#E4E0DD";
const MUTED = "#9A948F";
const ACCENT = "#D63A27";
const ACCENT_DIM = "rgba(214,58,39,0.14)";
const ACCENT_SOFT = "rgba(214,58,39,0.06)";
const BORDER = "rgba(228,224,221,0.10)";

/* Nombre del taller — cambiarlo aquí lo cambia en toda la página. */
const TALLER = "FP Automotriz";

const WA_LINK =
  "https://wa.me/522201758468?text=Hola%20Pablo,%20vi%20la%20propuesta%20para%20FP%20Automotriz";

/* ── Videos de muestra ──────────────────────────────────────── */
const VIDEO_A =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4";
const VIDEO_B =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785888058/AQPQOFP2CknFh7iZjtFDWRGeqLuiu-wE6o3L4EaKSH4XoEaxIAgPuWhJrRtB7CHuNDnCAdvL-XfWcEP_h32SaGdC627KoUHNg29_hbI_fz6dxd.mp4";
// Cloudinary genera el poster con la misma URL cambiando .mp4 por .jpg
const posterOf = (url: string) => url.replace(/\.mp4$/, ".jpg");

/* ────────────────────────────────────────────────────────────
   Video vertical: marco de teléfono en desktop, fullwidth nativo
   en mobile. Lazy load real + play/pausa por visibilidad.
   ──────────────────────────────────────────────────────────── */
function PhoneVideo({
  src,
  caption,
  eager = false,
}: {
  src: string;
  caption?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(eager);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  // Si el usuario pausa a propósito, no lo reanudamos al volver a verlo.
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
    <div className="relative w-full md:max-w-[320px] mx-auto">
      {/* Glow de acento detrás del teléfono */}
      <div
        aria-hidden
        className="hidden md:block absolute -inset-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(214,58,39,0.14) 0%, transparent 68%)",
          filter: "blur(24px)",
        }}
      />

      <div
        className="relative md:p-[10px] md:rounded-[46px]"
        style={{
          background: "linear-gradient(160deg, #23262a 0%, #060708 100%)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.95)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[18px] md:rounded-[38px] max-h-[62vh] md:max-h-none"
          style={{ aspectRatio: "9 / 16", background: "#060708" }}
        >
          {/* Notch — solo desktop */}
          <span
            aria-hidden
            className="hidden md:block absolute top-[10px] left-1/2 -translate-x-1/2 z-20 rounded-full"
            style={{ width: 86, height: 22, background: "#060708" }}
          />

          <video
            ref={ref}
            src={loaded ? src : undefined}
            poster={posterOf(src)}
            muted
            loop
            playsInline
            autoPlay={eager && !reduce}
            controls={!!reduce}
            preload="metadata"
            aria-label={caption ?? "Video de muestra de producción"}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
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
              style={{ outlineColor: ACCENT }}
              aria-label={playing ? "Pausar video" : "Reproducir video"}
            >
              {!playing && (
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "rgba(6,7,8,0.35)" }}
                />
              )}
              <span
                className="relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                style={{
                  width: 62,
                  height: 62,
                  background: "rgba(13,14,15,0.62)",
                  border: "1px solid rgba(214,58,39,0.55)",
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
                    <path d="M8 5.5v13l11-6.5-11-6.5z" />
                  </svg>
                )}
              </span>
            </button>
          )}
        </div>
      </div>

      {caption && (
        <p
          className="font-body text-[12px] leading-[1.6] text-center mt-5 px-2"
          style={{ color: MUTED }}
        >
          {caption}
        </p>
      )}
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
        color: "#FFF6F4",
        fontWeight: 700,
        outlineColor: ACCENT,
        boxShadow: "0 12px 40px -12px rgba(214,58,39,0.55)",
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

const PRECIO = "$6,500";
const PAUTA = "$1,000";

/* Lo que entra en la mensualidad, no lo que esperamos lograr. */
const heroSpecs = [
  { num: PRECIO, label: "MXN al mes" },
  { num: PAUTA, label: "De pauta incluidos" },
  { num: "4", label: "Videos mensuales" },
  { num: "500", label: "Mensajes al mes" },
];

const focos = [
  {
    count: "Recurrencia",
    title: "Que el cliente regrese solo",
    desc: "Lealtad y recordatorios automáticos para que el mantenimiento no dependa de que el cliente se acuerde.",
  },
  {
    count: "Visibilidad",
    title: "Aparecer cuando lo buscan",
    desc: "Google Maps y pauta local para ganar la búsqueda de «taller mecánico cerca de mí» en tu zona.",
  },
  {
    count: "Confianza",
    title: "Verse como el taller serio",
    desc: "Video y contenido que muestran el trabajo por dentro — la razón por la que alguien deja su carro contigo y no en la esquina.",
  },
];

type Pilar = {
  num: string;
  name: string;
  headline: string;
  description: string;
  items: string[];
};

const pilares: Pilar[] = [
  {
    num: "01",
    name: "Programa de lealtad",
    headline: "Un motivo real para volver contigo.",
    description:
      "Diseñamos el programa desde cero — niveles, beneficios y reglas — y lo dejamos corriendo dentro del bot, para que no dependa de que alguien lleve la cuenta a mano.",
    items: [
      "Definición de beneficios por frecuencia de servicio.",
      "Registro del cliente desde WhatsApp, sin apps ni tarjetas.",
      "Acumulación y aviso automático de beneficios disponibles.",
      "Beneficios pensados para el ciclo del auto, no descuentos sueltos.",
      "Programa de referidos para que un cliente traiga al siguiente.",
    ],
  },
  {
    num: "02",
    name: "Bot de WhatsApp",
    headline: "Atiende, recuerda y da seguimiento sin ocupar a nadie.",
    description:
      "El bot responde lo repetitivo, agenda y ejecuta las campañas a la base de datos. Es la pieza que convierte la lista de clientes en trabajo agendado.",
    items: [
      "Respuesta automática a horarios, ubicación y servicios.",
      "Cotización guiada según marca, modelo y servicio.",
      "Agenda de cita y confirmación un día antes.",
      "Aviso automático cuando el auto está listo.",
      "Seguimiento a quien pidió precio y no volvió a escribir.",
      "Envío de las campañas a la base segmentada.",
    ],
  },
  {
    num: "03",
    name: "Base de datos y reactivación",
    headline: "Tu mejor lista de clientes ya la tienes.",
    description:
      "Construimos, limpiamos y segmentamos la base de clientes que ya pasaron por el taller para poder hablarles por el motivo correcto en el mes correcto.",
    items: [
      "Captura y ordenamiento de los clientes que ya atendiste.",
      "Segmentación por último servicio, fecha y tipo de auto.",
      "Identificación de quién ya toca mantenimiento.",
      "500 mensajes al mes por WhatsApp o correo.",
      "Registro de quién respondió y quién agendó.",
    ],
  },
  {
    num: "04",
    name: "Producción audiovisual",
    headline: "El trabajo se ve, deja de explicarse.",
    description:
      "Grabamos en el taller y editamos las piezas del mes: reels para redes y anuncios, gráficos y carruseles con texto que vende.",
    items: [
      "4 reels mensuales — 1 para anuncios, 3 para redes.",
      "1 video de 1 minuto para la página de ventas.",
      "3 diseños gráficos con texto persuasivo.",
      "3 carruseles para redes sociales.",
      "Contenido de proceso: diagnóstico, antes y después, herramienta.",
    ],
  },
  {
    num: "05",
    name: "Google Business Profile",
    headline: "Ganar la búsqueda de tu colonia.",
    description:
      "La mayoría de los clientes de un taller salen de una búsqueda local con urgencia. Ahí se compite con ficha, fotos y reseñas — y eso sí se trabaja.",
    items: [
      "Perfil completo: servicios, horarios, zona y fotos reales.",
      "Publicaciones periódicas dentro del perfil.",
      "Estrategia para pedir reseñas después de cada servicio.",
      "Respuesta a reseñas, incluidas las malas.",
      "Optimización por servicio y por zona de búsqueda.",
    ],
  },
  {
    num: "06",
    name: "Pauta y medición",
    headline: "Cada peso puesto donde sí entra trabajo.",
    description:
      `Los ${PAUTA} de pauta están incluidos en la mensualidad. Se invierten donde el taller convierte, y se mide qué campaña llenó qué bahía.`,
    items: [
      "Campañas en Meta o Google segmentadas por zona.",
      "Anuncios por servicio: afinación, frenos, suspensión, diagnóstico.",
      "Configuración técnica completa — píxeles, eventos y rastreo.",
      "Página de ventas diseñada e incluida.",
      "1 videollamada estratégica mensual y reporte en lenguaje claro.",
    ],
  },
];

/* Ejemplos de campañas para la base — el calendario real se arma
   con el histórico del taller en la primera reunión. */
const campanas = [
  {
    mes: "Campaña 01",
    titulo: "«Haz tu afinación este mes con nosotros»",
    a: "A quien no ha vuelto en 6 meses o más",
    desc: "El clásico. Recordatorio con precio cerrado y cita apartada desde el mismo mensaje.",
  },
  {
    mes: "Campaña 02",
    titulo: "«Antes de las lluvias: frenos y limpiabrisas»",
    a: "A toda la base, por temporada",
    desc: "Revisión de seguridad con motivo de calendario. Vende sola porque el motivo es real.",
  },
  {
    mes: "Campaña 03",
    titulo: "«Te toca verificación»",
    a: "Segmentado por engomado y terminación de placa",
    desc: "Aviso con la fecha límite del cliente y el servicio previo para pasarla a la primera.",
  },
  {
    mes: "Campaña 04",
    titulo: "«Tu aire acondicionado antes del calor»",
    a: "A quien nunca ha pedido ese servicio",
    desc: "Servicio de temporada dirigido a clientes que solo te conocen por otra cosa.",
  },
  {
    mes: "Campaña 05",
    titulo: "«Ya te toca cambio de aceite»",
    a: "Por kilometraje estimado desde el último servicio",
    desc: "El mensaje que convierte una visita suelta en un ciclo de mantenimiento contigo.",
  },
  {
    mes: "Campaña 06",
    titulo: "«Revisión antes de salir de viaje»",
    a: "A toda la base, en puentes y vacaciones",
    desc: "Diciembre y Semana Santa: revisión completa antes de carretera.",
  },
  {
    mes: "Campaña 07",
    titulo: "«Trae a un amigo y los dos ganan»",
    a: "A clientes frecuentes del programa de lealtad",
    desc: "Referidos con beneficio para los dos lados, controlado desde el bot.",
  },
  {
    mes: "Campaña 08",
    titulo: "«Diagnóstico sin costo por ser cliente»",
    a: "A clientes con nivel de lealtad acumulado",
    desc: "Recompensa que además abre la puerta a detectar el siguiente servicio.",
  },
];

const alcances = [
  {
    title: "Publicidad en Meta o Google",
    desc: `Los ${PAUTA} de pauta están incluidos en la mensualidad — no son un costo aparte. Campañas segmentadas por zona y por servicio.`,
  },
  {
    title: "Bot de WhatsApp",
    desc: "Atiende preguntas frecuentes, cotiza, agenda citas y ejecuta las campañas a la base de clientes.",
  },
  {
    title: "Programa de lealtad operado con el bot",
    desc: "Beneficios por frecuencia, registro sin app y avisos automáticos cuando el cliente ya tiene algo que reclamar.",
  },
  {
    title: "Base de datos construida y segmentada",
    desc: "Ordenamos a los clientes que ya pasaron por el taller y los agrupamos por último servicio, fecha y tipo de auto.",
  },
  {
    title: "500 mensajes por WhatsApp o correo al mes",
    desc: "El volumen con el que corren las campañas de reactivación y los recordatorios de mantenimiento.",
  },
  {
    title: "4 reels mensuales",
    desc: "1 para anuncios y 3 para redes, grabados en el taller.",
  },
  {
    title: "1 video de 1 minuto para tu página de ventas",
    desc: "La pieza que presenta el taller completo a quien llega por primera vez.",
  },
  {
    title: "3 diseños gráficos con texto persuasivo",
    desc: "Promociones, servicios de temporada y campañas de lealtad.",
  },
  {
    title: "3 carruseles para redes sociales",
    desc: "Formato para explicar servicios, procesos y precios por partes.",
  },
  {
    title: "Página de ventas diseñada e incluida",
    desc: "Un destino propio para los anuncios, con servicios, ubicación y contacto directo.",
  },
  {
    title: "Configuración técnica completa",
    desc: "Píxeles, eventos y rastreo para saber qué campaña trajo qué cliente.",
  },
  {
    title: "Perfil de Google optimizado + estrategia de reseñas",
    desc: "Ficha completa, publicaciones y un flujo para pedir reseñas después de cada servicio.",
  },
  {
    title: "1 videollamada estratégica mensual",
    desc: "Revisión de resultados y definición de las campañas del siguiente mes.",
  },
  {
    title: "Reporte mensual en lenguaje claro",
    desc: "Qué se hizo, qué respondió la base y de dónde salieron los clientes nuevos.",
  },
];

const arranque = [
  {
    title: "Base y programa",
    desc: "Ordenamos la lista de clientes, definimos los beneficios del programa de lealtad y armamos el calendario de campañas.",
  },
  {
    title: "Producción y bot",
    desc: "Grabamos en el taller y dejamos el bot configurado: cotización, agenda, recordatorios y envío de campañas.",
  },
  {
    title: "Campañas corriendo",
    desc: "Pauta local activa y las primeras campañas de reactivación saliendo a la base segmentada.",
  },
];

/* ── Página ─────────────────────────────────────────────────── */
export default function FPAutomotrizClient() {
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
          background: "rgba(13,14,15,0.82)",
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
              Propuesta · FP Automotriz
            </span>
            <CTAButton size="sm">Agendar reunión</CTAButton>
          </div>
        </div>
      </nav>

      <main
        className="relative overflow-hidden"
        style={{ background: BASE, color: TEXT }}
      >
        {/* Luz de bahía */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[110vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 70% 0%, rgba(214,58,39,0.15) 0%, transparent 65%)",
          }}
        />
        {/* Rejilla de piso de taller */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(228,224,221,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(228,224,221,0.7) 1px, transparent 1px)",
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
                PG Estrategias × {TALLER}
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
                Ya pasaron por {TALLER}.{" "}
                <span style={{ color: ACCENT }}>Falta que regresen.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.75] max-w-[560px] mb-10"
                style={{ color: MUTED }}
              >
                Producción audiovisual, campañas locales y un bot de WhatsApp que
                reactiva a los clientes que ya conocen {TALLER} — para que el
                taller deje de depender de que a alguien se le descomponga el
                carro.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <CTAButton size="lg">Agendar reunión</CTAButton>
              </motion.div>

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
                      style={{
                        fontSize: "clamp(22px, 2vw, 28px)",
                        fontWeight: 400,
                        color: TEXT,
                      }}
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
                Tu mejor lista de clientes ya la tienes.{" "}
                <span style={{ color: ACCENT }}>
                  Está dormida en un cuaderno o en un celular.
                </span>
              </Display>
            </motion.div>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.1 }}
              className="font-body text-[15px] leading-[1.8] max-w-[700px] mx-auto"
              style={{ color: MUTED }}
            >
              Un taller no vive solo de clientes nuevos. Cada auto que entró tiene
              un ciclo predecible: aceite, frenos, afinación, verificación,
              suspensión. El problema no es que el cliente no quiera volver — es
              que nadie le avisa cuándo le toca, y cuando algo falla termina en el
              taller que le quedó más cerca ese día.
            </motion.p>

            <motion.p
              {...rise}
              transition={{ ...rise.transition, delay: 0.15 }}
              className="font-body text-[15px] leading-[1.8] max-w-[700px] mx-auto mt-6"
              style={{ color: MUTED }}
            >
              Esta propuesta ataca las dos puntas: recuperar a quien ya te conoce y
              aparecer frente a quien todavía no. Lo primero es más barato, más
              rápido y casi nadie en el gremio lo está haciendo.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-16 text-left">
              {focos.map((f, i) => (
                <motion.div
                  key={f.count}
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.1 + i * 0.07 }}
                  className="p-7 relative"
                  style={{
                    border: `1px solid ${BORDER}`,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[2px]"
                    style={{ background: ACCENT }}
                  />
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.14em] mb-4"
                    style={{ color: ACCENT }}
                  >
                    {f.count}
                  </p>
                  <h3
                    className="font-title mb-2.5"
                    style={{ fontSize: "18px", fontWeight: 400, color: TEXT }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="font-body text-[13px] leading-[1.65]"
                    style={{ color: MUTED }}
                  >
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3 · EL SISTEMA ════════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-36">
          <div className="max-w-[1300px] mx-auto">
            <div className="max-w-[760px] mb-16">
              <motion.div {...rise}>
                <Eyebrow>El sistema</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display className="mb-7">
                  Seis frentes trabajando{" "}
                  <span style={{ color: ACCENT }}>al mismo tiempo.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: MUTED }}
              >
                No es publicar en redes y esperar. Cada frente alimenta al
                siguiente: el contenido llena la pauta, la pauta llena la base, la
                base alimenta al bot y el bot regresa clientes a la bahía.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pilares.map((p, i) => (
                <motion.div
                  key={p.num}
                  {...rise}
                  transition={{ ...rise.transition, delay: (i % 2) * 0.07 }}
                  className="relative p-7 md:p-9"
                  style={{
                    border: `1px solid ${BORDER}`,
                    background: `linear-gradient(150deg, ${ACCENT_SOFT} 0%, rgba(255,255,255,0.015) 55%)`,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[2px]"
                    style={{ background: ACCENT }}
                  />

                  <div className="flex items-baseline gap-4 mb-5">
                    <span
                      className="font-title leading-none"
                      style={{ fontSize: "34px", fontWeight: 400, color: ACCENT }}
                    >
                      {p.num}
                    </span>
                    <span
                      className="font-body text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      {p.name}
                    </span>
                  </div>

                  <h3
                    className="font-title mb-3"
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 26px)",
                      fontWeight: 400,
                      color: TEXT,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.headline}
                  </h3>

                  <p
                    className="font-body text-[14px] leading-[1.7] mb-7"
                    style={{ color: MUTED }}
                  >
                    {p.description}
                  </p>

                  <ul className="flex flex-col gap-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <svg
                          width="13"
                          height="13"
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
                        <span
                          className="font-body text-[13.5px] leading-[1.6]"
                          style={{ color: TEXT }}
                        >
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4 · CAMPAÑAS A LA BASE ════════════════════════════ */}
        <section
          className="relative px-5 md:px-16 py-24 md:py-36"
          style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="max-w-[1300px] mx-auto">
            <div className="max-w-[760px] mb-16">
              <motion.div {...rise}>
                <Eyebrow>Campañas a la base</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display className="mb-7">
                  Un motivo distinto para escribirles{" "}
                  <span style={{ color: ACCENT }}>cada mes.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: MUTED }}
              >
                El bot no manda el mismo mensaje a todos. Cada campaña sale a un
                segmento distinto de la base, por un motivo que el cliente
                reconoce como suyo. Estos son ejemplos del tipo de campaña que
                armamos — el calendario definitivo se define contigo en la primera
                reunión, con el histórico real del taller.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {campanas.map((c, i) => (
                <motion.div
                  key={c.titulo}
                  {...rise}
                  transition={{ ...rise.transition, delay: (i % 4) * 0.06 }}
                  className="p-6 flex flex-col"
                  style={{
                    border: `1px solid ${BORDER}`,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.14em] mb-4"
                    style={{ color: ACCENT }}
                  >
                    {c.mes}
                  </p>
                  <h3
                    className="font-title mb-3"
                    style={{
                      fontSize: "17px",
                      fontWeight: 400,
                      color: TEXT,
                      lineHeight: 1.25,
                    }}
                  >
                    {c.titulo}
                  </h3>
                  <p
                    className="font-body text-[12px] leading-[1.6] mb-4 pb-4"
                    style={{ color: ACCENT, borderBottom: `1px solid ${BORDER}` }}
                  >
                    {c.a}
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.65]"
                    style={{ color: MUTED }}
                  >
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5 · MUESTRAS DE PRODUCCIÓN ════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center max-w-[720px] mx-auto mb-16">
              <motion.div {...rise}>
                <Eyebrow centered>Producción</Eyebrow>
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
                <Display size="clamp(30px, 4.6vw, 56px)" className="mb-7">
                  Así se ve el trabajo{" "}
                  <span style={{ color: ACCENT }}>que producimos.</span>
                </Display>
              </motion.div>
              <motion.p
                {...rise}
                transition={{ ...rise.transition, delay: 0.1 }}
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: MUTED }}
              >
                Dos ejemplos del nivel de producción que entra en el paquete. El
                mismo tratamiento aplicado a la bahía, a la herramienta y al
                proceso de un servicio.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10">
              <motion.div {...rise}>
                <PhoneVideo
                  src={VIDEO_A}
                  caption="Pieza de producto en movimiento — el tratamiento que le damos a un auto en cámara."
                />
              </motion.div>
              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.08 }}>
                <PhoneVideo
                  src={VIDEO_B}
                  caption="Formato vertical para redes y anuncios, editado para retener en los primeros segundos."
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 6 · LA PROPUESTA ══════════════════════════════════ */}
        <section className="relative px-5 md:px-16 py-24 md:py-36 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.12) 0%, transparent 65%)",
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
                Nuestro paquete de arranque, ajustado al taller: mismo sistema de
                producción y campañas, con el bot y el programa de lealtad como eje
                central.
              </motion.p>

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
                border: "1px solid rgba(214,58,39,0.30)",
                background: `linear-gradient(150deg, rgba(214,58,39,0.07) 0%, ${SURFACE} 55%)`,
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
                  Precio en pesos mexicanos, sin IVA. Los {PAUTA} de pauta van
                  incluidos en la mensualidad.
                </p>
                <CTAButton>Agendar reunión</CTAButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 7 · LA GARANTÍA ═══════════════════════════════════ */}
        {/* Conviene que un abogado revise la redacción contractual de la
            garantía antes de firmar. */}
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
                  Nosotros controlamos el alcance, las campañas y la calidad de la
                  producción. Ustedes controlan el precio, el tiempo de entrega y
                  la experiencia de quien deja su auto. Por eso nos comprometemos
                  con lo que sí está en nuestras manos: llevar clientes a la
                  bahía. Que regresen la segunda vez ya es trabajo del taller — y
                  con el programa de lealtad corriendo, es la parte fácil.
                </motion.p>
              </div>

              <div>
                <motion.div
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.15 }}
                  className="p-8 md:p-10"
                  style={{
                    border: "1px solid rgba(214,58,39,0.30)",
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
                      fontSize: "clamp(34px, 4.4vw, 56px)",
                      fontWeight: 400,
                      color: ACCENT,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    30 días
                  </p>
                  <p
                    className="font-body text-[15px] leading-[1.7] mb-6"
                    style={{ color: TEXT }}
                  >
                    más de trabajo sin costo. Si al cierre del periodo no hay más
                    citas agendadas y más clientes entrando al taller que antes de
                    arrancar, seguimos trabajando un mes adicional sin honorarios
                    hasta lograrlo.
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.65] pt-6"
                    style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}
                  >
                    Aplica sobre honorarios, nunca sobre la inversión publicitaria.
                    El punto de partida se registra juntos antes de arrancar.
                  </p>
                </motion.div>

                <motion.p
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.25 }}
                  className="font-body text-[14px] leading-[1.7] mt-8"
                  style={{ color: MUTED }}
                >
                  Es una garantía corta y clara. Preferimos eso a una promesa
                  grande que no podríamos sostener.
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
                {arranque.map((g, i) => (
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
                Ese es el tiempo que toma ordenar la base, dejar el bot corriendo y
                producir el contenido. Los resultados empiezan a leerse a partir
                del día 45 — antes de eso hay trabajo, no cifras.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ══ 8 · CTA FINAL ═════════════════════════════════════ */}
        <section
          className="relative flex items-center justify-center px-5 md:px-16 py-32 md:py-44 min-h-[85vh]"
          style={{
            backgroundImage: `linear-gradient(rgba(13,14,15,0.90), rgba(13,14,15,0.97)), url(${posterOf(
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
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(214,58,39,0.16) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[900px] mx-auto text-center">
            <motion.div {...rise}>
              <Eyebrow centered>PG Estrategias × {TALLER}</Eyebrow>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
              <Display size="clamp(32px, 5vw, 64px)" className="mb-12">
                Los clientes de {TALLER} ya existen.{" "}
                <span style={{ color: ACCENT }}>Vamos por ellos.</span>
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
            background: "rgba(13,14,15,0.92)",
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
