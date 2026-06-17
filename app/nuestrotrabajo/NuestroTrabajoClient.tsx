"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContactMenu } from "@/context/ContactMenuContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Reel = { src: string | null; label?: string };

type Category = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  description: string;
  reels: Reel[];
};

const CATEGORIES: Category[] = [
  {
    id: "dopaminicos",
    number: "01",
    kicker: "Atención · Enganche · Acción",
    title: "Reels Dopamínicos",
    description:
      "Diseñados con un solo objetivo: secuestrar la atención en los primeros 0.8 segundos, mantener al usuario pegado hasta el final y empujarlo a tomar acción. Ritmo quirúrgico, hooks probados y una estructura pensada para convertir scroll en clientes.",
    reels: [
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779379727/ad_5_vecrital_2_b2fksl.mp4" },
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779380437/REEL_1_-_POD_248_1_upajtt.mp4" },
    ],
  },
  {
    id: "spots",
    number: "02",
    kicker: "Campañas · Temporada · Presencia",
    title: "Spots / TVs",
    description:
      "Piezas publicitarias listas para escalar en pauta, televisión y campañas de temporada. Ideales para impulsar lanzamientos, posicionar producto en fechas clave y elevar el recordatorio de marca con una producción que se siente premium.",
    reels: [
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779377534/Video2_qslm4c.mp4" },
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779379246/VeranoKigo_Vertical_btspoo.mp4" },
    ],
  },
  {
    id: "marca-personal",
    number: "03",
    kicker: "Autoridad · Feed activo · Conversión",
    title: "Marca Personal",
    description:
      "Contenido para fundadores, expertos y negocios que quieren mantener un feed vivo, transmitir autoridad y convertir leads en silencio. Videos persuasivos que construyen confianza, suman seguidores cualificados y mueven la aguja en ventas.",
    reels: [
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779379006/Webinar2_unozlf.mp4" },
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779377655/CorteCloud_q9lzff.mp4" },
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779377490/MetaAd_gya5zi.mp4" },
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779507243/05.1___MetaAds_yrtgmr.mp4" },
    ],
  },
  {
    id: "cinematograficos",
    number: "04",
    kicker: "Calidad · Elegancia · Mercado premium",
    title: "Reels Cinematográficos",
    description:
      "Para marcas que no compiten por precio, compiten por percepción. Producción con lenguaje de cine, dirección de arte y posproducción detallada para transmitir prestigio, elevar el ticket promedio y proyectar liderazgo de categoría.",
    reels: [
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779379785/AQM00fcFB9UXzP0XHk25z0YsAV6IQq-Q2WvI-l4X-5FOxbB0Y3ZBy5qfCKmYppNZ1uqC6NSFUTJdtATYZoxwS7VKBBgGy7hP7dEnq-g_snczgp.mp4" },
      { src: "https://res.cloudinary.com/djduba5fd/video/upload/q_auto/f_auto/v1779379782/AQNT8_lqO4uOfGx0cDYYLy5qea3MVzTq7nMnuJrqQ10beUeG_V6FfEw4CmGXg5dkSiKwSj-0-g70SxtETMlBb5OsaeYI4fC70KqDoJM_kls3iw.mp4" },
    ],
  },
];

