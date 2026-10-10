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
          <motion.span
            aria-hidden
            className="absolute left-[4.75rem] top-2 bottom-2 w-px hidden sm:block origin-top"
            style={{ background: "linear-gradient(180deg, #D2AE6D, rgba(210,174,109,0.2))" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {ITINERARIO.map((paso, i) => (
            <motion.li
              key={paso.hora}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative grid grid-cols-[4rem_1fr] sm:grid-cols-[4.75rem_1fr] gap-5 sm:gap-8 pb-9 last:pb-0 transition-transform duration-300 hover:translate-x-1"
            >
              <p
                className="bodas-heading text-xl tabular-nums pt-0.5"
                style={{ color: "#D2AE6D" }}
              >
                {paso.hora}
              </p>

              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.05rem] top-2 hidden sm:block"
                  style={{
                    width: 11,
                    height: 11,
                    left: "calc(-2rem - 5.5px)",
                    borderRadius: "50%",
                    background: "#D2AE6D",
                    boxShadow: "0 0 0 4px #F7F2EA, 0 0 0 5px rgba(210,174,109,0.5), 0 0 16px rgba(210,174,109,0.6)",
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
