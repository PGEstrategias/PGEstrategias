"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta — Mercedes-Benz Reyes Huerta × PG Estrategias.

   Marketing digital y producción audiovisual a la altura de la marca.
   La presentación se apoya en el video: el hero (horizontal) y el clímax
   (vertical) van sin texto encima; los alcances van en dos columnas (texto
   breve a la izquierda, video a la derecha). Casi todo se platica en la
   reunión, así que el texto se mantiene al mínimo.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Mercedes-Benz Reyes Huerta";
const PRECIO = "15,000";

/* ── Video ──────────────────────────────────────────────────── */

/* Hero: pieza horizontal (16:9), va a pantalla completa. */
const V_HERO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1788374428/Luxury_SUV_driving_on_road_202609021136_d61v0b.mp4";
/* Clímax: demo vertical producida para Reyes Huerta, completa y con audio. */
const V_DEMO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1788051909/DemoMercedes_csof2x.mp4";

const V_IA =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4";
const V_RODANDO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4";
const V_NARRATIVA =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082394/ZenithMustangBlackHorse_ld8o8z.mp4";
const V_OBJETIVO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612470/Challenger_vur6pe.mp4";
const V_ENTREGA =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4";
const V_DRIVE =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4";
const V_PADEL =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1788371985/videopadel_v0vauq.mp4";

const IMG_TREND_1 =
  "https://res.cloudinary.com/djduba5fd/image/upload/v1788372113/WhatsApp_Image_2026-09-02_at_12.00.51_v72nvk.jpg";
const IMG_TREND_2 =
  "https://res.cloudinary.com/djduba5fd/image/upload/v1788372113/WhatsApp_Image_2026-09-02_at_12.00.52_bzlbyt.jpg";

/* Inserta transformaciones de Cloudinary (formato/calidad automáticos y un
   ancho máximo) para que las piezas se sirvan ligeras. */
function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/* ── Contenido ──────────────────────────────────────────────── */

/* Cada alcance: título, una línea de posicionamiento, 2–3 ideas clave y
   —cuando aplica— la referencia que lo respalda. El medio de la derecha
   puede ser un video, un par de imágenes, o no llevar medio. */
type Media =
  | { kind: "video"; src: string; label: string }
  | { kind: "images"; srcs: string[]; label: string }
  | { kind: "none" };

type Alcance = {
  num: string;
  title: string;
  line: string;
  bullets: string[];
  ref?: { tag: string; text: string };
  media: Media;
};

