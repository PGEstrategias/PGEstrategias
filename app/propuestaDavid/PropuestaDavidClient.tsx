"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const ACCENT = {
  lime: "#A6E22E",
  amber: "#F5B342",
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
  { num: "2", label: "Opciones de inversión" },
  { num: "45", label: "Días para arrancar" },
  { num: "B2B", label: "Industria · Comercio" },
];

const problemPoints = [
  {
    num: "01",
    text: "Los gerentes de compras y directores de operación buscan proveedor en Google. El que aparece primero con credibilidad — ese es al que llaman.",
  },
  {
    num: "02",
    text: "El boca a boca tiene un techo. Hay industrias, restaurantes y comercios en Puebla que necesitan un proveedor confiable y nunca van a saber que existes si no apareces donde buscan.",
  },
  {
    num: "03",
    text: "En el mercado B2B de energía, la decisión comienza con confianza. El que se ve más serio, organizado y accesible digitalmente — ese es al que contratan.",
  },
  {
    num: "04",
    text: "Cada mes sin un sistema de adquisición digital es un mes de contratos que se fueron con quien sí lo tiene.",
  },
];

const marketCards = [
  {
    accent: ACCENT.lime,
    label: "🏭 · Cliente ideal",
    title: "El B2B no negocia precio",
    desc: "Un gerente de compras que necesita garantizar suministro de gas no pierde días comparando. Llama al proveedor que le genera confianza primero. La seguridad de suministro vale más que unos pesos de diferencia.",
  },
  {
    accent: ACCENT.amber,
    label: "📍 · Mercado",
    title: "Puebla — corredor industrial activo",
    desc: "Cuautlancingo, Huejotzingo y el corredor Atlixcáyotl concentran comercios e industrias con necesidad constante de gas. Pocos proveedores con presencia digital sólida — la oportunidad es clara.",
  },
  {
    accent: ACCENT.violet,
    label: "🔁 · Recurrencia",
    title: "El gas es contrato que se renueva solo",
    desc: "Un cliente que te elige como proveedor de gas no cambia si el servicio es bueno. El valor no es una venta — es una relación de largo plazo que paga año tras año.",
  },
  {
    accent: ACCENT.lime,
    label: "🍽️ · Mercado inmediato",
    title: "Restaurantes y cocinas industriales",
    desc: "Miles de restaurantes, fondas industriales, hoteles y cocinas en Puebla dependen del gas para operar. Necesitan suministro constante, pago puntual y cero interrupciones.",
  },
  {
    accent: ACCENT.amber,
    label: "🏛️ · Alto volumen",
    title: "Industria y manufactura",
    desc: "Plantas, lavanderías comerciales, tintorerías y procesos industriales son los clientes de mayor volumen y mayor estabilidad. Sin presencia profesional, no entras en su lista corta.",
  },
  {
    accent: ACCENT.violet,
    label: "🎯 · Enfoque",
    title: "Tomadores de decisión, no curiosos",
    desc: "Esta propuesta no busca que más gente te conozca en general. Busca que gerentes, dueños y directores de operación en Puebla te encuentren exactamente cuando están buscando proveedor.",
  },
];

