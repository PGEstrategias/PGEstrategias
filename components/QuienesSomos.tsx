"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const servicios = [
  {
    num: "01",
    title: "Pauta Digital",
    desc: "Anuncios en Meta y Google diseñados para conseguir clientes nuevos, no solo clics. Optimizamos el costo de cada cliente que obtienes.",
  },
  {
    num: "02",
    title: "Producción Audiovisual",
    desc: "Videos y creatividades con un solo objetivo: que el espectador actúe. Cada pieza tiene un gancho, un beneficio claro y un llamado a la acción.",
  },
  {
    num: "03",
    title: "Mensajería Masiva",
    desc: "WhatsApp y email coordinados con tu pauta. Captamos prospectos y mantenemos la relación con quienes aún no se deciden a comprar.",
  },
  {
    num: "04",
    title: "Ecosistema Digital",
    desc: "Tu perfil de Google, WhatsApp Business, landing page y posicionamiento en buscadores trabajando como un solo sistema. La base que convierte.",
  },
];

const diferenciadores = [
  "Todo integrado — un solo equipo, un solo cargo mensual.",
  "Presencia en Google desde el primer mes, sin costo extra.",
  "Videos y anuncios hechos para vender, no para decorar redes.",
  "Solo trabajamos con quienes tienen algo claro que vender.",
  "Te explicamos todo en español, sin términos técnicos.",
];

export default function QuienesSomos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const difRef = useRef(null);
  const difInView = useInView(difRef, { once: true, margin: "-60px" });

  return (
    <section
      id="servicios"
      className="py-40 relative overflow-hidden"
      style={{ background: "#EDE9E5" }}
    >
      {/* Halo suave decorativo */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(214,58,39,0.10), transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-[1300px] mx-auto px-8 md:px-16 relative">
        {/* Bloque A — Manifiesto */}
        <div
          ref={ref}
          className="mb-32 pt-8"
          style={{ borderTop: "1px solid rgba(28,28,26,0.12)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="w-8 h-px block"
              style={{ background: "#D63A27" }}
            />
            <p
              className="font-body text-[11px] uppercase tracking-[var(--ls-label)]"
              style={{ color: "rgba(28,28,26,0.5)" }}
            >
              Quiénes somos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-title"
              style={{
                fontSize: "var(--t-h2)",
                fontWeight: 400,
                lineHeight: "var(--lh-h2)",
                letterSpacing: "var(--ls-h2)",
                color: "#1C1C1A",
              }}
            >
              No somos una agencia.
              <br />
              Somos{" "}
              <em style={{ color: "#D63A27", fontStyle: "italic" }}>
                growth partners.
              </em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p
                className="font-body text-[17px] leading-[1.75] mb-8"
                style={{ color: "rgba(28,28,26,0.7)" }}
              >
                Trabajamos con negocios que ya saben cómo funciona lo que
                venden. Nuestra labor es construir el sistema digital que
                convierte esa claridad en clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contacto"
                  className="relative overflow-hidden group inline-flex items-center gap-3 font-body text-[12px] tracking-[0.14em] uppercase px-6 py-3 transition-colors duration-500"
                  style={{
                    border: "1px solid rgba(28,28,26,0.3)",
                    color: "#1C1C1A",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                    style={{ background: "#D63A27" }}
                  />
                  <span className="relative transition-colors duration-500 group-hover:text-[#E4E0DD]">
                    Hablemos
                  </span>
                  <span
                    className="relative inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[#E4E0DD]"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
                <a
                  href="/nuestrotrabajo"
                  className="relative overflow-hidden group inline-flex items-center gap-3 font-body text-[12px] tracking-[0.14em] uppercase px-6 py-3 transition-colors duration-500"
                  style={{
                    border: "1px solid rgba(214,58,39,0.6)",
                    color: "#D63A27",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                    style={{ background: "rgba(214,58,39,0.15)" }}
                  />
                  <span className="relative">Ver nuestro trabajo</span>
                  <span
                    className="relative inline-block transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bloque B — 4 columnas de servicios */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {servicios.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08 + 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="pt-8 pb-8 pr-0 lg:pr-10 group cursor-default relative"
              style={{ borderTop: "1px solid rgba(28,28,26,0.14)" }}
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                style={{
                  width: "100%",
                  background: "#D63A27",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              <p
                className="font-body text-[11px] mb-6 tabular-nums transition-colors duration-500 group-hover:text-[color:#D63A27]"
                style={{
                  color: "rgba(28,28,26,0.4)",
                  letterSpacing: "0.06em",
                }}
              >
                {s.num}
              </p>
              <h3
                className="font-title mb-4 leading-snug transition-colors duration-500"
                style={{
                  fontSize: "var(--t-h3)",
                  fontWeight: 500,
                  color: "#1C1C1A",
                }}
              >
                {s.title}
              </h3>
              <p
                className="font-body text-[13px] leading-[1.7]"
                style={{ color: "rgba(28,28,26,0.6)" }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bloque C — Diferenciadores */}
        <div
          ref={difRef}
          className="mt-24 pt-16"
          style={{ borderTop: "1px solid rgba(28,28,26,0.1)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={difInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="w-8 h-px block"
              style={{ background: "#D63A27" }}
            />
            <p
              className="font-body text-[11px] uppercase tracking-[var(--ls-label)]"
              style={{ color: "rgba(28,28,26,0.45)" }}
            >
              Por qué PG
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-0">
            {diferenciadores.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={difInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="flex items-start gap-4 py-4 group"
                style={{ borderBottom: "1px solid rgba(28,28,26,0.1)" }}
              >
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2.5 transition-transform duration-500 group-hover:scale-150"
                  style={{ background: "#D63A27" }}
                />
                <p
                  className="font-body text-[14px] leading-[1.65]"
                  style={{ color: "rgba(28,28,26,0.72)" }}
                >
                  {d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
