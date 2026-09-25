"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta — Club nocturno × PG Estrategias.

   Versión general de la propuesta de Praga, sin nombre de establecimiento.

   Temporada Octubre–Noviembre 2026: producción audiovisual, marketing y
   cinco ideas de temporada. Las muestras de producción son las mismas
   piezas que se presentaron en la propuesta de Ford Rivera.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Club nocturno";
const PRECIO = "12,000";
const PAUTA = "2,500";

/* ── Video ──────────────────────────────────────────────────── */

const V_FORD =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1790084706/Demo_egdhe3.mp4";
const V_LANDROVER =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4";
const V_MERCEDES =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1788051909/DemoMercedes_csof2x.mp4";
const V_ACCION =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4";
const V_HURACAN =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4";

/* Inserta transformaciones de Cloudinary (formato/calidad automáticos y un
   ancho máximo) para que los videos se sirvan ligeros. */
function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

type Slot = { src: string; label: string };

const MUESTRAS: Slot[] = [
  { src: V_FORD, label: "Demo de marca" },
  { src: V_HURACAN, label: "Detalle" },
  { src: V_ACCION, label: "En acción" },
  { src: V_LANDROVER, label: "Lanzamiento" },
  { src: V_MERCEDES, label: "Experiencia" },
];

/* Lo que se graba en el club el primer mes. */
const RESERVADOS = [
  "Recap de la noche de Halloween",
  "Sesión editorial “Catrinas de la noche”",
  "Barra, mixología y ambiente",
];

/* ── Contenido ──────────────────────────────────────────────── */

const PRODUCCION = [
  "Reels de ambiente",
  "Recaps de noches y eventos temáticos",
  "Promociones de la semana",
  "Fotografía de instalaciones, barra, mixología y shows",
  "Piezas con inteligencia artificial para campañas de temporada",
];

const MARKETING = [
  "Mensajería masiva con promociones y eventos",
  "Página de reservaciones: mesas, botellas, despedidas y grupos",
  "Rastreo técnico configurado en toda la página",
  "Perfil de Google + estrategia de reseñas",
  "Pauta enfocada en llenar las noches clave",
];

const TEMPORADA = ["Halloween", "Día de Muertos", "Buen Fin", "Cierre de quincenas"];

const GUION = [
  { t: "0–3 s", img: "Panteón de noche, niebla, luna llena (IA)", txt: "Texto: “1 de noviembre.”" },
  { t: "3–7 s", img: "Manos salen de la tierra, los muertos se levantan (IA)", txt: "SFX: tierra, campanas" },
  { t: "7–11 s", img: "Caminan por las calles de la ciudad hacia el neón del club, se acomodan el saco (IA)", txt: "Entra la música" },
  { t: "11–15 s", img: "Interior real grabado: luces, barra, brindis", txt: "—" },
  { t: "15–18 s", img: "Logo del club + fecha del evento", txt: "Remate" },
];

const IDEAS = [
  {
    tag: "02",
    name: "Noche de Halloween",
    when: "31 de octubre",
    body: "Evento temático con staff caracterizado y concurso de disfraces con premio en consumo o botella. Contenido: 3 teasers de cuenta regresiva (7, 3 y 1 día antes), cobertura en vivo esa noche y reel recap al día siguiente — el recap es lo que vende el siguiente evento.",
  },
  {
    tag: "03",
    name: "“Catrinas de la noche”",
    when: "Sesión editorial de Día de Muertos",
    body: "Sesión fotográfica con maquillaje de catrina, estética elegante y oscura, en las instalaciones. Rinde para carruseles, portadas, stories y fondos de toda la temporada. Es contenido que la gente comparte y que las plataformas no restringen.",
  },
  {
    tag: "04",
    name: "El Buen Fin del club",
    when: "Mediados de noviembre",
    body: "Promoción de temporada (2×1 en botella, cover libre o mesa con descuento — la definimos juntos) anunciada por mensajería masiva a la base de contactos y reforzada con pauta ese fin de semana. Mientras todo el mundo compra pantallas, el club vende la noche.",
  },
  {
    tag: "05",
    name: "Despedidas de soltero y grupos",
    when: "Permanente",
    body: "Paquete fijo para despedidas, cumpleaños y grupos, con página propia y botón directo a WhatsApp. Es la reservación de mayor ticket y la que más se busca en Google. Noviembre y diciembre son temporada alta de despedidas.",
  },
];