const optionAItems = [
  {
    accent: ACCENT.lime,
    label: "◉ · Estudio de mercado",
    title: "La base de toda la estrategia",
    desc: "Antes de producir el video y antes de pautar un solo peso, identificamos qué le importa a tu cliente B2B: objeciones, cómo busca proveedores, qué lo convence. Análisis del perfil del comprador ideal, factores de decisión reales y Buyer Personas basados en datos.",
  },
  {
    accent: ACCENT.amber,
    label: "◉ · Contenido mensual",
    title: "Autoridad construida cada mes",
    desc: "1 video de 1 minuto mensual, 7 Reels (2 para anuncios + 5 orgánicos), 5 diseños gráficos con copy persuasivo y 5 carruseles educativos. Contenido que construye confianza antes de que el cliente llame.",
  },
  {
    accent: ACCENT.violet,
    label: "◉ · Infraestructura digital",
    title: "Tu base de operaciones online",
    desc: "Página de ventas profesional + CRM + hosting por 6 meses. Configuración técnica completa: píxeles, APIs de conversión, formularios. Google Business optimizado con estrategia de reseñas. 1,000 mensajes WhatsApp/correo mensuales.",
  },
  {
    accent: ACCENT.lime,
    label: "◉ · Acompañamiento",
    title: "Trabajamos contigo cada mes",
    desc: "Videollamada estratégica quincenal, consultoría de crecimiento mensual y reporte quincenal con métricas claras: cuántos contactos, de dónde vinieron y cuánto costó cada uno.",
  },
  {
    accent: ACCENT.amber,
    label: "◉ · Publicidad pagada",
    title: "Meta y/o Google Ads — $4,000 MXN incluido",
    desc: "Campañas segmentadas al corredor industrial y comercial de Puebla: Cuautlancingo, Huejotzingo, Atlixcáyotl, Centro. Captura de demanda activa: 'proveedor de gas LP Puebla', 'suministro industrial', 'gas para restaurantes'.",
  },
  {
    accent: ACCENT.violet,
    label: "◉ · Video institucional",
    title: "Producción cinematográfica completa",
    desc: "Guión profesional, storyboard, jornada de filmación con 2 operadores de cámara, 1 operador de drone, director creativo en set. Postproducción con color grading, edición narrativa, VFX y composición digital. Hasta 1:30 min.",
  },
];

const deliverablesA = [
  { icon: "▶", text: "Publicidad pagada — Meta y/o Google Ads con $4,000 MXN ad spend incluido", freq: "Mensual" },
  { icon: "◎", text: "Video de 1 minuto para página de ventas y campañas digitales", freq: "1 / mes" },
  { icon: "⊞", text: "Reels — 2 para anuncios + 5 para redes orgánicas", freq: "7 / mes" },
  { icon: "◈", text: "Diseños gráficos con copy persuasivo adaptado a B2B gas e industria", freq: "5 / mes" },
  { icon: "◉", text: "Carruseles: servicios, cobertura, diferenciadores y casos de uso", freq: "5 / mes" },
  { icon: "◇", text: "Mensajes WhatsApp / correo para seguimiento de prospectos", freq: "1,000 / mes" },
  { icon: "◆", text: "Página de ventas + CRM con hosting incluido", freq: "6 meses" },
  { icon: "▷", text: "Google Business — perfil optimizado + estrategia de reseñas", freq: "1 servicio" },
  { icon: "▸", text: "Reportes de métricas de campañas y contactos generados", freq: "Quincenal" },
  { icon: "▹", text: "Videollamadas estratégicas — revisión y ajuste con el equipo", freq: "Quincenal" },
  { icon: "▶", text: "Video institucional live action, calidad cinematográfica, hasta 1:30 min", freq: "1 pieza" },
  { icon: "◎", text: "Adaptaciones del video — cortes para redes, formato vertical y cuadrado", freq: "Incluidas" },
];

const deliverablesB = [
  { icon: "▶", text: "Publicidad pagada — Meta y/o Google Ads con $4,000 MXN incluido", freq: "Mensual" },
  { icon: "◎", text: "Video de 1 minuto para página de ventas o redes sociales", freq: "1 / mes" },
  { icon: "⊞", text: "Reels — 2 para anuncios pagados + 5 para redes orgánicas", freq: "7 / mes" },
  { icon: "◈", text: "Diseños gráficos con copy persuasivo por servicio", freq: "5 / mes" },
  { icon: "◉", text: "Carruseles: educación del cliente, cobertura, diferenciadores", freq: "5 / mes" },
  { icon: "◇", text: "Mensajes WhatsApp / correo para seguimiento de prospectos activos", freq: "1,000 / mes" },
  { icon: "◆", text: "Página de ventas + CRM con hosting por 6 meses", freq: "6 meses" },
  { icon: "▷", text: "Google Business — perfil optimizado + estrategia de reseñas", freq: "1 servicio" },
  { icon: "▸", text: "Reportes quincenales — contactos, costo por lead, origen del tráfico", freq: "Quincenal" },
  { icon: "▹", text: "Videollamadas estratégicas — revisión, ajuste y siguiente acción", freq: "Quincenal" },
];

