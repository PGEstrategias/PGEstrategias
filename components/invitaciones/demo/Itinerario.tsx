"use client";
import React from "react";
import { motion } from "framer-motion";
import { ITINERARIO } from "@/lib/invitaciones/demo";

export default function Itinerario() {
  return (
    <section id="itinerario" className="bodas-light py-20 md:py-28">
      <div className="bodas-container max-w-2xl">
        <div className="text-center mb-14">
          <p className="bodas-label bodas-label-ink mb-4">El día</p>
          <h2 className="bodas-title">
            Así se va a <span className="bodas-em-rose">vivir</span>
          </h2>
        </div>

        <ol className="relative">
          {/* Filo vertical que une las horas. */}
          <span
            aria-hidden
            className="absolute left-[4.75rem] top-2 bottom-2 w-px hidden sm:block"
            style={{ background: "rgba(196,160,82,0.3)" }}
          />

          {ITINERARIO.map((paso, i) => (
            <motion.li
              key={paso.hora}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative grid grid-cols-[4rem_1fr] sm:grid-cols-[4.75rem_1fr] gap-5 sm:gap-8 pb-9 last:pb-0"
            >
              <p
                className="bodas-heading text-xl tabular-nums pt-0.5"
                style={{ color: "#C4A052" }}
              >
                {paso.hora}
              </p>

              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.05rem] top-2 hidden sm:block"
                  style={{
                    width: 7,
                    height: 7,
                    transform: "rotate(45deg)",
                    background: "#F7F3EE",
                    outline: "1px solid #C4A052",
                  }}
                />
                <h3 className="bodas-heading text-xl leading-snug">
                  {paso.titulo}
                </h3>
                {paso.detalle && (
                  <p
                    className="font-body text-[13.5px] mt-1"
                    style={{ color: "#4A443D" }}
                  >
                    {paso.detalle}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