const PAQUETE = {
  specs: [
    { k: "Reels al mes", v: "5" },
    { k: "Fotografías editadas", v: "100" },
    { k: "Carruseles / artes", v: "10" },
    { k: "Levantamientos al mes", v: "2" },
    { k: "Videollamada estratégica", v: "1 al mes" },
    { k: "Pauta incluida", v: `$${PAUTA}` },
  ],
  incluye: [
    "Mensajería masiva y seguimiento de promociones y eventos",
    "Página de reservaciones (mesas, botellas, despedidas y grupos), con todo el rastreo técnico configurado",
    "Perfil de Google optimizado + estrategia de reseñas",
    "Reporte mensual en lenguaje claro",
    "Levantamientos programados en las noches de evento",
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

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="shrink-0 mt-[7px] block"
        style={{ width: 5, height: 5, background: "#D63A27" }}
      />
      <span
        className="font-body text-[13px] md:text-[14px] leading-[1.6]"
        style={{ color: "rgba(228,224,221,0.7)" }}
      >
        {children}
      </span>
    </div>
  );
}

/* Slot de video: siempre 9:16, el formato en el que se graban las piezas. */
function VideoSlot({ slot, width = 640 }: { slot: Slot; width?: number }) {
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
  }, [slot.src]);

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
        aria-label={`Muestra de producción de PG Estrategias — ${slot.label}`}
      >
        <source src={cld(slot.src, `f_auto,q_auto,w_${width}`)} type="video/mp4" />
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
        {slot.label}
      </span>
    </div>
  );
}

