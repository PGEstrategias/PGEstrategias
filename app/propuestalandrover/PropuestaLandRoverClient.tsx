"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta — Land Rover Puebla × PG Estrategias.

   Construida desde el brief del cliente: creación de contenido,
   estrategia digital (pauta + orgánico), presencia en eventos,
   comunidad de rutas, accesorios originales y una cadencia que
   se ajusta al ciclo de aprobación de ~28 días.

   Sistema visual de PG: negro #1C1C1A, acento #D63A27, Syne/Inter.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Land Rover Puebla";
const PRECIO = "15,000";

const HERO_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785888616/WhatsApp_Video_2026-08-04_at_4.27.42_PM_vcpnm7.mp4";

/* Demo vertical que PG ya produjo específicamente para Land Rover. */
const LANDROVER_DEMO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4";

/* Muestras de producción de PG en el sector automotriz. Verticales 9:16. */
const MUESTRAS = [
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787082394/ZenithMustangBlackHorse_ld8o8z.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612227/HuracanZenith_uzna4d.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1787612470/Challenger_vur6pe.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4",
];

/* Inserta transformaciones de Cloudinary (formato/calidad automáticos y un
   ancho máximo) para que los videos —que pesan decenas de MB en su versión
   original— se sirvan ligeros y reproduzcan en cualquier navegador. */
function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/* Lo que entendimos de su operación — construido sobre el brief. */
const contexto = [
  {
    title: "Creación de contenido",
    desc:
      "Producción constante y a la altura de la marca: reels, fotografía y artes para sostener la presencia todo el mes.",
  },
  {
    title: "Estrategia digital",
    desc:
      "Pauta y contenido orgánico trabajando juntos — la estrategia que ordena qué se produce, cuándo se publica y con qué objetivo.",
  },
  {
    title: "Presencia en eventos",
    desc:
      "Estamos en los eventos filmando fuera de piso: rutas, actividades y experiencias reales de la comunidad Land Rover.",
  },
  {
    title: "Experiencia con su público",
    desc:
      "Ya trabajamos con este perfil de comprador. Sabemos qué le mueve y con qué tipo de contenido responde.",
  },
];

/* Los entregables concretos del mes. El corazón de la oferta. */
const incluye = [
  {
    num: "01",
    title: "8 reels mensuales",
    desc:
      "Distribuidos entre oferta comercial del mes, recaps de eventos y rutas de la comunidad, y promociones atemporales — con narrativa estilo cine que engancha al espectador.",
  },
  {
    num: "02",
    title: "2 a 4 levantamientos al mes",
    desc:
      "Sesiones de grabación y fotografía en las que capturamos el material que alimenta todo el contenido del mes.",
  },
  {
    num: "03",
    title: "100 fotografías",
    desc:
      "Para posts, carruseles y artes en redes sociales. Un banco visual que alimenta la operación sin depender de una sola sesión.",
  },
  {
    num: "04",
    title: "WhatsApp Bot optimizado",
    desc:
      "Para responder a tus leads al instante, calificar interés y pasarle a tu equipo solo a quien está listo para hablar.",
  },
  {
    num: "05",
    title: "Perfil de Google optimizado",
    desc:
      "Más estrategia de reseñas, para llegar bien parados a quien ya busca ventas, servicio o seminuevos en Puebla.",
  },
  {
    num: "06",
    title: "Reunión presencial quincenal",
    desc:
      "Cada dos semanas nos reunimos en tu sucursal para revisar calendario, prioridades y la siguiente ola de contenido. La estrategia sigue siendo tuya.",
  },
  {
    num: "07",
    title: "Consultoría de crecimiento mensual",
    desc:
      "Una sesión al mes para mirar el negocio de arriba: qué está funcionando, qué ajustar y dónde está la siguiente oportunidad.",
  },
  {
    num: "08",
    title: "Reporte quincenal",
    desc:
      "En lenguaje claro, sin tecnicismos. Qué se produjo, qué se publicó y cómo respondió tu audiencia — cada quince días.",
  },
];

/* La cadencia con la que nos adaptamos al ciclo de aprobación de ~28 días. */
const cadencia = [
  {
    dia: "Semana 1",
    title: "Ofertas comerciales listas",
    desc:
      "Los videos de la oferta comercial quedan entregados en los primeros días, listos para publicarse y posicionarse orgánicamente —o entrar a aprobación con margen si requieren pauta.",
  },
  {
    dia: "Durante el mes",
    title: "Recaps y comunidad",
    desc:
      "Filmamos fuera de piso las rutas, actividades y eventos de la comunidad Land Rover: el contenido de estilo de vida que hace sentir la marca.",
  },
  {
    dia: "Constante",
    title: "Atemporales y banco visual",
    desc:
      "Promociones atemporales, la línea de accesorios originales y las 100 fotografías que sostienen la publicación diaria.",
  },
];

