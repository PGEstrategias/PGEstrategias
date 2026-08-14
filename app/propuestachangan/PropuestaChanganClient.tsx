"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

/* Nombre de la agencia — cambiarlo aquí lo cambia en toda la página.
   En Puebla hay varias agencias Changan (Angelópolis, Recta Cholula,
   Hermanos Serdán, Atlixco, Tehuacán); confirmar cuál antes de enviar. */
const AGENCIA = "Changan Puebla";

const WHATSAPP_URL =
  "https://wa.me/5212221215051?text=" +
  encodeURIComponent(
    "Hola PG Estrategias, soy de Changan Puebla y me interesa ver el video demo."
  );

const HERO_VIDEO =
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4";

/* Showreel sin etiquetas: las piezas se explican solas y así ninguna
   descripción contradice lo que se ve en pantalla. Si más adelante se
   quieren rótulos, deben escribirse viendo cada video. */
const REEL_VIDEOS = [
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785887879/AQNuVhBmkwGTX4OC78O3d0NwH_wfPRlmgNF7AvKO9OeAWifsY0eQEZ9IC9s0raBPg-wJjnxrnTZXKaXkwiHNIpMRWV-x3VRjiy1V4-k_om1cmn.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1785888058/AQPQOFP2CknFh7iZjtFDWRGeqLuiu-wE6o3L4EaKSH4XoEaxIAgPuWhJrRtB7CHuNDnCAdvL-XfWcEP_h32SaGdC627KoUHNg29_hbI_fz6dxd.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779377563/Tesla2_qgocjj.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4",
  "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4",
];

/* Cifras públicas del mercado nacional 2026. Son contexto de marca,
   no resultados de PG Estrategias ni de la agencia. */
const marketStats = [
  { num: "+56.8%", label: "Crecimiento de Changan en México, primer semestre 2026" },
  { num: "11,325", label: "Unidades vendidas en el primer semestre 2026" },
  { num: "27,000", label: "Unidades proyectadas por Changan México para 2026" },
  { num: "~17%", label: "Del mercado mexicano ya es de marcas chinas" },
];

const batallas = [
  {
    num: "01",
    kicker: "Búsqueda local",
    title: "Quien busca «Changan Puebla» hoy",
    desc:
      "La marca hace la campaña nacional; la decisión de a qué piso llegar se toma en Google. Perfil de Google Business optimizado, reseñas trabajadas y campañas de búsqueda para aparecer primero en el momento exacto en que alguien decide ir a ver el auto.",
    items: [
      "Ficha de Google Business completa: modelos, horarios, fotos reales del piso.",
      "Estrategia de reseñas después de cada entrega y cada servicio.",
      "Google Ads sobre búsquedas de intención: modelo, precio, prueba de manejo.",
      "Segmentación por zona para no pagar por clics de otra plaza.",
    ],
  },
  {
    num: "02",
    kicker: "Confianza",
    title: "La duda que nadie está resolviendo",
    desc:
      "El comprador mexicano ya voltea a ver la marca, pero llega con preguntas que ningún anuncio genérico responde: refacciones, garantía, servicio, reventa. El contenido que contesta esas dudas de frente es el que convierte al indeciso.",
    items: [
      "Video de garantía, refacciones y respaldo del distribuidor, explicado claro.",
      "Recorridos reales de cada modelo, por dentro y por fuera.",
      "Testimonios de clientes que ya manejan un Changan en Puebla.",
      "Contenido del taller y del área de servicio: lo que sostiene la marca después de la venta.",
    ],
  },
  {
    num: "03",
    kicker: "Velocidad",
    title: "El lead se enfría en minutos",
    desc:
      "En automotriz gana quien contesta primero. Un prospecto que pregunta por un modelo un sábado a las 8 de la noche y recibe respuesta el lunes, ya fue a otro piso. El sistema atiende, califica y agenda sin depender de que alguien esté frente al teléfono.",
    items: [
      "Bot de WhatsApp que responde precio, versiones, disponibilidad y agenda prueba de manejo.",
      "Calificación del prospecto antes de que llegue al asesor: modelo, presupuesto y forma de pago.",
      "Seguimiento automático a quien preguntó y no volvió a escribir.",
      "Registro de cada lead en CRM, con el origen de la campaña que lo trajo.",
    ],
  },
];

