"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Landing de propuesta — Land Rover Puebla × PG Estrategias.

   Se presenta en persona: NO lleva botones, enlaces de contacto ni
   precios. El cierre es verbal y la última pantalla es el telón de
   fondo de ese cierre, por eso tampoco monta el Footer del sitio.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Land Rover Puebla";

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

/* Visual de la sección «La transformación».
   PENDIENTE: sustituir por una Defender o Range Rover en paisaje —
   kit de prensa de JLR o producción propia. Nada de stock genérico.
   Mientras llega, se muestra una pieza cinematográfica del portafolio. */
const TRANSFORMACION_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4";

const ideas = [
  {
    num: "01",
    title: "Serie «Territorio»",
    desc:
      "La Defender y la Range Rover filmadas donde pertenecen — haciendas, carreteras a Valle de Bravo, caminos de la Sierra. Contenido de estilo de vida que ninguna otra agencia en Puebla puede igualar, porque ninguna tiene estos vehículos.",
  },
  {
    num: "02",
    title: "Prueba de manejo cinematográfica",
    desc:
      "Convertir el test drive en una experiencia filmada que el prospecto quiere vivir — y compartir.",
  },
  {
    num: "03",
    title: "Entregas memorables",
    desc:
      "El momento de recibir las llaves de una Range Rover, producido como pieza de marca. Cada cliente se vuelve embajador.",
  },
  {
    num: "04",
    title: "Posventa que retiene",
    desc:
      "Contenido y campañas para servicio y Land Rover Approved — el ingreso recurrente que casi nadie promociona con calidad.",
  },
  {
    num: "05",
    title: "Campañas de precisión en Meta y Google",
    desc:
      "Llegar al perfil que realmente puede comprar, no a todo el mundo — y capturar a quien ya busca «Defender», «Range Rover» o «Land Rover seminuevos» en Puebla.",
  },
  {
    num: "06",
    title: "Filtro inteligente por WhatsApp",
    desc:
      "Bot que califica interés, modelo y perfil antes de pasar el lead, para que tu equipo dedique su tiempo a compradores reales.",
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
      "Definimos juntos prioridades, calendario y metas — la estrategia sigue siendo tuya, nosotros ponemos la maquinaria. Todo dentro de los lineamientos de identidad de Jaguar Land Rover.",
  },
  {
    num: "03",
    title: "Producción y activación",
    desc: "Grabamos, fotografiamos y lanzamos el sistema completo.",
  },
  {
    num: "04",
    title: "Optimización mensual",
    desc: "Reportería clara y ajustes con datos, no con intuición.",
  },
];

const traccion = [
  {
    title: "Meta Ads con remarketing",
    desc:
      "Quien vio el video de la Defender tres veces recibe el empujón que le faltaba.",
  },
  {
    title: "Google Ads para capturar demanda activa",
    desc:
      "Quien busca un modelo específico en Puebla, te encuentra a ti.",
  },
  {
    title: "Optimización de Google Maps",
    desc:
      "Para dominar las búsquedas locales — ventas, servicio y Approved.",
  },
  {
    title: "Landing page a la altura de la marca",
    desc:
      "Diseñada para convertir visitas en citas de prueba de manejo.",
  },
  {
    title: "Sistema de bots que califica cada lead",
    desc:
      "Modelo, perfil, intención — tu equipo solo habla con compradores reales.",
  },
  {
    title: "Carruseles con fotografía profesional",
    desc:
      "Que hacen justicia a los vehículos que representan.",
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
            1 · HERO — solo el titular sobre el video
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
            2 · EL PROBLEMA
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="max-w-[880px]">
            <Eyebrow>El problema</Eyebrow>
            <SectionTitle>
              No es un problema de visión.{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                Es un problema de manos.
              </em>
            </SectionTitle>
            <Body className="mb-7">
              Land Rover invierte décadas en construir algo que ninguna otra
              marca tiene: la idea de que un vehículo puede llevarte más lejos —
              en el terreno y en la vida. Pero sostener ese estándar en lo local
              exige algo que pocas operaciones tienen a la mano: un equipo de
              producción capaz de filmar una Defender como se merece, campañas
              que encuentren al comprador correcto y un seguimiento tan
              impecable como la experiencia de showroom.
            </Body>
            <Body>
              Y una Range Rover merece una producción a la altura del vehículo.
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
                  Imagina tener un equipo completo de producción y performance
                  operando como extensión del tuyo: cada vehículo filmado con
                  calidad cinematográfica, contenido de estilo de vida que hace
                  sentir la marca antes de manejarla, campañas que llegan
                  exactamente al perfil que puede comprarla, y un sistema que
                  convierte interés en citas de prueba de manejo.
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
            5 · IDEAS PARA LAND ROVER PUEBLA
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
              <Eyebrow>Ideas para {CLIENTE}</Eyebrow>
              <SectionTitle>
                Esto es lo que{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  ya imaginamos para ustedes.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="flex flex-col">
              {ideas.map((idea, i) => (
                <motion.div
                  key={idea.num}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.06 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-9 md:py-12"
                  style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
                >
                  <div className="lg:col-span-5 flex items-start gap-5">
                    <span
                      className="font-title leading-none shrink-0"
                      style={{
                        fontSize: "34px",
                        fontWeight: 700,
                        color: "#D63A27",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {idea.num}
                    </span>
                    <h3
                      className="font-title"
                      style={{
                        fontSize: "clamp(21px, 2.4vw, 30px)",
                        fontWeight: 700,
                        lineHeight: 1.12,
                        letterSpacing: "-0.02em",
                        color: "#E4E0DD",
                      }}
                    >
                      {idea.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p
                      className="font-body text-[15px] leading-[1.8]"
                      style={{ color: "rgba(228,224,221,0.68)" }}
                    >
                      {idea.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            6 · CÓMO COLABORARÍAMOS
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
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
        </section>

        {/* ============================================================
            7 · PAQUETE TRACCIÓN — sin precio, se presenta verbalmente
           ============================================================ */}
        <section
          className="relative py-24 md:py-40 overflow-hidden"
          style={{ background: "#151513" }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "-20%",
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
          <div className="relative px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[880px]">
              <Eyebrow>El paquete</Eyebrow>
              <SectionTitle>
                Tracción:{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  el sistema completo, en marcha.
                </em>
              </SectionTitle>
              <Body>
                Diseñado para marcas que ya tienen demanda y necesitan
                convertirla con consistencia: producción de contenido mensual,
                campañas en Meta Ads, landing pages de campaña y automatización
                de seguimiento por WhatsApp. Un solo equipo, una sola línea
                visual, un solo responsable.
              </Body>
            </motion.div>

            <motion.p
              {...reveal}
              className="font-body text-[11px] uppercase tracking-[0.22em] mb-10"
              style={{ color: "rgba(228,224,221,0.4)" }}
            >
              El sistema completo incluye
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
              {traccion.map((t, i) => (
                <motion.div
                  key={t.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: (i % 3) * 0.07 }}
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
                    className="font-title text-[18px] mb-3"
                    style={{
                      fontWeight: 700,
                      color: "#E4E0DD",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    {t.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            8 · ESTÁNDARES DE CALIDAD
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
            9 · PRUEBA SOCIAL
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
            10 · CIERRE — telón de fondo del pitch verbal
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
