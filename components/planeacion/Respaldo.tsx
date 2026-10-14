"use client";
import React from "react";
import { motion } from "framer-motion";
import { OFICINA, SEGURIDAD, TRANSPARENCIA } from "./datos";

const GOLD = "#C4A052";

const aparecer = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
};

/**
 * Lo que sostiene la promesa: equipo capacitado, archivos abiertos y una
 * oficina donde se puede llegar a preguntar. Es la parte que separa a un
 * planner de alguien que improvisa el día del evento.
 */
export default function PlaneacionRespaldo() {
  return (
    <>
      {/* ── Seguridad ──────────────────────────────────── */}
      <section id="seguridad" className="bodas-dark py-24 md:py-32 scroll-mt-20">
        <div className="bodas-container">
          <motion.div {...aparecer} className="max-w-3xl">
            <p className="bodas-label mb-5">Para su tranquilidad</p>
            <h2 className="bodas-title">{SEGURIDAD.titulo}</h2>
            <p className="bodas-subtitle mt-6">{SEGURIDAD.entrada}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
            {SEGURIDAD.areas.map((area, i) => (
              <motion.div
                key={area}
                {...aparecer}
                transition={{ ...aparecer.transition, delay: i * 0.05 }}
                className="bodas-card-dark px-5 py-7 text-center"
              >
                <p className="bodas-heading" style={{ fontSize: "16px" }}>
                  {area}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...aparecer} className="mt-12">
            <div className="bodas-rule h-px mb-9" />
            <p className="bodas-subtitle" style={{ maxWidth: "52rem" }}>
              {SEGURIDAD.cierre}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Transparencia ──────────────────────────────── */}
      <section className="bodas-light py-24 md:py-32">
        <div className="bodas-container">
          <motion.div {...aparecer} className="max-w-3xl">
            <p className="bodas-label bodas-label-ink mb-5">En tiempo real</p>
            <h2 className="bodas-title">{TRANSPARENCIA.titulo}</h2>
            <p className="bodas-subtitle mt-6">{TRANSPARENCIA.entrada}</p>
            <p className="bodas-subtitle mt-4">{TRANSPARENCIA.cierre}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Oficina ────────────────────────────────────── */}
      <section className="bodas-dark py-24 md:py-32">
        <div className="bodas-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <motion.div {...aparecer}>
              <p className="bodas-label mb-5">Y vivan la experiencia</p>
              <h2 className="bodas-title">{OFICINA.titulo}</h2>
              <p className="bodas-subtitle mt-6">{OFICINA.entrada}</p>
              <p className="bodas-heading mt-6" style={{ fontSize: "clamp(19px,2.2vw,25px)", color: GOLD }}>
                {OFICINA.cierre}
              </p>
            </motion.div>

            <motion.address
              {...aparecer}
              className="bodas-frame px-8 py-10 not-italic"
            >
              <p className="bodas-label mb-4">Nuestra oficina</p>
              {OFICINA.domicilio.map((linea, i) => (
                <p
                  key={linea}
                  style={{
                    color: i === 0 ? "var(--b-ivory)" : "rgba(247,243,238,0.62)",
                    fontSize: i === 0 ? "19px" : "15px",
                    lineHeight: 1.7,
                  }}
                  className={i === 0 ? "bodas-heading mb-2" : ""}
                >
                  {linea}
                </p>
              ))}
            </motion.address>
          </div>
        </div>
      </section>
    </>
  );
}
