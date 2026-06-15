"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const ACCENT = {
  amber: "#F5B342",
  lime: "#A6E22E",
  violet: "#B79CFF",
  teal: "#2EC4B6",
};

function AccentBar({ color }: { color: string }) {
  return (
    <span
      className="absolute left-0 top-0 h-full w-[2px]"
      style={{ background: color }}
    />
  );
}

const stats = [
  { num: "10", label: "Entregables clave" },
  { num: "4", label: "Objetivos estratégicos" },
  { num: "45", label: "Días de entrega" },
];

const objectives = [
  {
    num: "01",
    text: "Posicionar tu negocio en Google cuando constructoras, organizadores de eventos y municipios busquen renta de baños portátiles, desazolve o pipas de extracción en tu zona.",
  },
  {
    num: "02",
    text: "Construir credibilidad digital que convierta visitas en prospectos B2B calificados — con un video institucional, página de ventas profesional y perfil de Google optimizado.",
  },
  {
    num: "03",
    text: "Activar un sistema de adquisición de clientes con publicidad segmentada geográficamente en Oaxaca, Puebla, Veracruz y Pochutla que genere contratos de forma predecible.",
  },
  {
    num: "04",
    text: "Dejar de depender del boca a boca y escalar con un motor digital que trabaja todos los meses, generando contactos mientras tú te concentras en operar.",
  },
];

const tactics = [
  {
    accent: ACCENT.amber,
    label: "01 · Video Institucional",
    title: "El activo que genera confianza antes de que te llamen",
    desc: "Produciremos un video institucional con guión profesional, rodaje en tus locaciones operativas, drone para tomas aéreas de tu flota, 2 operadores de cámara, director creativo en set y postproducción con color grading, VFX y musicalización. El tipo de imagen que hace que una constructora te llame a ti y no a la competencia.",
  },
  {
    accent: ACCENT.lime,
    label: "02 · Publicidad Pagada Meta & Google",
    title: "Tu servicio frente al cliente correcto, en el momento exacto",
    desc: "Campañas en Meta Ads (Facebook e Instagram) para generación de contactos directos, y Google Ads para captura de demanda activa — usuarios que buscan 'renta de baños portátiles Oaxaca' o 'desazolve Puebla'. $4,000 MXN de ad spend incluidos mensualmente con segmentación geográfica estricta.",
  },
  {
    accent: ACCENT.violet,
    label: "03 · Página de Ventas + CRM",
    title: "Tu base de operaciones digital, lista desde el día uno",
    desc: "Página de ventas profesional con CRM integrado, hosting por 6 meses incluido, píxeles y APIs de conversión configurados, formularios de contacto y 1,000 mensajes mensuales por WhatsApp o correo para seguimiento de prospectos. El cliente que llega encuentra una empresa seria.",
  },
  {
    accent: ACCENT.amber,
    label: "04 · Google Business Profile",
    title: "Cuando busquen tu servicio en tu zona, apareces tú",
    desc: "Optimización completa del perfil en Google My Business con palabras clave de tu servicio y zona, estrategia de reseñas para construir reputación y aparecer con credibilidad en búsquedas locales. El primer filtro que pasa cualquier jefe de compras antes de llamar.",
  },
  {
    accent: ACCENT.lime,
    label: "05 · Contenido Mensual para Redes",
    title: "Autoridad que se construye mes a mes",
    desc: "Producción mensual de 1 video de 1 minuto, 7 Reels (2 para anuncios pagados, 5 para posicionamiento orgánico), 5 diseños gráficos con texto persuasivo y 5 carruseles para redes. Contenido profesional que muestra tu operación, flota y diferenciadores.",
  },
  {
    accent: ACCENT.violet,
    label: "06 · Acompañamiento Estratégico",
    title: "Decisiones basadas en datos, no en suposiciones",
    desc: "Videollamada estratégica quincenal para revisión de resultados y ajustes de campaña. Consultoría de crecimiento mensual. Reporte quincenal con métricas claras: cuántos contactos, de dónde vinieron, cuánto costó cada uno. No trabajamos contigo y desaparecemos.",
  },
];