/* Comunidad, eventos y accesorios — activos propios de la marca. */
const comunidad = [
  {
    title: "Recaps de la comunidad",
    desc:
      "La comunidad de rutas y actividades Land Rover es un activo que pocas marcas tienen. Lo convertimos en contenido que atrae a más clientes como los tuyos.",
  },
  {
    title: "Curaduría de eventos",
    desc:
      "Sugerimos eventos deportivos y campestres alineados con el público objetivo y el ADN de la marca, para activar presencia donde de verdad importa.",
  },
  {
    title: "Línea de accesorios originales",
    desc:
      "La marca de accesorios originales Land Rover tiene su propio espacio en el calendario — un ingreso que casi nadie promociona con calidad.",
  },
];

/* Cómo trabajamos — proceso de arranque y operación. */
const proceso = [
  {
    num: "01",
    title: "Inmersión",
    desc:
      "Conocemos tu operación, tu inventario, tus lineamientos de marca y tus objetivos del trimestre.",
  },
  {
    num: "02",
    title: "Plan conjunto",
    desc:
      "Definimos juntos calendario, prioridades y metas — dentro de los lineamientos de identidad de Jaguar Land Rover.",
  },
  {
    num: "03",
    title: "Producción y activación",
    desc:
      "Grabamos, fotografiamos y ponemos el sistema en marcha: reels, fotos, bot de WhatsApp y perfil de Google.",
  },
  {
    num: "04",
    title: "Optimización quincenal",
    desc:
      "Reunión presencial, reporte y ajustes con datos cada dos semanas. Ritmo constante, sin sorpresas.",
  },
];

/* ── Piezas de UI ───────────────────────────────────────────── */

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
        fontSize: "clamp(32px, 4.2vw, 60px)",
        fontWeight: 700,
        lineHeight: 1.04,
        letterSpacing: "-0.025em",
        color: "#E4E0DD",
      }}
    >
      {children}
    </h2>
  );
}

