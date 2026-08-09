"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const ROSE = "#D9A6AE";
const ROSE_DIM = "rgba(217,166,174,0.10)";
const ROSE_SOFT = "rgba(217,166,174,0.06)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_DIM = "rgba(245,245,245,0.62)";
const TEXT_MUTED = "rgba(245,245,245,0.42)";

function Divider() {
  return (
    <div
      className="max-w-[1300px] mx-auto h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-body text-[11px] tracking-[0.14em] uppercase mb-6 flex items-center gap-3"
      style={{ color: ROSE }}
    >
      <span className="inline-block w-8 h-px" style={{ background: ROSE }} />
      {children}
    </p>
  );
}

const decisionFactors = [
  {
    icon: "📱",
    title: "La decisión empieza en redes",
    desc: "Una chica que busca vestido para un evento no llama de primeras. Primero revisa Instagram, guarda opciones, manda screenshots a sus amigas. Si Dresscode no aparece en ese momento de inspiración, no existe para esa clienta.",
  },
  {
    icon: "🔍",
    title: "Google es el segundo filtro",
    desc: "Cuando ya le llamó la atención una marca, busca su nombre en Google. Reseñas, fotos, horarios, ubicación. Un perfil de Google Business desactualizado o con pocas reseñas genera duda justo cuando ya había interés.",
  },
  {
    icon: "👯",
    title: "La recomendación social es combustible",
    desc: "Una clienta satisfecha que etiqueta a Dresscode en su post de evento puede traer 5 clientas nuevas sin invertir un peso. El contenido bien producido que muestra el resultado final es el mejor anuncio posible.",
  },
  {
    icon: "🎯",
    title: "El contenido de proceso vende",
    desc: "Las clientas quieren ver el detrás de escena: cómo se elige el vestido, las opciones disponibles, la experiencia de ir a la tienda. Ese contenido genera deseo de vivir esa experiencia — y eso convierte seguidoras en clientas.",
  },
  {
    icon: "📅",
    title: "La temporada importa — y hay que anticiparla",
    desc: "Graduaciones, XV años, bodas, eventos corporativos, fiestas de fin de año. Cada temporada tiene su pico de búsqueda. La marca que ya está posicionada semanas antes de ese pico, gana las reservas de la temporada.",
  },
];

