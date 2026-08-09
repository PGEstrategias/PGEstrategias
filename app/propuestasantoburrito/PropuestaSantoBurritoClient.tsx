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
  { num: "$11K", label: "MXN / mes · Pago mensual" },
  { num: "1", label: "Paquete completo · Ignición" },
  { num: "PL", label: "Polonia · Mercado objetivo" },
];

const problemPoints = [
  {
    num: "01",
    text: "Cuando alguien en Polonia piensa en 'comida mexicana', piensa en burritos de cadena, nachos con queso industrial y tacos duros. Eso no es comida mexicana — es Tex-Mex americanizado exportado bajo el nombre de México.",
  },
  {
    num: "02",
    text: "Miles de personas en Polonia nunca han probado un mole real, una salsa molcajeteada o unos chilaquiles bien hechos. Creen que ya conocen 'lo mexicano' — y no es así.",
  },
  {
    num: "03",
    text: "Si Mi Santo Burrito compite en la misma categoría que las cadenas Tex-Mex, compite en el peor terreno posible: precio y volumen. Pero si se posiciona como LA puerta de entrada a la comida mexicana auténtica en Polonia, compite sola.",
  },
  {
    num: "04",
    text: "Esa es la oportunidad: ser el lugar donde alguien prueba, por primera vez, lo que realmente es comer en México. Un espacio que prácticamente no existe todavía en Polonia.",
  },
];

const opportunityCards = [
  {
    accent: ACCENT.amber,
    label: "🌮 · El motor del descubrimiento",
    title: "El antojo vende antes de hablar",
    desc: "Un mole rojo brillando, una salsa recién molcajeteada, un huevo estrellado sobre una enchilada — eso comunica autenticidad sin decir una palabra. La gente descubre restaurantes a través del antojo visual.",
  },
  {
    accent: ACCENT.lime,
    label: "📍 · Mercado",
    title: "Poca competencia auténtica en Polonia",
    desc: "La mayoría de la oferta 'mexicana' en Polonia es Tex-Mex genérico. Casi nadie comunica desayunos reales, guisados, salsas caseras ni moles. Ese espacio está prácticamente vacío — y Mi Santo Burrito puede ocuparlo.",
  },
  {
    accent: ACCENT.violet,
    label: "⭐ · Primer contacto",
    title: "Google Business decide si entran",
    desc: "Cuando alguien busca 'comida mexicana cerca de mí' o 'authentic mexican food', Google Business es lo que decide si entran. Fotos auténticas + reseñas que mencionen 'real', 'auténtico', 'como en México' generan confianza inmediata.",
  },
  {
    accent: ACCENT.amber,
    label: "🎥 · Formato ganador",
    title: "El video comunica tradición",
    desc: "Mostrar el proceso — cómo se hace un mole, cómo se prepara una salsa, cómo se monta un plato — comunica tradición y cuidado de una forma que ninguna foto estática logra igual.",
  },
  {
    accent: ACCENT.lime,
    label: "🇲🇽 · Narrativa de origen",
    title: "La historia de México vende sola",
    desc: "Recetas de la abuela, ingredientes preparados como en México, técnicas tradicionales — esa narrativa convierte a Mi Santo Burrito en una experiencia cultural, no solo en un lugar para comer.",
  },
  {
    accent: ACCENT.violet,
    label: "🎯 · Posicionamiento",
    title: "Una categoría propia",
    desc: "No se compite con Taco Bell en precio. Se construye una categoría nueva: comida mexicana de México — y se es el primero en ocuparla con fuerza en Polonia.",
  },
];

