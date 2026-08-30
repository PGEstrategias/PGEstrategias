"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta — Autonación × PG Estrategias.

   Aquí el eje no es levantar la operación desde cero, sino formalizar en
   una sola iguala lo que ya corre —calendario y campaña— y sumarle los
   frentes que faltan. A diferencia de las otras propuestas va con una
   única iguala, sin paquetes, y sin pauta incluida.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Autonación";
const PRECIO = "15,000";

/* ── Video ──────────────────────────────────────────────────── */

const V_LANDROVER =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4";
const V_MERCEDES =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1788051909/DemoMercedes_csof2x.mp4";
const V_ACCION =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4";
const V_HURACAN =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4";

/* Inserta transformaciones de Cloudinary (formato/calidad automáticos y un
   ancho máximo) para que los videos —que pesan decenas de MB en su versión
   original— se sirvan ligeros y reproduzcan en cualquier navegador. */
function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/* Todos los slots de video van en vertical (9:16), que es el formato nativo
   de las piezas: así se ven completas y sin recorte. */
type Slot = { src: string; label: string };

const MUESTRAS: Slot[] = [
  { src: V_HURACAN, label: "Unidad · detalle" },
  { src: V_ACCION, label: "Unidad · en acción" },
  { src: V_LANDROVER, label: "Test drive" },
  { src: V_MERCEDES, label: "Showroom · entrega" },
];

/* Los espacios que se llenan con material de Autonación. Van como fichas
   compactas —no como cajas vacías— para que se lean como plan y no como
   hueco sin contenido. */
const RESERVADOS = [
  "Recap de evento o exhibición",
  "Sesión de las unidades que entran",
  "Test drive, detailing y entrega",
];

/* Lo que ya está corriendo y lo que entra bajo la iguala: es el punto de
   partida de esta propuesta, así que va como bloque propio. */
const YA_CORRE = ["Calendario de contenido", "Campaña en marcha"];

const SE_SUMA = [
  "Ofertas y promociones comerciales",
  "Catálogo del inventario",
  "Perfil de Google + reseñas",
  "Eventos y patrocinadores",
];

/* ── Contenido ──────────────────────────────────────────────── */

const FRENTES = [
  {
    tag: "01",
    name: "Cada unidad, a su altura",
    line: "Producción que le hace justicia",
    bullets: [
      "Sesión fotográfica de cada unidad",
      "Catálogo online con rastreo",
      "Carruseles y fichas para redes",
    ],
    slot: { src: V_HURACAN, label: "Unidad · detalle" } as Slot,
  },
  {
    tag: "02",
    name: "Del feed al piso",
    line: "Tráfico que sí llega",
    bullets: [
      "Ofertas y planes de financiamiento",
      "Test drives, detailing y entregas",
      "Mensajería masiva con seguimiento",
    ],
    slot: { src: V_MERCEDES, label: "Showroom · entrega" } as Slot,
  },
];

const PRODUCCION = [
  "Recaps de eventos y exhibiciones",
  "Ofertas y planes de financiamiento",
  "Sesión de foto de cada unidad",
  "Test drives, detailing y entregas",
  "Contenido con influencers automotrices",
];

