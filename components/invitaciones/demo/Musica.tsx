"use client";
import React, { useEffect, useRef, useState } from "react";
import { MUSICA } from "@/lib/invitaciones/demo";

/**
 * La música viene incluida desde el paquete Básico y es lo que peor resuelve
 * el mercado: los navegadores bloquean el autoplay con sonido, así que en la
 * mayoría de las invitaciones simplemente no suena nunca.
 *
 * Aquí arranca en silencio y se enciende con un toque del invitado, que es el
 * gesto que los navegadores sí aceptan. Y si no hay pista cargada, el control
 * no se dibuja: vale más no tener música que tener un botón muerto.
 */
export default function Musica() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  if (!MUSICA.url) return null;

  async function alternar() {
    const audio = audioRef.current;
    if (!audio) return;

    if (sonando) {
      audio.pause();
      setSonando(false);
      return;
    }

    try {
      await audio.play();
      setSonando(true);
    } catch {
      /* El navegador rechazó la reproducción: se deja el control apagado
         en vez de mentirle al invitado con un icono sonando. */
      setSonando(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSICA.url} loop preload="none" />
      <button
        type="button"
        onClick={alternar}
        aria-label={
          sonando
            ? `Silenciar ${MUSICA.titulo}`
            : `Poner la música: ${MUSICA.titulo}, ${MUSICA.artista}`
        }
        title={`${MUSICA.titulo} — ${MUSICA.artista}`}
        aria-pressed={sonando}
        className="fixed bottom-[5.5rem] right-5 z-40 w-11 h-11 flex items-center justify-center transition-colors duration-500"
        style={{
          background: "rgba(20,18,15,0.88)",
          border: "1px solid rgba(196,160,82,0.45)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Tres barras que "bailan" solo cuando de verdad hay sonido. */}
        <span className="flex items-end gap-[3px] h-4" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={sonando ? "musica-barra" : ""}
              style={{
                width: 2,
                height: sonando ? undefined : 5,
                background: "#C4A052",
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