const packageItems = [
  {
    accent: ACCENT.amber,
    label: "◉ · Publicidad pagada",
    title: "$2,500 MXN de pauta incluidos",
    desc: "Campañas en Meta Ads (Facebook e Instagram) con video y fotografía real — moles, enchiladas, desayunos — dirigidas a personas en Polonia interesadas en gastronomía y cultura latina. Google Ads captura búsquedas de 'mexican food near me', 'authentic mexican restaurant'. El presupuesto está incluido, no es costo adicional.",
  },
  {
    accent: ACCENT.lime,
    label: "◉ · Contenido mensual",
    title: "Contenido que genera antojo y posiciona",
    desc: "1 video de 1 minuto mensual mostrando el proceso de preparación de un platillo emblemático. 4 Reels (1 para anuncios + 3 orgánicos). 3 diseños gráficos educando sobre platillos auténticos. 3 carruseles 'Esto NO es Tex-Mex' — narrativa de autenticidad que diferencia.",
  },
  {
    accent: ACCENT.violet,
    label: "◉ · Google Business Profile",
    title: "La primera impresión que cuenta",
    desc: "Optimización completa del perfil: descripción enfocada en 'comida mexicana auténtica, no Tex-Mex', categorías correctas, horarios y fotos profesionales. Estrategia de reseñas activa para que mencionen 'sabe a México', 'como en casa de mi abuela', 'no es como las otras'.",
  },
  {
    accent: ACCENT.amber,
    label: "◉ · Landing page incluida",
    title: "Tu historia, desde el primer scroll",
    desc: "Una página que cuenta la historia de Mi Santo Burrito: de dónde viene la comida, qué la hace auténtica y por qué es diferente. Galería visual con fotografía de platillos. Llamados a la acción claros: ubicación, horarios y cómo reservar.",
  },
  {
    accent: ACCENT.lime,
    label: "◉ · Configuración técnica",
    title: "Todo conectado y medible",
    desc: "Instalación de Meta Pixel en la landing page. Configuración de seguimiento de conversiones: clics al menú, solicitudes de ubicación, interacciones con anuncios. Todos los perfiles digitales sincronizados bajo un mismo mensaje de marca.",
  },
  {
    accent: ACCENT.violet,
    label: "◉ · Acompañamiento mensual",
    title: "Presentes cada mes contigo",
    desc: "1 videollamada estratégica mensual: revisión de resultados, contenido del siguiente mes y oportunidades de posicionamiento. Reporte mensual en lenguaje claro: alcance, interacciones, crecimiento y desempeño de campañas — sin tecnicismos.",
  },
];

const deliverables = [
  { icon: "▶", text: "Publicidad pagada — Meta o Google Ads con $2,500 MXN de ad spend incluido", freq: "Mensual" },
  { icon: "◎", text: "Video de 1 minuto — proceso de preparación de un platillo emblemático", freq: "1 / mes" },
  { icon: "⊞", text: "Reels — 1 para anuncios pagados + 3 para redes orgánicas", freq: "4 / mes" },
  { icon: "◈", text: "Diseños gráficos — educando sobre platillos mexicanos auténticos", freq: "3 / mes" },
  { icon: "◉", text: "Carruseles — 'Esto NO es Tex-Mex', narrativa de autenticidad", freq: "3 / mes" },
  { icon: "◆", text: "Google Business — optimización de perfil + estrategia de reseñas", freq: "Mensual" },
  { icon: "◇", text: "Landing page — diseñada e incluida con narrativa de marca", freq: "Mes 1" },
  { icon: "▷", text: "Configuración técnica — píxeles, rastreo y vinculación de perfiles", freq: "Mes 1" },
  { icon: "▸", text: "Videollamada estratégica — revisión de resultados y planificación", freq: "Mensual" },
  { icon: "▹", text: "Reporte mensual — métricas en lenguaje claro, sin tecnicismos", freq: "Mensual" },
];

const roiRows = [
  { label: "Ticket promedio por cliente (estimado)", value: "$80 – $150 PLN / persona" },
  { label: "3 mesas adicionales al día por presencia digital", value: "$240 – $450 PLN / día" },
  { label: "Proyección mensual (30 días)", value: "$7,200 – $13,500 PLN / mes" },
  { label: "Costo de la gestión mensual", value: "$11,000 MXN ≈ $2,200 PLN" },
];

