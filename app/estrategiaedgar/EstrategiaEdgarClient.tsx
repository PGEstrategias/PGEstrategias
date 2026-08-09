"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const ACCENT = {
  lime: "#A6E22E",
  amber: "#F5B342",
  violet: "#B79CFF",
};

function AccentBar({ color }: { color: string }) {
  return (
    <span
      className="absolute left-0 top-0 h-full w-[2px]"
      style={{ background: color }}
    />
  );
}

function Divider() {
  return (
    <div
      className="max-w-[1300px] mx-auto h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
      }}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
      style={{ color: "#A6E22E" }}
    >
      <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
      {children}
    </p>
  );
}

const stats = [
  { num: "5", label: "Etapas del paciente" },
  { num: "4", label: "Ángulos creativos" },
  { num: "$800", label: "Nueva oferta (MXN)" },
];

const journey = [
  {
    num: "01",
    name: "Detección",
    text: "Siente una bolita. No duele. La ignora semanas o meses. “No es nada grave.”",
  },
  {
    num: "02",
    name: "Preocupación",
    text: "La bolita no desaparece. Busca en Google o YouTube. Se autodiagnostica. “Creo que es una hernia.”",
  },
  {
    num: "03",
    name: "Parálisis por miedo al costo",
    text: "Concluye que hernia igual a cirugía. Busca precios en internet. Ve el anuncio. Escribe. Pregunta: “¿Cuánto cuesta la cirugía?”",
  },
  {
    num: "04",
    name: "Abandono",
    text: "Le explicamos que necesita una valoración primero. Piensa: “¿Para qué pago la valoración si después no me alcanza para la cirugía?” Deja de responder.",
  },
  {
    num: "05",
    name: "Crisis",
    text: "Meses después la hernia se complica. Llega de urgencia. Gasta lo que sea.",
  },
];

const reasons = [
  "Ya se autodiagnosticaron. Creen saber qué tienen.",
  "No ven el valor de la valoración porque no saben qué incluye ni qué les resuelve.",
  "Temen pagar dos veces: la valoración y después la cirugía.",
  "No confían en que el doctor pueda ayudarlos si no tienen dinero para el siguiente paso.",
];

const offerChecklist = [
  "Revisión clínica completa con cirujano certificado",
  "Evaluación de urgencia real: ¿puede esperar o necesita atención pronto?",
  "Diagnóstico claro de tu caso específico",
  "Opciones de tratamiento disponibles para ti",
  "Plan por escrito con pasos y costos reales",
  "Sin compromisos adicionales",
];

const businessNumbers = [
  { label: "Precio de la Valoración Diagnóstica", value: "$800 MXN" },
  { label: "Utilidad por cirugía", value: "$20,000–$25,000 MXN" },
  { label: "Valor promedio por paciente que agenda", value: "~$10,000–$15,000 MXN" },
  { label: "Máximo aceptable por cita agendada", value: "$400–$800 MXN" },
  { label: "Máximo aceptable por conversación calificada", value: "$150–$300 MXN" },
];

