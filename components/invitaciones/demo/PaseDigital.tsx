"use client";
import React from "react";
import {
  FECHA_LARGA,
  NOVIOS,
  SEDES,
  DRESS_CODE,
} from "@/lib/invitaciones/demo";

export type DatosPase = {
  nombre: string;
  pases: number;
};

/**
 * El entregable del Básico dice, con esas palabras, "pase digital para
 * capturar". Así que está diseñado para el screenshot: proporción vertical,
 * todo en una sola pantalla, sin degradados que se coman el contraste y sin
 * nada que dependa de estar conectado para verse.
 */
export default function PaseDigital({ nombre, pases }: DatosPase) {
  const [ceremonia, recepcion] = SEDES;

  return (
    <div
      className="mx-auto w-full max-w-[22rem] px-8 py-10 text-center"
      style={{ background: "#F7F3EE", color: "#14120F" }}
    >
      <div
        className="px-5 py-8"
        style={{
          border: "1px solid rgba(196,160,82,0.55)",
          outline: "1px solid rgba(196,160,82,0.22)",
          outlineOffset: 5,
        }}
      >
        <p
          className="font-body text-[9px] uppercase tracking-[0.26em]"
          style={{ color: "#A85E56" }}
        >
          Pase de entrada
        </p>

        <p className="bodas-heading text-3xl leading-tight mt-5">
          {NOVIOS.ella}
          <span className="mx-2" style={{ color: "#C4A052" }}>
            &amp;
          </span>
          {NOVIOS.el}
        </p>

        <div className="bodas-ornament my-5" aria-hidden>
          <span
            style={{
              display: "block",
              width: 4,
              height: 4,
              transform: "rotate(45deg)",
              background: "#C4A052",
            }}
          />
        </div>

        {/* El nombre del invitado es lo que hace que el pase sea suyo. */}
        <p
          className="font-body text-[9px] uppercase tracking-[0.22em] mb-2"
          style={{ color: "#4A443D" }}
        >
          A nombre de
        </p>
        <p className="bodas-heading text-2xl leading-tight break-words">
          {nombre}
        </p>

        <p
          className="bodas-heading text-lg mt-4 pt-4"
          style={{
            color: "#C4A052",
            borderTop: "1px solid rgba(196,160,82,0.3)",
          }}
        >
          {pases} {pases === 1 ? "pase" : "pases"}
        </p>

        <div
          className="mt-5 pt-5 flex flex-col gap-3"
          style={{ borderTop: "1px solid rgba(196,160,82,0.3)" }}
        >
          <p
            className="font-body text-[11px] uppercase tracking-[0.14em] leading-relaxed"
            style={{ color: "#14120F" }}
          >
            {FECHA_LARGA}
          </p>

          <div>
            <p
              className="font-body text-[9px] uppercase tracking-[0.2em]"
              style={{ color: "#A85E56" }}
            >
              {ceremonia.hora} · Ceremonia
            </p>
            <p
              className="font-body text-[12px] leading-snug mt-0.5"
              style={{ color: "#4A443D" }}
            >
              {ceremonia.nombre}
            </p>
          </div>

          <div>
            <p
              className="font-body text-[9px] uppercase tracking-[0.2em]"
              style={{ color: "#A85E56" }}
            >
              {recepcion.hora} · Recepción
            </p>
            <p
              className="font-body text-[12px] leading-snug mt-0.5"
              style={{ color: "#4A443D" }}
            >
              {recepcion.nombre}
            </p>
          </div>
        </div>

        <p
          className="font-body text-[10px] uppercase tracking-[0.16em] mt-5 pt-4"
          style={{
            color: "#4A443D",
            borderTop: "1px solid rgba(196,160,82,0.3)",
          }}
        >
          {DRESS_CODE.titulo}
        </p>

        <p
          className="font-body text-[10px] tracking-[0.12em] mt-4"
          style={{ color: "#C4A052" }}
        >
          {NOVIOS.hashtags[0]}
        </p>
      </div>
    </div>
  );
}