const impacts = [
  {
    accent: ACCENT.amber,
    title: "Una categoría propia en Polonia",
    desc: "Mi Santo Burrito deja de competir con las cadenas Tex-Mex y se convierte en el referente de comida mexicana auténtica — una categoría que prácticamente no existe todavía.",
  },
  {
    accent: ACCENT.lime,
    title: "Clientes que regresan y recomiendan",
    desc: "Un cliente que descubre 'esto sí es México de verdad' se convierte en embajador. Lo cuenta, lo recomienda, lo etiqueta. Esa narrativa es el activo más valioso a largo plazo.",
  },
  {
    accent: ACCENT.violet,
    title: "Visibilidad ante el cliente correcto",
    desc: "No cualquier cliente — el que valora la autenticidad y está dispuesto a pagar por ella. Personas que buscan una experiencia cultural, no el burrito más barato.",
  },
  {
    accent: ACCENT.amber,
    title: "Presencia digital que trabaja sola",
    desc: "Google Business optimizado, landing page y redes activas generan descubrimiento orgánico las 24 horas, los 7 días de la semana, sin depender de recomendaciones.",
  },
  {
    accent: ACCENT.lime,
    title: "ROI medible desde el primer mes",
    desc: "Menos de 1 mesa adicional al día justifica la inversión. Con reportes mensuales claros, sabes exactamente qué está funcionando y cuánto cuesta cada cliente nuevo.",
  },
  {
    accent: ACCENT.violet,
    title: "Marca que crece con el tiempo",
    desc: "Cada mes de contenido, cada reseña y cada campaña suma a una identidad de marca más fuerte. El valor se acumula — no es un gasto, es una inversión que se capitaliza.",
  },
];