const angles = [
  {
    accent: ACCENT.lime,
    label: "Ángulo 01",
    audience: "Para quien ya sabe que tiene hernia y está buscando precio de cirugía",
    title: "Romper la parálisis por precio",
    hook: "Antes de buscar el precio de la cirugía de hernia, necesitas saber esto.",
    body: "No todas las hernias necesitan cirugía inmediata. Algunas pueden esperar. Otras necesitan atención pronto. Pero solo un cirujano puede decirte en cuál categoría estás tú — y eso determina si puedes planear con calma o si necesitas actuar ahora.",
    offer: "Por $800 MXN el Dr. Edgar revisa tu caso completo, te dice exactamente qué tan urgente es y te entrega un plan con opciones y costos reales. Y si decides operarte con él, esos $800 se descuentan de tu cirugía.",
    cta: "Escríbenos por WhatsApp y agenda tu Valoración Diagnóstica hoy.",
  },
  {
    accent: ACCENT.amber,
    label: "Ángulo 02",
    audience: "Para quien tiene síntomas pero sigue postergando",
    title: "El costo de esperar",
    hook: "La bolita que estás ignorando hoy puede costarte el triple mañana.",
    body: "Una hernia pequeña y sin complicaciones es un procedimiento sencillo con recuperación rápida. Una hernia encarcelada es una emergencia quirúrgica. La diferencia entre los dos escenarios es tiempo. Y la diferencia en riesgo y costo es enorme.",
    offer: "Por $800 MXN el Dr. Edgar evalúa tu caso, te dice exactamente en qué etapa estás y qué opciones tienes. Si decides continuar con él, esos $800 se descuentan de tu procedimiento.",
    cta: "No esperes a que se convierta en urgencia. Agenda hoy.",
  },
  {
    accent: ACCENT.violet,
    label: "Ángulo 03",
    audience: "Para quien tiene miedo al procedimiento en sí",
    title: "Desmitificar la cirugía",
    hook: "La cirugía de hernia hoy no es lo que era hace 10 años.",
    body: "Con técnica laparoscópica, muchos pacientes regresan a sus actividades normales en días, no semanas. Sin grandes cicatrices, con menos dolor y recuperación mucho más rápida. El Dr. Edgar te explica exactamente cómo sería en tu caso y si realmente es el momento indicado para ti.",
    offer: "La Valoración Diagnóstica tiene un costo de $800 MXN e incluye revisión completa y plan de tratamiento personalizado. Si decides operarte con el Dr. Edgar, esos $800 se descuentan de tu cirugía.",
    cta: "Agenda tu valoración y sal con información real, no suposiciones.",
  },
  {
    accent: ACCENT.lime,
    label: "Ángulo 04",
    audience: "Para quien ya le dijeron que tiene hernia pero no ha actuado",
    title: "Directo al que ya tiene diagnóstico",
    hook: "Ya sabes que tienes hernia. Lo que no sabes es qué tan urgente es.",
    body: "Si ya tienes diagnóstico o sospechas que es una hernia, el siguiente paso no es buscar precios en internet. Es saber exactamente en qué etapa está tu caso, si puedes esperar y cuáles son tus opciones reales. Eso es exactamente lo que te damos en la Valoración Diagnóstica.",
    offer: "$800 MXN. Revisión completa con el Dr. Edgar, diagnóstico claro y plan con costos reales para tu caso específico. Si decides operarte con él, esos $800 se descuentan de tu procedimiento.",
    cta: "Escríbenos hoy y agenda tu valoración.",
  },
];

const creativeFormat = [
  { priority: "1", format: "Video · Dr. Edgar cara a cámara", angle: "Ángulo 1 o Ángulo 4" },
  { priority: "2", format: "Imagen estática con hook", angle: "Ángulo 2" },
];

const videoStructure = [
  { time: "0–5 seg", text: "Hook directo al síntoma o al miedo" },
  { time: "5–25 seg", text: "Mensaje central en lenguaje simple, sin tecnicismos" },
  { time: "25–35 seg", text: "Explicar brevemente qué es la Valoración Diagnóstica" },
  { time: "35–45 seg", text: "CTA claro a WhatsApp" },
];

const whatsappMessages = [
  {
    who: "Mensaje 1 — Bienvenida y calificación",
    text: "Hola [nombre], gracias por contactar al consultorio del Dr. Edgar. Para orientarte correctamente te hago dos preguntas rápidas:\n1. ¿Ya tienes diagnóstico de hernia o todavía no has sido revisado formalmente?\n2. ¿Cuánto tiempo llevas con los síntomas?",
  },
  {
    who: "Mensaje 2 — Una vez que responden",
    text: "Gracias por la información. El primer paso es una Valoración Diagnóstica de $800 MXN donde el Dr. Edgar revisa tu caso completo, evalúa qué tan urgente es y te da un plan claro con opciones y costos reales. Lo mejor: si decides continuar con el Dr. Edgar, esos $800 se descuentan de tu procedimiento. ¿Te gustaría agendar esta semana?",
  },
];

const filters = [
  {
    title: "Filtro 1 — Desde el anuncio",
    text: "El copy menciona la valoración como un paso con valor claro y precio visible. Quien no quiere ese paso se filtra antes de escribir.",
  },
  {
    title: "Filtro 2 — Flujo de WhatsApp",
    text: "El primer mensaje califica antes de responder cualquier precio. Reencuadra la conversación hacia el problema médico, no hacia el precio.",
  },
];

