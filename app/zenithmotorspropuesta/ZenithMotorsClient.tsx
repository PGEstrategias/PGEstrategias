"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const LIME = "#A6E22E";
const LIME_DIM = "rgba(166,226,46,0.08)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_DIM = "rgba(245,245,245,0.55)";
const TEXT_MUTED = "rgba(245,245,245,0.38)";

function Divider() {
  return (
    <div
      className="max-w-[1300px] mx-auto h-px"
      style={{
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[11px] tracking-[0.14em] uppercase mb-6 flex items-center gap-3"
      style={{ color: LIME }}
    >
      <span className="inline-block w-8 h-px" style={{ background: LIME }} />
      {children}
    </p>
  );
}

const heroStats = [
  { label: "Cobertura", value: "2 sucursales", sub: "Angelópolis · Chachapa" },
  { label: "Duración", value: "90 días", sub: "Campaña intensiva 360" },
  { label: "Escalera de producto", value: "$138K – $1.9M", sub: "Daily a aspiracional" },
];

const pilares = [
  {
    icon: "🚗",
    name: "Daily",
    rango: "$200K – $350K",
    perfil: "Parejas jóvenes y profesionistas",
    mensaje: "Ahorro total de propiedad, mensualidad manejable",
  },
  {
    icon: "🏎️",
    name: "Deportivo de calle",
    rango: "$350K – $700K",
    perfil: "Ejecutivos, emprendedores, entusiastas",
    mensaje: "Estatus + experiencia de manejo",
  },
  {
    icon: "🛻",
    name: "Camioneta de trabajo",
    rango: "$300K – $850K",
    perfil: "Empresarios, contratistas, comerciantes",
    mensaje: "Utilidad, durabilidad y valor de reventa",
  },
  {
    icon: "🔑",
    name: "Primer auto",
    rango: "$138K – $250K",
    perfil: "Jóvenes profesionistas",
    mensaje: "Independencia, asesoría y financiamiento accesible",
  },
];

const corredores = [
  {
    icon: "✦",
    name: "Lomas de Angelópolis",
    tag: "Corredor premium sur",
    desc: "Escaparate de marca y unidades aspiracionales. Pilares Deportivo de calle, Daily premium y Primer auto.",
    tono: "Aspiracional · experiencia de compra premium",
  },
  {
    icon: "▲",
    name: "Chachapa",
    tag: "Polo de volumen · carretera Puebla-Tehuacán",
    desc: "Rotación de volumen y camionetas. Pilares Camioneta de trabajo y Daily utilitario.",
    tono: "Funcional · financiamiento directo y practicidad",
  },
];

const sistema = [
  {
    icon: "🪧",
    title: "Medios físicos",
    desc: "Espectaculares diferenciados por corredor: aspiracionales en Atlixcáyotl, utilitarios en carretera Tehuacán.",
  },
  {
    icon: "🎬",
    title: "Audiovisual",
    desc: "Video institucional + cortes 60/30/15s, verticales para Reels/TikTok/Shorts y bumpers de 5s por pilar.",
  },
  {
    icon: "📡",
    title: "Paid media · 4 plataformas",
    desc: "Meta (leads), Google (intención activa), TikTok (awareness y comunidad) y YouTube (bumpers pre-roll).",
  },
  {
    icon: "🤝",
    title: "Comunidad + TikTok",
    desc: "Rodadas y eventos con clubs de autos de Puebla que convierten a Zenith en referente cultural automotriz.",
  },
  {
    icon: "🏁",
    title: "Eventos y patrocinios",
    desc: "Presencia como patrocinador en eventos deportivos, carreras y torneos de la ciudad, activando la marca donde se reúne el público objetivo.",
  },
];

const fases = [
  {
    num: "01",
    mes: "Mes 1 — Cimientos",
    honorario: "$29,000 MXN",
    foco: "Estrategia, investigación y setup",
    items: [
      "Estudio de mercado + 200–300 encuestas en campo",
      "Estrategia digital y de campo según el estudio de mercado",
      "Branding: manual de marca y tono por pilar",
      "Setup de paid media en 4 plataformas",
      "Medición y KPIs por canal",
      "Pre-producción: guiones, scouting de locaciones, storyboard/animatic",
      "Hasta 10 artes para publicidad en piso",
      "5 artes animadas en motion graphics para pantallas/stories",
      "Reunión quincenal previo al lanzamiento",
    ],
  },
  {
    num: "02",
    mes: "Mes 2 — Lanzamiento",
    honorario: "$60,000 MXN",
    foco: "Producción y activación",
    items: [
      "Cine minuto (video institucional) + 4 reels principales + 6 reels adicionales",
      "4+ creatividades de espectacular por corredor",
      "Lanzamiento y optimización de paid media",
      "Primera rodada con clubs de autos de Puebla",
    ],
  },
  {
    num: "03",
    mes: "Mes 3 — Amplificación y cierre",
    honorario: "$20,000 MXN",
    foco: "Escalado y consolidación",
    items: [
      "Rotación de espectaculares y puntos Tier 2/3",
      "Escalado de campañas de mejor desempeño",
      "Rodada insignia masiva como anfitrión",
      "2 reels de rodada + 6 reels para redes sociales",
      "Reporte ejecutivo y propuesta de continuidad",
    ],
  },
];

const volumen = [
  { value: "30", label: "Piezas de diseño" },
  { value: "30", label: "Videos para redes" },
  { value: "10–20", label: "Videos TikTok en eventos" },
  { value: "8–10", label: "Archivos de video institucional" },
  { value: "3+", label: "Bumpers de 5s para YouTube" },
  { value: "4", label: "Plataformas de paid media" },
  { value: "8", label: "Reportes (quincenales + final)" },
  { value: "2", label: "Rodadas con la comunidad" },
];

const honorarios = [
  { mes: "Mes 1", concepto: "Cimientos — estrategia, investigación, branding y setup", monto: "$29,000" },
  { mes: "Mes 2", concepto: "Lanzamiento — video, espectaculares, paid media y activaciones", monto: "$60,000" },
  { mes: "Mes 3", concepto: "Amplificación y cierre — optimización, rodada insignia y cierre", monto: "$20,000" },
];

const pasos = [
  "Validación de la propuesta con Zenith Motors",
  "Firma de NDA para acceso a estadística financiera",
  "Cierre de honorarios y firma de contrato",
  "Kickoff: inmersión con flotilla, procesos e historia",
  "Arranque del estudio de mercado y encuestas en campo",
  "Cotización cruzada de espectaculares (Vea, ABG, Naranti, Metropoly)",
];

export default function ZenithMotorsClient() {
  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(13,13,13,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: LIME }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span className="font-title text-white text-[13px] tracking-[0.1em] uppercase" style={{ fontWeight: 700 }}>
              PG <span className="opacity-50 font-normal">Estrategias</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Zenith Motors
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{ color: LIME, background: LIME_DIM, fontWeight: 600 }}
            >
              ✦ Propuesta 360
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
              top: "-30%", right: "-15%",
              width: 700, height: 700,
              background: "radial-gradient(circle, rgba(166,226,46,0.10) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "-20%", left: "-10%",
              width: 500, height: 500,
              background: "radial-gradient(circle, rgba(110,184,212,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[11px] tracking-[0.15em] uppercase mb-8 flex items-center gap-2"
                style={{ color: LIME }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: LIME, animation: "pulse 2s ease-in-out infinite" }}
                />
                Propuesta de Campaña 360 · Puebla
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
                Zenith Motors,
                <br />
                la boutique de
                <br />
                <em style={{ color: LIME, fontStyle: "italic" }}>seminuevos de Puebla.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-body text-[15px] leading-[1.7] max-w-[560px]"
                style={{ color: TEXT_DIM }}
              >
                Una campaña intensiva de{" "}
                <span className="text-white font-medium">90 días</span> para convertir una escalera
                de producto única y presencia en dos corredores en{" "}
                <span className="text-white font-medium">visibilidad real</span>: el referente de
                seminuevos curados para el comprador poblano exigente.
              </motion.p>
            </div>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
              style={{ border: `1px solid ${BORDER}` }}
            >
              {heroStats.map((item, i, arr) => (
                <div
                  key={item.label}
                  className="px-8 py-6"
                  style={{
                    borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.14em] mb-1"
                    style={{ color: "rgba(245,245,245,0.3)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-title leading-none mb-1"
                    style={{ color: LIME, fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 400 }}
                  >
                    {item.value}
                  </p>
                  <p className="font-body text-[12px]" style={{ color: TEXT_MUTED }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* OPORTUNIDAD */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>La oportunidad</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Una ventaja estructural
            <br />
            que nadie está{" "}
            <em style={{ color: LIME, fontStyle: "italic" }}>comunicando.</em>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-[980px]">
            <p className="font-body text-[15px] leading-[1.8]" style={{ color: TEXT_DIM }}>
              El mercado de seminuevos en México superó los{" "}
              <span className="text-white font-medium">50 millones de búsquedas</span>, con el
              corazón de compra entre $200K y $400K — exactamente el centro del inventario de Zenith.
              El comprador llega habiendo investigado: la agencia que no existe digitalmente, no
              existe para él.
            </p>
            <p className="font-body text-[15px] leading-[1.8]" style={{ color: TEXT_DIM }}>
              Ningún competidor local —patios del Atlixcáyotl, Nami Angelópolis ni Kavak— se
              posiciona como{" "}
              <span className="text-white font-medium">boutique de seminuevos curados</span> para
              compradores exigentes. Esa posición está disponible, y Zenith tiene presencia real en
              los dos corredores que importan.
            </p>
          </div>
        </section>

        <Divider />

        {/* PILARES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Pilares de comunicación</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Cuatro mensajes,
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>cuatro compradores.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Cada pilar segmenta el mensaje por perfil y presupuesto, cubriendo toda la escalera de
            producto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pilares.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative p-8 transition-colors duration-500 hover:bg-white/[0.03]"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}
              >
                <span
                  className="absolute top-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
                  style={{ background: LIME }}
                />
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl">{p.icon}</p>
                  <span
                    className="font-body text-[12px] font-semibold px-3 py-1"
                    style={{ color: LIME, background: LIME_DIM }}
                  >
                    {p.rango}
                  </span>
                </div>
                <h3
                  className="font-title text-white mb-2"
                  style={{ fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </h3>
                <p className="font-body text-[12px] uppercase tracking-[0.06em] mb-3" style={{ color: TEXT_MUTED }}>
                  {p.perfil}
                </p>
                <p className="font-body text-[13px] leading-[1.6]" style={{ color: TEXT_DIM }}>
                  {p.mensaje}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CORREDORES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Dos corredores</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Un mensaje para
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>cada Puebla.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            La presencia física en ambos polos es la ventaja que la campaña explota conscientemente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {corredores.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-10"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}
              >
                <p className="text-xl mb-4" style={{ color: LIME }}>{c.icon}</p>
                <h3
                  className="font-title text-white mb-1"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {c.name}
                </h3>
                <p className="font-body text-[11px] uppercase tracking-[0.12em] mb-5" style={{ color: LIME }}>
                  {c.tag}
                </p>
                <p className="font-body text-[14px] leading-[1.7] mb-5" style={{ color: TEXT_DIM }}>
                  {c.desc}
                </p>
                <p className="font-body text-[13px] pt-4" style={{ color: TEXT_MUTED, borderTop: `1px solid ${BORDER}` }}>
                  {c.tono}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* POSICIONAMIENTO */}
        <section className="px-6 md:px-16 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[900px] mx-auto text-center"
          >
            <SectionLabel>
              <span className="mx-auto">Posicionamiento</span>
            </SectionLabel>
            <p
              className="font-title italic text-pg-light mb-8"
              style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.01em" }}
            >
              &ldquo;Seminuevos seleccionados para compradores exigentes, con atención local premium
              y respaldo real.&rdquo;
            </p>
            <p className="font-body text-[15px] leading-[1.8] max-w-[640px] mx-auto" style={{ color: TEXT_DIM }}>
              No competimos con Kavak en precio ni volumen. Ganamos donde Kavak no puede: trato
              humano, conocimiento del mercado local y flexibilidad en negociación, consignación y
              permuta — justo donde vive el comprador exigente.
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* SISTEMA 360 */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Sistema 360</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Cinco canales,
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>un solo sistema.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Medios físicos, audiovisual, paid media y comunidad operan integrados, no por separado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {sistema.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-8"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}
              >
                <p className="text-2xl mb-4">{s.icon}</p>
                <h3
                  className="font-title text-white mb-3"
                  style={{ fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h3>
                <p className="font-body text-[13px] leading-[1.6]" style={{ color: TEXT_DIM }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* FASES */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Plan de 90 días</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Tres meses,
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>tres etapas.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-16" style={{ color: TEXT_DIM }}>
            De los cimientos al cierre, cada mes con foco y honorario claros.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {fases.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 flex flex-col"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.015)" }}
              >
                <span
                  className="font-title italic leading-none mb-5"
                  style={{ color: LIME, fontSize: "clamp(24px, 2.4vw, 32px)", fontWeight: 400 }}
                >
                  {f.num}
                </span>
                <h3
                  className="font-title text-white mb-1"
                  style={{ fontSize: "clamp(18px, 1.6vw, 21px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {f.mes}
                </h3>
                <p className="font-body text-[12px] uppercase tracking-[0.08em] mb-5" style={{ color: TEXT_MUTED }}>
                  {f.foco}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-[13px] leading-[1.55]"
                      style={{ color: TEXT_DIM }}
                    >
                      <span className="mt-[3px] shrink-0" style={{ color: LIME }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p
                  className="font-title pt-4"
                  style={{ color: LIME, fontSize: "20px", fontWeight: 400, borderTop: `1px solid ${BORDER}` }}
                >
                  {f.honorario}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* VOLUMEN */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Volumen total · 90 días</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Lo que entregamos,
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>en números.</em>
          </motion.h2>

          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ border: `1px solid ${BORDER}` }}
          >
            {volumen.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                className="px-6 py-10 text-center"
                style={{
                  borderRight: (i + 1) % 4 !== 0 ? `1px solid ${BORDER}` : "none",
                  borderBottom: i < 4 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <p
                  className="font-title leading-none mb-3"
                  style={{ color: LIME, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400 }}
                >
                  {v.value}
                </p>
                <p className="font-body text-[12px] leading-[1.4]" style={{ color: TEXT_DIM }}>
                  {v.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* INVERSIÓN / TABULADOR */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Inversión en honorarios</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Tabulador de
            <br />
            <em style={{ color: LIME, fontStyle: "italic" }}>honorarios.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Honorarios de agencia por los 90 días de campaña.
          </p>

          <div style={{ border: `1px solid ${BORDER}` }}>
            {honorarios.map((h, i) => (
              <motion.div
                key={h.mes}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[140px_1fr_auto] items-center gap-4 md:gap-8 px-6 md:px-10 py-7"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                <span
                  className="font-body text-[11px] md:text-[13px] uppercase tracking-[0.12em] font-semibold"
                  style={{ color: LIME }}
                >
                  {h.mes}
                </span>
                <span className="font-body text-[13px] md:text-[14px] leading-[1.5]" style={{ color: TEXT_DIM }}>
                  {h.concepto}
                </span>
                <span
                  className="font-title text-white text-right whitespace-nowrap"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400 }}
                >
                  {h.monto}
                </span>
              </motion.div>
            ))}

            {/* Total */}
            <div
              className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[140px_1fr_auto] items-center gap-4 md:gap-8 px-6 md:px-10 py-8"
              style={{ background: LIME_DIM }}
            >
              <span
                className="font-body text-[11px] md:text-[13px] uppercase tracking-[0.12em] font-bold"
                style={{ color: LIME }}
              >
                Total
              </span>
              <span className="font-body text-[13px] md:text-[14px]" style={{ color: TEXT_DIM }}>
                Honorarios · campaña completa de 90 días
              </span>
              <span
                className="font-title text-right whitespace-nowrap"
                style={{ color: LIME, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400 }}
              >
                $109,000 <span className="text-[14px]" style={{ color: TEXT_DIM }}>MXN</span>
              </span>
            </div>
          </div>

          <p className="font-body text-[12px] leading-[1.6] mt-6 max-w-[640px]" style={{ color: TEXT_MUTED }}>
            No incluye presupuesto de pauta (Meta, Google, TikTok y YouTube Ads), inversión en
            espectaculares ni patrocinios. Estos se presupuestan y facturan por separado.
          </p>
        </section>

        <Divider />

        {/* SIGUIENTES PASOS */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Siguientes pasos</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-14"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Cómo{" "}
            <em style={{ color: LIME, fontStyle: "italic" }}>arrancamos.</em>
          </motion.h2>

          <div className="flex flex-col gap-1.5">
            {pasos.map((paso, i) => (
              <motion.div
                key={paso}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-5 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.03]"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.012)" }}
              >
                <span
                  className="font-title italic leading-none shrink-0"
                  style={{ color: LIME, fontSize: "20px", fontWeight: 400, minWidth: 32 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-[14px] text-white leading-[1.5]">{paso}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600, height: 600,
              background: "radial-gradient(circle, rgba(166,226,46,0.09) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[0.14em] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: LIME }}
            >
              <span className="inline-block w-8 h-px" style={{ background: LIME }} />
              PG Estrategias
              <span className="inline-block w-8 h-px" style={{ background: LIME }} />
            </p>
            <h2
              className="font-title text-pg-light mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              Ocupemos la posición
              <br />
              <em style={{ color: LIME, fontStyle: "italic" }}>antes que nadie.</em>
            </h2>
            <p
              className="font-body text-[15px] leading-[1.7] max-w-[520px] mx-auto mb-12"
              style={{ color: TEXT_DIM }}
            >
              Estamos listos para arrancar la campaña 360 de Zenith Motors. Cualquier duda, aquí
              estamos.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {[
                { icon: "📱", label: "+52 222 121 5051", href: "https://wa.me/5212221215051" },
                { icon: "✉️", label: "contacto@pgestrategias.com", href: "mailto:contacto@pgestrategias.com" },
                { icon: "🌐", label: "pgestrategias.com", href: "/" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-[14px] flex items-center gap-3 transition-colors duration-500 hover:text-white"
                  style={{ color: "rgba(245,245,245,0.65)" }}
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center text-base"
                    style={{ background: LIME_DIM, color: LIME }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
