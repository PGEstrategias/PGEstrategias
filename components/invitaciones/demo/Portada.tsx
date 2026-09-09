"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FECHA_ISO,
  FECHA_LARGA,
  FOTOS,
  NOVIOS,
  SEDES,
  foto,
} from "@/lib/invitaciones/demo";

/* La cuenta regresiva se calcula solo en el cliente: si se renderizara en el
   servidor, el primer pintado traería la hora del build y React marcaría
   diferencia de hidratación. */
function useCuentaRegresiva() {
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const objetivo = new Date(FECHA_ISO).getTime();
    const tick = () => setRestante(Math.max(0, objetivo - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (restante === null) return null;
  const seg = Math.floor(restante / 1000);
  return {
    dias: Math.floor(seg / 86400),
    horas: Math.floor((seg % 86400) / 3600),
    minutos: Math.floor((seg % 3600) / 60),
    segundos: seg % 60,
  };
}

function Casilla({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="text-center min-w-[3.75rem]">
      <p
        className="bodas-heading text-3xl md:text-4xl tabular-nums leading-none"
        style={{ color: "#F7F3EE" }}
      >
        {String(valor).padStart(2, "0")}
      </p>
      <p
        className="font-body text-[9px] uppercase tracking-[0.2em] mt-2"
        style={{ color: "rgba(247,243,238,0.5)" }}
      >
        {etiqueta}
      </p>
    </div>
  );
}

export default function Portada() {
  const cuenta = useCuentaRegresiva();
  const ceremonia = SEDES[0];

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bodas-dark">
      {/* Foto del café donde se conocieron, muy velada: es fondo, no
          protagonista. La tipografía tiene que leerse sin esfuerzo. */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={foto(FOTOS.cafe, 1400)}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{ opacity: 0.28 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,18,15,0.55) 0%, rgba(20,18,15,0.92) 72%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 px-7 text-center w-full max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="bodas-label mb-8">Nos casamos</p>

        <h1 className="bodas-heading text-6xl sm:text-7xl md:text-8xl leading-[1.05]">
          {NOVIOS.ella}
          <span className="block my-2 text-4xl md:text-5xl" style={{ color: "#C4A052" }}>
            &amp;
          </span>
          {NOVIOS.el}
        </h1>

        <div className="bodas-ornament my-9" aria-hidden>
          <span
            style={{
              display: "block",
              width: 5,
              height: 5,
              transform: "rotate(45deg)",
              background: "#C4A052",
            }}
          />
        </div>

        <p
          className="font-body text-[12px] md:text-[13px] uppercase tracking-[0.18em] leading-relaxed"
          style={{ color: "rgba(247,243,238,0.72)" }}
        >
          {FECHA_LARGA}
        </p>
        <p
          className="font-body text-[12px] uppercase tracking-[0.18em] mt-2"
          style={{ color: "rgba(247,243,238,0.45)" }}
        >
          {ceremonia.hora} · Puebla, México
        </p>

        {/* Cuenta regresiva. Reserva su altura desde el servidor para que la
            portada no dé un salto cuando el reloj arranca en el cliente. */}
        <div
          className="mt-11 pt-8 flex items-start justify-center gap-5 md:gap-8 min-h-[5.5rem]"
          style={{ borderTop: "1px solid rgba(196,160,82,0.28)" }}
        >
          {cuenta && (
            <>
              <Casilla valor={cuenta.dias} etiqueta="Días" />
              <Casilla valor={cuenta.horas} etiqueta="Horas" />
              <Casilla valor={cuenta.minutos} etiqueta="Min" />
              <Casilla valor={cuenta.segundos} etiqueta="Seg" />
            </>
          )}
        </div>

        <a
          href="#rsvp"
          className="bodas-btn-gold mt-10 inline-flex"
        >
          Confirmar asistencia
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <span
          className="block w-px h-9"
          style={{
            background:
              "linear-gradient(180deg, rgba(196,160,82,0.7), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