const incluye = [
  {
    icon: "◉",
    title: "Publicidad en Meta o Google — $2,500 MXN incluidos",
    desc: "Campañas visuales dirigidas a mujeres en Puebla interesadas en moda, estilo y eventos. El presupuesto de pauta está incluido — no es un costo adicional.",
    items: [
      "Meta Ads (Facebook e Instagram): anuncios con las piezas más aspiracionales del catálogo, dirigidos a mujeres en Puebla con intereses en moda, bodas, XV años y eventos especiales",
      "Google Ads: captura de búsquedas como 'renta de vestidos Puebla', 'vestidos para XV años Puebla', 'renta de vestido para boda Puebla'",
      "Campañas de temporada: anticipamos los picos de graduaciones, bodas y fiestas para que Dresscode ya esté posicionada cuando la demanda sube",
    ],
  },
  {
    icon: "◉",
    title: "Contenido mensual para redes sociales",
    desc: "Contenido diseñado para generar dos cosas al mismo tiempo: antojo de verse increíble y confianza en que Dresscode es el lugar donde eso sucede.",
    items: [
      "1 video de 1 minuto mensual: la experiencia completa de rentar en Dresscode, desde elegir el vestido hasta el resultado final",
      "4 Reels mensuales: 1 optimizado para anuncios pagados, 3 para crecimiento orgánico — hauls de vestidos, transformaciones, detrás de escena",
      "3 diseños gráficos con texto persuasivo: novedades del catálogo, temporadas, beneficios de rentar vs. comprar, promociones",
      "3 carruseles: 'cómo elegir tu vestido ideal según el evento', 'looks de la semana', 'del probador al evento'",
    ],
  },
  {
    icon: "◉",
    title: "Google Business Profile — Dresscode en el mapa",
    desc: "Cuando una clienta potencial busca tu nombre en Google después de ver tus redes, lo que encuentre en esos 5 segundos decide si llama o sigue buscando.",
    items: [
      "Optimización completa del perfil: descripción de marca, categorías correctas, horarios y fotos de la tienda y los vestidos",
      "Estrategia de reseñas activa: protocolo para que clientas satisfechas dejen reseñas que mencionen el trato, la variedad y el resultado",
      "Publicación regular de fotos y actualizaciones para mantener el perfil activo ante el algoritmo de Google Maps",
    ],
  },
  {
    icon: "◉",
    title: "Página de ventas — diseñada e incluida",
    desc: "Una landing page que captura a la clienta que llegó desde redes o Google y la convierte en una reserva. Visual, rápida y con el estilo de Dresscode.",
    items: [
      "Galería visual del catálogo, organizada por tipo de evento o estilo",
      "Llamados a la acción directos: botón de WhatsApp, formulario de disponibilidad y ubicación desde el primer scroll",
      "Sección de testimonios y fotos de clientas reales con el vestido puesto",
      "Hosting incluido por los primeros 6 meses del servicio",
    ],
  },
  {
    icon: "◉",
    title: "Configuración técnica completa",
    desc: "La base que conecta cada campaña con resultados medibles desde el primer día.",
    items: [
      "Instalación de Meta Pixel y rastreo de conversiones: clics al WhatsApp, solicitudes de cita, visitas a la galería",
      "Configuración de audiencias personalizadas: retargeting a mujeres que visitaron la página pero aún no reservaron",
      "Vinculación de todos los perfiles digitales: Instagram, Facebook, Google Business y página web bajo un mismo mensaje de marca",
    ],
  },
  {
    icon: "◉",
    title: "Acompañamiento estratégico mensual",
    desc: "Estamos activos en Dresscode todos los meses — ajustando campañas, anticipando temporadas y asegurando que el contenido siempre refleje el nivel de la marca.",
    items: [
      "1 videollamada estratégica mensual: revisión de resultados, contenido del siguiente mes y planificación de temporadas",
      "Reporte mensual en lenguaje claro: alcance, interacciones, clics, crecimiento de seguidores y desempeño de campañas",
    ],
  },
];

const entregables = [
  { entregable: "Publicidad pagada", desc: "Meta o Google Ads con $2,500 MXN de ad spend incluido", cant: "Mensual" },
  { entregable: "Video 1 minuto", desc: "Experiencia de renta: del vestido al evento", cant: "1 / mes" },
  { entregable: "Reels", desc: "1 para anuncios + 3 para crecimiento orgánico", cant: "4 / mes" },
  { entregable: "Diseños gráficos", desc: "Catálogo, temporadas, beneficios con copy persuasivo", cant: "3 / mes" },
  { entregable: "Carruseles", desc: "Guías de estilo, looks y contenido de inspiración", cant: "3 / mes" },
  { entregable: "Google Business", desc: "Optimización de perfil + estrategia de reseñas", cant: "Mensual" },
  { entregable: "Página de ventas", desc: "Con galería, CTAs directos y testimonios · hosting incluido", cant: "6 meses" },
  { entregable: "Configuración técnica", desc: "Pixel, audiencias, rastreo y vinculación de perfiles", cant: "Mes 1" },
  { entregable: "Videollamada + reporte", desc: "Revisión de resultados y métricas en lenguaje claro", cant: "Mensual" },
];