const ALCANCES: Alcance[] = [
  {
    num: "01",
    title: "Producción con IA",
    line: "Realismo sin depender del calendario de piso.",
    bullets: [
      "Modelos de IA de última generación, con detalle persistente en autos y espacios.",
      "Réplica fiel de locaciones de la ciudad.",
      "Expectativa simbólica antes de revelar un modelo o un evento.",
      "Tomas simuladas cuando una unidad no puede salir a rodar.",
    ],
    ref: {
      tag: "Referencia · Dodge Super Bee",
      text: "Un teaser de 15 segundos con un enjambre de abejas sobre un semáforo de arrancones. Sin mostrar el auto.",
    },
    media: { kind: "video", src: V_IA, label: "Muestra · producción con IA" },
  },
  {
    num: "02",
    title: "Unidades reales rodando en Puebla",
    line: "Cada modelo, en el escenario que le corresponde.",
    bullets: [
      "Cholula, Angelópolis, La Juárez: locaciones que el público reconoce.",
      "Un deportivo en un spot, una SUV en otro. Cada unidad cumple su rol.",
      "La asignación modelo–zona se define en conjunto: ahí está la fuerza visual.",
    ],
    media: { kind: "video", src: V_RODANDO, label: "Muestra · unidad en locación" },
  },
  {
    num: "03",
    title: "Narrativa, no contenido genérico",
    line: "El auto es el puente hacia una vivencia.",
    bullets: [
      "Cada pieza cuenta una historia que conecta al público con el auto.",
      "Un asesor contando un chiste funciona para otras marcas. No para 140 años de Mercedes-Benz.",
    ],
    ref: {
      tag: "Referencia · Porsche",
      text: "Un niño ve pasar un 911 desde su salón, va a la agencia y pide la tarjeta del vendedor: volverá en 20 años. Para cierto comprador, el auto no es transporte. Es la razón por la que trabaja.",
    },
    media: { kind: "video", src: V_NARRATIVA, label: "Muestra · narrativa" },
  },
  {
    num: "04",
    title: "Contenido por objetivo",
    line: "Tres formatos, tres momentos del comprador.",
    bullets: [
      "Eye candy de inventario: deseo de compra sobre el stock disponible.",
      "Tips de dueño: cómo cuidar un Mercedes-Benz, para quien ya compró y para quien va a comprar.",
      "Historias de cliente: entregas y su primer día. Prueba social, no solo contenido bonito.",
    ],
    media: { kind: "video", src: V_OBJETIVO, label: "Muestra · eye candy" },
  },
  {
    num: "05",
    title: "La entrega como experiencia",
    line: "El 1% que sí compra se lo cuenta a su círculo.",
    bullets: [
      "Café o copa de vino con tabla de carnes mientras espera.",
      "Pantalla con la historia de su auto: datos técnicos y pruebas en Nürburgring.",
      "Video exclusivo de su unidad recién entregada y de su primer día con su Mercedes-Benz.",
    ],
    ref: {
      tag: "El argumento",
      text: "El 99% no compra. El 1% que sí y vive una buena experiencia se lo cuenta a un círculo que forma parte del mismo 1%.",
    },
    media: { kind: "video", src: V_ENTREGA, label: "Muestra · entrega" },
  },
  {
    num: "06",
    title: "Drive Experience y showroom",
    line: "Vivir el auto, no solo verlo.",
    bullets: [
      "Evento en autódromo con pilotos certificados: el prospecto va de copiloto a alta velocidad.",
      "Activaciones en showroom con la misma lógica de experiencia.",
      "Sede, frecuencia, aforo y costo por evento se cierran en conjunto.",
    ],
    media: { kind: "video", src: V_DRIVE, label: "Muestra · drive experience" },
  },
  {
    num: "07",
    title: "Patrocinios deportivos",
    line: "Golf, pádel y carreras de resistencia.",
    bullets: [
      "Presencia donde ya está el público que compra.",
      "Eventos específicos en Puebla y presupuesto de patrocinio por definir.",
    ],
    ref: {
      tag: "Precedente · MercedesTrophy",
      text: "El circuito de golf que la marca ya opera a nivel global. La idea tiene precedente dentro de la propia marca.",
    },
    media: { kind: "video", src: V_PADEL, label: "Muestra · pádel" },
  },
  {
    num: "08",
    title: "Trends con filtro de marca",
    line: "Tendencias sí, con criterio.",
    bullets: [
      "Monitoreo permanente de tendencias para contenido orgánico.",
      "Solo entran las consistentes con 140 años de posicionamiento.",
    ],
    media: {
      kind: "images",
      srcs: [IMG_TREND_1, IMG_TREND_2],
      label: "Referencia · trends",
    },
  },
  {
    num: "09",
    title: "Mensajería directa segmentada",
    line: "La decisión la gana el marketing, no la ficha técnica.",
    bullets: [
      "Ofertas y eventos a clientes actuales y prospectos de alto potencial.",
      "Quien ya sabe qué auto quiere, ya compró.",
      "El objetivo es quien tiene el dinero y duda entre Mercedes-Benz, Land Rover, BMW o un seminuevo exclusivo.",
    ],
    media: { kind: "none" },
  },
];

