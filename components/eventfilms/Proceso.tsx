"use client";

import { motion } from "framer-motion";
import { PROCESO } from "./data";

export default function Proceso() {
  return (
    <section className="bodas-dark py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bodas-rule" />
      <div className="bodas-container">
        <div className="text-center mb-14">
          <p className="bodas-label mb-5">Cómo trabajamos</p>
          <h2 className="bodas-title">
            Tú disfrutas, <span className="bodas-em">nosotros filmamos</span>
          </h2>
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((p, i) => (
            <motion.li
              key={p.titulo}
              className="bodas-glass p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="bodas-heading italic text-5xl bodas-shimmer">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="bodas-heading text-2xl mt-4 mb-2">{p.titulo}</h3>
              <p className="font-body text-[14px] leading-relaxed" style={{ color: "rgba(247,242,234,0.65)" }}>
                {p.texto}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