const adSets = [
  {
    accent: ACCENT.lime,
    name: "Ad Set 1",
    angle: "Romper parálisis por precio",
    creative: "Video Dr. Edgar — Ángulo 1",
    segmentation: "Hombres y mujeres 28–60 años · Ciudad y zona del consultorio",
  },
  {
    accent: ACCENT.amber,
    name: "Ad Set 2",
    angle: "El costo de esperar",
    creative: "Imagen estática — Ángulo 2",
    segmentation: "Misma segmentación",
  },
];

const optimizationPlan = [
  { period: "Días 1–7", action: "No tocar nada. Fase de aprendizaje." },
  { period: "Días 7–10", action: "Revisar conversaciones calificadas vs. totales." },
  { period: "Día 10+", action: "Pausar creativos con peor desempeño." },
  { period: "Siguiente ciclo", action: "Probar variación de hook en los ganadores." },
];

const funnel = [
  "Conversaciones totales",
  "Conversaciones calificadas",
  "Citas agendadas",
  "Citas completadas",
  "Cirugías realizadas",
];

const nextSteps = [
  {
    accent: ACCENT.lime,
    title: "Esta semana",
    items: [
      "Confirmar que la valoración de $800 MXN se descuenta del procedimiento",
      "Implementar el flujo de WhatsApp con preguntas de calificación",
      "Definir fecha para grabar el video del Dr. Edgar",
    ],
  },
  {
    accent: ACCENT.amber,
    title: "Siguiente semana",
    items: [
      "Grabar video del Dr. Edgar con Ángulo 1 o Ángulo 4",
      "Lanzar los 2 ad sets con la nueva oferta",
      "No tocar por 7–10 días",
    ],
  },
  {
    accent: ACCENT.violet,
    title: "Ciclo de optimización",
    items: [
      "Medir toda la cadena de conversión",
      "Optimizar basado en costo por cita real",
    ],
  },
];