function Body({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-body text-[15px] md:text-[17px] leading-[1.8] ${className}`}
      style={{ color: "rgba(228,224,221,0.72)" }}
    >
      {children}
    </p>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PropuestaLandRoverClient() {
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
        <section className="relative w-full h-screen min-h-[720px] overflow-hidden">
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
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(28,28,26,0.55) 100%)",
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-28 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-title"
                style={{
                  fontSize: "clamp(42px, 7vw, 116px)",
                  fontWeight: 700,
                  lineHeight: 0.96,
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body mt-8 max-w-[620px] text-[15px] md:text-[18px] leading-[1.7]"
              style={{ color: "rgba(228,224,221,0.75)" }}
            >
              Creación de contenido, estrategia digital, presencia en eventos y
              automatización — un sistema mensual armado para Land Rover Puebla.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-8 right-8 md:right-14 hidden md:flex flex-col items-center gap-3 z-10"
          >
            <span
              className="font-body text-[10px] tracking-[0.28em] uppercase"
              style={{
                color: "rgba(228,224,221,0.55)",
                writingMode: "vertical-rl",
              }}
            >
              Scroll
            </span>
            <div
              className="w-px h-10 overflow-hidden relative"
              style={{ background: "rgba(228,224,221,0.2)" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{ background: "#D63A27" }}
                animate={{ height: ["0%", "100%"], top: ["0%", "0%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>

        {/* ============================================================
            2 · LO QUE ENTENDIMOS
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
            <Eyebrow>Lo que entendimos</Eyebrow>
            <SectionTitle>
              Escuchamos primero,{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                después proponemos.
              </em>
            </SectionTitle>
            <Body>
              Land Rover Puebla ya cuenta con una marca sólida y una comunidad
              propia. Nuestro papel es producir contenido a su altura, entender
              su operación y su calendario, y sostener el ritmo de publicación
              mes con mes.
            </Body>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
            {contexto.map((c, i) => (
              <motion.div
                key={c.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 2) * 0.08 }}
                className="p-7 md:p-9 relative group"
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
                  className="font-title text-[20px] mb-3"
                  style={{
                    fontWeight: 700,
                    color: "#E4E0DD",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: "rgba(228,224,221,0.62)" }}
                >
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            3 · DEMO PARA LA MARCA
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#121210" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div {...reveal} className="lg:col-span-6 order-2 lg:order-1">
                <Eyebrow>Nuestro trabajo para la marca</Eyebrow>
                <SectionTitle>
                  Una muestra de lo que{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    hemos producido.
                  </em>
                </SectionTitle>
                <Body className="mb-7">
                  Esta pieza fue creada para Land Rover. Refleja el tono, el
                  ritmo y el estándar de producción con el que trabajamos.
                </Body>
                <Body>
                  Es el mismo cuidado que aplicamos a cada entrega del plan
                  mensual.
                </Body>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 }}
                className="lg:col-span-6 order-1 lg:order-2 flex justify-center"
              >
                <div
                  className="relative w-full max-w-[360px] aspect-[9/16] overflow-hidden"
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
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 70%, rgba(14,14,13,0.5) 100%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4 · EL RETO DEL CALENDARIO
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div {...reveal} className="lg:col-span-6">
                <Eyebrow>Ofertas comerciales que sí se ven</Eyebrow>
                <SectionTitle>
                  Contenido que posiciona,{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    con o sin pauta.
                  </em>
                </SectionTitle>
                <Body className="mb-7">
                  El objetivo principal es anunciar tus ofertas comerciales.
                  Muchas de esas piezas tienen una vida corta en el mes y, por
                  protocolos internos, poco margen para pautarse. Por eso les
                  damos un enfoque creativo para redes —narrativas con estilo
                  cinematográfico que enganchan al espectador— y una estrategia
                  digital que las posiciona de forma orgánica.
                </Body>
                <Body>
                  Cuando una pieza sí requiere pauta adicional, nos anticipamos:
                  la aprobación puede tomar cerca de 28 días, así que la
                  entregamos con margen para que salga al aire a tiempo.
                </Body>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 }}
                className="lg:col-span-6"
              >
                <div
                  className="relative p-8 md:p-10"
                  style={{
                    border: "1px solid rgba(228,224,221,0.14)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {[
                    { k: "Orgánico", v: "Estrategia para posicionar sin depender de pauta" },
                    { k: "Estilo cine", v: "Narrativas que enganchan desde el primer segundo" },
                    { k: "Con anticipación", v: "Si requiere pauta (~28 días), la entregamos a tiempo" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="py-5 flex items-start gap-5"
                      style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
                    >
                      <span
                        className="font-body text-[11px] uppercase tracking-[0.16em] shrink-0 pt-1"
                        style={{ color: "#D63A27", fontWeight: 600, width: 118 }}
                      >
                        {row.k}
                      </span>
                      <span
                        className="font-title text-[17px] md:text-[19px]"
                        style={{ fontWeight: 700, color: "#E4E0DD" }}
                      >
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5 · QUÉ INCLUYE CADA MES
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
            <Eyebrow>Qué incluye cada mes</Eyebrow>
            <SectionTitle>
              Un sistema completo,{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                medible por entregables.
              </em>
            </SectionTitle>
            <Body>
              Nada de promesas difusas. Esto es exactamente lo que produce y
              entrega el equipo, mes con mes.
            </Body>
          </motion.div>

          <div
            className="grid grid-cols-1"
            style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
          >
            {incluye.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="relative grid grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 group"
                style={{ borderBottom: "1px solid rgba(228,224,221,0.12)" }}
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: "#D63A27" }}
                />
                <div className="col-span-12 md:col-span-2">
                  <p
                    className="font-title"
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      color: "#D63A27",
                    }}
                  >
                    {item.num}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3
                    className="font-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      color: "#E4E0DD",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p
                    className="font-body text-[15px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.7)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            6 · CADENCIA MENSUAL DEL CONTENIDO
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
              <Eyebrow>Cómo se reparten los 8 reels</Eyebrow>
              <SectionTitle>
                Cada pieza tiene{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  un trabajo que hacer.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
              {cadencia.map((c, i) => (
                <motion.div
                  key={c.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  className="p-7 md:p-9 relative group"
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
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.22em] mb-5"
                    style={{ color: "#D63A27", fontWeight: 600 }}
                  >
                    {c.dia}
                  </p>
                  <h3
                    className="font-title text-[20px] mb-3"
                    style={{ fontWeight: 700, color: "#E4E0DD" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            7 · MUESTRAS DE PRODUCCIÓN
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
            <Eyebrow>Muestras de producción</Eyebrow>
            <SectionTitle>
              Algunas piezas recientes{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                de nuestro trabajo.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {MUESTRAS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
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
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: "1px solid rgba(214,58,39,0.6)" }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            8 · COMUNIDAD, EVENTOS Y ACCESORIOS
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
              <Eyebrow>Comunidad, eventos y accesorios</Eyebrow>
              <SectionTitle>
                Donde vive la marca,{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  ahí estamos filmando.
                </em>
              </SectionTitle>
              <Body>
                Tu comunidad, tus eventos y tu línea de accesorios son activos
                que casi nadie aprovecha con contenido de calidad. Nosotros sí.
              </Body>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
              {comunidad.map((c, i) => (
                <motion.div
                  key={c.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  className="p-7 md:p-9 relative group"
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
                    className="font-title text-[19px] mb-3"
                    style={{
                      fontWeight: 700,
                      color: "#E4E0DD",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            9 · FULL AI — capacidad bajo autorización previa
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div {...reveal} className="lg:col-span-6">
              <Eyebrow>Capacidad opcional</Eyebrow>
              <SectionTitle>
                Piezas full-AI,{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  como el SuperBee de Dodge.
                </em>
              </SectionTitle>
              <Body className="mb-7">
                Cuando una campaña lo pida, podemos producir piezas full-AI de
                alto impacto, del tipo que ya usan marcas globales. Una capacidad
                más en la caja de herramientas — no un reemplazo de la producción
                real.
              </Body>
              <Body>
                Siempre bajo autorización previa y dentro de los lineamientos de
                identidad de la marca. Se incluyen algunas piezas cuando lo
                autorizas.
              </Body>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.15 }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <div
                className="relative p-8 md:p-10"
                style={{
                  border: "1px solid rgba(214,58,39,0.25)",
                  background: "rgba(214,58,39,0.04)",
                }}
              >
                <p
                  className="font-body text-[11px] uppercase tracking-[0.22em] mb-6"
                  style={{ color: "#D63A27", fontWeight: 600 }}
                >
                  Cómo funciona
                </p>
                {[
                  "Proponemos el concepto y lo autorizas antes de producir.",
                  "Se ejecuta dentro de los lineamientos de Jaguar Land Rover.",
                  "Se acuerdan las piezas caso por caso, según la campaña.",
                ].map((linea) => (
                  <div
                    key={linea}
                    className="py-4 flex items-start gap-4"
                    style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
                  >
                    <span
                      aria-hidden
                      className="shrink-0 block mt-2"
                      style={{ width: 16, height: 1, background: "#D63A27" }}
                    />
                    <span
                      className="font-body text-[14px] leading-[1.6]"
                      style={{ color: "rgba(228,224,221,0.72)" }}
                    >
                      {linea}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            10 · CÓMO TRABAJAMOS
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
              <Eyebrow>Cómo trabajamos</Eyebrow>
              <SectionTitle>
                Cuatro pasos,{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  un solo equipo.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
              {proceso.map((c, i) => (
                <motion.div
                  key={c.num}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  className="p-7 md:p-8"
                  style={{
                    borderTop: "1px solid rgba(228,224,221,0.12)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <p
                    className="font-title leading-none mb-5"
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#D63A27",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {c.num}
                  </p>
                  <h3
                    className="font-title text-[20px] mb-3"
                    style={{ fontWeight: 700, color: "#E4E0DD" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            11 · INVERSIÓN
           ============================================================ */}
        <section
          className="relative px-6 md:px-14 py-24 md:py-32 overflow-hidden"
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
              maxWidth: 800,
              maxHeight: 800,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.10) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div className="relative max-w-[1200px] mx-auto">
            <motion.div
              {...reveal}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            >
              <div className="lg:col-span-6">
                <Eyebrow>Inversión</Eyebrow>
                <SectionTitle>
                  Todo el sistema,{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    un solo cargo mensual.
                  </em>
                </SectionTitle>
                <Body className="mb-4">
                  Un solo equipo, una sola línea visual y un solo responsable.
                  Producción, fotografía, automatización y estrategia integradas
                  en un único plan mensual.
                </Body>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: "rgba(228,224,221,0.55)" }}
                >
                  Las piezas full-AI se acuerdan por separado y solo bajo
                  autorización previa.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div
                  className="relative p-8 md:p-12"
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
                      style={{
                        fontSize: 22,
                        color: "rgba(228,224,221,0.55)",
                        fontWeight: 400,
                      }}
                    >
                      $
                    </span>
                    <span
                      className="font-title"
                      style={{
                        fontSize: "clamp(64px, 9vw, 104px)",
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
            12 · CIERRE
           ============================================================ */}
        <section
          className="relative overflow-hidden flex items-center justify-center px-6 md:px-14 min-h-screen"
          style={{ background: "#0e0e0d" }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              height: "90vw",
              maxWidth: 1000,
              maxHeight: 1000,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.13) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 max-w-[1000px] mx-auto text-center">
            <motion.p
              {...reveal}
              className="font-body text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-12"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              {CLIENTE} × PG Estrategias
            </motion.p>

            <motion.h2
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="font-title mb-10"
              style={{
                fontSize: "clamp(36px, 5.4vw, 82px)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              Un equipo. Un ritmo.
              <br />
              Un solo responsable.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-title"
              style={{
                fontSize: "clamp(24px, 3.4vw, 50px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#D63A27",
                fontStyle: "italic",
              }}
            >
              Empecemos por la oferta
              <br />
              comercial de este mes.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.35 }}
              className="mt-16 flex justify-center"
            >
              <Logo size={30} tone="cream" />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