const deliverables = [
  { icon: "▶", text: "Video institucional (2–3 minutos)" },
  { icon: "◎", text: "Estudio de mercado y definición de buyer personas" },
  { icon: "⊞", text: "Página de ventas profesional + CRM integrado" },
  { icon: "◈", text: "Google Business Profile optimizado + estrategia de reseñas" },
  { icon: "◉", text: "1 video de 1 minuto mensual para redes / página" },
  { icon: "◇", text: "7 Reels mensuales (2 para ads, 5 orgánicos)" },
  { icon: "◆", text: "5 diseños gráficos + 5 carruseles mensuales" },
  { icon: "▷", text: "$4,000 MXN de ad spend incluidos (Meta y/o Google)" },
  { icon: "▸", text: "Reportes quincenales + videollamadas estratégicas" },
  { icon: "◑", text: "Hosting incluido por 6 meses" },
];

const options = [
  {
    key: "A",
    accent: ACCENT.amber,
    title: "Opción A",
    subtitle: "Paquete Tracción + Video Institucional",
    price: "$35,000",
    badge: "Recomendada",
    timeline: "45 días de entrega",
    desc: "En 45 días tienes el video institucional, el estudio de mercado y el sistema de adquisición de clientes funcionando al mismo tiempo. No en fases — todo junto, desde el día uno.",
    highlights: [
      "Video institucional completo con drone y equipo de producción",
      "Estudio de mercado y definición de buyer personas",
      "Sistema completo de adquisición de clientes activo",
      "$4,000 MXN de ad spend mensual incluidos",
    ],
  },
  {
    key: "B",
    accent: ACCENT.violet,
    title: "Opción B",
    subtitle: "Solo Paquete Tracción",
    price: "$16,000",
    badge: "Punto de entrada",
    timeline: "35 días de entrega",
    desc: "La Opción B es para quien quiere empezar a generar contactos hoy, antes de comprometerse con la producción del video. Misma potencia de distribución, misma infraestructura digital, mismo acompañamiento.",
    highlights: [
      "Infraestructura digital completa desde el día uno",
      "Campañas con material audiovisual existente",
      "$4,000 MXN de ad spend mensual incluidos",
      "Video institucional se agrega cuando el sistema ya genera resultados",
    ],
  },
];

const impacts = [
  {
    accent: ACCENT.amber,
    title: "Contratos predecibles",
    desc: "Un sistema que genera oportunidades comerciales cada mes, sin depender de que alguien te recomiende.",
  },
  {
    accent: ACCENT.lime,
    title: "Posición en Google",
    desc: "Aparecer primero cuando una constructora o municipio busque tu servicio en tu zona geográfica de operación.",
  },
  {
    accent: ACCENT.violet,
    title: "Credibilidad B2B",
    desc: "Video institucional, página profesional y perfil optimizado que convierten al comprador antes de la primera llamada.",
  },
  {
    accent: ACCENT.amber,
    title: "Mayor tasa de cierre",
    desc: "Herramientas digitales que respaldan tu proceso comercial y eliminan las objeciones de confianza más comunes.",
  },
  {
    accent: ACCENT.lime,
    title: "Alcance geográfico",
    desc: "Presencia activa en Oaxaca, Puebla, Veracruz centro y Pochutla con presupuesto de medios optimizado para cada zona.",
  },
  {
    accent: ACCENT.violet,
    title: "Escalabilidad",
    desc: "Un motor digital que trabaja mientras tú operas — sin depender del boca a boca para crecer.",
  },
];