export default function EstrategiaEdgarClient() {
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
              Estrategia Meta Ads · Julio 2026
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{
                color: "#A6E22E",
                background: "rgba(166,226,46,0.08)",
                fontWeight: 600,
              }}
            >
              Estrategia Activa
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
              background: "radial-gradient(circle, rgba(183,156,255,0.05) 0%, transparent 70%)",
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
                Estrategia Meta Ads · Cirugía General
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
                <em style={{ color: "#A6E22E", fontStyle: "italic" }}>Dr. Edgar.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[540px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Después de 2 meses de campañas, el problema no son los creativos ni
                la segmentación. Es la{" "}
                <span className="text-white font-medium">oferta</span> y el{" "}
                <span className="text-white font-medium">estado mental del paciente</span>{" "}
                de hernia. Esta es la estrategia para reempaquetar la oferta y
                convertir más conversaciones en cirugías.
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
                    style={{ color: "#A6E22E", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400 }}
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

        <Divider />

        {/* EL PROBLEMA REAL */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>El problema real</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            No es el creativo.
            <br />
            Es la <em style={{ color: "#A6E22E", fontStyle: "italic" }}>oferta.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[640px]"
            style={{ color: "rgba(245,245,245,0.65)" }}
          >
            Hemos estado anunciando una valoración médica como si fuera un producto
            con valor obvio. Para el paciente, no lo es. En su mente, la valoración
            es solo el primer gasto antes del gasto grande que teme no poder pagar.
            Cambiar otro creativo sin cambiar esto es seguir optimizando la capa
            equivocada.
          </p>
        </section>

        <Divider />

        {/* CÓMO PIENSA EL PACIENTE */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Cómo piensa el paciente de hernia</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            El recorrido mental
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>real.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Este es el camino que recorre en su cabeza la persona que ve el
            anuncio, antes de escribir la primera pregunta.
          </p>

          <div className="flex flex-col gap-3">
            {journey.map((j, i) => (
              <motion.div
                key={j.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-8 p-6 md:p-8"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
              >
                <AccentBar color={i === 4 ? ACCENT.amber : ACCENT.lime} />
                <div className="pl-3 md:pl-2 flex items-baseline gap-4 md:w-[240px] shrink-0">
                  <span
                    className="font-title italic leading-none"
                    style={{ color: i === 4 ? ACCENT.amber : "#A6E22E", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 400 }}
                  >
                    {j.num}
                  </span>
                  <span className="font-body text-[14px] font-semibold text-white">{j.name}</span>
                </div>
                <p className="font-body text-[14px] leading-[1.65] pl-3 md:pl-0" style={{ color: "rgba(245,245,245,0.6)" }}>
                  {j.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 md:p-8"
            style={{ border: "1px solid rgba(166,226,46,0.2)", background: "rgba(166,226,46,0.04)" }}
          >
            <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-3" style={{ color: "#A6E22E" }}>
              Insight clave
            </p>
            <p className="font-body text-[15px] leading-[1.7]" style={{ color: "rgba(245,245,245,0.8)" }}>
              La persona que escribe preguntando precio de cirugía ya llegó al
              anuncio en Etapa 3. No llegó ahí por el anuncio — ya venía así. Lo
              que necesitamos es un mensaje que rompa esa parálisis, no que la
              confirme.
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* POR QUÉ PREGUNTAN PRECIO */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Por qué preguntan precio y no agendan</Eyebrow>
          <h2
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Su comportamiento
            <br />
            tiene <em style={{ color: "#A6E22E", fontStyle: "italic" }}>lógica.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            {reasons.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
                className="flex items-start gap-4 p-6"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
              >
                <span
                  className="font-title italic shrink-0 leading-none"
                  style={{ color: "#A6E22E", fontSize: 22, fontWeight: 400 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-[14px] leading-[1.6] pt-1" style={{ color: "rgba(245,245,245,0.7)" }}>
                  {r}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="font-body text-[15px] leading-[1.7] max-w-[560px]" style={{ color: "rgba(245,245,245,0.55)" }}>
            La solución no es explicarles mejor el proceso. Es cambiar lo que
            estamos ofreciendo.
          </p>
        </section>

        <Divider />

        {/* EL CAMBIO CENTRAL + OFERTA */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>El cambio central</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Reempaquetar
            <br />
            la <em style={{ color: "#A6E22E", fontStyle: "italic" }}>oferta.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[640px] mb-14"
            style={{ color: "rgba(245,245,245,0.65)" }}
          >
            Dejamos de vender una cita médica. Empezamos a vender certeza y un
            plan de acción.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <div className="p-6 md:p-8" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "rgba(245,245,245,0.4)" }}>
                Lo que el paciente escucha hoy
              </p>
              <p className="font-title italic" style={{ fontSize: "clamp(18px, 1.8vw, 24px)", color: "rgba(245,245,245,0.5)", fontWeight: 400 }}>
                &ldquo;Paga para que te digan qué tienes.&rdquo;
              </p>
            </div>
            <div className="p-6 md:p-8" style={{ border: "1px solid rgba(166,226,46,0.25)", background: "rgba(166,226,46,0.04)" }}>
              <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "#A6E22E" }}>
                Lo que necesita escuchar
              </p>
              <p className="font-title italic text-white" style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}>
                &ldquo;Paga para saber exactamente qué tan urgente es tu caso, cuáles
                son tus opciones reales y cuánto costaría — con un plan por
                escrito.&rdquo;
              </p>
            </div>
          </div>

          {/* OFFER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden p-8 md:p-12"
            style={{ border: "1px solid rgba(166,226,46,0.3)", background: "rgba(166,226,46,0.03)" }}
          >
            <div
              className="pointer-events-none absolute top-0 right-0"
              style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(166,226,46,0.12) 0%, transparent 70%)" }}
            />
            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-3" style={{ color: "#A6E22E" }}>
                  La nueva oferta
                </p>
                <h3 className="font-title text-white mb-2" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
                  Valoración Diagnóstica — Dr. Edgar
                </h3>
                <p className="font-title leading-none" style={{ color: "#A6E22E", fontSize: "clamp(40px, 4.5vw, 56px)", fontWeight: 400 }}>
                  $800 <span className="text-[16px] font-body align-middle" style={{ color: "rgba(245,245,245,0.5)" }}>MXN</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 md:max-w-[560px]">
                {offerChecklist.map((c) => (
                  <div key={c} className="flex items-start gap-3">
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full font-bold shrink-0 mt-0.5"
                      style={{ background: "#A6E22E", color: "#0D0D0D", fontSize: 9 }}
                    >
                      ✓
                    </span>
                    <p className="font-body text-[13px] leading-[1.5]" style={{ color: "rgba(245,245,245,0.75)" }}>
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p
              className="relative font-body text-[13px] mt-8 pt-6"
              style={{ color: "rgba(245,245,245,0.55)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              Los $800 MXN se descuentan del procedimiento si decides continuar
              con el Dr. Edgar.
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* LOS NÚMEROS DEL NEGOCIO */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Los números del negocio</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Lo que puede costar
            <br />
            cada <em style={{ color: "#A6E22E", fontStyle: "italic" }}>resultado.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            El costo actual de $50 MXN por conversación es razonable. El
            problema nunca fue el costo por conversación — es la conversión de
            conversación a cita. Eso se resuelve con la nueva oferta y el flujo
            de WhatsApp.
          </p>

          <div className="flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {businessNumbers.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center justify-between gap-6 px-8 py-5"
                style={{ borderBottom: i < businessNumbers.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <p className="font-body text-[14px]" style={{ color: "rgba(245,245,245,0.7)" }}>
                  {b.label}
                </p>
                <p className="font-title shrink-0 text-right" style={{ color: "#A6E22E", fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 400 }}>
                  {b.value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 4 ÁNGULOS CREATIVOS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Ángulos creativos — copy listo para usar</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Cuatro formas de
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>conectar.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Empieza con los formatos prioritarios. No produzcas los 4 ángulos al
            mismo tiempo — prueba primero, después escala lo que funciona.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {angles.map((a, i) => (
              <motion.article
                key={a.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
                className="relative p-6 md:p-8"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
              >
                <AccentBar color={a.accent} />
                <div className="pl-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: a.accent, opacity: 0.85 }}>
                    {a.label}
                  </p>
                  <h3 className="font-title text-white mb-2" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
                    {a.title}
                  </h3>
                  <p className="font-body text-[12px] italic mb-5" style={{ color: "rgba(245,245,245,0.4)" }}>
                    {a.audience}
                  </p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-1.5" style={{ color: "rgba(245,245,245,0.35)" }}>
                        Hook
                      </p>
                      <p className="font-body text-[14px] font-medium leading-[1.5]" style={{ color: "rgba(245,245,245,0.9)" }}>
                        &ldquo;{a.hook}&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-1.5" style={{ color: "rgba(245,245,245,0.35)" }}>
                        Cuerpo
                      </p>
                      <p className="font-body text-[13px] leading-[1.6]" style={{ color: "rgba(245,245,245,0.6)" }}>
                        {a.body}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-1.5" style={{ color: "rgba(245,245,245,0.35)" }}>
                        Oferta
                      </p>
                      <p className="font-body text-[13px] leading-[1.6]" style={{ color: "rgba(245,245,245,0.6)" }}>
                        {a.offer}
                      </p>
                    </div>
                    <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="font-body text-[13px] font-semibold" style={{ color: a.accent }}>
                        CTA: {a.cta}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <Divider />

        {/* FORMATO DE CREATIVOS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Formato de creativos</Eyebrow>
          <h2
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Dos formatos,
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>un video guía.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-5" style={{ color: "rgba(245,245,245,0.4)" }}>
                Prioridad de formato
              </p>
              <div className="flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {creativeFormat.map((c, i) => (
                  <div
                    key={c.priority}
                    className="flex items-center gap-6 px-6 py-5"
                    style={{ borderBottom: i < creativeFormat.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                  >
                    <span className="font-title italic leading-none" style={{ color: "#A6E22E", fontSize: 28, fontWeight: 400 }}>
                      {c.priority}
                    </span>
                    <div>
                      <p className="font-body text-[14px] text-white mb-1">{c.format}</p>
                      <p className="font-body text-[12px]" style={{ color: "rgba(245,245,245,0.45)" }}>
                        {c.angle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-5" style={{ color: "rgba(245,245,245,0.4)" }}>
                Estructura del video (30–45 segundos)
              </p>
              <div className="flex flex-col gap-3">
                {videoStructure.map((v, i) => (
                  <motion.div
                    key={v.time}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center gap-4 px-6 py-4"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
                  >
                    <span
                      className="font-body text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 shrink-0"
                      style={{ color: "#F5B342", border: "1px solid rgba(245,179,66,0.25)" }}
                    >
                      {v.time}
                    </span>
                    <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.7)" }}>
                      {v.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* FLUJO DE WHATSAPP */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Flujo de WhatsApp — versión final</Eyebrow>
          <h2
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Calificar antes
            <br />
            de <em style={{ color: "#A6E22E", fontStyle: "italic" }}>responder precio.</em>
          </h2>

          <div className="flex flex-col gap-5 max-w-[640px] mb-10">
            {whatsappMessages.map((m, i) => (
              <motion.div
                key={m.who}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6"
                style={{ border: "1px solid rgba(166,226,46,0.2)", background: "rgba(166,226,46,0.03)" }}
              >
                <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-3" style={{ color: "#A6E22E" }}>
                  {m.who}
                </p>
                <p className="font-body text-[14px] leading-[1.7] whitespace-pre-line" style={{ color: "rgba(245,245,245,0.8)" }}>
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="font-body text-[13px] italic max-w-[560px]" style={{ color: "rgba(245,245,245,0.45)" }}>
            Si insisten solo en precio de cirugía sin querer la valoración: ese
            paciente no está listo. No es una pérdida — es el filtro
            funcionando correctamente.
          </p>
        </section>

        <Divider />

        {/* FILTRO DE PACIENTES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Cómo filtrar pacientes que solo buscan precio</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filters.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-6 md:p-8"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
              >
                <AccentBar color={i === 0 ? ACCENT.lime : ACCENT.violet} />
                <div className="pl-4">
                  <h3 className="font-body text-[14px] font-semibold text-white mb-2">{f.title}</h3>
                  <p className="font-body text-[13px] leading-[1.6]" style={{ color: "rgba(245,245,245,0.55)" }}>
                    {f.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ESTRUCTURA DE CAMPAÑA */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Estructura de campaña</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Campaña — Dr. Edgar
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>Hernias.</em>
          </h2>

          <div className="flex flex-wrap gap-x-10 gap-y-3 mb-12">
            <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.5)" }}>
              <span className="text-white font-medium">Funnel:</span> Directo a oferta
            </p>
            <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.5)" }}>
              <span className="text-white font-medium">Objetivo:</span> Mensajes WhatsApp
            </p>
            <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.5)" }}>
              <span className="text-white font-medium">Presupuesto:</span> $5,000–$6,000 MXN/mes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {adSets.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-6 md:p-8"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
              >
                <AccentBar color={a.accent} />
                <div className="pl-4">
                  <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: a.accent }}>
                    {a.name}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.7)" }}>
                      <span className="text-white font-medium">Ángulo:</span> {a.angle}
                    </p>
                    <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.7)" }}>
                      <span className="text-white font-medium">Creativo:</span> {a.creative}
                    </p>
                    <p className="font-body text-[13px]" style={{ color: "rgba(245,245,245,0.7)" }}>
                      <span className="text-white font-medium">Segmentación:</span> {a.segmentation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="font-body text-[13px] italic" style={{ color: "rgba(245,245,245,0.4)" }}>
            Máximo 2 creativos por ad set al inicio.
          </p>
        </section>

        <Divider />

        {/* PLAN DE OPTIMIZACIÓN */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Plan de optimización</Eyebrow>
          <h2
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Paciencia primero,
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>ajustes después.</em>
          </h2>

          <div className="flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {optimizationPlan.map((o, i) => (
              <motion.div
                key={o.period}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-8 py-5"
                style={{ borderBottom: i < optimizationPlan.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <span
                  className="font-body text-[11px] uppercase tracking-[0.14em] shrink-0 sm:w-[160px]"
                  style={{ color: "#A6E22E" }}
                >
                  {o.period}
                </span>
                <p className="font-body text-[14px]" style={{ color: "rgba(245,245,245,0.75)" }}>
                  {o.action}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* INDICADORES A MEDIR */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Indicadores a medir desde ahora</Eyebrow>
          <h2
            className="font-title text-pg-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Toda la cadena,
            <br />
            no solo <em style={{ color: "#A6E22E", fontStyle: "italic" }}>una métrica.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Dejar de medir solo conversaciones. Medir toda la cadena, de
            principio a fin.
          </p>

          <div className="flex flex-col md:flex-row items-stretch flex-wrap gap-2">
            {funnel.map((f, i) => (
              <div key={f} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="px-6 py-5"
                  style={{
                    border: i === funnel.length - 1 ? "1px solid rgba(166,226,46,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    background: i === funnel.length - 1 ? "rgba(166,226,46,0.05)" : "rgba(255,255,255,0.015)",
                  }}
                >
                  <p
                    className="font-body text-[13px] font-medium whitespace-nowrap"
                    style={{ color: i === funnel.length - 1 ? "#A6E22E" : "rgba(245,245,245,0.75)" }}
                  >
                    {f}
                  </p>
                </motion.div>
                {i < funnel.length - 1 && (
                  <span className="font-title hidden md:block" style={{ color: "rgba(245,245,245,0.25)" }}>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PRÓXIMOS PASOS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <Eyebrow>Próximos pasos en orden</Eyebrow>
          <h2
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            De aquí a la
            <br />
            <em style={{ color: "#A6E22E", fontStyle: "italic" }}>campaña activa.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {nextSteps.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
                className="px-8 py-10"
                style={{
                  borderRight: gi < nextSteps.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <span className="block w-8 h-[2px] mb-5" style={{ background: group.accent }} />
                <p className="font-body text-[14px] font-medium mb-5 text-white">{group.title}</p>
                <div className="flex flex-col gap-3">
                  {group.items.map((it) => (
                    <div key={it} className="flex items-start gap-3">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ background: group.accent }}
                      />
                      <p className="font-body text-[13px] leading-[1.6]" style={{ color: "rgba(245,245,245,0.6)" }}>
                        {it}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* QUOTE / CIERRE */}
        <section className="px-6 md:px-16 py-24 md:py-28">
          <div className="max-w-[820px] mx-auto text-center">
            <p className="font-title leading-none mb-6" style={{ color: "#A6E22E", opacity: 0.25, fontSize: 72, fontWeight: 400 }}>
              &ldquo;
            </p>
            <p
              className="font-title italic text-pg-light mb-6"
              style={{ fontSize: "clamp(20px, 2.4vw, 30px)", fontWeight: 400, lineHeight: 1.45, letterSpacing: "-0.01em" }}
            >
              El problema nunca fue el costo por conversación — es la conversión
              de conversación a cita. Eso se resuelve con la nueva oferta y el
              flujo de WhatsApp.
            </p>
            <p className="font-body text-[12px] uppercase tracking-[var(--ls-label)]" style={{ color: "rgba(245,245,245,0.4)" }}>
              <span className="text-white font-semibold">PG Estrategias</span> &middot; Equipo de Growth
            </p>
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(166,226,46,0.1) 0%, transparent 65%)" }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 inline-flex items-center gap-3" style={{ color: "#A6E22E" }}>
              <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
              PG Estrategias
              <span className="inline-block w-8 h-px" style={{ background: "#A6E22E" }} />
            </p>
            <h2
              className="font-title text-pg-light mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              Listos para lanzar
              <br />
              <em style={{ color: "#A6E22E", fontStyle: "italic" }}>la nueva oferta.</em>
            </h2>
            <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mx-auto mb-12" style={{ color: "rgba(245,245,245,0.55)" }}>
              El siguiente paso es confirmar la oferta, grabar el video del Dr.
              Edgar y activar los dos ad sets. Quedamos a sus órdenes para
              cualquier pregunta.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <a
                href="https://wa.me/5212221215051"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span className="w-9 h-9 flex items-center justify-center" style={{ background: "rgba(166,226,46,0.08)", color: "#A6E22E" }}>
                  ☎
                </span>
                +52 222 121 5051
              </a>
              <a
                href="mailto:contacto@pgestrategias.com"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span className="w-9 h-9 flex items-center justify-center" style={{ background: "rgba(166,226,46,0.08)", color: "#A6E22E" }}>
                  ✉
                </span>
                contacto@pgestrategias.com
              </a>
              <a
                href="/"
                className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                style={{ color: "rgba(245,245,245,0.65)" }}
              >
                <span className="w-9 h-9 flex items-center justify-center" style={{ background: "rgba(166,226,46,0.08)", color: "#A6E22E" }}>
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