const impacts = [
  {
    accent: ACCENT.lime,
    title: "Visibilidad ante el decisor correcto",
    desc: "Apareces frente a gerentes de compras, dueños y directores de operación en el momento exacto en que están buscando proveedor de gas.",
  },
  {
    accent: ACCENT.amber,
    title: "Contratos recurrentes B2B",
    desc: "Captación de clientes industriales y comerciales que generan ingresos mes a mes — la base del crecimiento predecible.",
  },
  {
    accent: ACCENT.violet,
    title: "Autoridad digital y credibilidad",
    desc: "Video institucional, sitio profesional y reseñas que comunican capacidad de suministro, cobertura y confiabilidad a primer contacto.",
  },
  {
    accent: ACCENT.lime,
    title: "Segmentación geográfica",
    desc: "El presupuesto impacta exactamente donde están tus clientes potenciales: Cuautlancingo, Huejotzingo, Atlixcáyotl y Centro de Puebla.",
  },
  {
    accent: ACCENT.amber,
    title: "Sistema de adquisición predecible",
    desc: "Dejas de depender del boca a boca. El motor mensual genera prospectos calificados de forma constante, mes con mes.",
  },
  {
    accent: ACCENT.violet,
    title: "Retorno de inversión claro",
    desc: "Un solo contrato industrial nuevo recupera la inversión con creces. El valor de largo plazo de un cliente B2B supera por mucho el costo.",
  },
];

const comparison = [
  { row: "Paquete Tracción mensual", a: "✔ Incluido", b: "✔ Incluido" },
  { row: "Publicidad Meta / Google ($4K ad spend)", a: "✔ Incluido", b: "✔ Incluido" },
  { row: "Página de ventas + CRM + hosting", a: "✔ 6 meses", b: "✔ 6 meses" },
  { row: "Google Business + reseñas", a: "✔ Incluido", b: "✔ Incluido" },
  { row: "Reels + diseños + carruseles", a: "✔ Mensual", b: "✔ Mensual" },
  { row: "Estudio de mercado B2B", a: "✔ Incluido", b: "— No incluido" },
  { row: "Video institucional live action", a: "✔ Incluido", b: "— No incluido" },
  { row: "Drone + multicámara + director", a: "✔ Día de rodaje completo", b: "— No incluido" },
  { row: "Inversión total", a: "$35,000 MXN — pago único", b: "$16,000 MXN — pago único" },
  { row: "Duración del proceso", a: "45 días naturales", b: "35 días naturales" },
];

