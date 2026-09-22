"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ────────────────────────────────────────────────────────────
   03 · El problema — marco PAS.

   Su único trabajo es que el prospecto se reconozca, así que no lleva
   CTA: la tensión que crea aquí la resuelve el bloque del sistema.
   ──────────────────────────────────────────────────────────── */

const dolores = [
  "Likes que no se convierten en mensajes.",
  "Tres proveedores, cero responsables del resultado.",
  "Un contenido que no refleja la calidad real de tu negocio.",
];

export default function Problema() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problema"
      ref={ref}
      className="relative px-6 md:px-14 py-24 md:py-32"
      style={{ background: "#E4E0DD" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-title max-w-[900px] mb-10"
          style={{
            fontSize: "clamp(32px, 4.6vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#1C1C1A",
          }}
        >
          Pagas publicidad. Publicas contenido. Y el teléfono sigue en
          silencio.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="max-w-[720px] flex flex-col gap-5 mb-14"
        >
          <p
            className="font-body text-[16px] md:text-[18px] leading-[1.8]"
            style={{ color: "rgba(28,28,26,0.72)" }}
          >
            Contrataste a alguien para las redes. Luego a alguien para los
            anuncios. Tal vez a alguien más para la página. Cada uno te manda
            un reporte distinto y ninguno te dice lo único que importa:{" "}
            <strong style={{ color: "#1C1C1A", fontWeight: 600 }}>
              cuántos clientes te trajo este mes.
            </strong>
          </p>
          <p
            className="font-body text-[16px] md:text-[18px] leading-[1.8]"
            style={{ color: "rgba(28,28,26,0.72)" }}
          >
            Mientras tanto, tu competencia se ve más grande en Instagram aunque
            tu servicio sea mejor. Y cada mes que pasa así, es un mes de
            clientes que se fueron con ellos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {dolores.map((d, i) => (
            <motion.p
              key={d}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              className="font-title text-[19px] md:text-[22px] leading-[1.35] pt-6 pr-6"
              style={{
                borderTop: "1px solid rgba(28,28,26,0.18)",
                color: "#1C1C1A",
                fontWeight: 700,
                letterSpacing: "-0.015em",
              }}
            >
              {d}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
