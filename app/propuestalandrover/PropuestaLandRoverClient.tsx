"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Landing de propuesta — Land Rover Puebla × PG Estrategias.

   Versión comercial: expone cómo trabajamos, los servicios y la
   inversión. Mantiene el sistema visual de la marca PG y las piezas
   audiovisuales del portafolio.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Land Rover Puebla";
const PRECIO = "15,000";

const HERO_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785888616/WhatsApp_Video_2026-08-04_at_4.27.42_PM_vcpnm7.mp4";

/* Material automotriz primero. Sin rótulos: las piezas se muestran,
   no se describen. */
const PORTFOLIO = [
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785887879/AQNuVhBmkwGTX4OC78O3d0NwH_wfPRlmgNF7AvKO9OeAWifsY0eQEZ9IC9s0raBPg-wJjnxrnTZXKaXkwiHNIpMRWV-x3VRjiy1V4-k_om1cmn.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785888058/AQPQOFP2CknFh7iZjtFDWRGeqLuiu-wE6o3L4EaKSH4XoEaxIAgPuWhJrRtB7CHuNDnCAdvL-XfWcEP_h32SaGdC627KoUHNg29_hbI_fz6dxd.mp4",
];

const TRANSFORMACION_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4";

/* Los entregables concretos del mes. Este es el corazón de la oferta. */
const incluye = [
  {
    num: "01",
    title: "8 reels mensuales",
    desc:
      "Distribuidos entre oferta comercial del mes, recaps de eventos y rutas de la comunidad, y promociones atemporales. Producción a la altura de la marca, no relleno de calendario.",
  },
  {
    num: "02",
    title: "100 fotografías",
    desc:
      "Para posts, carruseles y artes en redes sociales. Un banco visual que alimenta la operación todo el mes sin depender de una sola sesión.",
  },
  {
    num: "03",
    title: "WhatsApp Bot optimizado",
    desc:
      "Para responder a tus leads al instante, calificar interés y modelo, y pasarle a tu equipo solo a quien está listo para hablar.",
  },
  {
    num: "04",
    title: "Perfil de Google optimizado",
    desc:
      "Más estrategia de reseñas para dominar las búsquedas locales de ventas, servicio y Approved — y llegar bien parados a quien ya te busca.",
  },
  {
    num: "05",
    title: "Videollamada estratégica quincenal",
    desc:
      "Cada dos semanas revisamos calendario, prioridades y siguiente ola de contenido. La estrategia sigue siendo tuya; nosotros la ejecutamos.",
  },
  {
    num: "06",
    title: "Consultoría de crecimiento mensual",
    desc:
      "Una sesión al mes para mirar el negocio de arriba: qué está funcionando, qué ajustar y dónde está la siguiente oportunidad.",
  },
  {
    num: "07",
    title: "Reporte quincenal",
    desc:
      "En lenguaje claro, sin tecnicismos. Qué se produjo, qué se publicó y cómo respondió tu audiencia — cada quince días.",
  },
];

/* La cadencia que resuelve el cuello de botella de aprobación. */
const cadencia = [
  {
    dia: "Semana 1",
    title: "Ofertas comerciales listas",
    desc:
      "Los videos de la oferta comercial del mes quedan entregados en los primeros días. Entran a su ciclo de aprobación de inmediato, no a mitad de mes.",
  },
  {
    dia: "Durante el mes",
    title: "Recaps y comunidad",
    desc:
      "Filmamos fuera de piso: rutas, actividades y eventos de la comunidad Land Rover. El contenido de estilo de vida que hace sentir la marca.",
  },
  {
    dia: "Constante",
    title: "Atemporales y banco visual",
    desc:
      "Promociones atemporales, accesorios originales y las 100 fotografías que sostienen la publicación diaria sin apagar el ritmo.",
  },
];

const comunidad = [
  {
    title: "Recaps de eventos fuera de piso",
    desc:
      "Estamos presentes en rutas y actividades para filmar la experiencia real de la comunidad Land Rover — no una recreación de estudio.",
  },
  {
    title: "Curaduría de eventos",
    desc:
      "Sugerimos eventos deportivos y campestres alineados con el público objetivo y con el ADN de la marca, para activar presencia donde importa.",
  },
  {
    title: "Público objetivo que ya conocemos",
    desc:
      "Tenemos experiencia con este perfil de comprador. No arrancamos de cero: sabemos qué le mueve y con qué contenido responde.",
  },
  {
    title: "Línea de accesorios originales",
    desc:
      "La marca de accesorios originales Land Rover tiene su propio espacio dentro del calendario — un ingreso que casi nadie promociona con calidad.",
  },
];

