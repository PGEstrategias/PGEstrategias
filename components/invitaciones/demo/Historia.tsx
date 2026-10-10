"use client";
import React from "react";
import { motion } from "framer-motion";
import { HISTORIA, foto } from "@/lib/invitaciones/demo";

/**
 * "Historia" es entregable del paquete Básico. Casi todas las plantillas la
 * resuelven con un párrafo; aquí va como línea de tiempo con foto, que cuesta
 * lo mismo de producir y se siente el doble.
 */
export default function Historia() {
  return (
    <section id="historia" className="bodas-light py-20 md:py-28">
      <div className="bodas-container max-w-3xl">
        <div className="text-center mb-14">
          <p className="bodas-label bodas-label-ink mb-4">Nuestra historia</p>
          <h2 className="bodas-title">
            Cuatro años que empezaron con{" "}
            <span className="bodas-em-rose">una silla vacía</span>
          </h2>
        </div>

        <div className="flex flex-col gap-14">
          {HISTORIA.map((capitulo, i) => (
            <motion.article
              key={capitulo.titulo}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="grid gap-6 sm:grid-cols-[1fr_1.15fr] sm:items-center"
              style={{
                /* Alterna el lado de la foto para que la lectura no se
                   vuelva una columna monótona. */
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}
            >
              {capitulo.imagen ? (
                <div className="bodas-arch group" style={{ direction: "ltr", boxShadow: "0 24px 50px -24px rgba(20,17,15,0.45)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto(capitulo.imagen, 640)}
                    alt={capitulo.titulo}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
              ) : (
                /* El último capítulo va sin foto a propósito: la propuesta no
                   se fotografió, y el hueco lo cuenta mejor que una imagen. */
                <div
                  className="bodas-arch flex items-center justify-center aspect-[4/5] text-center px-6"
                  style={{ direction: "ltr", background: "linear-gradient(160deg, #EACBC2, #F7F2EA)" }}
                >
                  <span className="bodas-heading text-5xl" style={{ color: "#D2AE6D" }}>
                    ¿Nos acompañas?
                  </span>
                </div>
              )}

              <div style={{ direction: "ltr" }}>
                <p
                  className="font-body text-[11px] uppercase tracking-[0.22em] mb-3"
                  style={{ color: "#D2AE6D" }}
                >
                  {capitulo.anio}
                </p>
                <h3 className="bodas-heading text-2xl md:text-3xl mb-3">
                  {capitulo.titulo}
                </h3>
                <p
                  className="font-body text-[14.5px] leading-[1.8]"
                  style={{ color: "#4A443D" }}
                >
                  {capitulo.texto}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
