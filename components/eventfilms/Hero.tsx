"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "@/components/bodas/contacto";
import WhatsAppIcon from "@/components/bodas/WhatsAppIcon";
import Sparkles from "./Sparkles";
import { TIPOS_HERO, VIDEO_HERO, cld, poster } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Hero de PG Event Films: video de fondo a pantalla completa con
   acercamiento lento, destellos y el tipo de evento rotando. */
export default function EventFilmsHero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [video, setVideo] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % TIPOS_HERO.length), 2300);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;
    setVideo(true);
  }, [reduce]);

  const posterUrl = poster(VIDEO_HERO, "so_1,c_fill,ar_9:16,w_1080,f_auto,q_auto");
  const posterWide = poster(VIDEO_HERO, "so_1,c_fill,ar_16:9,w_1920,f_auto,q_auto");

  return (
    <section className="bodas-dark relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0 bodas-kenburns" aria-hidden>
        <picture>
          <source media="(min-width: 768px)" srcSet={posterWide} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={posterUrl} alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        </picture>
        {video && (
          <video
            ref={ref}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl}
          >
            <source src={cld(VIDEO_HERO, "du_20,ac_none,c_fill,ar_16:9,w_1600,q_auto,vc_h264")} media="(min-width: 768px)" type="video/mp4" />
            <source src={cld(VIDEO_HERO, "du_20,ac_none,c_fill,ar_9:16,w_720,q_auto,vc_h264")} type="video/mp4" />
          </video>
        )}
      </div>
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.15) 35%, rgba(20,17,15,0.85) 78%, #14110F 100%)",
        }}
      />
      <Sparkles />

      <div className="bodas-container relative z-10 w-full pt-32 pb-20 md:pb-28">
        <p className="bodas-label mb-6 bodas-enter">PG Event Films · Puebla</p>

        <h1 className="bodas-display max-w-5xl bodas-enter bodas-enter-1">
          Tu celebración, contada como{" "}
          <span className="bodas-shimmer italic">película</span>
        </h1>

        <div
          className="mt-7 flex flex-wrap items-baseline gap-x-3 font-body text-lg md:text-xl bodas-enter bodas-enter-2"
          style={{ color: "rgba(247,242,234,0.8)" }}
        >
          <span>Filmamos y fotografiamos</span>
          <span className="sr-only">bodas, XV años, brindis, bautizos y aniversarios.</span>
          <span
            aria-hidden
            className="relative inline-flex h-[1.5em] min-w-[9ch] overflow-hidden align-bottom"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={TIPOS_HERO[i]}
                className="bodas-heading italic text-2xl md:text-3xl"
                style={{ color: "#E6CB97" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {TIPOS_HERO[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-10 bodas-enter bodas-enter-3">
          <a
            href={whatsappUrl("Hola, quiero cotizar la cobertura de mi evento con PG Event Films.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bodas-btn-gold"
          >
            <WhatsAppIcon />
            Cotizar mi evento
          </a>
          <a href="#peliculas" className="bodas-btn-outline">
            Ver películas
          </a>
        </div>
      </div>

      <motion.a
        href="#eventos"
        aria-label="Bajar a los eventos"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="block w-px h-10" style={{ background: "linear-gradient(180deg, #D2AE6D, transparent)" }} />
      </motion.a>
    </section>
  );
}