const MARKETING = [
  "Mensajería masiva de ofertas",
  "Gestión de promociones comerciales",
  "Campañas de reconocimiento y venta",
  "Catálogo online del inventario",
  "Anuncios en Google",
  "Perfil de Google de la agencia",
  "Papelería y QR",
  "Eventos y patrocinadores",
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

/* Slot de video: siempre 9:16, el formato en el que se graban las piezas,
   para que se vean completas y no recortadas. */
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

/* Ficha del espacio reservado: ocupa poco alto y nombra la pieza que va a
   llenarlo, en lugar de dejar un marco vacío del tamaño de un video. */
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

export default function PropuestaAutonacionMensualClient() {
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
                {CLIENTE} × PG Estrategias
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
                Un inventario así pide producción{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  a su altura.
                </em>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-[15px] md:text-[18px] leading-[1.7] mt-8 max-w-[580px]"
              style={{ color: "rgba(228,224,221,0.75)" }}
            >
              Pocas agencias en Puebla tienen este inventario. La producción y la
              estrategia comercial van a la par: contenido que le hace justicia a
              cada unidad y lo convierte en tráfico a piso.
            </motion.p>
          </div>
        </section>

        {/* ============================================================
            2 · LO QUE YA CORRE / LO QUE SE SUMA
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-16 md:py-20 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-10 max-w-[760px]">
            <Eyebrow>Punto de partida</Eyebrow>
            <SectionTitle>
              No empezamos de cero.{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                Lo formalizamos.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div {...reveal}>
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase mb-5"
                style={{ color: "rgba(228,224,221,0.5)" }}
              >
                Ya en marcha
              </p>
              <div className="flex flex-wrap gap-2">
                {YA_CORRE.map((x) => (
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

            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase mb-5"
                style={{ color: "rgba(228,224,221,0.5)" }}
              >
                Se suma bajo la iguala
              </p>
              <div className="flex flex-wrap gap-2">
                {SE_SUMA.map((x) => (
                  <span
                    key={x}
                    className="font-body text-[13px] px-4 py-2"
                    style={{
                      color: "rgba(228,224,221,0.72)",
                      border: "1px solid rgba(228,224,221,0.16)",
                      background: "rgba(255,255,255,0.02)",
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
            3 · EL CICLO DE LA UNIDAD
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[760px]">
            <Eyebrow>El ciclo de la unidad</Eyebrow>
            <SectionTitle>
              De la sesión de foto{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                a la entrega.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {FRENTES.map((f, i) => (
              <motion.div
                key={f.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
                className="flex gap-5 md:gap-7"
              >
                <div className="w-[38%] max-w-[210px] shrink-0">
                  <VideoSlot slot={f.slot} width={720} />
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="font-body text-[11px] tracking-[0.2em]"
                      style={{ color: "#D63A27", fontWeight: 600 }}
                    >
                      {f.tag}
                    </span>
                    <h3
                      className="font-title text-[19px] md:text-[23px]"
                      style={{ fontWeight: 700, color: "#E4E0DD", letterSpacing: "-0.02em" }}
                    >
                      {f.name}
                    </h3>
                  </div>
                  <p
                    className="font-title text-[17px] md:text-[19px] mb-5"
                    style={{ color: "#D63A27", fontStyle: "italic", fontWeight: 700 }}
                  >
                    {f.line}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {f.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="shrink-0 mt-[7px] block"
                          style={{ width: 5, height: 5, background: "#D63A27" }}
                        />
                        <span
                          className="font-body text-[13px] md:text-[14px] leading-[1.5]"
                          style={{ color: "rgba(228,224,221,0.7)" }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4 · QUÉ HACEMOS — PRODUCCIÓN / MARKETING
           ============================================================ */}
        <section className="relative py-20 md:py-28" style={{ background: "#151513" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[760px]">
              <Eyebrow>Qué hacemos</Eyebrow>
              <SectionTitle>
                Producimos el contenido{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  y lo ponemos a vender.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <motion.div {...reveal}>
                <p
                  className="font-body text-[11px] tracking-[0.22em] uppercase mb-6"
                  style={{ color: "rgba(228,224,221,0.5)" }}
                >
                  Producción
                </p>
                <div className="flex flex-col">
                  {PRODUCCION.map((p) => (
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
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.08 }}
              >
                <p
                  className="font-body text-[11px] tracking-[0.22em] uppercase mb-6"
                  style={{ color: "rgba(228,224,221,0.5)" }}
                >
                  Marketing y ventas
                </p>
                <div className="flex flex-col">
                  {MARKETING.map((m) => (
                    <div
                      key={m}
                      className="py-3.5 font-body text-[15px]"
                      style={{
                        borderTop: "1px solid rgba(228,224,221,0.1)",
                        color: "rgba(228,224,221,0.82)",
                      }}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            <motion.p
              {...reveal}
              className="font-body text-[13px] leading-[1.7] mt-10 max-w-[720px]"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Si Autonación colabora con un influencer automotriz, producimos el
              contenido junto con ellos: su alcance, nuestra calidad audiovisual.
            </motion.p>
          </div>
        </section>

        {/* ============================================================
            5 · GRID DE MUESTRAS + ESPACIOS RESERVADOS
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
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
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

          {/* Los espacios reservados van aquí, en fichas de una línea: se
              entiende qué falta por grabar sin dejar marcos vacíos del alto
              de un video. */}
          <motion.div {...reveal} className="mt-14 md:mt-16">
            <p
              className="font-body text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: "rgba(228,224,221,0.5)" }}
            >
              Lo que grabamos con Autonación el primer mes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {RESERVADOS.map((label) => (
                <SlotReservado key={label} label={label} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ============================================================
            6 · IGUALA MENSUAL
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
                <Eyebrow>Inversión</Eyebrow>
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
                línea aparte si Autonación lo requiere. Los 4 levantamientos al
                mes dan capacidad para cubrir mayor rotación de inventario y
                unidades de alto valor.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            7 · CIERRE
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
              Un solo equipo para todos los frentes.
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
              Seguimos con el calendario que ya está corriendo.
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