const alcance = [
  {
    title: "Producción audiovisual",
    desc:
      "Grabación en el piso de venta con equipo cinematográfico: reels de modelo, recorridos, entregas, testimonios y piezas para anuncios.",
  },
  {
    title: "Meta Ads",
    desc:
      "Campañas en Facebook e Instagram con contenido que detiene el scroll y lleva a conversación, no a un formulario muerto.",
  },
  {
    title: "Google Ads",
    desc:
      "Captura de la demanda que ya está buscando modelo, precio o prueba de manejo en la zona.",
  },
  {
    title: "Google Business Profile",
    desc:
      "Optimización de la ficha, publicaciones periódicas y estrategia de reseñas para ganar la búsqueda local.",
  },
  {
    title: "Bot de WhatsApp",
    desc:
      "Atiende, cotiza, califica y agenda pruebas de manejo las 24 horas, y pasa al asesor sólo lo que ya está listo.",
  },
  {
    title: "Landing pages",
    desc:
      "Páginas por modelo o por campaña, diseñadas para convertir la visita en una cita agendada.",
  },
  {
    title: "CRM y base de datos",
    desc:
      "Cada prospecto ordenado y segmentado, con seguimiento y reactivación de quienes cotizaron y no cerraron.",
  },
  {
    title: "Fotografía de inventario",
    desc:
      "Fotografía profesional de unidades e instalaciones, editada para cada plataforma.",
  },
  {
    title: "Medición y reportes",
    desc:
      "Píxeles, eventos y rastreo configurados para saber qué campaña trajo qué venta, con reporte en lenguaje claro.",
  },
];