const CTA_MSG =
  "Hola, vengo de la galería de reels de PG Estrategias y quiero producir contenido para mi marca.";

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !wrapperRef.current) return;
    const v = videoRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!v) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.4, 0.8] }
    );
    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, []);

  if (!reel.src) {
    return (
      <div
        ref={wrapperRef}
        className="reel-card relative aspect-[9/16] w-full overflow-hidden bg-white/[0.03] border border-white/10 flex items-center justify-center group"
      >
        <div className="absolute inset-0 opacity-30" style={{
          background: "radial-gradient(circle at 50% 50%, rgba(166,226,46,0.15), transparent 60%)",
        }} />
        <div className="relative text-center px-6">
          <div className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
            Slot Disponible
          </div>
          <div className="font-title text-white/80 text-xl tracking-tight">
            {reel.label || "Próximamente"}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-[10px] text-pg-lime tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-pg-lime animate-pulse" />
            En producción
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className="reel-card group relative aspect-[9/16] w-full overflow-hidden bg-black cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <video
          ref={videoRef}
          src={reel.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute top-4 left-4 font-body text-[10px] tracking-[0.2em] uppercase text-white/70">
          {String(index + 1).padStart(2, "0")} / Reel
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="font-body text-[10px] tracking-[0.2em] uppercase text-white/80">
            Ver completo
          </div>
          <div className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center transition-all duration-500 group-hover:border-pg-lime group-hover:bg-pg-lime">
            <svg width="10" height="12" viewBox="0 0 10 12" className="text-white transition-colors duration-500 group-hover:text-pg-black">
              <path d="M0 0L10 6L0 12V0Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(13,13,13,0.94)", backdropFilter: "blur(8px)" }}
            onClick={() => setOpen(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              className="absolute top-6 right-6 md:top-8 md:right-8 font-body text-[11px] tracking-[0.16em] uppercase text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Cerrar"
            >
              cerrar ×
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88vh] aspect-[9/16] h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={reel.src!}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function NuestroTrabajoClient() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const { open: openContact } = useContactMenu();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap.from(".hero-kicker", {
        opacity: 0, y: 20, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".hero-title .line", {
        yPercent: 110, duration: 1.1, stagger: 0.08, ease: "power4.out", delay: 0.1,
      });
      gsap.from(".hero-sub", {
        opacity: 0, y: 16, duration: 0.9, ease: "power3.out", delay: 0.4,
      });
      gsap.from(".hero-meta > *", {
        opacity: 0, y: 12, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.55,
      });

      // Marquee
      if (marqueeRef.current) {
        const inner = marqueeRef.current.querySelector(".marquee-inner");
        if (inner) {
          gsap.to(inner, {
            xPercent: -50, duration: 28, ease: "none", repeat: -1,
          });
        }
      }

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".section-block").forEach((sec) => {
        gsap.from(sec.querySelectorAll(".reveal-up"), {
          scrollTrigger: {
            trigger: sec,
            start: "top 78%",
          },
          opacity: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.from(sec.querySelectorAll(".reel-card"), {
          scrollTrigger: {
            trigger: sec,
            start: "top 72%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });
        gsap.from(sec.querySelectorAll(".section-number"), {
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 30,
          ease: "none",
        });
      });

      // CTA
      gsap.from(".cta-block > *", {
        scrollTrigger: { trigger: ".cta-block", start: "top 80%" },
        opacity: 0, y: 30, duration: 0.9, stagger: 0.1, ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={heroRef} className="bg-pg-black text-white overflow-hidden">

        {/* HERO */}
        <section className="relative min-h-[92vh] flex flex-col justify-end px-6 md:px-16 pt-32 pb-12 max-w-[1400px] mx-auto">
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 80% 10%, rgba(166,226,46,0.10), transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(166,226,46,0.06), transparent 55%)",
            }}
          />

          <div className="relative">
            <div className="hero-kicker flex items-center gap-3 mb-8">
              <span className="w-10 h-px bg-pg-lime" />
              <span className="font-body text-[11px] tracking-[0.22em] uppercase text-pg-lime">
                Portafolio · PG Estrategias
              </span>
            </div>

            <h1
              className="hero-title font-title text-white"
              style={{
                fontSize: "var(--t-display)",
                lineHeight: "var(--lh-display)",
                letterSpacing: "var(--ls-display)",
                fontWeight: 700,
              }}
            >
              <span className="block overflow-hidden"><span className="line block">Nuestro</span></span>
              <span className="block overflow-hidden"><span className="line block italic font-normal opacity-80">trabajo,</span></span>
              <span className="block overflow-hidden"><span className="line block">tus <span className="text-pg-lime">resultados.</span></span></span>
            </h1>

            <div className="mt-10 grid md:grid-cols-12 gap-8 items-end">
              <p className="hero-sub md:col-span-6 font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                Una selección de los reels que producimos para nuestros clientes. Cada pieza está pensada para una sola cosa: convertir atención en clientes, ventas y posicionamiento.
              </p>
              <div className="hero-meta md:col-span-6 md:justify-self-end flex items-center gap-8">
                <div>
                  <div className="font-title text-pg-lime text-3xl md:text-4xl" style={{ fontWeight: 700 }}>04</div>
                  <div className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">Formatos</div>
                </div>
                <div>
                  <div className="font-title text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>+200</div>
                  <div className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">Reels producidos</div>
                </div>
                <div>
                  <div className="font-title text-white text-3xl md:text-4xl" style={{ fontWeight: 700 }}>1:1</div>
                  <div className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">Estrategia + Producción</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div ref={marqueeRef} className="border-y border-white/10 py-5 overflow-hidden">
          <div className="marquee-inner flex whitespace-nowrap gap-12 will-change-transform">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 items-center">
                {["Atención", "Conversión", "Storytelling", "Performance", "Branding", "Hooks", "Cinemática", "Edición", "Dirección de arte", "Estrategia"].map((t) => (
                  <span key={t + k} className="flex items-center gap-12 font-title text-white/30 text-2xl md:text-3xl tracking-tight">
                    {t}
                    <span className="w-2 h-2 rounded-full bg-pg-lime/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        {CATEGORIES.map((cat, idx) => (
          <section
            key={cat.id}
            id={cat.id}
            className="section-block relative px-6 md:px-16 py-24 md:py-32 max-w-[1400px] mx-auto"
          >
            <div
              className="section-number pointer-events-none absolute -top-2 right-6 md:right-16 font-title text-white/[0.04] select-none"
              style={{ fontSize: "clamp(120px, 22vw, 320px)", fontWeight: 800, lineHeight: 0.85 }}
            >
              {cat.number}
            </div>

            <div className="relative grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
              <div className="md:col-span-5 min-w-0">
                <div className="reveal-up flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-pg-lime" />
                  <span className="font-body text-[10px] tracking-[0.22em] uppercase text-pg-lime">
                    {cat.number} — {cat.kicker}
                  </span>
                </div>
                <h2
                  className="reveal-up font-title text-white break-words hyphens-auto"
                  style={{
                    fontSize: "var(--t-h2)",
                    lineHeight: "var(--lh-h2)",
                    letterSpacing: "var(--ls-h2)",
                    fontWeight: 700,
                  }}
                >
                  {cat.title}
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7 flex items-end">
                <p className="reveal-up font-body text-white/65 text-base md:text-lg leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>

            <div
              className={`relative grid gap-5 md:gap-6 ${
                cat.reels.length === 2
                  ? "grid-cols-2 md:grid-cols-2 md:max-w-3xl"
                  : cat.reels.length === 3
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-4"
              }`}
            >
              {cat.reels.map((reel, i) => (
                <ReelCard key={`${cat.id}-${i}`} reel={reel} index={i} />
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="cta-block relative px-6 md:px-16 py-28 md:py-40 max-w-[1400px] mx-auto">
          <div
            className="absolute inset-x-6 md:inset-x-16 inset-y-12 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(166,226,46,0.10), transparent 60%)",
            }}
          />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-8 h-px bg-pg-lime" />
              <span className="font-body text-[11px] tracking-[0.22em] uppercase text-pg-lime">
                Tu marca, el próximo caso
              </span>
              <span className="w-8 h-px bg-pg-lime" />
            </div>
            <h2
              className="font-title text-white max-w-4xl mx-auto"
              style={{
                fontSize: "var(--t-h1)",
                lineHeight: "var(--lh-h1)",
                letterSpacing: "var(--ls-display)",
                fontWeight: 700,
              }}
            >
              ¿Listo para que tu marca <span className="italic font-normal opacity-80">no se pueda</span> ignorar?
            </h2>
            <p className="mt-8 font-body text-white/65 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Cuéntanos a dónde quieres llevar tu marca y diseñamos la estrategia + producción audiovisual que te lleva ahí.
            </p>
            <button
              onClick={() => openContact(CTA_MSG)}
              className="mt-12 inline-flex items-center gap-3 font-title font-bold text-pg-black text-[13px] tracking-wide px-8 py-4 transition-all duration-500 hover:opacity-90"
              style={{ background: "#A6E22E" }}
            >
              Agenda una llamada
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