export default function PropuestaDavidClient() {
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
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: "#A6E22E" }}>
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
                color: "#A6E22E",
                background: "rgba(166,226,46,0.08)",
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
              background: "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%",
              left: "-10%",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(245,179,66,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-8 flex items-center gap-2"
                style={{ color: "#A6E22E" }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#A6E22E" }} />
                Propuesta de inversión publicitaria
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
                <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                  David.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[560px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Suministro de gas LP y natural para{" "}
                <span className="text-white font-medium">
                  comercios e industrias en Puebla
                </span>
                . El negocio que no aparece en Google no existe para el gerente de
                compras que busca proveedor hoy. Esta propuesta está diseñada para que
                seas tú quien aparece primero — con autoridad digital, frente al
                tomador de decisiones correcto.
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
                      color: "#A6E22E",
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

        {/* PROBLEMA */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            El problema que cuesta contratos
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
            El problema no es
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>tu servicio.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[640px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Tu negocio resuelve uno de los insumos más críticos para cualquier comercio
            o industria en Puebla. El problema es que los gerentes de compras, los
            dueños de restaurantes industriales y los directores de planta que necesitan
            exactamente lo que ofreces — no te están encontrando.
          </p>

          <div className="flex flex-col gap-4">
            {problemPoints.map((obj, i) => (
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
                    color: "#A6E22E",
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

        {/* MERCADO */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            Tu mercado · los números que importan
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
            El terreno en
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>el que compites.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Antes de hablar de inversión, necesitas ver dónde está la oportunidad real
            en el corredor industrial y comercial de Puebla.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketCards.map((t, i) => (
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

        {/* OPCIÓN A */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            Opción A — Tracción + Video Institucional
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 mb-14 items-end">
            <h2
              className="font-title text-pg-light"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Todo junto, desde
              <br />
              <em style={{ color: "#A6E22E", fontStyle: "italic" }}>el día uno.</em>
            </h2>

            <div
              className="p-6"
              style={{
                border: "1px solid rgba(166,226,46,0.25)",
                background: "rgba(166,226,46,0.04)",
              }}
            >
              <p
                className="font-body text-[10px] uppercase tracking-[0.16em] mb-2"
                style={{ color: "#A6E22E" }}
              >
                Inversión total
              </p>
              <p
                className="font-title leading-none mb-2"
                style={{
                  color: "#A6E22E",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 400,
                }}
              >
                $35,000
                <span className="text-[18px] opacity-60"> MXN</span>
              </p>
              <p
                className="font-body text-[12px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Pago único · Entrega completa en 45 días naturales
              </p>
            </div>
          </div>

          <p
            className="font-title italic text-pg-light mb-14 max-w-[760px]"
            style={{
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "rgba(245,245,245,0.75)",
            }}
          >
            &ldquo;En 45 días tienes el video institucional de tu gasera, el estudio
            de mercado con datos reales de tus clientes B2B y el sistema de adquisición
            funcionando. Todo junto, desde el día uno.&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {optionAItems.map((t, i) => (
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

          {/* Entregables A */}
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            Entregables · Opción A
          </p>

          <div
            className="flex flex-col"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {deliverablesA.map((d, i) => (
              <motion.div
                key={d.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-6 px-6 md:px-8 py-5 transition-colors duration-300 hover:bg-white/[0.025]"
                style={{
                  borderBottom: i < deliverablesA.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span
                  className="font-title shrink-0 w-8 text-center"
                  style={{ color: "#A6E22E", fontSize: 18, opacity: 0.7 }}
                >
                  {d.icon}
                </span>
                <p
                  className="font-body text-[14px] md:text-[15px] flex-1"
                  style={{ color: "rgba(245,245,245,0.8)" }}
                >
                  {d.text}
                </p>
                <span
                  className="hidden md:inline shrink-0 font-body text-[10px] uppercase tracking-[0.14em] px-3 py-1"
                  style={{
                    color: "#A6E22E",
                    background: "rgba(166,226,46,0.07)",
                    border: "1px solid rgba(166,226,46,0.15)",
                  }}
                >
                  {d.freq}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* OPCIÓN B */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Opción B — Solo Paquete Tracción
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 mb-14 items-end">
            <h2
              className="font-title text-pg-light"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              El primer paso
              <br />
              <em style={{ color: "#F5B342", fontStyle: "italic" }}>inteligente.</em>
            </h2>

            <div
              className="p-6"
              style={{
                border: "1px solid rgba(245,179,66,0.25)",
                background: "rgba(245,179,66,0.04)",
              }}
            >
              <p
                className="font-body text-[10px] uppercase tracking-[0.16em] mb-2"
                style={{ color: "#F5B342" }}
              >
                Inversión total
              </p>
              <p
                className="font-title leading-none mb-2"
                style={{
                  color: "#F5B342",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 400,
                }}
              >
                $16,000
                <span className="text-[18px] opacity-60"> MXN</span>
              </p>
              <p
                className="font-body text-[12px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Pago único · Entrega en 35 días · Incluye $4,000 MXN ad spend
              </p>
            </div>
          </div>

          <p
            className="font-title italic text-pg-light mb-14 max-w-[760px]"
            style={{
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "rgba(245,245,245,0.75)",
            }}
          >
            &ldquo;La Opción B es para quien quiere activar el sistema de adquisición
            de clientes B2B hoy, antes de comprometerse con la producción del video.
            Es el primer paso inteligente.&rdquo;
          </p>

          <p
            className="font-body text-[15px] leading-[1.7] max-w-[760px] mb-14"
            style={{ color: "rgba(245,245,245,0.6)" }}
          >
            La Opción B es el Paquete Tracción completo, sin el video institucional.
            Misma potencia de distribución, misma infraestructura digital y mismo
            acompañamiento estratégico adaptado al mercado B2B de gas en Puebla.
            Usamos el material que ya tienes — fotos de tu flota, imágenes de operación
            — para arrancar campañas mientras construimos el video institucional
            cuando el sistema ya esté generando prospectos.
          </p>

          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Entregables · Opción B
          </p>

          <div
            className="flex flex-col"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {deliverablesB.map((d, i) => (
              <motion.div
                key={d.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-6 px-6 md:px-8 py-5 transition-colors duration-300 hover:bg-white/[0.025]"
                style={{
                  borderBottom: i < deliverablesB.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span
                  className="font-title shrink-0 w-8 text-center"
                  style={{ color: "#F5B342", fontSize: 18, opacity: 0.7 }}
                >
                  {d.icon}
                </span>
                <p
                  className="font-body text-[14px] md:text-[15px] flex-1"
                  style={{ color: "rgba(245,245,245,0.8)" }}
                >
                  {d.text}
                </p>
                <span
                  className="hidden md:inline shrink-0 font-body text-[10px] uppercase tracking-[0.14em] px-3 py-1"
                  style={{
                    color: "#F5B342",
                    background: "rgba(245,179,66,0.07)",
                    border: "1px solid rgba(245,179,66,0.15)",
                  }}
                >
                  {d.freq}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* COMPARATIVA */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            Las dos opciones, cara a cara
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
            Elige el punto de
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>partida correcto.</em>
          </h2>

          <div
            className="overflow-x-auto"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="grid grid-cols-[1.6fr_1fr_1fr] min-w-[640px]">
              <div
                className="px-6 py-5 font-body text-[10px] uppercase tracking-[0.16em]"
                style={{
                  color: "rgba(245,245,245,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                Elemento
              </div>
              <div
                className="px-6 py-5 font-body text-[10px] uppercase tracking-[0.16em] text-center"
                style={{
                  color: "#A6E22E",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(166,226,46,0.04)",
                }}
              >
                Opción A · $35K
              </div>
              <div
                className="px-6 py-5 font-body text-[10px] uppercase tracking-[0.16em] text-center"
                style={{
                  color: "#F5B342",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(245,179,66,0.04)",
                }}
              >
                Opción B · $16K
              </div>

              {comparison.map((c, i) => (
                <div key={c.row} className="contents">
                  <div
                    className="px-6 py-4 font-body text-[14px]"
                    style={{
                      color: "rgba(245,245,245,0.8)",
                      borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    {c.row}
                  </div>
                  <div
                    className="px-6 py-4 font-body text-[13px] text-center"
                    style={{
                      color: "rgba(245,245,245,0.75)",
                      borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderLeft: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {c.a}
                  </div>
                  <div
                    className="px-6 py-4 font-body text-[13px] text-center"
                    style={{
                      color: "rgba(245,245,245,0.75)",
                      borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderLeft: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {c.b}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            className="font-body text-[14px] leading-[1.7] max-w-[760px] mt-10"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            En ambas opciones el motor mensual es idéntico. La diferencia es si arrancas
            con el activo de mayor impacto en credibilidad B2B desde el día uno.
          </p>
        </section>

        <div
          className="max-w-[1300px] mx-auto h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />

        {/* IMPACTO ESPERADO */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#A6E22E" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
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
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>en tu operación.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Un solo contrato industrial nuevo recupera la inversión. Un cliente B2B que
            te elige como proveedor genera ingresos recurrentes mes a mes, año tras año.
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
              style={{ color: "#A6E22E", opacity: 0.25, fontSize: 72, fontWeight: 400 }}
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
              La decisión no es si invertir o no. La decisión es si quieres que tu
              negocio crezca de forma predecible o seguir dependiendo de que alguien
              te recomiende.
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
              background: "radial-gradient(circle, rgba(166,226,46,0.1) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: "#A6E22E" }}
            >
              <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
              Próximos pasos
              <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
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
              David,
              <br />
              <em style={{ color: "#A6E22E", fontStyle: "italic" }}>
                ¿cuándo hablamos?
              </em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[560px] mx-auto mb-12"
              style={{ color: "rgba(245,245,245,0.55)" }}
            >
              La siguiente conversación puede ser la que cambie el siguiente año de tu
              negocio. Quedamos a tus órdenes para definir la opción correcta y arrancar.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <a
                href="https://wa.me/5212221215051"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(166,226,46,0.08)", color: "#A6E22E" }}
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
                  style={{ background: "rgba(166,226,46,0.08)", color: "#A6E22E" }}
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
                  style={{ background: "rgba(166,226,46,0.08)", color: "#A6E22E" }}
                >
                  ◎
                </span>
                pgestrategias.com
              </a>
            </div>

            <p
              className="font-body text-[11px] mt-16"
              style={{ color: "rgba(245,245,245,0.3)" }}
            >
              © 2025 — Propuesta confidencial preparada por PG Estrategias exclusivamente para David.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