const reelExamples = [
  { url: "https://www.instagram.com/reel/DVzNHKXDvIc/?igsh=cm0wNmx5NnpzMDc5", label: "Haul de vestidos" },
  { url: "https://www.instagram.com/reel/DHblXgfTJsl/?igsh=MXBybnVoZWNjaXpjMw==", label: "Detrás de escena en tienda" },
  { url: "https://www.instagram.com/reel/Cpk0Gz5Ao5L/?igsh=MXRubWhpZHJqNDBodw==", label: "Transformación / prueba de vestidos" },
  { url: "https://www.instagram.com/reel/Da3W6gKzHPT/?igsh=enF3YmU2dWE3YWV4", label: "Look del evento" },
  { url: "https://www.instagram.com/reel/DZh6wLaOu9N/?igsh=Zmo1ZW43MW9qc3Ny", label: "Experiencia de renta" },
  { url: "https://www.instagram.com/reel/DRBIw8SDifg/?igsh=Y2UwaTF2cXJhdW9o", label: "Contenido de temporada" },
];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ReelCard({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 transition-colors duration-500 hover:bg-white/[0.04]"
      style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)", aspectRatio: "9 / 11" }}
    >
      <span
        className="absolute top-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
        style={{ background: ROSE }}
      />
      <div
        className="w-10 h-10 flex items-center justify-center"
        style={{ background: ROSE_SOFT, color: ROSE }}
      >
        <InstagramIcon />
      </div>
      <div>
        <p className="font-body text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: TEXT_MUTED }}>
          Ejemplo de contenido
        </p>
        <p className="font-body text-[15px] font-medium text-white mb-3">{label}</p>
        <span
          className="font-body text-[12px] inline-flex items-center gap-1.5 transition-colors duration-500"
          style={{ color: ROSE }}
        >
          Ver reel ↗
        </span>
      </div>
    </a>
  );
}

