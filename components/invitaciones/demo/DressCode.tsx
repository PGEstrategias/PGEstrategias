"use client";
import React from "react";
import { motion } from "framer-motion";
import { DRESS_CODE } from "@/lib/invitaciones/demo";

/**
 * El dress code es la duda número uno del invitado y la que más mensajes le
 * genera a la novia. Poner "Formal" y ya no la resuelve: aquí van las muestras
 * de color reales y una lista de sí y no, que es lo que la gente pregunta.
 */
export default function DressCode() {
  return (
    <section id="dresscode" className="bodas-dark py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />

      <div className="bodas-container max-w-3xl">
        <div className="text-center mb-12">
          <p className="bodas-label mb-4">Código de vestimenta</p>
          <h2 className="bodas-title">{DRESS_CODE.titulo}</h2>
          <p className="bodas-subtitle mx-auto mt-6">{DRESS_CODE.descripcion}</p>
        </div>

        {/* Paleta */}
        <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-9 mb-14">
          {DRESS_CODE.paleta.map((color, i) => (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="text-center"
            >
              <span
                className="block w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3"
                style={{
                  background: color.hex,
                  outline: "1px solid rgba(196,160,82,0.4)",
                  outlineOffset: 4,
                }}
                aria-hidden
              />
              <p
                className="font-body text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "rgba(247,243,238,0.7)" }}
              >
                {color.nombre}
              </p>
              <p
                className="font-body text-[10px] tracking-[0.1em] mt-1"
                style={{ color: "rgba(247,243,238,0.32)" }}
              >
                {color.hex}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="bodas-card-dark p-6">
            <p
              className="font-body text-[10px] uppercase tracking-[0.2em] mb-5"
              style={{ color: "#C4A052" }}
            >
              Sí
            </p>
            <ul className="flex flex-col gap-3">
              {DRESS_CODE.si.map((item) => (
                <li
                  key={item}
                  className="font-body text-[13.5px] leading-[1.65] pl-5 relative"
                  style={{ color: "rgba(247,243,238,0.78)" }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.55rem]"
                    style={{
                      width: 5,
                      height: 5,
                      transform: "rotate(45deg)",
                      background: "#C4A052",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bodas-card-dark p-6">
            <p
              className="font-body text-[10px] uppercase tracking-[0.2em] mb-5"
              style={{ color: "#A85E56" }}
            >
              Mejor no
            </p>
            <ul className="flex flex-col gap-3">
              {DRESS_CODE.no.map((item) => (
                <li
                  key={item}
                  className="font-body text-[13.5px] leading-[1.65] pl-5 relative"
                  style={{ color: "rgba(247,243,238,0.6)" }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.68rem] w-2.5 h-px"
                    style={{ background: "#A85E56" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
