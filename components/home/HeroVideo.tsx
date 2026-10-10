"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_POSTER, HERO_SOURCES } from "@/data/home";
import s from "./home.module.css";

type Conn = { saveData?: boolean; effectiveType?: string };

/* Fondo del hero. El poster es el elemento LCP y se pinta desde el HTML;
   el video se monta después de hidratar y solo si conviene: no con ahorro
   de datos, red lenta ni movimiento reducido. */
export default function HeroVideo() {
  const [variant, setVariant] = useState<"mobile" | "desktop" | null>(null);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    const ahorro =
      conn?.saveData === true ||
      /(^|-)2g$/.test(conn?.effectiveType ?? "") ||
      window.matchMedia("(prefers-reduced-data: reduce)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (ahorro) return;
    setVariant(window.matchMedia("(min-width: 768px)").matches ? "desktop" : "mobile");
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    void v.play().catch(() => setPlaying(false));
  }, [variant]);

  const m = (w: number) => HERO_POSTER.mobile(w);
  const d = (w: number) => HERO_POSTER.desktop(w);

  return (
    <div className={s.heroMedia} aria-hidden="true">
      <picture>
        <source media="(min-width: 768px)" srcSet={`${d(1280)} 1280w, ${d(1920)} 1920w`} sizes="100vw" />
        <img
          src={m(720)}
          srcSet={`${m(480)} 480w, ${m(720)} 720w, ${m(1080)} 1080w`}
          sizes="100vw"
          width={1080}
          height={1920}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      {variant && (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={variant === "desktop" ? d(1920) : m(720)}
          data-playing={playing ? "true" : "false"}
          onPlaying={() => setPlaying(true)}
        >
          <source src={HERO_SOURCES[variant].webm} type="video/webm" />
          <source src={HERO_SOURCES[variant].mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
