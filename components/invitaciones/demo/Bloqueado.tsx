"use client";
import React from "react";
import { motion } from "framer-motion";
import { BLOQUEADO } from "@/lib/invitaciones/planes";

function Candado() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="shrink-0 mt-[3px]"
      aria-hidden
    >
      <rect x="4" y="11" width="16" height="10" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/**
 * Lo que este demo deliberadamente no hace. Se enseña apagado en lugar de
 * esconderlo: el prospecto ve exactamente qué se está perdiendo, que es
 * justo el argumento para subir de paquete.
 */
export default function Bloqueado() {
  return (
    <section className="bodas-light py-20 md:py-28">
      <div className="bodas-container max-w-3xl">
        <div className="text-center mb-12">
          <p className="bodas-label bodas-label-ink mb-4">Hasta aquí llega este plan</p>
          <h2 className="bodas-title">
            Lo que <span className="bodas-em-rose">todavía no</span> hace
          </h2>
          <p className="bodas-subtitle mx-auto mt-6">
            No está escondido ni desactivado por el demo: son entregables de los
            paquetes de arriba.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {BLOQUEADO.map((bloque, i) => (
            <motion.div
              key={bloque.plan}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7"
              style={{
                border: "1px dashed rgba(20,18,15,0.18)",
                background: "rgba(20,18,15,0.02)",
              }}
            >
              <p
                className="font-body text-[10px] uppercase tracking-[0.2em] mb-5"
                style={{ color: "rgba(20,18,15,0.45)" }}
              >
                {bloque.plan}
              </p>

              <ul className="flex flex-col gap-3.5">
                {bloque.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 font-body text-[13.5px] leading-[1.65]"
                    style={{ color: "rgba(20,18,15,0.5)" }}
                  >
                    <Candado />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-10">
          <a
            href="/invitacionesdebodas#paquetes"
            className="font-body text-[13px] tracking-[0.06em] underline underline-offset-8 transition-colors duration-500 hover:text-[color:#A85E56]"
            style={{ color: "#4A443D" }}
          >
            Comparar los cuatro paquetes
          </a>
        </p>
      </div>
    </section>
  );
}
