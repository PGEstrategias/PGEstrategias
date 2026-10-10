"use client";

import { useEffect } from "react";

/* Activa las entradas de sección una sola vez. Los elementos con
   data-reveal reciben data-visible="true" al entrar en viewport; con
   data-reveal-delay (ms) se escalonan. Sin IntersectionObserver o con
   movimiento reducido, todo se muestra de inmediato. */
export default function RevealObserver() {
  useEffect(() => {
    const pendientes = new Set(
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    );
    const show = (el: HTMLElement, conRetraso = true) => {
      const d = Number(el.dataset.revealDelay || 0);
      if (d && conRetraso) el.style.transitionDelay = `${d}ms`;
      el.dataset.visible = "true";
      pendientes.delete(el);
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      pendientes.forEach((el) => show(el, false));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    pendientes.forEach((el) => io.observe(el));

    /* Un scroll muy rápido (o un salto por ancla) puede pasar un elemento
       sin que llegue a intersectar: lo que ya quedó arriba se muestra. */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pendientes.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            show(el, false);
            io.unobserve(el);
          }
        });
        if (!pendientes.size) window.removeEventListener("scroll", onScroll);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Por si el usuario ya hizo scroll antes de que la página hidratara.
    if (window.scrollY > 0) onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
