"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

const WHATSAPP_URL =
  "https://wa.me/5212221215051?text=" +
  encodeURIComponent(
    "Hola PG Estrategias, soy de Mercedes-Benz Reyes Huerta y me interesa ver mi video demo."
  );

const HERO_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785887879/AQNuVhBmkwGTX4OC78O3d0NwH_wfPRlmgNF7AvKO9OeAWifsY0eQEZ9IC9s0raBPg-wJjnxrnTZXKaXkwiHNIpMRWV-x3VRjiy1V4-k_om1cmn.mp4";

const REEL_VIDEOS = [
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1785888058/AQPQOFP2CknFh7iZjtFDWRGeqLuiu-wE6o3L4EaKSH4XoEaxIAgPuWhJrRtB7CHuNDnCAdvL-XfWcEP_h32SaGdC627KoUHNg29_hbI_fz6dxd.mp4",
    label: "Producción · Reel de marca",
  },
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4",
    label: "Instalaciones · Cinematográfico",
  },
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4",
    label: "Producto · Ficha visual",
  },
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4",
    label: "Automotriz · Formato showroom",
  },
  {
    src: "https://res.cloudinary.com/djduba5fd/video/upload/v1785888616/WhatsApp_Video_2026-08-04_at_4.27.42_PM_vcpnm7.mp4",
    label: "Corte vertical · Plataformas sociales",
  },
];

const method = [
  {
    num: "01",
    title: "Diagnóstico",
    desc:
      "Auditamos tu presencia digital completa —redes, Google Maps, campañas activas— frente al estándar global de la marca.",
  },
  {
    num: "02",
    title: "Estrategia",
    desc:
      "Definimos calendario de contenido, campañas y el flujo completo del lead: desde que te encuentra hasta que llega calificado a tu equipo de ventas.",
  },
  {
    num: "03",
    title: "Producción",
    desc:
      "Grabamos en tus instalaciones con equipo cinematográfico: video, fotografía profesional y piezas listas para cada plataforma.",
  },
  {
    num: "04",
    title: "Tracción",
    desc:
      "Activamos el sistema completo y lo optimizamos cada mes con datos, no con intuición.",
  },
];

const services = [
  {
    title: "Google Maps",
    desc:
      "Optimización del perfil para destacar en las búsquedas locales que ya te están buscando.",
  },
  {
    title: "Google Ads",
    desc:
      "Captura de la demanda activa: quien busca “Mercedes Puebla” hoy, te encuentra a ti.",
  },
  {
    title: "Meta Ads",
    desc:
      "Campañas con contenido que detiene el scroll en Instagram y Facebook.",
  },
  {
    title: "Landing pages",
    desc:
      "Diseñadas a la altura de la marca, pensadas para convertir la visita en una cita.",
  },
  {
    title: "Bots de calificación",
    desc:
      "Sistema que califica cada lead antes de que llegue a tu equipo. Nadie pierde tiempo con curiosos.",
  },
  {
    title: "Carruseles + Fotografía",
    desc:
      "Fotografía profesional de inventario e instalaciones, editada para plataforma.",
  },
];

const standards = [
  "Dirección de arte",
  "Iluminación cinematográfica",
  "Color grading",
  "Entregas puntuales",
  "Revisión previa a publicar",
  "Una sola línea visual",
];