/* El dato que respalda todo lo anterior (Cox Automotive, 2,300 compradores). */
const DATO = [
  { n: "7%", t: "completó su compra 100% en línea" },
  { n: "63%", t: "considera ideal un enfoque omnicanal" },
];

const IGUALA = {
  specs: [
    { k: "Reels al mes", v: "9" },
    { k: "Fotos de unidades", v: "250" },
    { k: "Carruseles / artes", v: "20" },
    { k: "Levantamientos al mes", v: "4" },
    { k: "Videollamadas", v: "2 al mes" },
    { k: "Pauta publicitaria", v: "Aparte" },
  ],
  incluye: [
    "Mensajería masiva y seguimiento de ofertas",
    "Catálogo del inventario, con todo el rastreo configurado",
    "Perfil de Google optimizado + estrategia de reseñas",
    "Reporte mensual en lenguaje claro",
  ],
};

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

/* Reproduce solo cuando el video está en pantalla: con nueve piezas en la
   página, evita que todas descarguen y decodifiquen a la vez. */
function useInViewPlayback(src: string) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
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
  return ref;
}

/* Slot de video 9:16, el formato nativo de las piezas. */
function VideoSlot({
  src,
  label,
  width = 720,
}: {
  src: string;
  label: string;
  width?: number;
}) {
  const videoRef = useInViewPlayback(src);
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
        <source src={cld(src, `f_auto,q_auto,w_${width}`)} type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(14,14,13,0.85) 100%)",
        }}
      />
      <span
        className="absolute left-3 bottom-3 font-body text-[10px] tracking-[0.16em] uppercase"
        style={{ color: "rgba(228,224,221,0.8)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* Par de imágenes verticales (capturas de teléfono, 738×1600): el marco
   respeta su proporción para que no se recorte nada. */
function ImagePair({ srcs, label }: { srcs: string[]; label: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {srcs.map((src, i) => (
        <div
          key={src}
          className="relative w-full overflow-hidden group"
          style={{
            aspectRatio: "738/1600",
            background: "#0e0e0d",
            border: "1px solid rgba(228,224,221,0.1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cld(src, "f_auto,q_auto,w_720")}
            alt={`${label} ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(14,14,13,0.85) 100%)",
            }}
          />
          {i === 0 && (
            <span
              className="absolute left-3 bottom-3 font-body text-[10px] tracking-[0.16em] uppercase"
              style={{ color: "rgba(228,224,221,0.8)" }}
            >
              {label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function MediaBlock({ media }: { media: Media }) {
  if (media.kind === "video") return <VideoSlot src={media.src} label={media.label} />;
  if (media.kind === "images") return <ImagePair srcs={media.srcs} label={media.label} />;
  return null;
}

/* Hero horizontal: el video llena la pantalla en escritorio (object-cover)
   y en móvil se muestra completo sobre su propio fondo desenfocado, para
   que una pieza 16:9 no quede recortada en una pantalla vertical. Sin
   texto: el video es el protagonista. */
function HeroWide({ src }: { src: string }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 560, background: "#0a0a09" }}
    >
      {/* Fondo ambiental (solo se ve en móvil, detrás del letterbox) */}
      <video
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          filter: "blur(40px) saturate(1.2)",
          transform: "scale(1.3)",
          opacity: 0.55,
        }}
      >
        <source src={cld(src, "f_auto,q_auto:low,w_480")} type="video/mp4" />
      </video>

      <motion.video
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-contain md:object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label={`Video de apertura de PG Estrategias para ${CLIENTE}`}
      >
        <source src={cld(src, "f_auto,q_auto,w_1920")} type="video/mp4" />
      </motion.video>

      {/* Degradados: funden el video con el negro de la página y dejan
          legible la navegación */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,28,26,0.75) 0%, rgba(28,28,26,0) 28%, rgba(28,28,26,0) 62%, #1C1C1A 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(10,10,9,0.55) 100%)",
        }}
      />
    </div>
  );
}

/* Escenario para el video vertical: el mismo clip, desenfocado y ampliado,
   llena el fondo; la pieza nítida va al centro. Así el video es el
   protagonista aunque la pantalla sea horizontal. */
function VideoStage({
  src,
  muted,
  videoRef,
  height = "100svh",
  ambient = 0.55,
}: {
  src: string;
  muted: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  height?: string;
  ambient?: number;
}) {
  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height, minHeight: 640, background: "#0a0a09" }}
    >
      {/* Fondo ambiental */}
      <video
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          filter: "blur(48px) saturate(1.2)",
          transform: "scale(1.35)",
          opacity: ambient,
        }}
      >
        <source src={cld(src, "f_auto,q_auto:low,w_360")} type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #1C1C1A 0%, rgba(28,28,26,0) 22%, rgba(28,28,26,0) 78%, #1C1C1A 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,9,0.7) 100%)",
        }}
      />

      {/* Pieza principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-[86%]"
        style={{
          aspectRatio: "9/16",
          maxWidth: "calc(100vw - 48px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          border: "1px solid rgba(228,224,221,0.12)",
          background: "#0e0e0d",
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          aria-label={`Video demo de PG Estrategias para ${CLIENTE}`}
        >
          <source src={cld(src, "f_auto,q_auto,w_1080")} type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}

export default function PropuestaReyesHuertaClient() {
  const [scrolled, setScrolled] = useState(false);
  const [demoMuted, setDemoMuted] = useState(true);
  const demoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Al activar el audio del demo, arranca desde el inicio para que se vea
     completo con sonido. */
  const toggleDemoSound = () => {
    const el = demoRef.current;
    const next = !demoMuted;
    setDemoMuted(next);
    if (el && !next) {
      el.currentTime = 0;
      void el.play().catch(() => {});
    }
  };

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(28,28,26,0.88)" : "rgba(28,28,26,0.0)",
          backdropFilter: scrolled ? "blur(18px)" : "none",
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
            1 · HERO — solo video
           ============================================================ */}
        <section className="relative">
          <HeroWide src={V_HERO} />
          {/* Indicador de scroll, sin texto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            aria-hidden
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-px h-12 overflow-hidden"
            style={{ background: "rgba(228,224,221,0.15)" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ background: "#D63A27" }}
              animate={{ height: ["0%", "100%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </section>

        {/* ============================================================
            2 · ALCANCES — dos columnas
           ============================================================ */}
        <section className="relative px-6 md:px-14 pt-16 md:pt-24 pb-12 md:pb-16 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-14 md:mb-20 max-w-[760px]">
            <Eyebrow>Alcances</Eyebrow>
            <SectionTitle>
              Nueve frentes,{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                una sola narrativa.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="flex flex-col gap-20 md:gap-28">
            {ALCANCES.map((a) => (
              <motion.article
                key={a.num}
                {...reveal}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center"
              >
                {/* Texto: sin medio, ocupa el ancho de lectura completo */}
                <div
                  className={
                    a.media.kind === "none"
                      ? "md:col-span-9 lg:col-span-8"
                      : "md:col-span-7 lg:col-span-6"
                  }
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className="font-title text-[13px] tracking-[0.2em]"
                      style={{ color: "#D63A27", fontWeight: 700 }}
                    >
                      {a.num}
                    </span>
                    <h3
                      className="font-title"
                      style={{
                        fontSize: "clamp(24px, 2.6vw, 36px)",
                        fontWeight: 700,
                        lineHeight: 1.08,
                        letterSpacing: "-0.025em",
                        color: "#E4E0DD",
                      }}
                    >
                      {a.title}
                    </h3>
                  </div>
                  <p
                    className="font-title text-[18px] md:text-[21px] mb-7"
                    style={{ color: "#D63A27", fontStyle: "italic", fontWeight: 700 }}
                  >
                    {a.line}
                  </p>
                  <div className="flex flex-col gap-3">
                    {a.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="shrink-0 mt-[8px] block"
                          style={{ width: 5, height: 5, background: "#D63A27" }}
                        />
                        <span
                          className="font-body text-[14px] md:text-[15px] leading-[1.6]"
                          style={{ color: "rgba(228,224,221,0.72)" }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                  {a.ref && (
                    <div
                      className="mt-8 p-5 md:p-6"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderLeft: "2px solid #D63A27",
                      }}
                    >
                      <p
                        className="font-body text-[10px] tracking-[0.2em] uppercase mb-2"
                        style={{ color: "#D63A27", fontWeight: 600 }}
                      >
                        {a.ref.tag}
                      </p>
                      <p
                        className="font-body text-[13px] md:text-[14px] leading-[1.65]"
                        style={{ color: "rgba(228,224,221,0.62)" }}
                      >
                        {a.ref.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Medio */}
                {a.media.kind !== "none" && (
                  <div className="md:col-span-5 lg:col-span-5 lg:col-start-8">
                    <div className="max-w-[380px] mx-auto md:ml-auto md:mr-0 w-full">
                      <MediaBlock media={a.media} />
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* ============================================================
            3 · EL DATO
           ============================================================ */}
        <section className="relative py-20 md:py-28" style={{ background: "#151513" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <motion.div {...reveal} className="lg:col-span-6">
                <Eyebrow>El dato que respalda todo lo anterior</Eyebrow>
                <SectionTitle>
                  El contenido digital no reemplaza el piso.{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    Lo alimenta.
                  </em>
                </SectionTitle>
                <p
                  className="font-body text-[13px] leading-[1.7] max-w-[480px]"
                  style={{ color: "rgba(228,224,221,0.5)" }}
                >
                  Fuente: estudio más reciente de Cox Automotive con 2,300
                  compradores.
                </p>
              </motion.div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DATO.map((d, i) => (
                  <motion.div
                    key={d.n}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: 0.1 + i * 0.1 }}
                    className="p-7 md:p-9"
                    style={{
                      background: "rgba(228,224,221,0.03)",
                      border: "1px solid rgba(228,224,221,0.12)",
                    }}
                  >
                    <span
                      className="font-title block"
                      style={{
                        fontSize: "clamp(56px, 6.5vw, 88px)",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: i === 1 ? "#D63A27" : "#E4E0DD",
                      }}
                    >
                      {d.n}
                    </span>
                    <p
                      className="font-body text-[14px] leading-[1.55] mt-4"
                      style={{ color: "rgba(228,224,221,0.68)" }}
                    >
                      {d.t}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4 · CLÍMAX — el demo
           ============================================================ */}
        <section className="relative" style={{ background: "#0a0a09" }}>
          <div className="px-6 md:px-14 pt-20 md:pt-28 pb-8 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="text-center flex flex-col items-center">
              <p
                className="font-body text-[11px] tracking-[0.3em] uppercase mb-6"
                style={{ color: "#D63A27", fontWeight: 500 }}
              >
                Demo
              </p>
              <h2
                className="font-title max-w-[900px]"
                style={{
                  fontSize: "clamp(34px, 5.2vw, 76px)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: "#E4E0DD",
                }}
              >
                Así se ve{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Reyes Huerta
                </em>{" "}
                con nosotros.
              </h2>
            </motion.div>
          </div>

          <div className="relative">
            <VideoStage
              src={V_DEMO}
              muted={demoMuted}
              videoRef={demoRef}
              height="92svh"
              ambient={0.7}
            />
            <button
              type="button"
              onClick={toggleDemoSound}
              aria-pressed={!demoMuted}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-3 font-body text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{
                background: demoMuted ? "rgba(28,28,26,0.75)" : "#D63A27",
                border: demoMuted
                  ? "1px solid rgba(228,224,221,0.25)"
                  : "1px solid #D63A27",
                color: "#E4E0DD",
                backdropFilter: "blur(12px)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1.5 5H4L7.5 2V12L4 9H1.5V5Z" fill="currentColor" />
                {demoMuted ? (
                  <path
                    d="M10 5L13 8M13 5L10 8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M9.5 4.5C10.5 5.5 10.5 8.5 9.5 9.5M11.5 3C13.2 4.8 13.2 9.2 11.5 11"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              {demoMuted ? "Activar audio" : "Silenciar"}
            </button>
          </div>
        </section>

        {/* ============================================================
            5 · ENTREGABLES E INVERSIÓN
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
              {/* Precio */}
              <div className="lg:col-span-5">
                <Eyebrow>Entregables e inversión</Eyebrow>
                <SectionTitle>
                  Todo el sistema,{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    un solo cargo mensual.
                  </em>
                </SectionTitle>
                <div className="flex items-baseline gap-3 mt-8">
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
              </div>

              {/* Entregables */}
              <div className="lg:col-span-7">
                <div
                  className="p-7 md:p-10"
                  style={{
                    background: "rgba(228,224,221,0.03)",
                    border: "1px solid rgba(228,224,221,0.14)",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {IGUALA.specs.map((sp) => (
                      <div
                        key={sp.k}
                        className="py-3.5 flex items-baseline justify-between gap-3"
                        style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
                      >
                        <span
                          className="font-body text-[13px]"
                          style={{ color: "rgba(228,224,221,0.55)" }}
                        >
                          {sp.k}
                        </span>
                        <span
                          className="font-title text-[18px] md:text-[20px] shrink-0"
                          style={{ fontWeight: 700, color: "#E4E0DD" }}
                        >
                          {sp.v}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-7 pt-6 flex flex-col gap-2.5"
                    style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
                  >
                    {IGUALA.incluye.map((x) => (
                      <div key={x} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="shrink-0 mt-[7px] block"
                          style={{ width: 5, height: 5, background: "#D63A27" }}
                        />
                        <span
                          className="font-body text-[13px] md:text-[14px] leading-[1.6]"
                          style={{ color: "rgba(228,224,221,0.68)" }}
                        >
                          {x}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              className="mt-8 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-7"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderLeft: "2px solid #D63A27",
              }}
            >
              <span
                className="font-body text-[11px] tracking-[0.2em] uppercase shrink-0"
                style={{ color: "#D63A27", fontWeight: 600 }}
              >
                Nota
              </span>
              <p
                className="font-body text-[14px] leading-[1.7]"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                Esta iguala no incluye pauta publicitaria; se puede sumar como
                línea aparte si {CLIENTE} lo requiere. Los 4 levantamientos al
                mes dan capacidad para cubrir mayor rotación de inventario y
                unidades de alto valor.
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
          <div className="relative z-10 max-w-[960px] mx-auto text-center">
            <motion.p
              {...reveal}
              className="font-body text-[12px] tracking-[0.3em] uppercase mb-10"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              {CLIENTE} × PG Estrategias
            </motion.p>
            <motion.blockquote
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="font-title mb-6"
              style={{
                fontSize: "clamp(30px, 4.4vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              “La única forma de hacer un gran trabajo es amar lo que haces.”
            </motion.blockquote>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.18 }}
              className="font-body text-[12px] tracking-[0.22em] uppercase mb-12"
              style={{ color: "rgba(228,224,221,0.45)" }}
            >
              Steve Jobs
            </motion.p>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.26 }}
              className="font-title mx-auto max-w-[820px]"
              style={{
                fontSize: "clamp(22px, 3vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#D63A27",
                fontStyle: "italic",
              }}
            >
              Estamos listos para poner esa pasión al servicio del futuro de
              Mercedes-Benz.
            </motion.p>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.38 }}
              className="mt-14 flex justify-center"
            >
              <Logo size={28} tone="cream" />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
