"use client";

import { useEffect, useState } from "react";
import s from "./home.module.css";

/* Rota una lista de palabras con un fundido corto. El HTML inicial trae la
   primera palabra; con movimiento reducido se queda fija. */
export default function RotatingWord({ words, ms = 2200 }: { words: string[]; ms?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), ms);
    return () => window.clearInterval(id);
  }, [words.length, ms]);

  return (
    <span className={s.rotator} aria-hidden="true">
      <span key={i} className={s.rotatorWord}>
        {words[i]}
      </span>
    </span>
  );
}
