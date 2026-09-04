"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";

/* ────────────────────────────────────────────────────────────
   Propuesta — Atónito × PG Estrategias.

   El eje es el origen norteño: es el argumento que sostiene todas las
   ideas de contenido, no un dato de producto suelto. Las trece ideas del
   brief se agrupan en cuatro frentes para que se lean de un vistazo, y
   las dos piezas de mayor escala —bot y rancho— salen del paquete de
   producción porque tienen timeline y honorarios propios.
   ──────────────────────────────────────────────────────────── */

const CLIENTE = "Atónito";
const PRECIO = "11,000";

/* Marca de Atónito. En cuanto el logotipo esté en Cloudinary se pega la URL
   aquí y sustituye al texto sin tocar nada más de la página. */
const LOGO_ATONITO = "";

/* ── Muestras de producción ─────────────────────────────────── */

/* El label ya no se pinta sobre la pieza; queda como texto accesible. */
const MUESTRAS = [
  { src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379006/Webinar2_unozlf.mp4", label: "Institucional" },
  { src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779377735/Reel_t5pucv.mp4", label: "Reel de marca" },
  { src: "https://res.cloudinary.com/djduba5fd/video/upload/v1788051909/DemoMercedes_csof2x.mp4", label: "Producto" },
  { src: "https://res.cloudinary.com/djduba5fd/video/upload/v1787082349/LandRover_LegacyDrop2_lwq2q2.mp4", label: "Lanzamiento" },
  { src: "https://res.cloudinary.com/djduba5fd/video/upload/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4", label: "Retail" },
];

function cld(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

/* ── Contenido ──────────────────────────────────────────────── */

const SEGMENTOS = [
  {
    tag: "B2B",
    name: "Quien compra para vender",
    bullets: ["Restaurantes", "Salones de fiestas", "Cadenas de carnes"],
  },
  {
    tag: "B2C",
    name: "Quien compra para su mesa",
    bullets: [
      "La mamá que cocina para sus hijos",
      "El papá de la carne asada",
      "Todas las clases sociales",
    ],
  },
];

const PRODUCTO = [
  "Cortes de res",
  "Carne molida",
  "Filetes",
  "Pimientos y especias",
  "Carbón (nuevo)",
];

const ACCESORIOS = ["Mandiles", "Tablas de corte"];

/* Las trece ideas del brief, agrupadas por frente. */
const FRENTES = [
  {
    num: "01",
    titulo: "En piso",
    linea: "Que la tienda sea el set",
    items: [
      "Asador en tienda y degustación en vivo",
      "Grabación de cómo se cocina la carne",
      "Cobertura de los eventos ya agendados",
      "Ofertas de septiembre exprimidas en contenido",
    ],
  },
  {
    num: "02",
    titulo: "Comunidad",
    linea: "Muchas voces, no un vocero",
    items: [
      "Serie de tips de cocina y dinámicas",
      "Del norteño experto a la mamá que cocina",
      "Blog de recetas, promovido en redes",
      "Colaboraciones con referentes del nicho",
    ],
  },
  {
    num: "03",
    titulo: "Venta directa",
    linea: "Del contenido al carrito",
    items: [
      "Página con ofertas y cupones exclusivos",
      "Registro con descuento como gancho",
      "Mensajería de promociones a la base",
      "Delivery: reparto propio o apps",
    ],
  },
  {
    num: "04",
    titulo: "B2B",
    linea: "Argumento para cadenas",
    items: [
      "Institucional con testimoniales de clientes",
      "Cómo trabajan con la boutique",
      "Recorrido del rancho a la tienda",
      "Patrocinios y presencia en eventos",
    ],
  },
];

/* Las dos piezas que no caben en el paquete mensual de producción: una
   por timeline, la otra por escala. */
const ESPECIALES = [
  {
    etiqueta: "Incluido · timeline propio",
    titulo: "Bot + base de datos",
    texto:
      "Registro con descuento como gancho, base de datos y mensajería masiva de promociones. Mínimo 2 meses de desarrollo, incluido en los honorarios.",
    destacado: true,
  },
  {
    etiqueta: "Línea aparte",
    titulo: "Video del rancho ganadero",
    texto:
      "El recorrido completo del rancho a la tienda. Sirve como argumento de venta ante cadenas y como pieza de embudo. Por su escala se cotiza fuera de la iguala.",
    destacado: false,
  },
];

/* El brief trae decisiones abiertas: se listan en vez de darlas por
   resueltas, porque varias cambian el alcance. */
const POR_DEFINIR = [
  "Dinámicas en piso: frecuencia, quién cocina y si es abierto o con cita",
  "Las voces de la serie: personal, clientes reales o creadores invitados",
  "Alcance web: catálogo simple o e-commerce con carrito y pago",
  "Delivery: flotilla propia (modelo Wild Fork) o apps de terceros",
  "Qué clientes B2B participan como testimoniales",
  "Rancho: ubicación, logística y presupuesto de producción",
  "Referentes objetivo y presupuesto de patrocinio",
  "Ofertas de septiembre y eventos ya agendados",
];

const ENTREGABLES = [
  "4 reels mensuales (1 para anuncios, 3 para redes)",
  "1 video de 1 minuto para la página de ventas",
  "3 diseños gráficos con texto persuasivo",
  "3 carruseles para redes sociales",
  "Página de ventas diseñada e incluida",
  "Configuración técnica completa (rastreo, píxeles)",
  "Perfil de Google optimizado + estrategia de reseñas",
  "Desarrollo de bot y base de datos",
  "Gestión de eventos y dinámicas en piso",
  "Producción de las ideas de esta propuesta",
  "1 videollamada estratégica mensual",
  "Reporte mensual en lenguaje claro",
];

/* ── UI ─────────────────────────────────────────────────────── */

function MarcaAtonito({ size = 30, claro = false }: { size?: number; claro?: boolean }) {
  const color = claro ? "#FFFFFF" : "#0B7659";

  if (LOGO_ATONITO) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={LOGO_ATONITO}
        alt="Atónito"
        style={{ height: size, width: "auto" }}
      />
    );
  }

  return (
    <span
      className="font-title uppercase leading-none"
      style={{
        fontSize: Math.round(size * 0.62),
        fontWeight: 800,
        letterSpacing: "0.16em",
        color,
      }}
    >
      Atónito
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px block" style={{ background: "#0B7659" }} />
      <p
        className="font-body text-[11px] tracking-[0.22em] uppercase"
        style={{ color: "#0B7659", fontWeight: 500 }}
      >
        {children}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-title mb-7"
      style={{
        fontSize: "clamp(30px, 3.8vw, 52px)",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "#16241F",
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
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

function VideoSlot({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{
        aspectRatio: "9/16",
        background: "#0e0e0d",
        border: "1px solid rgba(22,36,31,0.14)",
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={`Muestra de producción de PG Estrategias — ${label}`}
      >
        <source src={cld(src, "f_auto,q_auto,w_640")} type="video/mp4" />
      </video>
    </div>
  );
}

function Chips({ items, fuerte = false }: { items: string[]; fuerte?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <span
          key={x}
          className="font-body text-[13px] px-4 py-2"
          style={
            fuerte
              ? {
                  color: "#16241F",
                  border: "1px solid rgba(11,118,89,0.4)",
                  background: "rgba(11,118,89,0.07)",
                }
              : {
                  color: "rgba(22,36,31,0.76)",
                  border: "1px solid rgba(22,36,31,0.16)",
                  background: "rgba(11,118,89,0.04)",
                }
          }
        >
          {x}
        </span>
      ))}
    </div>
  );
}

function ListaChecks({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((x) => (
        <div key={x} className="flex items-start gap-3">
          <span
            aria-hidden
            className="shrink-0 mt-[7px] block"
            style={{ width: 5, height: 5, background: "#0B7659" }}
          />
          <span
            className="font-body text-[13px] md:text-[14px] leading-[1.6]"
            style={{ color: "rgba(22,36,31,0.74)" }}
          >
            {x}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PropuestaAtonitoClient() {
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
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(22,36,31,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-14 h-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <MarcaAtonito size={26} />
            <span
              aria-hidden
              className="h-4 w-px block"
              style={{ background: "rgba(22,36,31,0.2)" }}
            />
            <Logo size={20} tone="dark" />
          </div>
          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-body text-[11px] tracking-[0.16em] uppercase"
              style={{ color: "rgba(22,36,31,0.6)" }}
            >
              Propuesta · {CLIENTE}
            </span>
            <span
              className="font-body text-[10px] tracking-[0.16em] uppercase px-3 py-1.5"
              style={{
                color: "#0B7659",
                background: "rgba(11,118,89,0.1)",
                border: "1px solid rgba(11,118,89,0.25)",
                fontWeight: 600,
              }}
            >
              Confidencial
            </span>
          </div>
        </div>
      </nav>

      <main style={{ background: "#FFFFFF", color: "#16241F" }}>
        {/* ============================================================
            1 · HERO
           ============================================================ */}
        <section
          className="relative w-full min-h-[78vh] flex items-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #F1F8F5 0%, #FFFFFF 55%, #FFFFFF 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "8%",
              right: "-10%",
              width: "70vw",
              height: "70vw",
              maxWidth: 780,
              maxHeight: 780,
              background:
                "radial-gradient(circle, rgba(11,118,89,0.16) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-14 pt-28 pb-14 md:pb-16 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-px block" style={{ background: "#0B7659" }} />
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "#16241F", fontWeight: 500 }}
              >
                {CLIENTE} × PG Estrategias
              </p>
            </motion.div>
            <div className="overflow-hidden max-w-[1100px]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-title"
                style={{
                  fontSize: "clamp(42px, 7vw, 108px)",
                  fontWeight: 700,
                  lineHeight: 0.96,
                  letterSpacing: "-0.035em",
                  color: "#16241F",
                }}
              >
                Todo viene del norte.{" "}
                <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                  Ese es el contenido.
                </em>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-[15px] md:text-[18px] leading-[1.7] mt-8 max-w-[580px]"
              style={{ color: "rgba(22,36,31,0.78)" }}
            >
              El sabor auténtico del norte no es un dato de producto: es el
              argumento que sostiene cada pieza, cada dinámica en piso y cada
              conversación con un cliente nuevo.
            </motion.p>
          </div>
        </section>

        {/* ============================================================
            2 · A QUIÉN LE HABLAMOS
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[760px]">
            <Eyebrow>A quién le hablamos</Eyebrow>
            <SectionTitle>
              Dos públicos,{" "}
              <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                un mismo sabor.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-14 md:mb-20">
            {SEGMENTOS.map((seg, i) => (
              <motion.div
                key={seg.tag}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="font-body text-[11px] tracking-[0.2em]"
                    style={{ color: "#0B7659", fontWeight: 600 }}
                  >
                    {seg.tag}
                  </span>
                  <h3
                    className="font-title text-[20px] md:text-[24px]"
                    style={{ fontWeight: 700, color: "#16241F", letterSpacing: "-0.02em" }}
                  >
                    {seg.name}
                  </h3>
                </div>
                <Chips items={seg.bullets} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div {...reveal}>
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase mb-5"
                style={{ color: "rgba(22,36,31,0.6)" }}
              >
                Producto
              </p>
              <Chips items={PRODUCTO} fuerte />
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              <p
                className="font-body text-[11px] tracking-[0.22em] uppercase mb-5"
                style={{ color: "rgba(22,36,31,0.6)" }}
              >
                Accesorios de marca
              </p>
              <Chips items={ACCESORIOS} />
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            3 · LOS CUATRO FRENTES
           ============================================================ */}
        <section className="relative py-20 md:py-28" style={{ background: "#F1F8F5" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-12 md:mb-16 max-w-[760px]">
              <Eyebrow>El plan de contenido</Eyebrow>
              <SectionTitle>
                Cuatro frentes,{" "}
                <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                  el mismo origen.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {FRENTES.map((f, i) => (
                <motion.div
                  key={f.num}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: (i % 4) * 0.08 }}
                  className="pt-6"
                  style={{ borderTop: "1px solid rgba(22,36,31,0.14)" }}
                >
                  <span
                    className="font-body text-[11px] tracking-[0.2em] block mb-3"
                    style={{ color: "#0B7659", fontWeight: 600 }}
                  >
                    {f.num}
                  </span>
                  <h3
                    className="font-title text-[20px] md:text-[23px] mb-1"
                    style={{ fontWeight: 700, color: "#16241F", letterSpacing: "-0.02em" }}
                  >
                    {f.titulo}
                  </h3>
                  <p
                    className="font-title text-[15px] md:text-[16px] mb-5"
                    style={{ color: "#0B7659", fontStyle: "italic", fontWeight: 700 }}
                  >
                    {f.linea}
                  </p>
                  <ListaChecks items={f.items} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            4 · LAS DOS PIEZAS DE MAYOR ESCALA
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-12 md:mb-14 max-w-[760px]">
            <Eyebrow>Fuera del ritmo mensual</Eyebrow>
            <SectionTitle>
              Dos piezas con{" "}
              <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                tiempos propios.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {ESPECIALES.map((e, i) => (
              <motion.div
                key={e.titulo}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
                className="p-7 md:p-9"
                style={{
                  background: e.destacado
                    ? "rgba(11,118,89,0.05)"
                    : "rgba(22,36,31,0.03)",
                  border: e.destacado
                    ? "1px solid rgba(11,118,89,0.35)"
                    : "1px solid rgba(22,36,31,0.14)",
                }}
              >
                <span
                  className="font-body text-[10px] tracking-[0.18em] uppercase inline-block mb-5 px-3 py-1.5"
                  style={{
                    color: e.destacado ? "#FFFFFF" : "rgba(22,36,31,0.74)",
                    background: e.destacado ? "#0B7659" : "rgba(11,118,89,0.09)",
                    fontWeight: 600,
                  }}
                >
                  {e.etiqueta}
                </span>
                <h3
                  className="font-title text-[22px] md:text-[27px] mb-4"
                  style={{ fontWeight: 700, color: "#16241F", letterSpacing: "-0.02em" }}
                >
                  {e.titulo}
                </h3>
                <p
                  className="font-body text-[14px] md:text-[15px] leading-[1.7]"
                  style={{ color: "rgba(22,36,31,0.76)" }}
                >
                  {e.texto}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            5 · POR DEFINIR
           ============================================================ */}
        <section className="relative py-20 md:py-24" style={{ background: "#F1F8F5" }}>
          <div className="px-6 md:px-14 max-w-[1400px] mx-auto">
            <motion.div {...reveal} className="mb-10 max-w-[760px]">
              <Eyebrow>Lo que definimos juntos</Eyebrow>
              <SectionTitle>
                Ocho decisiones{" "}
                <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                  antes de arrancar.
                </em>
              </SectionTitle>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {POR_DEFINIR.map((x) => (
                <motion.div
                  key={x}
                  {...reveal}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{
                    border: "1px dashed rgba(22,36,31,0.22)",
                    background: "rgba(11,118,89,0.035)",
                  }}
                >
                  <span
                    aria-hidden
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: "1px solid rgba(11,118,89,0.5)",
                      color: "#0B7659",
                      fontSize: 13,
                    }}
                  >
                    ?
                  </span>
                  <span
                    className="font-body text-[13px] leading-[1.5]"
                    style={{ color: "rgba(22,36,31,0.76)" }}
                  >
                    {x}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            6 · CONTENIDO DE EJEMPLO
           ============================================================ */}
        <section className="relative px-6 md:px-14 py-20 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...reveal} className="mb-10 md:mb-14 max-w-[820px]">
            <Eyebrow>Contenido de ejemplo</Eyebrow>
            <SectionTitle>
              Así se ve{" "}
              <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                lo que producimos.
              </em>
            </SectionTitle>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {MUESTRAS.map((m, i) => (
              <motion.div
                key={m.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 5) * 0.08 }}
              >
                <VideoSlot src={m.src} label={m.label} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
            7 · ENTREGABLES E INVERSIÓN
           ============================================================ */}
        <section
          className="relative px-6 md:px-14 py-20 md:py-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF 0%, #F7FBF9 55%, #FFFFFF 100%)",
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
              maxWidth: 700,
              maxHeight: 700,
              background:
                "radial-gradient(circle, rgba(11,118,89,0.10) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div className="relative max-w-[1200px] mx-auto">
            <motion.div
              {...reveal}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
            >
              <div className="lg:col-span-5">
                <Eyebrow>Inversión</Eyebrow>
                <SectionTitle>
                  Paquete Ignición,{" "}
                  <em style={{ color: "#0B7659", fontStyle: "italic" }}>
                    ajustado a Atónito.
                  </em>
                </SectionTitle>
                <div className="flex items-baseline gap-3 mt-8">
                  <span
                    className="font-title"
                    style={{ fontSize: 22, color: "rgba(22,36,31,0.6)", fontWeight: 400 }}
                  >
                    $
                  </span>
                  <span
                    className="font-title"
                    style={{
                      fontSize: "clamp(56px, 8vw, 96px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: "#0B7659",
                    }}
                  >
                    {PRECIO}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="font-body text-[13px] tracking-[0.14em] uppercase"
                      style={{ color: "rgba(22,36,31,0.74)" }}
                    >
                      MXN
                    </span>
                    <span
                      className="font-body text-[12px]"
                      style={{ color: "rgba(22,36,31,0.6)" }}
                    >
                      / mes
                    </span>
                  </div>
                </div>
                <div
                  className="mt-8 inline-flex items-baseline gap-3 px-5 py-4"
                  style={{
                    background: "rgba(11,118,89,0.07)",
                    border: "1px solid rgba(11,118,89,0.3)",
                  }}
                >
                  <span
                    className="font-title text-[22px]"
                    style={{ fontWeight: 700, color: "#16241F" }}
                  >
                    $2,000
                  </span>
                  <span
                    className="font-body text-[13px]"
                    style={{ color: "rgba(22,36,31,0.74)" }}
                  >
                    de pauta publicitaria incluidos
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div
                  className="p-7 md:p-10"
                  style={{
                    background: "rgba(22,36,31,0.03)",
                    border: "1px solid rgba(22,36,31,0.14)",
                  }}
                >
                  <p
                    className="font-body text-[11px] tracking-[0.22em] uppercase mb-6"
                    style={{ color: "rgba(22,36,31,0.6)" }}
                  >
                    Entregables mensuales
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {ENTREGABLES.map((x) => (
                      <div key={x} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="shrink-0 mt-[7px] block"
                          style={{ width: 5, height: 5, background: "#0B7659" }}
                        />
                        <span
                          className="font-body text-[13px] md:text-[14px] leading-[1.6]"
                          style={{ color: "rgba(22,36,31,0.76)" }}
                        >
                          {x}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              className="mt-8 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-7"
              style={{
                background: "rgba(11,118,89,0.04)",
                borderLeft: "2px solid #0B7659",
              }}
            >
              <span
                className="font-body text-[11px] tracking-[0.2em] uppercase shrink-0"
                style={{ color: "#0B7659", fontWeight: 600 }}
              >
                Nota
              </span>
              <p
                className="font-body text-[14px] leading-[1.7]"
                style={{ color: "rgba(22,36,31,0.74)" }}
              >
                La iguala es mensual y renovable. El desarrollo del bot y la base
                de datos corre con su propio calendario —mínimo 2 meses— dentro
                de estos mismos honorarios. El video del rancho ganadero se
                cotiza aparte por su escala de producción.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            8 · CIERRE
           ============================================================ */}
        <section
          className="relative overflow-hidden flex items-center justify-center px-6 md:px-14 py-28 md:py-40"
          style={{ background: "#0B7659" }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              height: "80vw",
              maxWidth: 800,
              maxHeight: 800,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div className="relative z-10 max-w-[900px] mx-auto text-center">
            <motion.p
              {...reveal}
              className="font-body text-[12px] tracking-[0.3em] uppercase mb-10"
              style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}
            >
              {CLIENTE} × PG Estrategias
            </motion.p>
            <motion.h2
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="font-title mb-8"
              style={{
                fontSize: "clamp(32px, 4.6vw, 66px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              Que el sabor del norte se note en pantalla.
            </motion.h2>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="font-title"
              style={{
                fontSize: "clamp(22px, 3vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.82)",
                fontStyle: "italic",
              }}
            >
              Empecemos por prender el asador.
            </motion.p>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.32 }}
              className="mt-12 flex items-center justify-center gap-5"
            >
              <MarcaAtonito size={30} claro />
              <span
                aria-hidden
                className="h-5 w-px block"
                style={{ background: "rgba(255,255,255,0.35)" }}
              />
              <Logo size={24} tone="cream" />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