function SlotReservado({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-5"
      style={{
        border: "1px dashed rgba(228,224,221,0.22)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <span
        aria-hidden
        className="shrink-0 flex items-center justify-center"
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid rgba(214,58,39,0.5)",
          color: "#D63A27",
          fontSize: 11,
          paddingLeft: 2,
        }}
      >
        ▶
      </span>
      <span
        className="font-body text-[13px] leading-[1.4]"
        style={{ color: "rgba(228,224,221,0.72)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ListaColumna({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div>
      <p
        className="font-body text-[11px] tracking-[0.22em] uppercase mb-6"
        style={{ color: "rgba(228,224,221,0.5)" }}
      >
        {titulo}
      </p>
      <div className="flex flex-col">
        {items.map((p) => (
          <div
            key={p}
            className="py-3.5 font-body text-[15px]"
            style={{
              borderTop: "1px solid rgba(228,224,221,0.1)",
              color: "rgba(228,224,221,0.82)",
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PropuestaClubNocturnoClient() {
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
                {CLIENTE} × PG Estrategias · Octubre–Noviembre 2026
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
                Tu club ya tiene la noche.{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Hagamos que se vea.
                </em>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-[15px] md:text-[18px] leading-[1.7] mt-8 max-w-[600px]"
              style={{ color: "rgba(228,224,221,0.75)" }}
            >
              Propuesta de producción audiovisual y marketing digital para la
              temporada con más pretextos para salir del año.
            </motion.p>
          </div>
        </section>

        {/* ============================================================
            2 · CONTEXTO
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-16 md:py-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div {...reveal} className="lg:col-span-6">
              <Eyebrow>Contexto</Eyebrow>
              <SectionTitle>
                Tu club ya tiene lo más difícil:{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  un lugar al que la gente quiere volver.
                </em>
              </SectionTitle>
            </motion.div>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="lg:col-span-6 flex flex-col justify-end"
            >
              <p
                className="font-body text-[15px] md:text-[16px] leading-[1.75] mb-5"
                style={{ color: "rgba(228,224,221,0.72)" }}
              >
                Lo que proponemos es que eso se vea y se venda en redes con el
                mismo nivel que se vive adentro — contenido producido con calidad
                de marca, campañas que llenen mesas en los días clave y un sistema
                que convierta cada mensaje en una reservación.
              </p>
              <p
                className="font-body text-[15px] md:text-[16px] leading-[1.75] mb-7"
                style={{ color: "rgba(228,224,221,0.72)" }}
              >
                Llegamos con ideas concretas para aprovechar la temporada desde
                la primera semana.
              </p>
              <div className="flex flex-wrap gap-2">
                {TEMPORADA.map((x) => (
                  <span
                    key={x}
                    className="font-body text-[13px] px-4 py-2"
                    style={{
                      color: "#E4E0DD",
                      border: "1px solid rgba(214,58,39,0.4)",
                      background: "rgba(214,58,39,0.07)",
                    }}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            3 · MUESTRAS DE PRODUCCIÓN
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-10 md:mb-14 max-w-[820px]">
            <Eyebrow>Muestras de producción</Eyebrow>
            <SectionTitle>
              Así se ve{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                nuestro trabajo.
              </em>
            </SectionTitle>
            <p
              className="font-body text-[15px] leading-[1.7]"
              style={{ color: "rgba(228,224,221,0.6)" }}
            >
              Piezas recientes para marcas premium. Es el mismo nivel de
              producción que llevamos a la noche de tu club.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {MUESTRAS.map((slot, i) => (
              <motion.div
                key={slot.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              >
                <VideoSlot slot={slot} width={640} />
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal} className="mt-14 md:mt-16">
            <p
              className="font-body text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Lo que grabamos en tu club el primer mes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {RESERVADOS.map((label) => (
                <SlotReservado key={label} label={label} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ============================================================
            4 · QUÉ HACEMOS — PRODUCCIÓN / MARKETING
           ============================================================ */}
        <section className="relative py-20 md:py-28" style={{ background: "#151513" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[760px]">
              <Eyebrow>Qué hacemos</Eyebrow>
              <SectionTitle>
                Producimos la noche{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  y la ponemos a vender.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <motion.div {...reveal}>
                <ListaColumna titulo="Producción" items={PRODUCCION} />
              </motion.div>
              <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                <ListaColumna titulo="Marketing y reservaciones" items={MARKETING} />
              </motion.div>
            </div>

            <motion.p
              {...reveal}
              className="font-body text-[13px] leading-[1.7] mt-10 max-w-[720px]"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Cuidamos que cada pieza transmita el ambiente del lugar sin cruzar
              las líneas que las plataformas penalizan: se ve exclusivo, se ve de
              noche, se antoja — y la cuenta se mantiene sana.
            </motion.p>
          </div>
        </section>

        {/* ============================================================
            5 · IDEA PRINCIPAL — VIDEO CON IA
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-12 md:mb-14 max-w-[860px]">
            <Eyebrow>Ideas para tu club · 01</Eyebrow>
            <SectionTitle>
              “Hasta los muertos{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                se levantan.”
              </em>
            </SectionTitle>
            <p
              className="font-body text-[15px] md:text-[16px] leading-[1.75]"
              style={{ color: "rgba(228,224,221,0.72)" }}
            >
              Pieza principal de la temporada, con IA. Un panteón de noche,
              niebla, y los muertos saliendo de sus tumbas. Se sacuden la tierra,
              se acomodan el traje y caminan por las calles de la ciudad hasta
              el letrero de neón del club. Corte a tomas reales del interior — luces,
              barra, brindis.
            </p>
            <p
              className="font-body text-[11px] tracking-[0.2em] uppercase mt-6"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Lanzamiento: última semana de octubre · 15–18 s · vertical 9:16
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            style={{ border: "1px solid rgba(228,224,221,0.14)" }}
          >
            {GUION.map((g, i) => (
              <div
                key={g.t}
                className="grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr_220px] gap-x-5 gap-y-1 px-5 md:px-7 py-4"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid rgba(228,224,221,0.1)",
                  background: i % 2 ? "rgba(255,255,255,0.015)" : "transparent",
                }}
              >
                <span
                  className="font-body text-[12px] tracking-[0.08em] md:row-auto row-span-2"
                  style={{ color: "#D63A27", fontWeight: 600 }}
                >
                  {g.t}
                </span>
                <span
                  className="font-body text-[14px] leading-[1.5]"
                  style={{ color: "rgba(228,224,221,0.85)" }}
                >
                  {g.img}
                </span>
                <span
                  className="font-body text-[13px] leading-[1.5] italic"
                  style={{ color: "rgba(228,224,221,0.55)" }}
                >
                  {g.txt}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              {
                k: "Versión orgánica · redes propias",
                v: "“Este noviembre, los muertos no son lo único que se levanta.”",
              },
              {
                k: "Versión para pauta",
                v: "“Hasta los muertos se levantan por venir aquí.”",
                note: "Misma idea, sin doble sentido explícito, para que Meta la apruebe y no penalice la cuenta.",
              },
            ].map((r, i) => (
              <motion.div
                key={r.k}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="p-6 md:p-7"
                style={{
                  background: "rgba(214,58,39,0.05)",
                  borderLeft: "2px solid #D63A27",
                }}
              >
                <p
                  className="font-body text-[11px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: "#D63A27", fontWeight: 600 }}
                >
                  {r.k}
                </p>
                <p
                  className="font-title text-[19px] md:text-[22px] leading-[1.3]"
                  style={{ color: "#E4E0DD", fontWeight: 700, fontStyle: "italic" }}
                >
                  {r.v}
                </p>
                {r.note && (
                  <p
                    className="font-body text-[13px] leading-[1.6] mt-3"
                    style={{ color: "rgba(228,224,221,0.55)" }}
                  >
                    {r.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            6 · MÁS IDEAS DE TEMPORADA
           ============================================================ */}
        <section className="relative py-20 md:py-28" style={{ background: "#151513" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[760px]">
              <Eyebrow>Ideas para tu club · Octubre y Noviembre</Eyebrow>
              <SectionTitle>
                Un pretexto para salir{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  cada semana.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {IDEAS.map((idea, i) => (
                <motion.div
                  key={idea.name}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: (i % 2) * 0.08 }}
                  className="pt-6"
                  style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="font-body text-[11px] tracking-[0.2em]"
                      style={{ color: "#D63A27", fontWeight: 600 }}
                    >
                      {idea.tag}
                    </span>
                    <h3
                      className="font-title text-[21px] md:text-[25px]"
                      style={{ fontWeight: 700, color: "#E4E0DD", letterSpacing: "-0.02em" }}
                    >
                      {idea.name}
                    </h3>
                  </div>
                  <p
                    className="font-title text-[16px] md:text-[18px] mb-4"
                    style={{ color: "#D63A27", fontStyle: "italic", fontWeight: 700 }}
                  >
                    {idea.when}
                  </p>
                  <p
                    className="font-body text-[14px] md:text-[15px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.7)" }}
                  >
                    {idea.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            7 · PAQUETE IGNICIÓN
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
                <Eyebrow>Paquete Ignición</Eyebrow>
                <SectionTitle>
                  Contenido, ventas y seguimiento,{" "}
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
                    {PAQUETE.specs.map((sp) => (
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
                    {PAQUETE.incluye.map((x) => (
                      <Bullet key={x}>{x}</Bullet>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              className="mt-8 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-7"
              style={{
                background: "rgba(214,58,39,0.05)",
                borderLeft: "2px solid #D63A27",
              }}
            >
              <span
                className="font-body text-[11px] tracking-[0.2em] uppercase shrink-0"
                style={{ color: "#D63A27", fontWeight: 600 }}
              >
                Video con IA
              </span>
              <p
                className="font-body text-[14px] leading-[1.7]"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                “Hasta los muertos se levantan” va incluido como uno de los 5
                reels de octubre.
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.08 }}
              className="mt-4 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-7"
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
                Paquete mensual y renovable. La pauta se administra por separado
                y se reporta junto con el resto de resultados cada mes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            8 · CIERRE
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
              La noche ya la tienen.
              <br />
              Nosotros hacemos que se vea.
            </motion.h2>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-title"
              style={{
                fontSize: "clamp(26px, 3.4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#D63A27",
                fontStyle: "italic",
              }}
            >
              Y que se llene.
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
