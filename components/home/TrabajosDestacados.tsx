"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cld, posterDe, TRABAJOS, type Trabajo } from "@/data/home";
import s from "./home.module.css";

const PREVIEW = "du_8,ac_none,c_fill,ar_9:16,w_540,q_auto:eco,vc_h264";
const COMPLETO = "c_limit,w_1080,q_auto";

/* Vista previa en loop silencioso. Solo se reproduce sola en escritorio con
   puntero fino y al estar en pantalla; en mobile queda el poster. */
function Preview({ t, onOpen }: { t: Trabajo; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAuto(ok);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!auto || !v) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? void v.play().catch(() => {}) : v.pause()),
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [auto]);

  const poster = posterDe(t.video, "so_1,c_fill,ar_9:16,w_540,f_auto,q_auto");

  return (
    <button
      type="button"
      className={s.videoBtn}
      onClick={onOpen}
      aria-label={`Ver video completo con sonido: ${t.cliente}`}
    >
      <img src={poster} alt="" width={540} height={960} loading="lazy" decoding="async" />
      {auto && (
        <video ref={ref} muted loop playsInline preload="none" poster={poster}>
          <source src={cld(t.video, PREVIEW)} type="video/mp4" />
        </video>
      )}
      <span className={s.tag}>{t.industria}</span>
      <span className={s.play} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M7 4v16l13-8z" /></svg>
      </span>
    </button>
  );
}

function Modal({ t, onClose }: { t: Trabajo; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      className={s.modal}
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${t.cliente}`}
      onClick={onClose}
    >
      <button ref={closeRef} type="button" className={s.close} onClick={onClose} aria-label="Cerrar video">
        ✕
      </button>
      <video
        controls
        autoPlay
        playsInline
        preload="metadata"
        poster={posterDe(t.video, "so_1,f_auto,q_auto,w_1080")}
        onClick={(e) => e.stopPropagation()}
      >
        <source src={cld(t.video, COMPLETO)} type="video/mp4" />
      </video>
    </div>
  );
}

export default function TrabajosDestacados() {
  const [abierto, setAbierto] = useState<Trabajo | null>(null);

  return (
    <>
      <div className={s.grid3}>
        {TRABAJOS.map((t, i) => (
          <article
            key={t.cliente}
            className={`${s.card} ${s.lift} ${s.reveal}`}
            data-reveal
            data-reveal-delay={i * 80}
          >
            <Preview t={t} onOpen={() => setAbierto(t)} />
            <div className={s.cardBody}>
              <h3 className={s.cardTitle}>{t.cliente}</h3>
              <p className={s.cardText}>
                {t.linea.startsWith("[") ? <span className={s.ph}>{t.linea}</span> : t.linea}
              </p>
              <Link prefetch={false} href={t.href} className={s.link}>
                Ver {t.industria.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      {abierto && <Modal t={abierto} onClose={() => setAbierto(null)} />}
    </>
  );
}
