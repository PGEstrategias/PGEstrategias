"use client";

import { useEffect, useRef } from "react";
import type { Marca } from "@/data/home";
import s from "./home.module.css";

/* Barra de marcas: avanza sola y se puede mover a mano (arrastrar con el
   mouse, deslizar con el dedo, rueda del trackpad o flechas). Al soltarla
   sigue avanzando sola. La lista va duplicada para que el ciclo no tenga fin. */
const VELOCIDAD = 0.45; // px por cuadro (~27 px/s)

export default function LogosCarrusel({ logos }: { logos: Marca[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const ctrl = useRef<{ detener: () => void; seguir: (ms?: number) => void } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pausa = false;
    let reanudar: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    let pos = el.scrollLeft;

    /* Mantiene la posición dentro de la primera copia para que el ciclo no se note. */
    const envolver = () => {
      const mitad = el.scrollWidth / 2;
      if (el.scrollLeft >= mitad) el.scrollLeft -= mitad;
      else if (el.scrollLeft <= 0) el.scrollLeft += mitad;
      pos = el.scrollLeft;
    };

    const paso = () => {
      if (!pausa && !quieto) {
        pos += VELOCIDAD;
        el.scrollLeft = pos;
        if (el.scrollLeft >= el.scrollWidth / 2) envolver();
      }
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);

    const detener = () => {
      pausa = true;
      if (reanudar) clearTimeout(reanudar);
    };
    const seguir = (ms = 1600) => {
      if (reanudar) clearTimeout(reanudar);
      reanudar = setTimeout(() => {
        envolver();
        pausa = false;
      }, ms);
    };

    /* Arrastrar con el mouse */
    let arrastrando = false;
    let x0 = 0;
    let s0 = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      arrastrando = true;
      x0 = e.clientX;
      s0 = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.dataset.arrastrando = "1";
      detener();
    };
    const move = (e: PointerEvent) => {
      if (!arrastrando) return;
      el.scrollLeft = s0 - (e.clientX - x0);
      envolver();
      s0 = el.scrollLeft + (e.clientX - x0);
    };
    const up = () => {
      if (!arrastrando) return;
      arrastrando = false;
      delete el.dataset.arrastrando;
      seguir();
    };

    /* Dedo, rueda o trackpad: el desplazamiento nativo; solo se pausa. */
    const onScroll = () => {
      if (pausa) {
        envolver();
      }
    };
    const tocar = () => detener();
    const soltar = () => seguir();
    const rueda = () => {
      detener();
      seguir(1200);
    };
    const encima = () => detener();
    const fuera = () => {
      if (!arrastrando) seguir(400);
    };

    ctrl.current = { detener, seguir };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", tocar, { passive: true });
    el.addEventListener("touchend", soltar, { passive: true });
    el.addEventListener("wheel", rueda, { passive: true });
    el.addEventListener("mouseenter", encima);
    el.addEventListener("mouseleave", fuera);
    return () => {
      cancelAnimationFrame(raf);
      if (reanudar) clearTimeout(reanudar);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", tocar);
      el.removeEventListener("touchend", soltar);
      el.removeEventListener("wheel", rueda);
      el.removeEventListener("mouseenter", encima);
      el.removeEventListener("mouseleave", fuera);
    };
  }, []);

  /* Flechas: saltan unas tarjetas (rápido para ver más marcas). */
  const mover = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const tarjeta = el.querySelector("li")?.getBoundingClientRect().width ?? 220;
    const salto = (tarjeta + 16) * 3;
    const mitad = el.scrollWidth / 2;
    ctrl.current?.detener();
    /* Antes de saltar, se recoloca en la copia que deja espacio hacia ese lado. */
    if (dir < 0 && el.scrollLeft < salto) el.scrollLeft += mitad;
    if (dir > 0 && el.scrollLeft + salto > el.scrollWidth - el.clientWidth) el.scrollLeft -= mitad;
    el.scrollBy({ left: dir * salto, behavior: "smooth" });
    ctrl.current?.seguir(1400);
  };

  return (
    <div className={s.logosWrap}>
      <button type="button" className={`${s.logosFlecha} ${s.logosPrev}`} onClick={() => mover(-1)} aria-label="Ver marcas anteriores">
        ‹
      </button>
      <div ref={ref} className={s.marquee} role="region" aria-label="Marcas con las que hemos colaborado. Desliza para ver más." tabIndex={0}>
        {[0, 1].map((copia) => (
          <ul key={copia} className={s.track} aria-hidden={copia === 1 ? true : undefined}>
            {logos.map((l) => (
              <li key={l.nombre} className={s.logo}>
                <picture>
                  {l.fallback && <source srcSet={l.src} type="image/webp" />}
                  <img
                    src={l.fallback ?? l.src}
                    alt={copia === 0 ? l.nombre : ""}
                    width={l.w}
                    height={l.h}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </picture>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button type="button" className={`${s.logosFlecha} ${s.logosNext}`} onClick={() => mover(1)} aria-label="Ver más marcas">
        ›
      </button>
    </div>
  );
}