const colaboracion = [
  {
    num: "01",
    title: "Inmersión",
    desc:
      "Conocemos tu operación, tu inventario, tus lineamientos de marca y tus objetivos.",
  },
  {
    num: "02",
    title: "Plan conjunto",
    desc:
      "Definimos juntos prioridades, calendario y metas — dentro de los lineamientos de identidad de Jaguar Land Rover.",
  },
  {
    num: "03",
    title: "Producción y activación",
    desc: "Grabamos, fotografiamos y ponemos el sistema completo en marcha.",
  },
  {
    num: "04",
    title: "Optimización quincenal",
    desc: "Reportería clara y ajustes con datos, no con intuición.",
  },
];

const estandares = [
  "Dirección de arte",
  "Iluminación cinematográfica",
  "Color grading",
  "Entregas puntuales",
];

const testimonios = [
  {
    quote: "Hemos triplicado el número de contratos firmados.",
    nombre: "Ex Hacienda de San Bartolo",
    industria: "Bienes Raíces · Puebla",
    imagen:
      "https://res.cloudinary.com/dieszqcrn/image/upload/v1778399817/ChatGPT_Image_10_may_2026_01_56_51_a.m_onxhrw.png",
  },
  {
    quote:
      "Una fotografía no puede enseñar lo que un sistema audiovisual estratégico sí…",
    nombre: "Cubiertas y Herrajes",
    industria: "Industria · Puebla",
    imagen:
      "https://res.cloudinary.com/djduba5fd/image/upload/q_auto/f_auto/v1779761378/ChatGPT_Image_25_may_2026_08_09_30_p.m_d7citi.png",
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
      {/* NAV — identificación, sin navegación ni CTA */}
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
            <source src={HERO_VIDEO} type="video/mp4" />
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
                  fontSize: "clamp(46px, 7.6vw, 124px)",
                  fontWeight: 700,
                  lineHeight: 0.94,
                  letterSpacing: "-0.035em",
                  color: "#E4E0DD",
                }}
              >
                Contenido a la altura de{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Land Rover.
                </em>
              </motion.h1>
            </div>
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
            2 · EL PROBLEMA — el cuello de botella real
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="max-w-[880px]">
            <Eyebrow>El problema</Eyebrow>
            <SectionTitle>
              No es un problema de visión.{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                Es un problema de ritmo.
              </em>
            </SectionTitle>
            <Body className="mb-7">
              Aprobar un anuncio para pautar toma cerca de 20 días. Eso deja
              apenas 10 para que la oferta comercial del mes salga a la calle —
              y muchas veces el contenido llega tarde a ese ciclo. El resultado:
              vehículos que merecen una producción cinematográfica terminan
              publicados con prisa, o no publicados a tiempo.
            </Body>
            <Body>
              La marca ya es legendaria. Lo que falta es una maquinaria que
              produzca a la altura de Land Rover y entregue con la anticipación
              que su calendario exige.
            </Body>
          </motion.div>
        </section>

        {/* ============================================================
            3 · LA TRANSFORMACIÓN
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div {...reveal} className="lg:col-span-6">
                <Eyebrow>La transformación</Eyebrow>
                <SectionTitle>
                  La estrategia sigue siendo tuya.{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    Nosotros ponemos la maquinaria.
                  </em>
                </SectionTitle>
                <Body>
                  Imagina un equipo completo de producción operando como
                  extensión del tuyo: cada vehículo filmado con calidad
                  cinematográfica, contenido de estilo de vida que hace sentir la
                  marca antes de manejarla, y un sistema que responde a cada lead
                  al instante — todo entregado con la anticipación que tu ciclo
                  de aprobación necesita.
                </Body>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 }}
                className="lg:col-span-6"
              >
                <div
                  className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
                  style={{ background: "#0e0e0d" }}
                >
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden
                  >
                    <source src={TRANSFORMACION_VIDEO} type="video/mp4" />
                  </video>
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 60%, rgba(21,21,19,0.6) 100%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4 · PORTAFOLIO
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
            <Eyebrow>Portafolio</Eyebrow>
            <SectionTitle>
              No te contamos cómo se ve la calidad.{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                Te la mostramos.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PORTFOLIO.map((src, i) => (
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
                  <source src={src} type="video/mp4" />
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
            5 · QUÉ INCLUYE CADA MES — los entregables concretos
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
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
          </div>
        </section>

        {/* ============================================================
            6 · CADENCIA OPERATIVA — cómo resolvemos el timing
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
            <Eyebrow>Cadencia operativa</Eyebrow>
            <SectionTitle>
              La oferta comercial,{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                lista en la primera semana.
              </em>
            </SectionTitle>
            <Body>
              Trabajamos con la anticipación que exige tu ciclo de aprobación:
              los videos de oferta comercial entran a revisión desde los
              primeros días del mes, no a mitad de camino.
            </Body>
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
        </section>

        {/* ============================================================
            7 · COMUNIDAD Y EVENTOS
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
              <Eyebrow>Comunidad y eventos</Eyebrow>
              <SectionTitle>
                Donde vive la marca,{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  ahí estamos filmando.
                </em>
              </SectionTitle>
              <Body>
                La comunidad de rutas y actividades Land Rover es un activo que
                pocas marcas tienen. Lo convertimos en contenido — y sugerimos
                dónde activar la siguiente experiencia.
              </Body>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
              {comunidad.map((c, i) => (
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
            8 · FULL AI — capacidad bajo autorización previa
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
                Sabemos que el video generado con IA no es la preferencia por
                defecto — y está bien. Lo dejamos como una capacidad disponible:
                cuando una campaña lo pida, podemos producir piezas full-AI de
                alto impacto, del tipo que ya usan marcas globales.
              </Body>
              <Body>
                Siempre bajo autorización previa y dentro de los lineamientos de
                identidad de la marca. Nunca sustituye la producción real; la
                complementa cuando aporta.
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
                  "Se cotiza por pieza, aparte del paquete mensual.",
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
            9 · CÓMO COLABORARÍAMOS
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
              <Eyebrow>Cómo colaboraríamos</Eyebrow>
              <SectionTitle>
                Cuatro pasos,{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  un solo equipo.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
              {colaboracion.map((c, i) => (
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
            10 · INVERSIÓN
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
                  Las piezas full-AI se cotizan por separado y solo bajo
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
                      Más IVA en caso de requerir factura. Sin costos ocultos:
                      los siete entregables del mes están incluidos en este
                      cargo.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            11 · ESTÁNDARES DE CALIDAD
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div {...reveal} className="lg:col-span-6">
              <Eyebrow>Estándares de calidad</Eyebrow>
              <SectionTitle>
                Más de 75 años de historia.{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Cada pieza tiene que estar a esa altura.
                </em>
              </SectionTitle>
              <Body>
                Trabajamos con estándares de producción publicitaria: dirección
                de arte, iluminación cinematográfica, color grading y entregas
                puntuales. Cuando representas una marca con más de 75 años de
                historia, cada pieza tiene que estar a esa altura.
              </Body>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.15 }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <div className="flex flex-col gap-px">
                {estandares.map((e) => (
                  <div
                    key={e}
                    className="py-6 flex items-center gap-5"
                    style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
                  >
                    <span
                      aria-hidden
                      className="shrink-0 block"
                      style={{ width: 20, height: 1, background: "#D63A27" }}
                    />
                    <span
                      className="font-title text-[19px]"
                      style={{ fontWeight: 700, color: "#E4E0DD" }}
                    >
                      {e}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            12 · PRUEBA SOCIAL
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
              <Eyebrow>Quiénes ya trabajan con nosotros</Eyebrow>
              <SectionTitle>
                Lo dicen{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  ellos, no nosotros.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {testimonios.map((t, i) => (
                <motion.figure
                  key={t.nombre}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.1 }}
                  className="flex flex-col"
                  style={{
                    border: "1px solid rgba(228,224,221,0.12)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{ background: "#0e0e0d" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.imagen}
                      alt={`Cliente de PG Estrategias: ${t.nombre}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 45%, rgba(21,21,19,0.85) 100%)",
                      }}
                    />
                  </div>

                  <blockquote className="p-7 md:p-9">
                    <p
                      className="font-title mb-6"
                      style={{
                        fontSize: "clamp(19px, 2.1vw, 25px)",
                        fontWeight: 700,
                        lineHeight: 1.25,
                        letterSpacing: "-0.015em",
                        color: "#E4E0DD",
                      }}
                    >
                      «{t.quote}»
                    </p>
                    <figcaption>
                      <p
                        className="font-body text-[14px] mb-1"
                        style={{ color: "#E4E0DD" }}
                      >
                        {t.nombre}
                      </p>
                      <p
                        className="font-body text-[11px] uppercase tracking-[0.16em]"
                        style={{ color: "rgba(228,224,221,0.45)" }}
                      >
                        {t.industria}
                      </p>
                    </figcaption>
                  </blockquote>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            13 · CIERRE
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
              La marca ya es legendaria.
              <br />
              Los vehículos hablan por sí solos.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-title"
              style={{
                fontSize: "clamp(26px, 3.6vw, 54px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#D63A27",
                fontStyle: "italic",
              }}
            >
              Nosotros ponemos la maquinaria
              <br />
              que los convierte en ventas.
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