export default function PropuestaSantoBurritoClient() {
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
              background: "radial-gradient(circle, rgba(245,179,66,0.12) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%",
              left: "-10%",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(166,226,46,0.06) 0%, transparent 70%)",
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
                Propuesta de gestión digital
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
                Mi Santo Burrito
                <br />
                <em style={{ color: "#F5B342", fontStyle: "italic" }}>
                  auténtico.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[560px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Polonia no necesita otro restaurante Tex-Mex. Necesita{" "}
                <span className="text-white font-medium">
                  comida mexicana de México de verdad
                </span>
                . Esta propuesta está diseñada para que Mi Santo Burrito ocupe ese espacio —
                el que prácticamente nadie más está ocupando todavía.
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

        {/* EL PROBLEMA */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            El problema · la oportunidad escondida
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
            Polonia cree conocer
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>la comida mexicana.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[640px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Y ese es exactamente el problema — y la mayor oportunidad que tiene Mi Santo Burrito.
            Lo que Europa llama &ldquo;mexicano&rdquo; es Tex-Mex americanizado. La comida real de
            México — moles, guisados, salsas caseras, desayunos auténticos — prácticamente no existe
            como propuesta de marca en Polonia todavía.
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

        {/* LA OPORTUNIDAD */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            La oportunidad · tres frentes, un mensaje
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
            Ser &ldquo;lo mexicano
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>de verdad&rdquo;.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Esto no es solo marketing — es un posicionamiento de marca que se construye en cada
            pieza de contenido, cada platillo fotografiado y cada reseña en Google. Redes sociales,
            landing page y Google Business trabajando con un solo mensaje.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunityCards.map((t, i) => (
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

        {/* PAQUETE IGNICIÓN */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Paquete Ignición — Mi Santo Burrito
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
              Todo lo que necesitas,
              <br />
              <em style={{ color: "#F5B342", fontStyle: "italic" }}>desde el mes uno.</em>
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
                Inversión mensual
              </p>
              <p
                className="font-title leading-none mb-2"
                style={{
                  color: "#F5B342",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 400,
                }}
              >
                $11,000
                <span className="text-[18px] opacity-60"> MXN</span>
              </p>
              <p
                className="font-body text-[12px]"
                style={{ color: "rgba(245,245,245,0.6)" }}
              >
                Incluye $2,500 MXN de inversión en pauta publicitaria
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
            &ldquo;El Paquete Ignición no solo le da visibilidad a Mi Santo Burrito. Construye,
            mes a mes, la identidad de marca que lo posiciona como el referente de comida mexicana
            auténtica en Polonia.&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {packageItems.map((t, i) => (
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

          {/* ENTREGABLES */}
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            Entregables mensuales
          </p>

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
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-6 px-6 md:px-8 py-5 transition-colors duration-300 hover:bg-white/[0.025]"
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

        {/* ROI */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <p
            className="font-body text-[11px] tracking-[var(--ls-label)] uppercase mb-6 flex items-center gap-3"
            style={{ color: "#F5B342" }}
          >
            <span className="inline-block w-8 h-px" style={{ background: "#F5B342" }} />
            El retorno · hagamos el ejercicio
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
            El math
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>es simple.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[640px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            Si la nueva identidad atrae clientes nuevos que regresan, ¿cuántas mesas adicionales
            necesitas para que la inversión se justifique? Menos de lo que piensas.
          </p>

          <div
            className="overflow-x-auto mb-10"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="grid grid-cols-[1.4fr_1fr] min-w-[480px]">
              <div
                className="px-6 py-4 font-body text-[10px] uppercase tracking-[0.16em]"
                style={{
                  color: "rgba(245,245,245,0.4)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                Concepto
              </div>
              <div
                className="px-6 py-4 font-body text-[10px] uppercase tracking-[0.16em]"
                style={{
                  color: "#F5B342",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(245,179,66,0.04)",
                }}
              >
                Estimado
              </div>
              {roiRows.map((r, i) => (
                <div key={r.label} className="contents">
                  <div
                    className="px-6 py-4 font-body text-[14px]"
                    style={{
                      color: "rgba(245,245,245,0.8)",
                      borderBottom: i < roiRows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    {r.label}
                  </div>
                  <div
                    className="px-6 py-4 font-body text-[14px] font-medium"
                    style={{
                      color: i === roiRows.length - 1 ? "#F5B342" : "rgba(245,245,245,0.75)",
                      borderBottom: i < roiRows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderLeft: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {r.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="p-6 md:p-8"
            style={{
              border: "1px solid rgba(245,179,66,0.2)",
              background: "rgba(245,179,66,0.04)",
            }}
          >
            <p
              className="font-title text-white mb-3"
              style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              ¿Cuántas mesas necesitas para justificarlo?
            </p>
            <p
              className="font-body text-[15px] leading-[1.7]"
              style={{ color: "rgba(245,245,245,0.65)" }}
            >
              Menos de 1 mesa adicional al día. Y eso sin contar el efecto de marca: un cliente
              que descubre que &ldquo;esto sí es México de verdad&rdquo; se convierte en embajador.
              Lo cuenta, lo recomienda, lo etiqueta. Esa narrativa se vuelve el activo más valioso
              de Mi Santo Burrito a largo plazo.
            </p>
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
            Lo que cambia
            <br />
            <em style={{ color: "#F5B342", fontStyle: "italic" }}>para el negocio.</em>
          </h2>
          <p
            className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14"
            style={{ color: "rgba(245,245,245,0.55)" }}
          >
            No se trata de vender más burritos. Se trata de que Polonia entienda, por fin,
            lo que es México de verdad — y que lo descubra en Mi Santo Burrito.
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
              Mi Santo Burrito tiene algo que ninguna cadena Tex-Mex puede replicar:
              comida mexicana real, hecha como se hace en México. Hoy esa diferencia
              no se está comunicando con la fuerza que merece. Eso es lo que cambiamos.
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
              background: "radial-gradient(circle, rgba(245,179,66,0.1) 0%, transparent 65%)",
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
              Isabel,
              <br />
              <em style={{ color: "#F5B342", fontStyle: "italic" }}>
                ¿cuándo empezamos?
              </em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[560px] mx-auto mb-12"
              style={{ color: "rgba(245,245,245,0.55)" }}
            >
              Polonia está lista para descubrir México de verdad. Mi Santo Burrito puede ser
              el primero en contarlo — y el que lo haga mejor. Solo queda arrancar.
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

            <p
              className="font-body text-[11px] mt-16"
              style={{ color: "rgba(245,245,245,0.3)" }}
            >
              © 2025 — Propuesta confidencial preparada por PG Estrategias exclusivamente para Mi Santo Burrito · Isabel.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