const method = [
  {
    num: "01",
    title: "Diagnóstico",
    desc:
      "Auditamos la presencia digital de la agencia —redes, Google Maps, campañas activas, tiempos de respuesta— y la comparamos contra las otras agencias Changan de la plaza.",
  },
  {
    num: "02",
    title: "Estrategia",
    desc:
      "Definimos calendario de contenido, campañas por modelo y el flujo completo del lead: desde que te encuentra hasta que llega calificado al asesor.",
  },
  {
    num: "03",
    title: "Producción",
    desc:
      "Grabamos en el piso de venta: modelos, instalaciones, entregas y testimonios. Todo listo para publicar y para pautar.",
  },
  {
    num: "04",
    title: "Tracción",
    desc:
      "Activamos el sistema completo y lo optimizamos cada mes con datos: qué modelo pide más gente, qué campaña llena más pruebas de manejo.",
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
      className={`font-title mb-6 ${className}`}
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

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PropuestaChanganClient() {
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
          background: scrolled ? "rgba(28,28,26,0.88)" : "rgba(28,28,26,0.35)",
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
              Propuesta · {AGENCIA}
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
            HERO
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
                "linear-gradient(180deg, rgba(28,28,26,0.55) 0%, rgba(28,28,26,0.35) 45%, rgba(28,28,26,0.92) 100%)",
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
                Propuesta para {AGENCIA}
              </p>
            </motion.div>

            <div className="overflow-hidden mb-8 max-w-[1050px]">
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
                La demanda ya existe.{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  Falta que llegue a ti.
                </em>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-[15px] md:text-[17px] leading-relaxed mb-10 max-w-[640px]"
              style={{ color: "rgba(228,224,221,0.78)" }}
            >
              Changan es de las marcas que más rápido crecen en México. En
              Puebla no eres el único piso que la vende. Esta propuesta es sobre
              cómo ganar esa pelea localmente.
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
                  Agendar una sesión
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
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
            EL MOMENTO — contexto de mercado
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-36 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="max-w-[860px] mb-16 md:mb-20">
            <Eyebrow>El momento</Eyebrow>
            <SectionTitle>
              La marca viene subiendo.{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                Eso no dura para siempre.
              </em>
            </SectionTitle>
            <p
              className="font-body text-[15px] md:text-[16px] leading-[1.75] max-w-[680px]"
              style={{ color: "rgba(228,224,221,0.65)" }}
            >
              Changan está creciendo a un ritmo que pocas marcas alcanzan en
              México, y las marcas chinas ya se llevan una porción del mercado
              que hace tres años no existía. Ese impulso está atrayendo
              compradores nuevos todos los meses — y también más agencias
              compitiendo por ellos. Las plazas se ganan al principio, no
              cuando ya se saturaron.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
            {marketStats.map((s, i) => (
              <motion.div
                key={s.label}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="p-7 md:p-8"
                style={{
                  borderTop: "1px solid rgba(228,224,221,0.12)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <p
                  className="font-title leading-none mb-4"
                  style={{
                    fontSize: "clamp(30px, 3.6vw, 48px)",
                    fontWeight: 700,
                    color: "#D63A27",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.num}
                </p>
                <p
                  className="font-body text-[12.5px] leading-[1.6]"
                  style={{ color: "rgba(228,224,221,0.6)" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.3 }}
            className="font-body text-[12px] leading-[1.7] mt-8 max-w-[680px]"
            style={{ color: "rgba(228,224,221,0.35)" }}
          >
            Cifras públicas del mercado nacional reportadas durante 2026. Son
            contexto de la marca a nivel país, no resultados de esta agencia ni
            de PG Estrategias.
          </motion.p>
        </section>

        {/* ============================================================
            LA PELEA LOCAL — el argumento central
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <motion.div {...reveal} className="lg:col-span-6">
                <Eyebrow>La pelea real</Eyebrow>
                <SectionTitle>
                  Mismo auto, mismo precio.{" "}
                  <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                    Distinta agencia.
                  </em>
                </SectionTitle>
                <p
                  className="font-body text-[15px] md:text-[16px] leading-[1.75] mb-6"
                  style={{ color: "rgba(228,224,221,0.72)" }}
                >
                  En Puebla y su zona conurbada hay varios pisos vendiendo
                  Changan. El producto es idéntico. El precio de lista es
                  prácticamente el mismo. La campaña nacional de la marca le
                  llega por igual a todos.
                </p>
                <p
                  className="font-body text-[15px] md:text-[16px] leading-[1.75] mb-6"
                  style={{ color: "rgba(228,224,221,0.72)" }}
                >
                  Entonces el comprador no elige un auto: elige a quién
                  comprárselo. Y esa decisión se toma con tres cosas que sí
                  están en tus manos —quién aparece primero cuando lo busca,
                  quién le resuelve la desconfianza y quién le contesta más
                  rápido—.
                </p>
                <p
                  className="font-body text-[15px] md:text-[16px] leading-[1.75]"
                  style={{ color: "rgba(228,224,221,0.72)" }}
                >
                  Ahí es exactamente donde entramos nosotros.
                </p>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 }}
                className="lg:col-span-5 lg:col-start-8"
              >
                <div
                  className="p-8 md:p-10"
                  style={{
                    border: "1px solid rgba(214,58,39,0.28)",
                    background:
                      "linear-gradient(150deg, rgba(214,58,39,0.07) 0%, rgba(255,255,255,0.015) 60%)",
                  }}
                >
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.18em] mb-6"
                    style={{ color: "#D63A27" }}
                  >
                    Lo que la marca no hace por ti
                  </p>
                  {[
                    "Posicionar tu piso por encima del de al lado en Google.",
                    "Producir contenido de tus unidades, tu equipo y tus entregas.",
                    "Contestarle a un prospecto un domingo por la noche.",
                    "Dar seguimiento a quien cotizó y no volvió.",
                    "Convertir a tus clientes satisfechos en reseñas públicas.",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3.5 mb-4 last:mb-0">
                      <span
                        aria-hidden
                        className="shrink-0 mt-[9px] block"
                        style={{ width: 14, height: 1, background: "#D63A27" }}
                      />
                      <p
                        className="font-body text-[14.5px] leading-[1.7]"
                        style={{ color: "rgba(228,224,221,0.85)" }}
                      >
                        {t}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
            DÓNDE SE GANA — 3 frentes
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="max-w-[820px] mb-16 md:mb-20">
            <Eyebrow>Dónde se gana</Eyebrow>
            <SectionTitle>
              Tres frentes,{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                un solo sistema.
              </em>
            </SectionTitle>
            <p
              className="font-body text-[15px] md:text-[16px] leading-[1.75] max-w-[640px]"
              style={{ color: "rgba(228,224,221,0.65)" }}
            >
              No son tres servicios sueltos. Cada uno alimenta al siguiente: el
              contenido sostiene la pauta, la pauta llena el CRM, y el bot
              convierte ese CRM en pruebas de manejo agendadas.
            </p>
          </motion.div>

          <div className="flex flex-col gap-px">
            {batallas.map((b, i) => (
              <motion.div
                key={b.num}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-10 md:py-14"
                style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
              >
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className="font-title leading-none"
                      style={{
                        fontSize: "40px",
                        fontWeight: 700,
                        color: "#D63A27",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {b.num}
                    </span>
                    <span
                      className="font-body text-[11px] uppercase tracking-[0.18em]"
                      style={{ color: "rgba(228,224,221,0.45)" }}
                    >
                      {b.kicker}
                    </span>
                  </div>
                  <h3
                    className="font-title"
                    style={{
                      fontSize: "clamp(24px, 2.8vw, 34px)",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: "#E4E0DD",
                    }}
                  >
                    {b.title}
                  </h3>
                </div>

                <div className="lg:col-span-7">
                  <p
                    className="font-body text-[15px] leading-[1.8] mb-7"
                    style={{ color: "rgba(228,224,221,0.68)" }}
                  >
                    {b.desc}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {b.items.map((it) => (
                      <li key={it} className="flex items-start gap-3.5">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="shrink-0 mt-[6px]"
                          aria-hidden
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="#D63A27"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          className="font-body text-[14px] leading-[1.7]"
                          style={{ color: "rgba(228,224,221,0.85)" }}
                        >
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            MUESTRAS DE PRODUCCIÓN
           ============================================================ */}
        <section
          id="trabajo"
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
              <Eyebrow>Muestras de producción</Eyebrow>
              <SectionTitle>
                Así se ve{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  nuestro trabajo.
                </em>
              </SectionTitle>
              <p
                className="font-body text-[15px] md:text-[16px] leading-[1.75] max-w-[640px]"
                style={{ color: "rgba(228,224,221,0.65)" }}
              >
                Piezas producidas por nuestro equipo. Cámara, dirección,
                iluminación y edición internas: la misma calidad que
                aplicaríamos a {AGENCIA} desde el primer mes.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {REEL_VIDEOS.map((src, i) => (
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
                    preload="metadata"
                    aria-label="Muestra de producción audiovisual de PG Estrategias"
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
          </div>
        </section>

        {/* ============================================================
            NUESTRO ALCANCE
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-40 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
            <Eyebrow>Nuestro alcance</Eyebrow>
            <SectionTitle>
              Todo lo que podemos{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                operar para ustedes.
              </em>
            </SectionTitle>
            <p
              className="font-body text-[15px] md:text-[16px] leading-[1.75] max-w-[640px]"
              style={{ color: "rgba(228,224,221,0.65)" }}
            >
              Este es el catálogo completo de lo que hacemos en automotriz. El
              paquete final se arma con lo que la agencia realmente necesita,
              después del diagnóstico.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {alcance.map((s, i) => (
              <motion.div
                key={s.title}
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
                  className="font-title text-[19px] mb-3"
                  style={{ fontWeight: 700, color: "#E4E0DD", letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: "rgba(228,224,221,0.6)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            MÉTODO
           ============================================================ */}
        <section
          className="relative py-24 md:py-40"
          style={{ background: "#151513" }}
        >
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-16 md:mb-20 max-w-[820px]">
              <Eyebrow>Nuestro método</Eyebrow>
              <SectionTitle>
                Cómo{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  entramos.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
              {method.map((m, i) => (
                <motion.div
                  key={m.num}
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
                    {m.num}
                  </p>
                  <h3
                    className="font-title text-[20px] mb-3"
                    style={{ fontWeight: 700, color: "#E4E0DD" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.7]"
                    style={{ color: "rgba(228,224,221,0.6)" }}
                  >
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Estándares */}
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="mt-20 md:mt-24 pt-10"
              style={{ borderTop: "1px solid rgba(228,224,221,0.12)" }}
            >
              <p
                className="font-body text-[11px] uppercase tracking-[0.22em] mb-8"
                style={{ color: "rgba(228,224,221,0.4)" }}
              >
                Nuestros estándares, sin excepción
              </p>
              <div className="flex flex-wrap gap-3">
                {standards.map((s) => (
                  <span
                    key={s}
                    className="font-body text-[13px] px-5 py-2.5"
                    style={{
                      border: "1px solid rgba(228,224,221,0.15)",
                      color: "rgba(228,224,221,0.75)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            LA INVERSIÓN — se define en la mesa
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-24 md:py-36 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div {...reveal} className="lg:col-span-6">
              <Eyebrow>La inversión</Eyebrow>
              <SectionTitle>
                El alcance primero,{" "}
                <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                  el número después.
                </em>
              </SectionTitle>
              <p
                className="font-body text-[15px] md:text-[16px] leading-[1.75]"
                style={{ color: "rgba(228,224,221,0.68)" }}
              >
                Esta propuesta no trae precio a propósito. Poner una cifra antes
                de conocer el piso, el inventario, el equipo de ventas y lo que
                ya está corriendo sería adivinar. Definimos juntos qué frentes
                se activan y con qué intensidad, y sobre eso construimos la
                propuesta económica.
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.15 }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <div
                className="p-8 md:p-10"
                style={{
                  border: "1px solid rgba(228,224,221,0.12)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <p
                  className="font-body text-[11px] uppercase tracking-[0.18em] mb-6"
                  style={{ color: "#D63A27" }}
                >
                  Dos cosas que siempre aplican
                </p>
                <p
                  className="font-body text-[14.5px] leading-[1.8] mb-6"
                  style={{ color: "rgba(228,224,221,0.85)" }}
                >
                  <strong style={{ color: "#E4E0DD" }}>
                    El presupuesto de pauta es aparte de nuestros honorarios.
                  </strong>{" "}
                  Lo que se destina a Meta y Google se va íntegro a las
                  plataformas. Nunca es dinero que nosotros conservemos.
                </p>
                <p
                  className="font-body text-[14.5px] leading-[1.8]"
                  style={{ color: "rgba(228,224,221,0.85)" }}
                >
                  <strong style={{ color: "#E4E0DD" }}>
                    Trabajamos con garantía de 30 días.
                  </strong>{" "}
                  Si al cierre del periodo no se cumplió lo acordado, seguimos
                  trabajando un mes adicional sin honorarios hasta lograrlo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            CTA FINAL
           ============================================================ */}
        <section
          className="relative overflow-hidden px-6 md:px-14 py-24 md:py-40"
          style={{ background: "#0e0e0d" }}
        >
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
              {...reveal}
              className="font-body text-[11px] tracking-[0.28em] uppercase mb-6"
              style={{ color: "#D63A27", fontWeight: 500 }}
            >
              El siguiente paso no cuesta nada
            </motion.p>
            <motion.h2
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="font-title mb-8"
              style={{
                fontSize: "clamp(38px, 5.6vw, 84px)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: "#E4E0DD",
              }}
            >
              Producimos su{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                video demo.
              </em>
              <br />
              Sin costo.
            </motion.h2>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-body text-[16px] md:text-[18px] leading-[1.75] mb-12 max-w-[680px] mx-auto"
              style={{ color: "rgba(228,224,221,0.72)" }}
            >
              Grabamos una pieza demo con una unidad en su piso de venta y la
              revisamos juntos en una sesión de 30 minutos. Ahí definimos el
              alcance — y si tiene sentido avanzar, lo sabrán ese mismo día.
            </motion.p>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.35 }}
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
                  Agendar la sesión
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
                href="mailto:contacto@pgestrategias.com?subject=Propuesta%20Changan%20Puebla"
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
