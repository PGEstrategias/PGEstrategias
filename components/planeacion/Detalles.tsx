"use client";
import React from "react";
import { motion } from "framer-motion";
import { PJ } from "./marca";

const FOTOS = [
  { src: "/paolajimenez/invitacion.webp", w: 351, h: 486, alt: "Papelería con el monograma de Paola Jiménez grabado" },
  { src: "/paolajimenez/tarjeta.webp", w: 265, h: 255, alt: "Tarjeta de Paola Jiménez Weddings & Events entre rosas" },
  { src: "/paolajimenez/sello.webp", w: 265, h: 224, alt: "Sello de lacre rosa con el monograma de Paola Jiménez" },
];

/* Pausa visual antes del cierre: la papelería de la marca. */
export default function PlaneacionDetalles() {
  return (
    <section className="bodas-light py-20 md:py-28">
      <div className="bodas-container text-center">
        <p className="bodas-label bodas-label-ink mb-4">Cada detalle cuenta</p>
        <p className="pj-script" style={{ fontSize: "clamp(40px,6vw,68px)", color: "var(--b-rose)", lineHeight: 1.1 }}>
          {PJ.promesa}
        </p>
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 max-w-3xl mx-auto items-end">
          {FOTOS.map((f, i) => (
            <motion.div
              key={f.src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pj-arch"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.src}
                alt={f.alt}
                width={f.w}
                height={f.h}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
                style={{ aspectRatio: "3 / 4" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