export default function PropuestaMercedesClient() {
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
          background: scrolled
            ? "rgba(28,28,26,0.88)"
            : "rgba(28,28,26,0.35)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(228,224,221,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-14 h-16 max-w-[1400px] mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <Logo size={24} tone="cream" />
          </a>
          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.16em] uppercase"
              style={{ color: "rgba(228,224,221,0.45)" }}
            >
              Propuesta · Mercedes-Benz Reyes Huerta
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
            HERO — video reel background, tipografía a la altura MB
           ============================================================ */}
        <section className="relative w-full h-screen min-h-[720px] overflow-hidden">
          {/* Video de fondo */}
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

          {/* Gradiente vertical para legibilidad */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,28,26,0.55) 0%, rgba(28,28,26,0.35) 45%, rgba(28,28,26,0.9) 100%)",
            }}
          />
          {/* Vignette lateral */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(28,28,26,0.55) 100%)",
            }}
          />

          {/* Contenido */}
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-24 max-w-[1400px] mx-auto">
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
                Propuesta para Mercedes-Benz Reyes Huerta
              </p>
            </motion.div>

            <div className="overflow-hidden mb-8 max-w-[1050px]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-title"
                style={{
                  fontSize: "clamp(52px, 8.4vw, 132px)",
                  fontWeight: 700,
                  lineHeight: 0.94,
                  letterSpacing: "-0.035em",
                  color: "#E4E0DD",
                }}
              >
                A la altura de{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Mercedes-Benz.
                </em>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-[15px] md:text-[17px] leading-relaxed mb-10 max-w-[620px]"
              style={{ color: "rgba(228,224,221,0.78)" }}
            >
              Producción cinematográfica, campañas de precisión y un sistema
              completo pensado para convertir demanda local en citas de
              showroom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group font-title font-bold px-8 py-4 text-[13px] tracking-[0.08em] uppercase transition-transform duration-500 hover:-translate-y-0.5"
                style={{ background: "#D63A27", color: "#E4E0DD" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: "#1C1C1A" }}
                />
                <span className="relative flex items-center gap-3">
                  Quiero ver mi video demo
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#trabajo"
                className="relative overflow-hidden group font-body px-8 py-4 text-[13px] tracking-[0.08em] uppercase transition-colors duration-500"
                style={{
                  border: "1px solid rgba(228,224,221,0.3)",
                  color: "#E4E0DD",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: "rgba(228,224,221,0.08)" }}
                />
                <span className="relative">Ver muestras</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-8 right-8 md:right-14 hidden md:flex flex-col items-center gap-3 z-10"
          >
            <span
              className="font-body text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "rgba(228,224,221,0.55)", writingMode: "vertical-rl" }}
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
            LA TRANSFORMACIÓN — con "casa matriz" en Stuttgart
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
                <p
                  className="font-body text-[11px] tracking-[0.22em] uppercase"
                  style={{ color: "#D63A27", fontWeight: 500 }}
                >
                  La transformación
                </p>
              </div>
              <h2
                className="font-title mb-8"
                style={{
                  fontSize: "clamp(36px, 4.6vw, 68px)",
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "#E4E0DD",
                }}
              >
                De Stuttgart a{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Reyes Huerta.
                </em>
              </h2>
              <p
                className="font-body text-[16px] md:text-[17px] leading-[1.75] mb-6"
                style={{ color: "rgba(228,224,221,0.78)" }}
              >
                Imagina que cada video, cada campaña y cada mensaje de
                WhatsApp que sale de Reyes Huerta se sienta como salir
                directamente de Stuttgart.
              </p>
              <p
                className="font-body text-[16px] md:text-[17px] leading-[1.75]"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                Eso hacemos: llevamos el estándar global de la marca a la
                operación local, y lo convertimos en{" "}
                <span style={{ color: "#E4E0DD", fontWeight: 500 }}>
                  citas de showroom.
                </span>
              </p>
            </motion.div>

            {/* Imagen matriz — placeholder editorial (a reemplazar por press-kit oficial MB) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {/* Placeholder editorial — reemplazar por imagen del kit de prensa Mercedes-Benz */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(140deg, #2a2a26 0%, #1C1C1A 55%, #0e0e0d 100%)",
                  }}
                />
                {/* Rejilla arquitectónica sutil */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(228,224,221,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(228,224,221,0.4) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                      "radial-gradient(ellipse at 30% 30%, black 40%, transparent 85%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at 30% 30%, black 40%, transparent 85%)",
                  }}
                />
                {/* "Estrella" MB decorativa */}
                <svg
                  aria-hidden
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  width="220"
                  height="220"
                  viewBox="0 0 200 200"
                  fill="none"
                  style={{ opacity: 0.28 }}
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="96"
                    stroke="#E4E0DD"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M100 20 L100 100 M100 100 L30 140 M100 100 L170 140"
                    stroke="#E4E0DD"
                    strokeWidth="2"
                  />
                </svg>
                {/* Etiqueta */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
                  <p
                    className="font-body text-[10px] tracking-[0.28em] uppercase"
                    style={{ color: "#E4E0DD", opacity: 0.85 }}
                  >
                    Stuttgart · DE
                  </p>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p
                    className="font-title mb-1"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#E4E0DD",
                    }}
                  >
                    Casa Matriz Mercedes-Benz
                  </p>
                  <p
                    className="font-body text-[11px] tracking-[0.18em] uppercase"
                    style={{ color: "rgba(228,224,221,0.5)" }}
                  >
                    Referencia visual · Kit de prensa oficial
                  </p>
                </div>
                {/* Marco */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: "1px solid rgba(228,224,221,0.14)" }}
                />
              </div>
              <p
                className="font-body text-[11px] mt-4 leading-relaxed"
                style={{ color: "rgba(228,224,221,0.4)" }}
              >
                Nota interna: reemplazar por imagen del kit de prensa oficial
                de Mercedes-Benz (media.mercedes-benz.com) o stock licenciada
                antes de enviar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            NUESTRO TRABAJO — reel grid
           ============================================================ */}
        <section
          id="trabajo"
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 md:mb-20 max-w-[820px]"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
                <p
                  className="font-body text-[11px] tracking-[0.22em] uppercase"
                  style={{ color: "#D63A27", fontWeight: 500 }}
                >
                  Muestras de producción
                </p>
              </div>
              <h2
                className="font-title mb-6"
                style={{
                  fontSize: "clamp(32px, 4.2vw, 60px)",
                  fontWeight: 700,
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  color: "#E4E0DD",
                }}
              >
                El estándar, en{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  movimiento.
                </em>
              </h2>
              <p
                className="font-body text-[15px] md:text-[16px] leading-[1.75] max-w-[620px]"
                style={{ color: "rgba(228,224,221,0.65)" }}
              >
                Piezas producidas por nuestro equipo. Cámara, dirección,
                iluminación y edición internas: la misma calidad que
                aplicaríamos a Mercedes-Benz Reyes Huerta desde el primer mes.
              </p>
            </motion.div>

            {/* Grid vertical/horizontal alternado */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {REEL_VIDEOS.map((v, i) => (
                <motion.div
                  key={i}
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
                    preload="metadata"
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                  {/* Overlay inferior */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.75) 100%)",
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <p
                      className="font-body text-[10px] md:text-[11px] tracking-[0.16em] uppercase"
                      style={{ color: "#E4E0DD", fontWeight: 500 }}
                    >
                      {v.label}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ border: "1px solid rgba(214,58,39,0.6)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            NUESTRO MÉTODO — 4 pasos
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20 max-w-[820px]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "#D63A27", fontWeight: 500 }}
              >
                Nuestro método
              </p>
            </div>
            <h2
              className="font-title"
              style={{
                fontSize: "clamp(32px, 4.2vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "#E4E0DD",
              }}
            >
              Cuatro fases. Un solo{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                responsable.
              </em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {method.map((m, i) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative pt-8"
                style={{ borderTop: "1px solid rgba(228,224,221,0.15)" }}
              >
                <span
                  className="absolute top-0 left-0 h-px transition-all duration-500 group-hover:w-full"
                  style={{ background: "#D63A27", width: 40 }}
                />
                <p
                  className="font-title mb-4"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    color: "#D63A27",
                  }}
                >
                  {m.num}
                </p>
                <h3
                  className="font-title mb-4"
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#E4E0DD",
                  }}
                >
                  {m.title}
                </h3>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: "rgba(228,224,221,0.65)" }}
                >
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Servicios integrados */}
          <div className="mt-24 md:mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="mb-12 max-w-[720px]"
            >
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase mb-4"
                style={{ color: "rgba(228,224,221,0.5)" }}
              >
                El sistema completo incluye
              </p>
              <h3
                className="font-title"
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#E4E0DD",
                }}
              >
                Todos los canales, un mismo equipo, una misma línea visual.
              </h3>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
                  className="relative p-8 group cursor-default"
                  style={{
                    borderBottom: "1px solid rgba(228,224,221,0.12)",
                    borderRight:
                      (i + 1) % 3 !== 0
                        ? "1px solid rgba(228,224,221,0.12)"
                        : "none",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                    style={{ background: "#D63A27" }}
                  />
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="font-title text-[11px] tracking-[0.16em]"
                      style={{ color: "rgba(228,224,221,0.35)" }}
                    >
                      0{i + 1}
                    </span>
                    <h4
                      className="font-title"
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        color: "#E4E0DD",
                      }}
                    >
                      {s.title}
                    </h4>
                  </div>
                  <p
                    className="font-body text-[14px] leading-[1.65]"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            PAQUETE TRACCIÓN
           ============================================================ */}
        <section
          className="relative px-6 md:px-14 py-24 md:py-40"
          style={{
            background:
              "linear-gradient(180deg, #1C1C1A 0%, #25241F 60%, #1C1C1A 100%)",
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
                <p
                  className="font-body text-[11px] tracking-[0.22em] uppercase"
                  style={{ color: "#D63A27", fontWeight: 500 }}
                >
                  Paquete recomendado
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-7">
                  <h2
                    className="font-title mb-6"
                    style={{
                      fontSize: "clamp(48px, 7vw, 108px)",
                      fontWeight: 700,
                      lineHeight: 0.96,
                      letterSpacing: "-0.035em",
                      color: "#E4E0DD",
                    }}
                  >
                    Tracción.
                  </h2>
                  <p
                    className="font-title mb-8"
                    style={{
                      fontSize: "clamp(20px, 2vw, 28px)",
                      fontWeight: 400,
                      lineHeight: 1.35,
                      color: "rgba(228,224,221,0.85)",
                    }}
                  >
                    El sistema completo, en marcha.
                  </p>
                  <p
                    className="font-body text-[16px] md:text-[17px] leading-[1.75] mb-6"
                    style={{ color: "rgba(228,224,221,0.72)" }}
                  >
                    Diseñado para marcas que ya tienen demanda y necesitan
                    convertirla con consistencia:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Producción de contenido mensual",
                      "Campañas en Meta Ads",
                      "Landing pages de campaña",
                      "Automatización de seguimiento por WhatsApp",
                    ].map((line, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 font-body text-[15px]"
                        style={{ color: "rgba(228,224,221,0.85)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#D63A27" }}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div
                    className="p-8 md:p-10 relative"
                    style={{
                      background: "rgba(228,224,221,0.03)",
                      border: "1px solid rgba(228,224,221,0.12)",
                    }}
                  >
                    <p
                      className="font-body text-[10px] tracking-[0.24em] uppercase mb-6"
                      style={{ color: "rgba(228,224,221,0.4)" }}
                    >
                      Compromiso operativo
                    </p>
                    <div className="space-y-6">
                      {[
                        { k: "Un solo equipo", v: "Producción, pauta y estrategia bajo un mismo techo." },
                        { k: "Una sola línea visual", v: "Cada pieza pasa por dirección de arte antes de publicarse." },
                        { k: "Un solo responsable", v: "Un punto de contacto directo, no cuentas rebotando." },
                      ].map((r) => (
                        <div key={r.k}>
                          <p
                            className="font-title mb-1"
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              letterSpacing: "-0.01em",
                              color: "#E4E0DD",
                            }}
                          >
                            {r.k}
                          </p>
                          <p
                            className="font-body text-[13px] leading-[1.6]"
                            style={{ color: "rgba(228,224,221,0.6)" }}
                          >
                            {r.v}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            ESTÁNDARES DE CALIDAD
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px block" style={{ background: "#D63A27" }} />
                <p
                  className="font-body text-[11px] tracking-[0.22em] uppercase"
                  style={{ color: "#D63A27", fontWeight: 500 }}
                >
                  Estándares
                </p>
              </div>
              <h2
                className="font-title"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 700,
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  color: "#E4E0DD",
                }}
              >
                Aquí no hay margen para{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  “más o menos”.
                </em>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <p
                className="font-body text-[16px] md:text-[17px] leading-[1.8] mb-10"
                style={{ color: "rgba(228,224,221,0.72)" }}
              >
                Trabajamos con estándares de producción publicitaria: dirección
                de arte, iluminación cinematográfica, color grading y entregas
                puntuales. Cada pieza pasa por revisión antes de publicarse,
                porque entendemos que la marca no admite fricción.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {standards.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-3 py-3"
                    style={{ borderTop: "1px solid rgba(228,224,221,0.1)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7L5.5 10.5L12 3.5"
                        stroke="#D63A27"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="font-body text-[14px]"
                      style={{ color: "#E4E0DD" }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            CTA FINAL — video demo
           ============================================================ */}
        <section
          className="relative overflow-hidden px-6 md:px-14 py-24 md:py-40"
          style={{ background: "#0e0e0d" }}
        >
          {/* Halo de color */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80vw",
              height: "80vw",
              maxWidth: 900,
              maxHeight: 900,
              background:
                "radial-gradient(circle, rgba(214,58,39,0.12) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div className="relative z-10 max-w-[900px] mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-body text-[11px] tracking-[0.28em] uppercase mb-6"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              El siguiente paso no cuesta nada
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-title mb-8"
              style={{
                fontSize: "clamp(40px, 6vw, 88px)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              Producimos tu{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                video demo.
              </em>
              <br />
              Sin costo.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-[16px] md:text-[18px] leading-[1.75] mb-12 max-w-[680px] mx-auto"
              style={{ color: "rgba(228,224,221,0.72)" }}
            >
              Producimos una pieza demo pensada específicamente para Mercedes-Benz
              Reyes Huerta. La revisamos juntos en una sesión de 30 minutos —
              y si tiene sentido avanzar, lo sabrás ese mismo día.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group font-title font-bold px-10 py-5 text-[14px] tracking-[0.08em] uppercase transition-transform duration-500 hover:-translate-y-0.5"
                style={{ background: "#D63A27", color: "#E4E0DD" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: "#1C1C1A" }}
                />
                <span className="relative flex items-center gap-3">
                  Solicitar mi video demo
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="mailto:contacto@pgestrategias.com?subject=Video%20demo%20Mercedes-Benz%20Reyes%20Huerta"
                className="font-body text-[13px] tracking-[0.08em] uppercase link-underline"
                style={{ color: "rgba(228,224,221,0.7)" }}
              >
                contacto@pgestrategias.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