export default function XavierClient() {
  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(13,13,13,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: "#F5B342" }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span
              className="font-title text-white text-[13px] tracking-[0.1em] uppercase leading-none"
              style={{ fontWeight: 700 }}
            >
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Propuesta · 2025
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{
                color: "#F5B342",
                background: "rgba(245,179,66,0.08)",
                fontWeight: 600,
              }}
            >
              Propuesta Activa
            </span>
          </div>
        </div>
      </nav>

      <main className="bg-pg-black text-pg-white">

        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-16 pt-32 pb-24 md:pt-40 md:pb-32">
          <div
            className="pointer-events-none absolute"
            style={{
              top: "-30%",
              right: "-15%",
              width: 700,
              height: 700,
              background: "radial-gradient(circle, rgba(245,179,66,0.1) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%",
              left: "-10%",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(46,196,182,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-8 flex items-center gap-2"
                style={{ color: "#F5B342" }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#F5B342" }} />
                Propuesta publicitaria
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-title text-pg-light mb-8"
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Estrategia para
                <br />
                <em style={{ color: "#F5B342", fontStyle: "italic" }}>
                  Xavier.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[540px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Tras analizar tu modelo de negocio, flota operativa, zona de cobertura
                y mercado objetivo, hemos desarrollado una{" "}
                <span className="text-white font-medium">
                  propuesta publicitaria integral
                </span>{" "}
                para que las constructoras, organizadores de eventos y municipios que necesitan
                tu servicio te encuentren primero.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="px-8 py-6"
                  style={{
                    borderBottom: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  <p
                    className="font-title leading-none mb-2"
                    style={{
                      color: "#F5B342",
                      fontSize: "clamp(36px, 4vw, 52px)",
                      fontWeight: 400,
                    }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: "rgba(245,245,245,0.4)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* OBJETIVOS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Objetivos
          </p>

          <h2
            className="font-title text-pg-light mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Lo que vamos a
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>lograr juntos.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Cuatro objetivos estratégicos que guían cada decisión de esta propuesta,
            orientados a que Xavier deje de depender del boca a boca y construya
            un sistema predecible de adquisición de contratos B2B.
          </p>

          <div className="flex flex-col gap-4">
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-8 p-6 md:p-8"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <span
                  className="font-title italic shrink-0 leading-none"
                  style={{
                    color: "#F5B342",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 400,
                  }}
                >
                  {obj.num}
                </span>
                <p
                  className="font-body text-[15px] leading-[1.7] pt-1"
                  style={{ color: "rgba(245,245,245,0.75)" }}
                >
                  {obj.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* ESTRATEGIA Y TÁCTICAS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Estrategia y tácticas
          </p>

          <h2
            className="font-title text-pg-light mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Seis frentes para
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>dominar tu mercado.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Cada táctica fue diseñada para que Xavier proyecte autoridad, aparezca
            donde buscan sus clientes y acelere su proceso comercial con contratos
            de mayor valor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tactics.map((t, i) => (
              <motion.article
                key={t.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
                className="relative p-6 md:p-8 transition-colors duration-500 hover:bg-white/[0.02]"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <AccentBar color={t.accent} />
                <div className="pl-5">
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.16em] mb-3"
                    style={{ color: t.accent, opacity: 0.8 }}
                  >
                    {t.label}
                  </p>
                  <h3
                    className="font-title text-white mb-3"
                    style={{
                      fontSize: "clamp(18px, 1.6vw, 22px)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.65]"
                    style={{ color: "rgba(245,245,245,0.55)" }}
                  >
                    {t.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* ENTREGABLES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Entregables
          </p>

          <h2
            className="font-title text-pg-light mb-14"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            10 entregables,
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>un solo resultado.</em>
          </h2>

          <div
            className="flex flex-col"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {deliverables.map((d, i) => (
              <motion.div
                key={d.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-6 px-8 py-5 transition-colors duration-300 hover:bg-white/[0.025]"
                style={{
                  borderBottom: i < deliverables.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span
                  className="font-title shrink-0 w-8 text-center"
                  style={{ color: "#F5B342", fontSize: 18, opacity: 0.7 }}
                >
                  {d.icon}
                </span>
                <p
                  className="font-body text-[15px]"
                  style={{ color: "rgba(245,245,245,0.8)" }}
                >
                  {d.text}
                </p>
                <span
                  className="ml-auto shrink-0 font-body text-[10px] uppercase tracking-[0.14em] px-3 py-1"
                  style={{
                    color: "#F5B342",
                    background: "rgba(245,179,66,0.07)",
                    border: "1px solid rgba(245,179,66,0.15)",
                  }}
                >
                  Incluido
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* OPCIONES DE INVERSIÓN */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Opciones de inversión
          </p>

          <h2
            className="font-title text-pg-light mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Dos caminos,
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>el mismo destino.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Ambas opciones activan el motor de adquisición de clientes. La diferencia
            es si arrancas con el activo de mayor impacto en credibilidad B2B desde
            el día uno, o lo agregas cuando el sistema ya genera resultados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt) => (
              <motion.div
                key={opt.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative p-8 md:p-10"
                style={{
                  border: `1px solid ${opt.key === "A" ? "rgba(245,179,66,0.25)" : "rgba(255,255,255,0.08)"}`,
                  background: opt.key === "A" ? "rgba(245,179,66,0.03)" : "rgba(255,255,255,0.015)",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span
                      className="font-body text-[10px] uppercase tracking-[0.16em] px-3 py-1 mb-4 inline-block"
                      style={{
                        color: opt.accent,
                        background: opt.key === "A" ? "rgba(245,179,66,0.1)" : "rgba(183,156,255,0.1)",
                        border: `1px solid ${opt.key === "A" ? "rgba(245,179,66,0.2)" : "rgba(183,156,255,0.2)"}`,
                      }}
                    >
                      {opt.badge}
                    </span>
                    <p
                      className="font-title text-white"
                      style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                    >
                      {opt.title}
                    </p>
                    <p
                      className="font-body text-[13px] mt-1"
                      style={{ color: "rgba(245,245,245,0.45)" }}
                    >
                      {opt.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-6">
                    <p
                      className="font-title leading-none"
                      style={{ color: opt.accent, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400 }}
                    >
                      {opt.price}
                    </p>
                    <p
                      className="font-body text-[10px] uppercase tracking-[0.12em] mt-1"
                      style={{ color: "rgba(245,245,245,0.35)" }}
                    >
                      MXN · Pago único
                    </p>
                  </div>
                </div>

                <p
                  className="font-body text-[14px] leading-[1.65] mb-6 italic"
                  style={{ color: "rgba(245,245,245,0.6)", borderLeft: `2px solid ${opt.accent}`, paddingLeft: "1rem" }}
                >
                  "{opt.desc}"
                </p>

                <div className="flex flex-col gap-3">
                  {opt.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <span
                        className="shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full"
                        style={{ background: opt.accent, opacity: 0.7 }}
                      />
                      <p
                        className="font-body text-[13px] leading-[1.6]"
                        style={{ color: "rgba(245,245,245,0.65)" }}
                      >
                        {h}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 pt-5 font-body text-[11px] uppercase tracking-[0.12em]"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(245,245,245,0.35)" }}
                >
                  {opt.timeline}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* IMPACTO ESPERADO */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Impacto esperado
          </p>

          <h2
            className="font-title text-pg-light mb-6"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Resultados concretos
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>en tu operación.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Esta estrategia será el catalizador para que Xavier escale su operación,
            concrete contratos de mayor valor y deje de depender del boca a boca
            para crecer de forma predecible.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {impacts.map((imp, i) => (
              <motion.div
                key={imp.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="relative px-8 py-10"
                style={{
                  borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <span
                  className="block w-8 h-[2px] mb-5"
                  style={{ background: imp.accent }}
                />
                <p
                  className="font-body text-[14px] font-medium mb-2 text-white"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  {imp.title}
                </p>
                <p
                  className="font-body text-[13px] leading-[1.6]"
                  style={{ color: "rgba(245,245,245,0.45)" }}
                >
                  {imp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* QUOTE / CIERRE */}
        <section className="px-6 md:px-16 py-24 md:py-28">
          <div className="max-w-[820px] mx-auto text-center">
            <p
              className="font-title leading-none mb-6"
              style={{ color: "#F5B342", opacity: 0.25, fontSize: 72, fontWeight: 400 }}
            >
              &ldquo;
            </p>
            <p
              className="font-title italic text-pg-light mb-6"
              style={{
                fontSize: "clamp(20px, 2.4vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
              }}
            >
              No se trata de hacer publicidad. Se trata de construir el sistema
              que te trae contratos mientras tú operas. Cada mes que pasa sin ese
              sistema es un mes de contratos que se fue con quien sí lo tiene.
            </p>
            <p
              className="font-body text-[12px] uppercase tracking-[var(--ls-label)]"
              style={{ color: "rgba(245,245,245,0.4)" }}
            >
              <span className="text-white font-semibold">Pablo Guillermo Grageda Jiménez</span>{" "}
              &middot; CEO &middot; PG Estrategias
            </p>
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(245,179,66,0.08) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: "#F5B342" }}
            >
              <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
              Próximos pasos
              <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            </p>
            <h2
              className="font-title text-pg-light mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Listos para llevar
              <br />
              <em style={{ color: "#F5B342", fontStyle: "italic" }}>
                tu negocio al siguiente nivel.
              </em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[560px] mx-auto mb-12"
              style={{ color: "rgba(245,245,245,0.55)" }}
            >
              El siguiente paso es una reunión para elegir la opción que mejor se adapta
              a tu momento, afinar los detalles y arrancar. Quedamos a tus órdenes
              para cualquier pregunta.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <a
                href="https://wa.me/5212221215051"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(245,179,66,0.08)", color: "#F5B342" }}
                >
                  ☎
                </span>
                +52 222 121 5051
              </a>
              <a
                href="mailto:contacto@pgestrategias.com"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(245,179,66,0.08)", color: "#F5B342" }}
                >
                  ✉
                </span>
                contacto@pgestrategias.com
              </a>
              <a
                href="/"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(245,179,66,0.08)", color: "#F5B342" }}
                >
                  ◎
                </span>
                pgestrategias.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
