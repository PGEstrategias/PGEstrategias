"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

/* ============================================================
   ASSETS — reemplaza estas rutas por las fotos de la Chef.
   Mientras no existan, se muestra un degradado cálido de fondo
   (la página nunca se ve "rota").
   Sube las imágenes a /public/chefisabel/
   ============================================================ */
const IMAGES = {
  hero: "https://res.cloudinary.com/djduba5fd/image/upload/q_auto/f_auto/v1781502134/WhatsApp_Image_2026-06-14_at_11.15.03_PM_1_r49ewm.jpg",
  legado: "https://res.cloudinary.com/djduba5fd/image/upload/q_auto/f_auto/v1781502136/WhatsApp_Image_2026-06-14_at_11.15.03_PM_iyxnhp.jpg",
  cierre: "https://res.cloudinary.com/djduba5fd/image/upload/q_auto/f_auto/v1781502226/c2979cc8-1657-4ea6-8c0f-cd9ea1378b51_blhqcb.jpg",
};

/* ---------- Animación reutilizable (patrón fadeUp) ---------- */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ============================================================
   SVG — Flor de cempasúchil (acento gráfico Santa Catrina)
   ============================================================ */
function Cempasuchil({ className = "", color = "#FFC400" }: { className?: string; color?: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="9"
          ry="20"
          fill={color}
          opacity={0.92}
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      {petals.map((_, i) => (
        <ellipse
          key={`in-${i}`}
          cx="50"
          cy="32"
          rx="6"
          ry="13"
          fill="#C75B39"
          opacity={0.9}
          transform={`rotate(${i * 30 + 15} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="#E4007C" />
    </svg>
  );
}

/* SVG — Molcajete (micro-ilustración de carga, evoca tradición) */
function Molcajete({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <ellipse cx="60" cy="92" rx="40" ry="9" fill="#000" opacity="0.25" />
      <path d="M22 58 Q22 96 60 96 Q98 96 98 58 Z" fill="#3a3a3a" />
      <path d="M22 58 Q22 96 60 96 Q98 96 98 58 Z" fill="url(#stoneG)" opacity="0.5" />
      <ellipse cx="60" cy="58" rx="38" ry="13" fill="#2b2b2b" />
      <ellipse cx="60" cy="56" rx="30" ry="9" fill="#1d1d1d" />
      {/* tres patas */}
      <rect x="30" y="90" width="9" height="14" rx="3" fill="#3a3a3a" />
      <rect x="56" y="94" width="9" height="14" rx="3" fill="#3a3a3a" />
      <rect x="81" y="90" width="9" height="14" rx="3" fill="#3a3a3a" />
      {/* salsa/chiles */}
      <circle cx="52" cy="55" r="4" fill="#E4007C" />
      <circle cx="66" cy="57" r="3.4" fill="#C75B39" />
      <circle cx="60" cy="52" r="3" fill="#FFC400" />
      <defs>
        <linearGradient id="stoneG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#777" />
          <stop offset="1" stopColor="#222" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ============================================================
   Reveal palabra por palabra dirigido por scroll
   (patrón "mission section" del prompt base)
   ============================================================ */
function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{ opacity, color: highlight ? "var(--rosa)" : undefined }}
      className="inline-block mr-[0.25em]"
    >
      {children}
    </motion.span>
  );
}

function ScrollReveal({
  text,
  highlight = [],
  className = "",
}: {
  text: string;
  highlight?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = w.replace(/[.,—"¡!¿?]/g, "");
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            highlight={highlight.includes(clean)}
          >
            {w}
          </Word>
        );
      })}
    </p>
  );
}

/* ============================================================
   DATOS
   ============================================================ */
const timeline = [
  {
    year: "El Comienzo",
    title: "De Puebla al mundo",
    desc: "La salida de Puebla y los primeros retos en Inglaterra y Polonia. Empezar de cero, lejos de casa.",
    icon: "✈️",
  },
  {
    year: "La Formación",
    title: "Estudios Culinarios",
    desc: "Años de especialización en pastelería y la creación de sus propios Estudios Culinarios.",
    icon: "🎓",
  },
  {
    year: "El Sueño · 2022",
    title: "Nace Santa Catrina",
    desc: "La apertura de Santa Catrina, un proyecto nacido de la resiliencia y el amor por México.",
    icon: "🌶️",
  },
  {
    year: "El Reconocimiento",
    title: "Mexicana Distinguida",
    desc: "Orgullosamente galardonada como Mexicana Distinguida por el IME.",
    icon: "🏅",
  },
];

const mensajes = [
  {
    text: "Tu cochinita pibil es el abrazo que muchos extrañábamos.",
    autor: "Comunidad mexicana en Polonia",
  },
  {
    text: "Gracias por poner el nombre de México en lo más alto.",
    autor: "Un paisano agradecido",
  },
  {
    text: "Cada platillo tuyo sabe a casa, a Puebla, a domingo en familia.",
    autor: "Cliente de Santa Catrina",
  },
  {
    text: "Convertiste la nostalgia en sabor. Gracias, Chef.",
    autor: "Amigos de la cocina",
  },
];

/* ============================================================
   COMPONENTE
   ============================================================ */
export default function ChefIsabelClient() {
  return (
    <div
      className="catrina relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--hueso)", color: "var(--tinta)" }}
    >
      {/* ===================== NAV (flotante, no institucional) ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-4">
        <div className="flex items-center gap-2.5">
          <Cempasuchil className="w-7 h-7 catrina-spin-slow" />
          <span className="font-serif-display text-lg md:text-xl font-semibold tracking-tight" style={{ color: "var(--tinta)" }}>
            Santa&nbsp;Catrina
          </span>
        </div>
        <div className="catrina-glass hidden md:flex items-center gap-1 rounded-full px-2 py-1.5">
          {[
            { label: "Inicio", href: "#hero" },
            { label: "Legado", href: "#legado" },
            { label: "Trayectoria", href: "#trayectoria" },
            { label: "Mensajes", href: "#mensajes" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm px-3.5 py-1.5 rounded-full transition-colors hover:bg-black/5"
              style={{ color: "var(--tinta)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#cierre"
          className="text-sm font-medium rounded-full px-5 py-2.5"
          style={{ background: "var(--rosa)", color: "#fff" }}
        >
          15 · Junio
        </a>
      </nav>

      {/* ===================== HERO ===================== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo: foto de la Chef con fallback degradado cálido */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#1a0f12",
            backgroundImage: `linear-gradient(180deg, rgba(18,11,14,0.35) 0%, rgba(18,11,14,0.55) 55%, rgba(18,11,14,0.92) 100%), radial-gradient(120% 90% at 70% 20%, rgba(228,0,124,0.35), transparent 60%), url('${IMAGES.hero}')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />

        {/* Flores flotantes decorativas */}
        <Cempasuchil className="absolute top-[18%] left-[8%] w-16 md:w-24 opacity-80 catrina-float" />
        <Cempasuchil
          className="absolute bottom-[16%] right-[10%] w-12 md:w-20 opacity-70 catrina-float"
          color="#FF3D9A"
        />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
          <motion.div {...fadeUp(0.05)} className="mb-6 flex items-center justify-center gap-2">
            <span className="font-hand text-2xl md:text-3xl" style={{ color: "var(--amarillo)" }}>
              Puebla → Polonia
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-serif-display text-white text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-tight"
          >
            ¡Feliz Cumpleaños,
            <br />
            <span className="italic" style={{ color: "var(--rosa-soft)" }}>
              Chef Isabel Balderas
            </span>
            !
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 text-lg md:text-2xl text-white/85 max-w-2xl mx-auto font-light"
          >
            Celebrando a la mujer que lleva el corazón de México a Polonia.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#legado"
              className="rounded-full px-7 py-3.5 text-sm md:text-base font-medium"
              style={{ background: "var(--amarillo)", color: "var(--tinta)" }}
            >
              Conoce su historia
            </a>
            <a
              href="#mensajes"
              className="catrina-glass rounded-full px-7 py-3.5 text-sm md:text-base font-medium text-white"
            >
              Déjale un mensaje
            </a>
          </motion.div>
        </div>

        {/* Fade inferior hacia la sección crema */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-[5]"
          style={{ background: "linear-gradient(to top, var(--hueso), transparent)" }}
        />
      </section>

      {/* ===================== LEGADO (narrativa con reveal) ===================== */}
      <section id="legado" className="relative px-6 py-28 md:py-40">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...fadeUp(0)}
            className="block text-center text-xs tracking-[0.3em] uppercase font-semibold mb-8"
            style={{ color: "var(--terracota)" }}
          >
            Un legado de sabor
          </motion.span>

          <ScrollReveal
            className="font-serif-display text-center text-2xl md:text-4xl lg:text-[42px] leading-[1.35] font-medium"
            text="Más que una chef, eres el puente que une a Puebla con Polonia. Tu tenacidad y pasión por nuestra gastronomía han transformado corazones y paladares."
            highlight={["puente", "Puebla", "Polonia.", "Polonia", "corazones", "paladares."]}
          />

          <motion.p
            {...fadeUp(0.1)}
            className="mt-12 text-center text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#5a4a4f" }}
          >
            Gracias por enseñarnos que, incluso a miles de kilómetros, las raíces
            nunca se pierden cuando se cocinan con amor.
          </motion.p>

          {/* Foto + tarjeta cálida */}
          <motion.div
            {...fadeUp(0.15)}
            className="mt-16 grid md:grid-cols-5 gap-6 items-stretch"
          >
            <div
              className="md:col-span-3 rounded-3xl min-h-[280px] md:min-h-[420px] relative overflow-hidden"
              style={{
                backgroundColor: "#2a1a1e",
                backgroundImage: `linear-gradient(120deg, rgba(228,0,124,0.15), transparent), url('${IMAGES.legado}')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <Cempasuchil className="absolute bottom-4 right-4 w-14 opacity-90" />
            </div>
            <div
              className="md:col-span-2 rounded-3xl p-8 md:p-10 flex flex-col justify-center"
              style={{ background: "var(--tinta)", color: "var(--hueso)" }}
            >
              <Molcajete className="w-20 mb-6 catrina-float" />
              <p className="font-serif-display italic text-2xl md:text-3xl leading-snug">
                &ldquo;Las raíces nunca se pierden cuando se cocinan con amor.&rdquo;
              </p>
              <span className="mt-5 font-hand text-2xl" style={{ color: "var(--amarillo)" }}>
                — Para ti, Chef Isabel
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== TRAYECTORIA (timeline) ===================== */}
      <section
        id="trayectoria"
        className="relative px-6 py-28 md:py-36"
        style={{ background: "var(--tinta)", color: "var(--hueso)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-4">
            <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: "var(--amarillo)" }}>
              Su camino
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.08)}
            className="font-serif-display text-center text-4xl md:text-6xl lg:text-7xl font-semibold mb-4"
          >
            17 años de <span className="italic" style={{ color: "var(--rosa-soft)" }}>trayectoria</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.16)}
            className="text-center text-white/60 max-w-xl mx-auto mb-20"
          >
            De una maleta y un sueño, a un restaurante que sabe a México en el corazón de Polonia.
          </motion.p>

          {/* Línea + nodos */}
          <div className="relative">
            <div
              className="hidden md:block absolute top-[34px] left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, var(--terracota), var(--rosa), var(--amarillo))" }}
            />
            <div className="grid md:grid-cols-4 gap-12 md:gap-6">
              {timeline.map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.12)} className="relative">
                  <div className="flex md:block items-center gap-4">
                    <div
                      className="w-[68px] h-[68px] shrink-0 rounded-full flex items-center justify-center text-2xl mb-0 md:mb-6 catrina-glass"
                      style={{ border: "2px solid var(--rosa)" }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "var(--amarillo)" }}>
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl md:text-[26px] mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MENSAJES DE LA COMUNIDAD ===================== */}
      <section id="mensajes" className="relative px-6 py-28 md:py-40 overflow-hidden">
        <Cempasuchil className="absolute -top-6 -left-6 w-32 opacity-20 catrina-spin-slow" color="#E4007C" />
        <Cempasuchil className="absolute bottom-10 -right-8 w-40 opacity-20 catrina-spin-slow" color="#FFC400" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-3">
            <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: "var(--terracota)" }}>
              Mensajes de la comunidad
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.08)}
            className="font-serif-display text-center text-4xl md:text-6xl font-semibold mb-16"
          >
            Un brindis a la <span className="italic" style={{ color: "var(--rosa)" }}>distancia</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {mensajes.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="rounded-2xl p-7 md:p-8 relative"
                style={{
                  background: "#fff",
                  boxShadow: "0 10px 40px -18px rgba(199,91,57,0.45)",
                  border: "1px solid rgba(199,91,57,0.12)",
                }}
              >
                <span
                  className="font-serif-display text-5xl leading-none block mb-2"
                  style={{ color: "var(--rosa)" }}
                >
                  &ldquo;
                </span>
                <p className="font-serif-display text-xl md:text-2xl leading-snug mb-5" style={{ color: "var(--tinta)" }}>
                  {m.text}
                </p>
                <span className="font-hand text-xl" style={{ color: "var(--terracota)" }}>
                  {m.autor}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CIERRE / CTA (no institucional) ===================== */}
      <section
        id="cierre"
        className="relative px-6 py-28 md:py-40 overflow-hidden"
        style={{ background: "var(--tinta)", color: "var(--hueso)" }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(60% 60% at 30% 20%, rgba(228,0,124,0.4), transparent), radial-gradient(50% 50% at 80% 80%, rgba(255,196,0,0.25), transparent), url('${IMAGES.cierre}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
            <Cempasuchil className="w-20 catrina-float" />
          </motion.div>

          <motion.h2
            {...fadeUp(0.1)}
            className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]"
          >
            Puebla y el mundo
            <br />
            <span className="italic" style={{ color: "var(--rosa-soft)" }}>te celebran</span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.22)}
            className="mt-8 text-lg md:text-2xl text-white/80 font-light max-w-xl mx-auto"
          >
            Que este nuevo año de vida te traiga tanta alegría como la que tú
            compartes en cada platillo.
          </motion.p>

          <motion.p {...fadeUp(0.34)} className="mt-16 font-hand text-3xl md:text-4xl" style={{ color: "var(--amarillo)" }}>
            Con cariño, de México para ti 🌺
          </motion.p>
        </div>
      </section>
    </div>
  );
}