export default function PropuestaDresscodeClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const BG =
    "radial-gradient(ellipse at top, #241f21 0%, #191416 35%, #100d0e 65%, #0a0808 100%)";

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(20,17,18,0.78)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 h-16 max-w-[1300px] mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" style={{ color: ROSE }}>
              <rect x="2" y="18" width="5" height="8" fill="currentColor" />
              <rect x="9" y="12" width="5" height="14" fill="currentColor" />
              <rect x="16" y="6" width="5" height="20" fill="currentColor" />
              <rect x="23" y="2" width="3" height="24" fill="currentColor" opacity="0.4" />
            </svg>
            <span
              className="font-title text-white text-[13px] tracking-[0.1em] uppercase"
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
              Propuesta · Dresscode
            </span>
            <span
              className="font-body text-[10px] tracking-[0.14em] uppercase px-3 py-1.5"
              style={{ color: ROSE, background: ROSE_DIM, fontWeight: 600 }}
            >
              ✦ Gestión Digital
            </span>
          </div>
        </div>
      </nav>

      <main className="relative text-pg-white overflow-hidden" style={{ background: BG }}>
        {/* Rejilla sutil */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center top, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center top, black 20%, transparent 70%)",
          }}
        />

        {/* Orbes rosa flotantes */}
        <motion.div
          aria-hidden
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(217,166,174,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-[20vh] -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(217,166,174,0.10) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-16 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="relative max-w-[1300px] mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-[11px] tracking-[0.15em] uppercase mb-8 flex items-center gap-2"
              style={{ color: ROSE }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: ROSE, animation: "pulse 2s ease-in-out infinite" }}
              />
              Propuesta de Gestión Digital
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-title text-pg-light mb-6"
              style={{
                fontSize: "clamp(40px, 7vw, 96px)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              <em style={{ color: ROSE, fontStyle: "italic" }}>Dresscode.</em>
              <br />
              Renta de Vestidos · Puebla
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-[15px] leading-[1.7] max-w-[620px] mb-10"
              style={{ color: TEXT_DIM }}
            >
              La clienta ya quiere verse increíble. La pregunta es si Dresscode es lo
              primero que encuentra cuando busca cómo lograrlo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-x-10 gap-y-3"
            >
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(245,245,245,0.32)" }}>
                  Preparada para
                </p>
                <p className="font-title text-white" style={{ fontSize: 20, fontWeight: 400 }}>Gaby — Dresscode</p>
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(245,245,245,0.32)" }}>
                  Preparada por
                </p>
                <p className="font-title text-white" style={{ fontSize: 20, fontWeight: 400 }}>PG Estrategias</p>
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(245,245,245,0.32)" }}>
                  Puebla, México
                </p>
                <p className="font-title text-white" style={{ fontSize: 20, fontWeight: 400 }}>2026</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* EL NEGOCIO */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>El Negocio</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-8"
            style={{
              fontSize: "clamp(30px, 4.6vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Se decide en <em style={{ color: ROSE, fontStyle: "italic" }}>tres segundos.</em>
          </motion.h2>
          <div className="max-w-[720px] flex flex-col gap-5">
            <p className="font-body text-[15px] leading-[1.7]" style={{ color: TEXT_DIM }}>
              Gaby, la renta de vestidos es uno de los negocios más visuales que existen.
              La clienta no busca características técnicas ni compara precios en una hoja
              de Excel. Busca sentirse increíble. Y la decisión de a dónde ir a rentar ese
              vestido empieza, casi siempre, en Instagram, en TikTok o en Google — mucho
              antes de que pise cualquier tienda.
            </p>
            <p
              className="font-title italic pl-6 py-1"
              style={{
                borderLeft: `2px solid ${ROSE}`,
                color: "rgba(245,245,245,0.9)",
                fontSize: "clamp(17px, 1.8vw, 22px)",
                lineHeight: 1.5,
              }}
            >
              En menos de tres segundos, una chica decide si el perfil de una tienda de
              vestidos la inspira o no. Si la respuesta es sí — ya está casi adentro.
            </p>
            <p className="font-body text-[15px] leading-[1.7]" style={{ color: TEXT_DIM }}>
              El problema no es que Dresscode no tenga los vestidos. El problema es que si
              la presencia digital no refleja la misma calidad y estilo que hay adentro de
              la tienda, esa clienta nunca va a llegar a verlos. Y en Puebla, con más
              opciones de renta apareciendo todo el tiempo, el que se ve mejor en pantalla
              se lleva la reserva.
            </p>
          </div>
        </section>

        <Divider />

        {/* EL MERCADO */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>El Mercado</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{
              fontSize: "clamp(30px, 4.6vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Cómo decide una clienta
            <br />
            de moda <em style={{ color: ROSE, fontStyle: "italic" }}>hoy.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[560px] mb-14" style={{ color: TEXT_DIM }}>
            Antes de construir la estrategia, necesitas ver el comportamiento real de tu
            clienta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {decisionFactors.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group relative p-8 transition-colors duration-500 hover:bg-white/[0.04] ${i === decisionFactors.length - 1 ? "md:col-span-2" : ""}`}
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}
              >
                <span
                  className="absolute top-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
                  style={{ background: ROSE }}
                />
                <p className="text-2xl mb-4">{f.icon}</p>
                <h3
                  className="font-title text-white mb-3"
                  style={{ fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {f.title}
                </h3>
                <p className="font-body text-[13px] leading-[1.65]" style={{ color: TEXT_DIM }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="font-body text-[15px] leading-[1.7] max-w-[720px] mt-10" style={{ color: TEXT_DIM }}>
            Todo esto se traduce en una sola cosa: la marca que se ve más aspiracional,
            más accesible y más activa en redes — esa es la que llena su agenda de
            reservas.
          </p>
        </section>

        <Divider />

        {/* PAQUETE / PRECIO */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(217,166,174,0.14) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[1300px] mx-auto">
            <SectionLabel>Paquete Ignición — Dresscode</SectionLabel>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 md:gap-16 items-start mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="font-title text-pg-light"
                style={{
                  fontSize: "clamp(30px, 4.6vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                La referencia de moda
                <br />
                y renta de vestidos
                <br />
                <em style={{ color: ROSE, fontStyle: "italic" }}>en Puebla.</em>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="p-8"
                style={{
                  border: `1px solid rgba(217,166,174,0.28)`,
                  background: "linear-gradient(120deg, rgba(217,166,174,0.06) 0%, rgba(255,255,255,0.02) 60%)",
                }}
              >
                <p className="font-body text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(245,245,245,0.4)" }}>
                  Inversión mensual
                </p>
                <p className="font-title leading-none mb-3" style={{ color: ROSE, fontSize: "clamp(38px, 4vw, 52px)", fontWeight: 400 }}>
                  $11,000 <span style={{ fontSize: "0.4em", color: TEXT_MUTED }}>MXN / mes</span>
                </p>
                <p className="font-body text-[13px] leading-[1.6]" style={{ color: TEXT_DIM }}>
                  Incluye $2,500 MXN de inversión en pauta publicitaria — no es un costo
                  adicional.
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="font-title italic max-w-[820px] mb-4"
              style={{ color: "rgba(245,245,245,0.85)", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.5 }}
            >
              &ldquo;El Paquete Ignición convierte a Dresscode en la referencia de moda y
              renta de vestidos en Puebla — la marca que una chica encuentra cuando busca
              opciones y que le genera el antojo de vivir esa experiencia.&rdquo;
            </motion.p>
          </div>
        </section>

        <Divider />

        {/* LO QUE INCLUYE */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Lo Que Incluye</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-14"
            style={{
              fontSize: "clamp(30px, 4.6vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Desglose <em style={{ color: ROSE, fontStyle: "italic" }}>completo.</em>
          </motion.h2>

          <div className="flex flex-col gap-3">
            {incluye.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8"
                style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}
              >
                <h3
                  className="font-title text-white mb-3 flex items-start gap-3"
                  style={{ fontSize: "clamp(18px, 1.7vw, 23px)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  <span style={{ color: ROSE }}>{cat.icon}</span>
                  {cat.title}
                </h3>
                <p className="font-body text-[13px] leading-[1.65] mb-4 max-w-[720px]" style={{ color: TEXT_DIM }}>
                  {cat.desc}
                </p>
                <ul className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-[13px] leading-[1.6]"
                      style={{ color: TEXT_DIM }}
                    >
                      <span className="mt-[3px] shrink-0" style={{ color: ROSE }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* RESUMEN ENTREGABLES */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Resumen Mensual</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-14"
            style={{
              fontSize: "clamp(30px, 4.6vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Entregables <em style={{ color: ROSE, fontStyle: "italic" }}>mensuales.</em>
          </motion.h2>

          <div className="overflow-x-auto" style={{ border: `1px solid ${BORDER}` }}>
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  {["Entregable", "Descripción", "Cantidad"].map((h) => (
                    <th
                      key={h}
                      className="font-body text-[11px] uppercase tracking-[0.1em] text-left px-6 py-4"
                      style={{ color: "rgba(255,255,255,0.5)", borderBottom: `1px solid ${BORDER}` }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entregables.map((row, i) => (
                  <tr key={row.entregable} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td
                      className="font-body text-[13px] font-medium text-white px-6 py-4"
                      style={{ borderBottom: i < entregables.length - 1 ? `1px solid ${BORDER}` : "none" }}
                    >
                      {row.entregable}
                    </td>
                    <td
                      className="font-body text-[13px] px-6 py-4"
                      style={{ color: TEXT_DIM, borderBottom: i < entregables.length - 1 ? `1px solid ${BORDER}` : "none" }}
                    >
                      {row.desc}
                    </td>
                    <td
                      className="font-body text-[13px] px-6 py-4 whitespace-nowrap"
                      style={{ color: ROSE, borderBottom: i < entregables.length - 1 ? `1px solid ${BORDER}` : "none" }}
                    >
                      {row.cant}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* EJEMPLOS DE CONTENIDO */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>Ejemplos de Contenido</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-4"
            style={{
              fontSize: "clamp(30px, 4.6vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Así de contenido
            <br />
            podemos <em style={{ color: ROSE, fontStyle: "italic" }}>crear.</em>
          </motion.h2>
          <p className="font-body text-[15px] leading-[1.7] max-w-[620px] mb-14" style={{ color: TEXT_DIM }}>
            Una muestra del tipo de piezas — hauls, transformaciones, detrás de escena y
            contenido de temporada — que forman parte del contenido mensual del Paquete
            Ignición.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {reelExamples.map((reel, i) => (
              <motion.div
                key={reel.url}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <ReelCard url={reel.url} label={reel.label} />
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CIERRE */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 max-w-[1300px] mx-auto">
          <SectionLabel>El Momento</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-title text-pg-light mb-8"
            style={{
              fontSize: "clamp(30px, 4.6vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Que Puebla <em style={{ color: ROSE, fontStyle: "italic" }}>descubra Dresscode.</em>
          </motion.h2>
          <div className="max-w-[720px] flex flex-col gap-5">
            <p className="font-body text-[15px] leading-[1.7]" style={{ color: TEXT_DIM }}>
              Gaby, hay algo que pasa con los negocios de moda y estilo que los hace
              únicos: cuando una clienta tiene una buena experiencia, lo cuenta. Lo
              etiqueta. Lo recomienda. Y esa recomendación trae a tres clientas más.
            </p>
            <p className="font-body text-[15px] leading-[1.7]" style={{ color: TEXT_DIM }}>
              El problema es que ese ciclo solo funciona cuando hay una base sólida de
              visibilidad digital que lo alimenta. Si la primera clienta no te encuentra
              en redes, el ciclo no empieza. El Paquete Ignición construye esa base:
              contenido que inspira, publicidad que atrae, Google Business que genera
              confianza y una página que convierte. Todo trabajando al mismo tiempo, con
              un solo objetivo: llenar la agenda de Dresscode de reservas.
            </p>
          </div>
        </section>

        <Divider />

        {/* QUOTE */}
        <section className="relative px-6 md:px-16 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[820px] mx-auto text-center"
          >
            <p className="font-title leading-none mb-6" style={{ color: ROSE, opacity: 0.22, fontSize: 72, fontWeight: 400 }}>
              &ldquo;
            </p>
            <p
              className="font-title italic text-pg-light mb-6"
              style={{ fontSize: "clamp(20px, 2.4vw, 30px)", fontWeight: 400, lineHeight: 1.45, letterSpacing: "-0.01em" }}
            >
              La clienta ya quiere verse increíble. Solo necesita que Dresscode aparezca
              en el momento exacto en que lo está buscando.
            </p>
            <p className="font-body text-[12px] uppercase tracking-[0.14em]" style={{ color: "rgba(245,245,245,0.4)" }}>
              <span className="text-white font-semibold">PG Estrategias</span> &middot; Growth Partners
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(217,166,174,0.12) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[820px] mx-auto text-center">
            <p
              className="font-body text-[11px] tracking-[0.14em] uppercase mb-6 inline-flex items-center gap-3"
              style={{ color: ROSE }}
            >
              <span className="inline-block w-8 h-px" style={{ background: ROSE }} />
              PG Estrategias
              <span className="inline-block w-8 h-px" style={{ background: ROSE }} />
            </p>
            <h2
              className="font-title text-pg-light mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              Gaby, <em style={{ color: ROSE, fontStyle: "italic" }}>¿cuándo empezamos?</em>
            </h2>
            <p className="font-body text-[15px] leading-[1.7] max-w-[520px] mx-auto mb-12" style={{ color: TEXT_DIM }}>
              Podemos arrancar esta semana con la configuración técnica y el primer
              calendario de contenido diseñado para la temporada más próxima.
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
                  style={{ color: "rgba(245,245,245,0.7)" }}
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center text-base"
                    style={{ background: ROSE_SOFT, color: ROSE }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            <p className="font-body text-[11px] mt-16" style={{ color: "rgba(245,245,245,0.25)" }}>
              © 2026 — Propuesta confidencial preparada por PG Estrategias para Dresscode.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
